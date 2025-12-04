import { Card, CardContent, CardHeader } from "@/components/ui/card";
import * as m from "@/paraglide/messages";
import { useDate } from "@/utils/useDate";
import { BarChart3, Clock, FileText, TrendingUp } from "lucide-react";
import { useTeamStats } from "../hooks/useTeamStats";

interface TeamStatsProps {
	teamId: string;
}

export function TeamStats({ teamId }: TeamStatsProps) {
	const { data: stats, isLoading, error } = useTeamStats(teamId);
	const { defaultFormatDate } = useDate();

	if (isLoading) {
		return (
			<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
				{Array.from({ length: 4 }, (_, i) => (
					<div key={i} className="bg-muted rounded-lg p-4 animate-pulse">
						<div className="h-16 bg-muted-foreground/20 rounded" />
					</div>
				))}
			</div>
		);
	}

	if (error || !stats) {
		return null;
	}

	return (
		<div className="grid grid-cols-1 md:grid-cols-4 gap-6">
			<Card className="gradient-blue">
				<CardHeader className="md:pb-3 h-full">
					<div className="flex items-center space-x-2">
						<BarChart3 className="w-5 h-5 text-blue-600" />
						<span className="text-sm font-medium text-blue-700 dark:text-blue-300">
							{m.teams_total_retros()}
						</span>
					</div>
				</CardHeader>
				<CardContent>
					<div className=" text-2xl font-bold text-blue-900 dark:text-blue-100">
						{stats.totalRetrospectives}
					</div>
				</CardContent>
			</Card>

			<Card className="gradient-green">
				<CardHeader className="md:pb-3 h-full">
					<div className="flex items-center space-x-2">
						<FileText className="w-5 h-5 text-green-600" />
						<span className="text-sm font-medium text-green-900 dark:text-green-100">
							{m.teams_total_notes()}
						</span>
					</div>
				</CardHeader>
				<CardContent>
					<div className="text-2xl font-bold text-green-900 dark:text-green-100">
						{stats.totalNotes}
					</div>
				</CardContent>
			</Card>

			<Card className="gradient-purple">
				<CardHeader className="md:pb-3 h-full">
					<div className="flex items-center space-x-2">
						<TrendingUp className="w-5 h-5 text-purple-600" />
						<span className="text-sm font-medium text-purple-900 dark:text-purple-100">
							{m.teams_avg_participation()}
						</span>
					</div>
				</CardHeader>
				<CardContent>
					<div className="text-2xl font-bold text-purple-900 dark:text-purple-100">
						{stats.peoplePerRetro.toFixed(1)}%
					</div>
				</CardContent>
			</Card>

			<Card className="gradient-orange">
				<CardHeader className="md:pb-3 h-full">
					<div className="flex items-center space-x-2">
						<Clock className="w-5 h-5 text-orange-600" />
						<span className="text-sm font-medium text-orange-900 dark:text-orange-100">
							{m.teams_last_retro()}
						</span>
					</div>
				</CardHeader>
				<CardContent>
					<div className="text-2xl font-bold text-orange-900 dark:text-orange-100">
						{stats.lastRetroDate
							? defaultFormatDate(new Date(stats.lastRetroDate))
							: "-"}
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
