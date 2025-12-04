import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { GuidesManagementModal } from "@/features/onboarding/components/GuidesManagementModal";
import * as m from "@/paraglide/messages";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { Link } from "@tanstack/react-router";
import { BadgeCheck, BookOpen, LogOut } from "lucide-react";
import { useState } from "react";
import { useLogout } from "../hooks/useLogout";
import { useMyProfile } from "../hooks/useUserProfile";
import ProfileAvatar from "./ProfileAvatar";

export default function UserNav() {
	const { data: profile, isLoading, error } = useMyProfile();
	const logoutMutation = useLogout();
	const [isGuidesModalOpen, setIsGuidesModalOpen] = useState(false);

	const handleLogout = () => {
		logoutMutation.mutate();
	};

	if (isLoading)
		return <Skeleton className="h-10 w-10 rounded-full bg-primary/10" />;

	if (error || !profile) {
		return (
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<div className="cursor-pointer">
						<ProfileAvatar displayName="User" useDefaultAvatar />
					</div>
				</DropdownMenuTrigger>
				<DropdownMenuContent
					className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
					side="bottom"
					align="center"
					sideOffset={4}
				>
					<DropdownMenuItem asChild>
						<Link to="/users/me">
							<BadgeCheck />
							{m.profile_account()}
						</Link>
					</DropdownMenuItem>
					<DropdownMenuSeparator />
					<DropdownMenuItem onClick={() => setIsGuidesModalOpen(true)}>
						<BookOpen />
						{m.onboarding_guides_menu()}
					</DropdownMenuItem>
					<DropdownMenuSeparator />
					<DropdownMenuItem onClick={handleLogout}>
						<LogOut />
						{m.profile_logout()}
					</DropdownMenuItem>
				</DropdownMenuContent>
				<GuidesManagementModal
					open={isGuidesModalOpen}
					onOpenChange={setIsGuidesModalOpen}
				/>
			</DropdownMenu>
		);
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<div className="cursor-pointer">
					<ProfileAvatar
						displayName={profile.displayName}
						profileImageUrl={profile.profileImageUrl}
						useDefaultAvatar={profile.useDefaultAvatar}
						size={40}
					/>
				</div>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
				side="bottom"
				align="center"
				sideOffset={4}
			>
				<DropdownMenuLabel className="p-0 font-normal">
					<div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
						<ProfileAvatar
							displayName={profile.displayName}
							profileImageUrl={profile.profileImageUrl}
							className="h-8 w-8 rounded-lg"
							size={32}
						/>
						<div className="grid flex-1 text-left text-sm leading-tight">
							<span className="truncate font-medium">
								{profile.displayName}
							</span>
						</div>
					</div>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem asChild>
					<Link to="/users/me">
						<BadgeCheck />
						{m.profile_account()}
					</Link>
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem onClick={() => setIsGuidesModalOpen(true)}>
					<BookOpen />
					{m.onboarding_guides_menu()}
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem
					onClick={handleLogout}
					disabled={logoutMutation.isPending}
				>
					<LogOut />
					{logoutMutation.isPending
						? m.profile_logging_out()
						: m.profile_logout()}
				</DropdownMenuItem>
			</DropdownMenuContent>
			<GuidesManagementModal
				open={isGuidesModalOpen}
				onOpenChange={setIsGuidesModalOpen}
			/>
		</DropdownMenu>
	);
}
