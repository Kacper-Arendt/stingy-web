import { Avatar as BaseAvatar } from "@base-ui/react/avatar";
import merge from "../utils/merge";
import s from "./avatar.module.css";

type AvatarSize = "sm" | "md" | "lg";

const sizeClass: Record<AvatarSize, string> = {
	sm: s.sm,
	md: s.md,
	lg: s.lg,
};

export const Avatar = ({
	src,
	alt,
	className,
	size = "md",
}: {
	src: string;
	alt: string;
	className: string;
	size: AvatarSize;
}) => {
	return (
		<BaseAvatar.Root className={merge(s.Root, sizeClass[size])}>
			<BaseAvatar.Image src={src} alt={alt} className={className} />
			<BaseAvatar.Fallback className={s.Fallback}>LT</BaseAvatar.Fallback>
		</BaseAvatar.Root>
	);
};
