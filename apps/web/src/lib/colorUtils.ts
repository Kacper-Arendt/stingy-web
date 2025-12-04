/**
 * Convert hex color to HSLA
 * @param hex - Hex color string (e.g., "#FF5733" or "FF5733")
 * @param alpha - Alpha value (0-1), defaults to 1
 * @returns HSLA string (e.g., "hsla(12, 100%, 60%, 1)")
 */
export function hexToHsla(hex: string, alpha: number = 1): string {
	// Remove the hash if present
	const cleanHex = hex.replace("#", "");

	// Parse the hex values
	const r = parseInt(cleanHex.slice(0, 2), 16) / 255;
	const g = parseInt(cleanHex.slice(2, 4), 16) / 255;
	const b = parseInt(cleanHex.slice(4, 6), 16) / 255;

	// Find the maximum and minimum values
	const max = Math.max(r, g, b);
	const min = Math.min(r, g, b);

	let h: number;
	let s: number;
	const l = (max + min) / 2;

	if (max === min) {
		h = s = 0; // achromatic
	} else {
		const d = max - min;
		s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

		switch (max) {
			case r:
				h = (g - b) / d + (g < b ? 6 : 0);
				break;
			case g:
				h = (b - r) / d + 2;
				break;
			case b:
				h = (r - g) / d + 4;
				break;
			default:
				h = 0;
		}
		h /= 6;
	}

	// Convert to degrees and percentages
	const hDeg = Math.round(h * 360);
	const sPercent = Math.round(s * 100);
	const lPercent = Math.round(l * 100);

	return `hsla(${hDeg}, ${sPercent}%, ${lPercent}%, ${alpha})`;
}
