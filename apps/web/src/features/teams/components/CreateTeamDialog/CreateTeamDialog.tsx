import Button from "@repo/ui/button";
import Loader from "@repo/ui/loader";
import { lazy, Suspense } from "react";
import { Modal } from "@/components/ui/Modal";
import { useT } from "@/locales/useT";

const CreateTeamDialogContent = lazy(
	() => import("./CreateTeamDialogContent.tsx"),
);

export function CreateTeamDialog() {
	const { t } = useT();

	return (
		<Modal
			trigger={<Button>{t("teams_create_team")}</Button>}
			title={t("teams_create_team")}
		>
			<Suspense fallback={<Loader />}>
				<CreateTeamDialogContent />
			</Suspense>
		</Modal>
	);
}
