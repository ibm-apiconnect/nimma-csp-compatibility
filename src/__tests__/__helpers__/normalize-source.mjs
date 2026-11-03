// Bundlers (esbuild in the Karma run) re-print function sources, which changes whitespace,
// quote style, trailing commas and arrow parameter parens but not semantics.
// Node gets the exact text, browsers a normalized one.
export default function normalizeSource(source) {
  if (typeof window === 'undefined') {
    return source;
  }

  return source
    .replace(/'/g, '"')
    .replace(/,(\s*[)}\]])/g, '$1')
    .replace(/\s+/g, '')
    .replace(/\((\w+)\)=>/g, '$1=>');
}
