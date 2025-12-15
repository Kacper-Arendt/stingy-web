import { apiConfig } from "@/config/app";
import { useT } from "@/locales/useT";
import styles from "./AuthLayout.module.css";

export function AuthLayout({ children }: { children: React.ReactNode }) {
	const { t } = useT();
	const date = new Date();
	const year = date.getFullYear();

	return (
		<div className={styles.Container}>
			<div className={styles.Wrapper}>
				<div className={styles.MainContent}>
					<div className={styles.ContentWrapper}>{children}</div>
				</div>

				<div className={styles.Footer}>
					<p>
						© {year} {apiConfig.name} {t("auth_copyright")}
					</p>
				</div>
			</div>
		</div>
	);
}
