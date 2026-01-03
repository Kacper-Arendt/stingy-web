import { useT } from "@/locales/useT";

export function useRoleTranslation() {
	const { t } = useT();

	const getRoleTranslation = (role: string) => {
		switch (role) {
			case "owner":
				return t("teams_role_owner");
			case "admin":
				return t("teams_role_admin");
			case "member":
				return t("teams_role_member");
			default:
				return role;
		}
	};

	return getRoleTranslation;
}
