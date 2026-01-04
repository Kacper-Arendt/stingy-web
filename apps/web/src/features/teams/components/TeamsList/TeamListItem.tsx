import Button from "@repo/ui/button";
import Card from "@repo/ui/card";
import Collapsible from "@repo/ui/collapsible";
import { Calendar, Plus, Users } from "lucide-react";
import { useState } from "react";
import TeamBadge from "@/features/teams/components/shared/TeamBadge";
import type { Team } from "@/features/teams/types/team";
import { useDate } from "@/hooks/useDate";
import { useT } from "@/locales/useT";
import styles from "./TeamListItem.module.css";

const TeamListItem = ({ team }: { team: Team }) => {
	const { t } = useT();
	const { defaultFormatDate } = useDate();
	const [expandedBudgets, setExpandedBudgets] = useState<Set<string>>(
		new Set(),
	);
	const budgets = team.budgets || [];

	const toggleBudget = (budgetId: string) => {
		setExpandedBudgets((prev) => {
			const newSet = new Set(prev);
			if (newSet.has(budgetId)) {
				newSet.delete(budgetId);
			} else {
				newSet.add(budgetId);
			}
			return newSet;
		});
	};

	const handleBudgetClick = (budgetId: string) => {
		// TODO: Update route when budget routes are created
		// navigate({ to: `/teams/${team.id}/budgets/${budgetId}` });
		console.log("Navigate to budget:", budgetId);
	};

	const handleCreateBudget = () => {
		// TODO: Open create budget dialog or navigate to create budget page
		console.log("Create budget for team:", team.id);
	};

	return (
		<Card className={styles.card}>
			<Card.Header>
				<Card.Title className={styles.titleWithBadge}>
					{team.name}
					<TeamBadge role={team.userRole} />
				</Card.Title>
				<div className={styles.teamMeta}>
					<div className={styles.memberCount} title={t("member_count")}>
						<Users size={16} aria-label={t("member_count")} />
						<span>{team.memberCount}</span>
					</div>
					<div className={styles.createdDate} title={t("created")}>
						<Calendar size={16} aria-label={t("created")} />
						<span>{defaultFormatDate(new Date(team.createdAt))}</span>
					</div>
				</div>
				{team.description && (
					<Card.Description>{team.description}</Card.Description>
				)}
			</Card.Header>
			<Card.Content>
				<div>
					<div className={styles.budgetsHeader}>
						<h3 className={styles.budgetsTitle}>{t("budgets")}</h3>
						<Button
							size="small"
							variant="outline"
							onClick={handleCreateBudget}
							leftIcon={<Plus />}
						>
							{t("create_budget")}
						</Button>
					</div>

					{budgets.length === 0 ? (
						<p className={styles.noBudgets}>{t("no_budgets")}</p>
					) : (
						<div className={styles.budgetsList}>
							{budgets.map((budget) => (
								<Collapsible.Root
									key={budget.id}
									open={expandedBudgets.has(budget.id)}
									onOpenChange={() => toggleBudget(budget.id)}
								>
									<Collapsible.Trigger className={styles.budgetTrigger}>
										<div className={styles.budgetHeader}>
											<button
												type="button"
												className={styles.budgetNameButton}
												onClick={(e) => {
													e.stopPropagation();
													handleBudgetClick(budget.id);
												}}
											>
												{budget.name}
											</button>
										</div>
									</Collapsible.Trigger>
									<Collapsible.Content className={styles.budgetContent}>
										<div className={styles.budgetDetails}>
											{budget.description && (
												<div className={styles.budgetDetailRow}>
													<span className={styles.label}>
														{t("description")}:{" "}
													</span>
													<span>{budget.description}</span>
												</div>
											)}
											<div className={styles.budgetDetailRow}>
												<span className={styles.label}>{t("created")}: </span>
												<span>
													{defaultFormatDate(new Date(budget.createdAt))}
												</span>
											</div>
											<Button
												size="small"
												variant="outline"
												onClick={() => handleBudgetClick(budget.id)}
												className={styles.budgetButton}
											>
												{t("go_to_budget")}
											</Button>
										</div>
									</Collapsible.Content>
								</Collapsible.Root>
							))}
						</div>
					)}
				</div>
			</Card.Content>
		</Card>
	);
};

export default TeamListItem;
