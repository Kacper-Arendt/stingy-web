import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { DefaultAvatarConfig } from "../types/userProfile";
import DefaultAvatar from "./DefaultAvatar";

interface ProfileAvatarProps {
	displayName: string;
	profileImageUrl?: string;
	useDefaultAvatar?: boolean;
	defaultAvatarConfig?: DefaultAvatarConfig;
	className?: string;
	size?: number;
}

export default function ProfileAvatar({
	displayName,
	profileImageUrl,
	defaultAvatarConfig,
	className,
	size = 40,
}: ProfileAvatarProps) {
	const shouldShowImage = profileImageUrl;

	return (
		<Avatar className={className} style={{ width: size, height: size }}>
			{shouldShowImage && (
				<AvatarImage src={profileImageUrl} alt={displayName} />
			)}
			<AvatarFallback className="p-0">
				<DefaultAvatar
					displayName={displayName}
					size={size}
					defaultAvatarConfig={defaultAvatarConfig}
					className="w-full h-full"
				/>
			</AvatarFallback>
		</Avatar>
	);
}
