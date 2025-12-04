import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import * as m from "@/paraglide/messages";
import { useDate } from "@/utils/useDate";
import { Calendar, Clock, Edit } from "lucide-react";
import { useState } from "react";
import ProfileAvatar from "./components/ProfileAvatar";
import ProfileEdit from "./components/ProfileEdit";
import ProfileFieldsModal from "./components/ProfileFieldsModal";
import { useMyProfile } from "./hooks/useUserProfile";
import { ProfileVisibilityLevel } from "./types/userProfile";

export default function Me() {
	const [isEditing, setIsEditing] = useState(false);
	const { data: profile, isLoading: isLoadingProfile } = useMyProfile();
	const { defaultFormatDate } = useDate();

	if (isLoadingProfile) {
		return (
			<div className="max-w-4xl mx-auto space-y-6 p-6">
				<Skeleton className="h-8 w-full" />
				<Card>
					<CardHeader>
						<Skeleton className="h-6 w-32" />
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="flex items-center space-x-4">
							<Skeleton className="h-20 w-20 rounded-lg" />
							<div className="space-y-2">
								<Skeleton className="h-6 w-40" />
								<Skeleton className="h-4 w-60" />
							</div>
						</div>
						<Skeleton className="h-16 w-full" />
					</CardContent>
				</Card>
			</div>
		);
	}

	if (!profile) {
		return (
			<div className="max-w-2xl mx-auto p-6">
				<ProfileEdit isCreating={true} onSuccess={() => setIsEditing(false)} />
			</div>
		);
	}

	// Edit mode
	if (isEditing) {
		return (
			<div className="max-w-4xl mx-auto p-6">
				<ProfileEdit onSuccess={() => setIsEditing(false)} />
				<div className="mt-6 text-center">
					<Button variant="outline" onClick={() => setIsEditing(false)}>
						{m.cancel()}
					</Button>
				</div>
			</div>
		);
	}

	// Profile view mode
	const getVisibilityBadge = (visibility: ProfileVisibilityLevel) => {
		switch (visibility) {
			case ProfileVisibilityLevel.Public:
				return (
					<Badge variant="secondary" className="text-green-600">
						{m.profile_visibility_public()}
					</Badge>
				);
			case ProfileVisibilityLevel.Limited:
				return (
					<Badge variant="secondary" className="text-yellow-600">
						{m.profile_visibility_limited()}
					</Badge>
				);
			case ProfileVisibilityLevel.Private:
				return (
					<Badge variant="secondary" className="text-red-600">
						{m.profile_visibility_private()}
					</Badge>
				);
			default:
				return null;
		}
	};

	return (
		<div className="max-w-4xl mx-auto space-y-6 p-6">
			{/* Header */}
			<div className="flex items-center justify-between">
				<h1 className="text-3xl font-bold">{m.profile_my_profile()}</h1>
				<ProfileFieldsModal>
					<Button size="sm">
						<Edit className="h-4 w-4 mr-2" />
						{m.profile_edit_profile()}
					</Button>
				</ProfileFieldsModal>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>{m.profile_account()}</CardTitle>
				</CardHeader>
				<CardContent className="space-y-6">
					{/* Profile Summary */}
					<div className="flex items-start space-x-4">
						<ProfileAvatar
							displayName={profile.displayName}
							profileImageUrl={profile?.profileImageUrl}
							useDefaultAvatar={profile.useDefaultAvatar}
							size={80}
						/>
						<div className="flex-1 space-y-2">
							<div className="flex items-center gap-3">
								<h2 className="text-xl font-semibold">
									{profile?.displayName}
								</h2>
								{getVisibilityBadge(profile.visibility)}
							</div>
							{profile.bio && (
								<p className="text-muted-foreground leading-relaxed">
									{profile.bio}
								</p>
							)}
						</div>
					</div>

					<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t">
						<div className="flex items-center gap-3">
							<Clock className="h-4 w-4 text-muted-foreground" />
							<div>
								<p className="text-sm font-medium">{m.profile_timezone()}</p>
								<p className="text-sm text-muted-foreground">
									{profile.timeZone}
								</p>
							</div>
						</div>
						<div className="flex items-center gap-3">
							<Calendar className="h-4 w-4 text-muted-foreground" />
							<div>
								<p className="text-sm font-medium">Member since</p>
								<p className="text-sm text-muted-foreground">
									{defaultFormatDate(new Date(profile.createdAt))}
								</p>
							</div>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
