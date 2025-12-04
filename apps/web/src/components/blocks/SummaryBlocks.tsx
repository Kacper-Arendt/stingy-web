import * as m from "@/paraglide/messages";
import { BookOpen, CheckCircle2, Lightbulb, Target, Zap } from "lucide-react";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

interface SummaryBlocksProps {
	title: string;
	mainSummary: string;
	actionItems: string[];
	keyInsights: string[];
}

export function SummaryBlocks({
	title,
	mainSummary,
	actionItems,
	keyInsights,
}: SummaryBlocksProps) {
	return (
		// <Card className="gradient-ai">
		<Card>
			<CardHeader>
				<CardTitle className="flex items-center gap-2 text-purple-900 dark:text-purple-100 text-2xl font-bold">
					🌀 {title}
				</CardTitle>
			</CardHeader>
			<CardContent className="space-y-4">
				{mainSummary && (
					<Card className="">
						<CardHeader>
							<CardTitle className="flex items-center gap-2 text-purple-900 dark:text-purple-100">
								<BookOpen className="w-5 h-5" />
								{m.ai_analysis_overall_summary()}
							</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="text-purple-800 dark:text-purple-200 leading-relaxed">
								{mainSummary}
							</p>
						</CardContent>
					</Card>
				)}

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
					{/* Action Items */}
					{actionItems?.length > 0 && (
						<Card className="ai-summary-actions">
							<CardHeader>
								<CardTitle className="flex items-center gap-2 text-emerald-900 dark:text-emerald-100">
									<Target className="w-5 h-5" />
									{m.ai_analysis_action_items()}
									<Badge className="ml-auto bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200">
										{actionItems.length}
									</Badge>
								</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="space-y-3">
									{actionItems.map((actionItem, index) => (
										<div
											key={index}
											className="flex items-start gap-3 p-3 bg-white/60 dark:bg-emerald-900/30 rounded-lg border border-emerald-200 dark:border-emerald-700"
										>
											<CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 mt-0.5 flex-shrink-0" />
											<p className="text-sm text-emerald-900 dark:text-emerald-200 leading-relaxed">
												{actionItem}
											</p>
										</div>
									))}
								</div>
							</CardContent>
						</Card>
					)}

					{/* Key Insights */}
					{keyInsights?.length > 0 && (
						<Card className="ai-summary-key-insights">
							<CardHeader>
								<CardTitle className="flex items-center gap-2 text-amber-900 dark:text-amber-100">
									<Lightbulb className="w-5 h-5" />
									{m.ai_analysis_key_insights()}
									<Badge className="ml-auto bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200">
										{keyInsights.length}
									</Badge>
								</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="space-y-3">
									{keyInsights.map((insight, index) => (
										<div
											key={index}
											className="flex items-start gap-3 p-3 bg-white/60 dark:bg-amber-900/30 rounded-lg border border-amber-200 dark:border-amber-700"
										>
											<Zap className="w-4 h-4 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
											<p className="text-sm text-amber-900 dark:text-amber-200 leading-relaxed">
												{insight}
											</p>
										</div>
									))}
								</div>
							</CardContent>
						</Card>
					)}
				</div>
			</CardContent>
		</Card>
	);
}
