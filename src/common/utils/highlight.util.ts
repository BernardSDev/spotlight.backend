export function highlightMatch(text: string, keyword: string): string {
  const escaped = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // escape special regex chars
  const regex = new RegExp(`(${escaped})`, 'gi');
  return text.replace(regex, '<mark>$1</mark>');
}

export function getPreviewWithHighlight(body: string, query: string): string {
  const index = body.toLowerCase().indexOf(query.toLowerCase());
  if (index === -1) return body.slice(0, 100) + '...';
  const start = Math.max(0, index - 30);
  const end = Math.min(body.length, index + 70);
  const snippet = body.slice(start, end);
  return highlightMatch(snippet, query) + '...';
}

