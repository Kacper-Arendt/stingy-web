import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import type { AuthorDto } from "@/types/author";

interface AuthorAvatarProps {
	author: AuthorDto;
	size?: "sm" | "md" | "lg";
	className?: string;
	showName?: boolean;
	showNameBelow?: boolean;
}

const sizeClasses = {
	sm: "w-6 h-6 text-xs",
	md: "w-8 h-8 text-sm",
	lg: "w-12 h-12 text-sm",
};

export function AuthorAvatar({
	author,
	size = "md",
	className,
	showName = false,
	showNameBelow = false,
}: AuthorAvatarProps) {
	const avatarElement = (
		<Avatar className={cn(sizeClasses[size], className)}>
			{author?.profileImageUrl && (
				<AvatarImage src={author.profileImageUrl} alt={author?.displayName} />
			)}
			<AvatarFallback className={cn("font-medium")}>
				{author?.shortDisplayName}
			</AvatarFallback>
		</Avatar>
	);

	if (showNameBelow) {
		return (
			<div className="flex flex-col items-center gap-1">
				{avatarElement}
				<span className="text-xs text-muted-foreground font-medium">
					{author?.shortDisplayName}
				</span>
			</div>
		);
	}

	if (showName) {
		return (
			<div className="flex items-center gap-2">
				{avatarElement}
				<span className="font-medium text-sm">{author?.shortDisplayName}</span>
			</div>
		);
	}

	return avatarElement;
}
