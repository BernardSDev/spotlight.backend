"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.highlightMatch = highlightMatch;
exports.getPreviewWithHighlight = getPreviewWithHighlight;
function highlightMatch(text, keyword) {
    const escaped = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(${escaped})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
}
function getPreviewWithHighlight(body, query) {
    const index = body.toLowerCase().indexOf(query.toLowerCase());
    if (index === -1)
        return body.slice(0, 100) + '...';
    const start = Math.max(0, index - 30);
    const end = Math.min(body.length, index + 70);
    const snippet = body.slice(start, end);
    return highlightMatch(snippet, query) + '...';
}
//# sourceMappingURL=highlight.util.js.map