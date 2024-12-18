/**
 * Removes URLs from Markdown content while preserving text and formatting
 */
export function removeUrls(markdown: string): string {
  if (!markdown) return '';

  return markdown
    // Remove inline links while keeping text: [text](url) -> text
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    // Remove reference-style link definitions: [id]: url
    .replace(/^\[[^\]]+\]:\s*http[^\n]+$/gm, '')
    // Remove bare URLs
    .replace(/https?:\/\/[^\s)]+/g, '')
    // Remove empty lines that might be left after removing references
    .replace(/\n\s*\n\s*\n/g, '\n\n')
    // Trim any trailing whitespace
    .trim();
}