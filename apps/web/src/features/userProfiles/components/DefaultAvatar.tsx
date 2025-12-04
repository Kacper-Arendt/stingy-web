import { useMemo } from "react";
import type { DefaultAvatarConfig } from "../types/userProfile";

interface DefaultAvatarProps {
	displayName: string;
	className?: string;
	size?: number;
	defaultAvatarConfig?: DefaultAvatarConfig;
}

const AVATAR_COLORS = [
	"#FF6B6B",
	"#4ECDC4",
	"#45B7D1",
	"#96CEB4",
	"#FECA57",
	"#FF9FF3",
	"#54A0FF",
	"#5F27CD",
	"#00D2D3",
	"#FF9F43",
	"#48CAE4",
	"#2E86AB",
];

/**
 * Generate initials from display name
 */
const getInitials = (name: string): string => {
	if (!name) return "U";

	const words = name.trim().split(/\s+/);
	if (words.length === 1) {
		return words[0][0]?.toUpperCase() || "U";
	}

	return (words[0][0] + words[words.length - 1][0]).toUpperCase();
};

/**
 * Generate background color from name hash
 */
const getBackgroundColor = (name: string): string => {
	if (!name) return AVATAR_COLORS[0];

	let hash = 0;
	for (let i = 0; i < name.length; i++) {
		hash = name.charCodeAt(i) + ((hash << 5) - hash);
	}

	const index = Math.abs(hash) % AVATAR_COLORS.length;
	return AVATAR_COLORS[index];
};

/**
 * Determine text color based on background color brightness
 */
const getTextColor = (backgroundColor: string): string => {
	// Convert hex to RGB
	const hex = backgroundColor.replace("#", "");
	const r = parseInt(hex.substr(0, 2), 16);
	const g = parseInt(hex.substr(2, 2), 16);
	const b = parseInt(hex.substr(4, 2), 16);

	const brightness = (r * 299 + g * 587 + b * 114) / 1000;

	return brightness > 128 ? "#000000" : "#FFFFFF";
};

/**
 * DefaultAvatar component that generates an avatar from initials
 */
export default function DefaultAvatar({
	displayName,
	className = "",
	size = 40,
	defaultAvatarConfig,
}: DefaultAvatarProps) {
	const config = useMemo(() => {
		if (defaultAvatarConfig) {
			return defaultAvatarConfig;
		}

		const initials = getInitials(displayName);
		const backgroundColor = getBackgroundColor(displayName);
		const textColor = getTextColor(backgroundColor);

		return {
			initials,
			backgroundColor,
			textColor,
		};
	}, [displayName, defaultAvatarConfig]);

	return (
		<div
			className={`flex items-center justify-center font-medium text-white select-none ${className}`}
			style={{
				width: size,
				height: size,
				backgroundColor: config.backgroundColor,
				color: config.textColor,
				fontSize: size * 0.4, // Font size is 40% of avatar size
				borderRadius: "inherit", // Inherit border radius from parent
			}}
			title={displayName}
		>
			{config.initials}
		</div>
	);
}
