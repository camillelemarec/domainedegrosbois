import fs from 'node:fs/promises';
import path from 'node:path';
import type { APIRoute } from 'astro';
import { b2Config, downloadPrivateFile } from '@/lib/b2';
import { mediaFileOnBucket } from '@/lib/media';

export const prerender = false;

const TYPES: Record<string, string> = {
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  png: 'image/png',
  webp: 'image/webp',
  gif: 'image/gif',
  svg: 'image/svg+xml',
};

function contentType(filePath: string): string {
  const ext = filePath.split('.').pop()?.toLowerCase() ?? '';
  return TYPES[ext] ?? 'application/octet-stream';
}

/** N’accepte qu’un chemin de fichier simple, sans remontée de dossier. */
function normalizeMediaPath(raw: string | undefined): string | null {
  if (!raw) return null;
  let decoded: string;
  try {
    decoded = raw.split('/').map((part) => decodeURIComponent(part)).join('/');
  } catch {
    return null;
  }
  if (decoded.includes('\\') || decoded.includes('\0')) return null;
  const parts = decoded.split('/');
  if (parts.some((part) => part === '' || part === '.' || part === '..')) return null;
  return parts.join('/');
}

function safeType(upstream: string | null, filePath: string): string {
  const fallback = contentType(filePath);
  if (!upstream) return fallback;
  const mime = upstream.split(';')[0]?.trim().toLowerCase() ?? '';
  if (mime.startsWith('image/')) return mime;
  return fallback;
}

async function readLocal(filePath: string): Promise<Buffer | null> {
  const roots = [path.resolve(process.cwd(), 'public'), path.resolve(process.cwd(), 'dist/client')];
  for (const root of roots) {
    const full = path.resolve(root, filePath);
    if (full !== root && !full.startsWith(root + path.sep)) continue;
    try {
      return await fs.readFile(full);
    } catch {
      continue;
    }
  }
  return null;
}

function imageResponse(body: BodyInit, type: string): Response {
  const headers: Record<string, string> = {
    'Content-Type': type,
    'Cache-Control': 'public, max-age=86400',
    'Content-Disposition': 'inline',
    'X-Content-Type-Options': 'nosniff',
  };
  if (type === 'image/svg+xml') {
    headers['Content-Security-Policy'] = "default-src 'none'; style-src 'unsafe-inline'; sandbox";
  }
  return new Response(body, { status: 200, headers });
}

export const GET: APIRoute = async ({ params }) => {
  const raw = typeof params.path === 'string' ? params.path : undefined;
  const filePath = normalizeMediaPath(raw);
  if (!filePath || !mediaFileOnBucket(filePath)) {
    return new Response(null, { status: 404 });
  }

  if (b2Config()) {
    try {
      const upstream = await downloadPrivateFile(filePath);
      if (upstream.status === 404) return new Response(null, { status: 404 });
      if (!upstream.ok || !upstream.body) return new Response(null, { status: 502 });
      return imageResponse(upstream.body, safeType(upstream.headers.get('content-type'), filePath));
    } catch {
      return new Response(null, { status: 502 });
    }
  }

  const local = await readLocal(filePath);
  if (!local) return new Response(null, { status: 404 });
  return imageResponse(local, contentType(filePath));
};
