/**
 * Lecture d’un bucket Backblaze B2 privé.
 * Importé uniquement par la route serveur `/media/`. Les secrets sont lus
 * au moment de la requête via `process.env[...]` pour ne pas être figés dans le build.
 */

type B2Config = {
  keyId: string;
  applicationKey: string;
  bucketId: string;
  bucketName: string;
};

type B2Session = {
  token: string;
  downloadUrl: string;
  expiresAt: number;
};

type AuthorizePayload = {
  authorizationToken?: string;
  downloadUrl?: string;
  allowed?: {
    bucketId?: string | null;
    bucketName?: string | null;
    capabilities?: string[];
  };
};

const SESSION_TTL_MS = 23 * 60 * 60 * 1000;

let session: B2Session | null = null;
let pending: Promise<B2Session> | null = null;

function secret(name: string): string {
  const value = process.env[name];
  return typeof value === 'string' ? value.trim() : '';
}

/**
 * Le dépôt Backblaze contient le dossier `public/` tel quel
 * (`public/images/…`, `public/path1.png`). `B2_OBJECT_PREFIX=` vide
 * sert les objets à la racine du bucket.
 */
function objectPrefix(): string {
  const raw = process.env.B2_OBJECT_PREFIX;
  const prefix = raw === undefined ? 'public' : raw.trim();
  return prefix.replace(/^\/+|\/+$/g, '');
}

export function b2Config(): B2Config | null {
  const keyId = secret('B2_KEY_ID');
  const applicationKey = secret('B2_APPLICATION_KEY');
  const bucketId = secret('B2_BUCKET_ID');
  const bucketName = secret('B2_BUCKET_NAME');
  if (!keyId || !applicationKey || !bucketId || !bucketName) return null;
  return { keyId, applicationKey, bucketId, bucketName };
}

function clearSession(): void {
  session = null;
  pending = null;
}

async function requestSession(config: B2Config): Promise<B2Session> {
  const basic = Buffer.from(`${config.keyId}:${config.applicationKey}`).toString('base64');
  const response = await fetch('https://api.backblazeb2.com/b2api/v2/b2_authorize_account', {
    headers: { Authorization: `Basic ${basic}` },
  });
  if (!response.ok) {
    throw new Error(`Backblaze a refusé l’autorisation (${response.status}).`);
  }

  const payload = (await response.json()) as AuthorizePayload;
  const token = payload.authorizationToken;
  const downloadUrl = payload.downloadUrl?.replace(/\/+$/, '');
  const capabilities = payload.allowed?.capabilities ?? [];
  if (!token || !downloadUrl) {
    throw new Error('Réponse d’autorisation Backblaze incomplète.');
  }
  if (!capabilities.includes('readFiles')) {
    throw new Error('La clé Backblaze n’a pas le droit readFiles.');
  }

  const allowedBucket = payload.allowed?.bucketId;
  if (allowedBucket && allowedBucket !== config.bucketId) {
    throw new Error('B2_BUCKET_ID ne correspond pas à la clé.');
  }
  const allowedName = payload.allowed?.bucketName;
  if (allowedName && allowedName !== config.bucketName) {
    throw new Error('B2_BUCKET_NAME ne correspond pas à la clé.');
  }

  return { token, downloadUrl, expiresAt: Date.now() + SESSION_TTL_MS };
}

async function authorize(config: B2Config): Promise<B2Session> {
  if (session && session.expiresAt > Date.now() + 60_000) return session;
  if (!pending) {
    pending = requestSession(config)
      .then((next) => {
        session = next;
        pending = null;
        return next;
      })
      .catch((error: unknown) => {
        pending = null;
        throw error;
      });
  }
  return pending;
}

function fileUrl(downloadUrl: string, bucketName: string, filePath: string): string {
  const encodedName = encodeURIComponent(bucketName);
  const key = objectPrefix() ? `${objectPrefix()}/${filePath}` : filePath;
  const encodedPath = key.split('/').map((segment) => encodeURIComponent(segment)).join('/');
  return `${downloadUrl}/file/${encodedName}/${encodedPath}`;
}

/** Télécharge un objet du bucket. Le jeton reste dans l’en-tête, jamais dans l’URL. */
export async function downloadPrivateFile(filePath: string): Promise<Response> {
  const config = b2Config();
  if (!config) {
    throw new Error('Bucket Backblaze non configuré.');
  }

  for (let attempt = 0; attempt < 2; attempt += 1) {
    const auth = await authorize(config);
    const upstream = await fetch(fileUrl(auth.downloadUrl, config.bucketName, filePath), {
      headers: { Authorization: auth.token },
    });
    if (upstream.status === 401 && attempt === 0) {
      clearSession();
      continue;
    }
    return upstream;
  }

  throw new Error('Autorisation Backblaze expirée.');
}
