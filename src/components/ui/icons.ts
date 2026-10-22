/** Noms et tracés SVG des pictogrammes (voir Icon.astro). */
export type IconName =
  | 'ticket' | 'phone' | 'mail' | 'search' | 'menu' | 'x' | 'chevron-down' | 'chevron-right' | 'arrow-right'
  | 'calendar' | 'clock' | 'map-pin' | 'users' | 'external' | 'globe' | 'download' | 'check' | 'info'
  | 'image' | 'euro' | 'printer' | 'leaf' | 'car' | 'train' | 'accessibility' | 'star' | 'quote'
  | 'facebook' | 'instagram' | 'linkedin' | 'youtube'
  | 'config-theatre' | 'config-u' | 'config-classe' | 'config-cabaret' | 'config-cocktail' | 'config-banquet'
  | 'building' | 'castle' | 'horse' | 'museum' | 'camera' | 'file-text' | 'cookie' | 'alert';

export const iconPaths: Record<IconName, string> = {
  ticket: '<path d="M3 9a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v1a2 2 0 0 0 0 4v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1a2 2 0 0 0 0-4Z"/><path d="M13 7v2M13 11v2M13 15v2"/>',
  phone: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z"/>',
  mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',
  search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
  menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
  x: '<path d="M18 6 6 18M6 6l12 12"/>',
  'chevron-down': '<path d="m6 9 6 6 6-6"/>',
  'chevron-right': '<path d="m9 18 6-6-6-6"/>',
  'arrow-right': '<path d="M5 12h14M12 5l7 7-7 7"/>',
  calendar: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
  clock: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
  'map-pin': '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
  users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',
  external: '<path d="M15 3h6v6M10 14 21 3M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5"/>',
  globe: '<circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>',
  download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
  info: '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>',
  image: '<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.1-3.1a2 2 0 0 0-2.8 0L6 21"/>',
  euro: '<path d="M4 10h12M4 14h9M19 6a7.7 7.7 0 0 0-5.2-2A7.9 7.9 0 0 0 6 12c0 4.4 3.5 8 7.8 8 2 0 3.8-.8 5.2-2"/>',
  printer: '<path d="M6 9V3h12v6M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/>',
  leaf: '<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.5 19 2c1 2 2 4.2 2 8 0 5.5-4.8 10-10 10Z"/><path d="M2 21c0-3 1.9-5.5 5-6"/>',
  car: '<path d="M19 17h2a1 1 0 0 0 1-1v-3a2 2 0 0 0-1.4-1.9L18 10l-2.2-4.4A2 2 0 0 0 14 4.5H9.3a2 2 0 0 0-1.8 1.1L5.5 10 2.4 11.1A2 2 0 0 0 1 13v3a1 1 0 0 0 1 1h2"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/><path d="M9 17h6"/>',
  train: '<rect x="4" y="3" width="16" height="16" rx="2"/><path d="M4 11h16M12 3v8M8 19l-2 3M16 19l2 3"/><circle cx="8.5" cy="15.5" r="1"/><circle cx="15.5" cy="15.5" r="1"/>',
  accessibility: '<circle cx="16" cy="4" r="1"/><path d="m18 19 1-7-6 1M5 8l3-3 5.5 3-2.4 3.5M4.2 14.5A5 5 0 0 0 12 20.2"/>',
  star: '<path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1Z"/>',
  quote: '<path d="M3 21c3 0 7-1 7-8V5c0-1.3-1-2-2-2H4c-1 0-2 .7-2 2v6c0 1.3 1 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .5-1 1 0 2 1 2Z"/><path d="M15 21c3 0 7-1 7-8V5c0-1.3-1-2-2-2h-4c-1 0-2 .7-2 2v6c0 1.3 1 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .5-1 1 0 2 1 2Z"/>',
  facebook: '<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>',
  instagram: '<rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17.5 6.5h.01"/>',
  linkedin: '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>',
  youtube: '<path d="M2.5 17a24.1 24.1 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.6 49.6 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.1 24.1 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.6 49.6 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><path d="m10 15 5-3-5-3z"/>',
  'config-theatre': '<rect x="9" y="3" width="6" height="3" rx="1"/><path d="M4 11h3M10.5 11h3M17 11h3M4 15h3M10.5 15h3M17 15h3M4 19h3M10.5 19h3M17 19h3"/>',
  'config-u': '<rect x="9" y="3" width="6" height="3" rx="1"/><path d="M5 9v9a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V9"/><path d="M8 11h.01M8 15h.01M16 11h.01M16 15h.01M11 18h2"/>',
  'config-classe': '<rect x="9" y="3" width="6" height="3" rx="1"/><rect x="3" y="10" width="7" height="3" rx=".5"/><rect x="14" y="10" width="7" height="3" rx=".5"/><rect x="3" y="17" width="7" height="3" rx=".5"/><rect x="14" y="17" width="7" height="3" rx=".5"/>',
  'config-cabaret': '<rect x="9" y="3" width="6" height="3" rx="1"/><circle cx="7.5" cy="14" r="3"/><circle cx="16.5" cy="14" r="3"/><path d="M4 19.5h7M13 19.5h7"/>',
  'config-cocktail': '<circle cx="6" cy="8" r="2"/><circle cx="12" cy="6" r="2"/><circle cx="18" cy="9" r="2"/><path d="M6 11v5M12 9v6M18 12v5M4 21h16"/>',
  'config-banquet': '<rect x="4" y="9" width="16" height="6" rx="1"/><path d="M7 6h.01M12 6h.01M17 6h.01M7 18h.01M12 18h.01M17 18h.01"/>',
  building: '<rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 22v-4h6v4M8 6h.01M16 6h.01M12 6h.01M12 10h.01M12 14h.01M16 10h.01M16 14h.01M8 10h.01M8 14h.01"/>',
  castle: '<path d="M3 21h18M5 21V9l2-2v-3h2v2h2V4h2v2h2V4h2v3l2 2v12"/><path d="M10 21v-5a2 2 0 0 1 4 0v5"/>',
  horse: '<path d="M4 20c0-5 2-9 6-11l1-5 3 3 4 1c1 0 2 1 2 2 0 2-2 3-3 3l-1 7"/><path d="M8 20l1-4M14 20l-1-4"/>',
  museum: '<path d="M3 21h18M4 10h16M12 3 3 8h18ZM6 10v11M10 10v11M14 10v11M18 10v11"/>',
  camera: '<path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/>',
  'file-text': '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/>',
  cookie: '<path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5"/><path d="M8.5 8.5v.01M16 15.5v.01M12 12v.01M11 17v.01M7 14v.01"/>',
  alert: '<path d="m21.7 18-8-14a2 2 0 0 0-3.4 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.7-3Z"/><path d="M12 9v4M12 17h.01"/>',
};
