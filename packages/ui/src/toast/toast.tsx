import { Toast } from "@base-ui/react/toast";
import { XIcon } from "lucide-react";
import styles from "./toast.module.css";

function ToastList() {
	const { toasts } = Toast.useToastManager();

	return (
		<div>
			{toasts?.map((toast) => (
				<Toast.Root key={toast.id} toast={toast} className={styles.Toast}>
					<Toast.Content className={styles.Content}>
						<Toast.Title className={styles.Title} />
						<Toast.Description className={styles.Description} />
						<Toast.Close className={styles.Close} aria-label="Close">
							<XIcon className={styles.Icon} />
						</Toast.Close>
					</Toast.Content>
				</Toast.Root>
			))}
		</div>
	);
}

function Toaster({ children }: { children: React.ReactNode }) {
	return (
		<Toast.Provider>
			{children}

			<Toast.Portal>
				<Toast.Viewport className={styles.Viewport}>
					<ToastList />
				</Toast.Viewport>
			</Toast.Portal>
		</Toast.Provider>
	);
}

function useToastManager() {
	return Toast.useToastManager();
}

export { Toaster, useToastManager };
