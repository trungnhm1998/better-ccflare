/**
 * Calculate the Levenshtein distance between two strings
 * This is a measure of the similarity between two strings, defined as the minimum number
 * of single-character edits (insertions, deletions, or substitutions) required to change
 * one string into the other.
 *
 * @param str1 First string to compare
 * @param str2 Second string to compare
 * @returns The Levenshtein distance between the two strings
 */
/**
 * Safely parse an incoming request URL.
 *
 * Bun's `req.url` is normally absolute, but when a client omits the Host
 * header (e.g. HTTP/1.0 scanner bots), Bun exposes the bare request path,
 * which `new URL()` rejects. Returns null instead of throwing so callers
 * can reply with 400 Bad Request rather than an unhandled 500.
 *
 * @param rawUrl The raw request URL string (e.g. from `req.url`)
 * @returns The parsed URL, or null if it is not a valid absolute URL
 */
export function parseRequestUrl(rawUrl: string): URL | null {
	try {
		return new URL(rawUrl);
	} catch {
		return null;
	}
}

export function levenshteinDistance(str1: string, str2: string): number {
	const matrix = Array(str2.length + 1)
		.fill(null)
		.map(() => Array(str1.length + 1).fill(null));

	for (let i = 0; i <= str1.length; i++) {
		matrix[0][i] = i;
	}

	for (let j = 0; j <= str2.length; j++) {
		matrix[j][0] = j;
	}

	for (let j = 1; j <= str2.length; j++) {
		for (let i = 1; i <= str1.length; i++) {
			const cost = str1[i - 1] === str2[j - 1] ? 0 : 1;
			matrix[j][i] = Math.min(
				matrix[j][i - 1] + 1, // deletion
				matrix[j - 1][i] + 1, // insertion
				matrix[j - 1][i - 1] + cost, // substitution
			);
		}
	}

	return matrix[str2.length][str1.length];
}
