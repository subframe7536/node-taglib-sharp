const _EXTNAME_RE = /.(\.[^./]+)$/;
export function getExtension(name: string): string {
  const match = _EXTNAME_RE.exec(name)
  return (match ? match[1] : name.substring(1)).toLowerCase()
}

const _DRIVE_LETTER_START_RE = /^[A-Za-z]:\//;
function normalizeWindowsPath(input = "") {
  if (!input) {
    return input;
  }
  return input.replace(/\\/g, "/").replace(_DRIVE_LETTER_START_RE, (r) => r.toUpperCase());
}

export function basename(p: string): string {
  return normalizeWindowsPath(p).split("/").pop();
}

export function getMimeType(name: string): string {
  const ext = getExtension(name).toLowerCase();
  return `taglib/${ext}`;
}