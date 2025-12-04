import { useState } from "react";

export function useInviteTeamForm(teamId: string) {
	const [emails, setEmails] = useState<string[]>([""]);
	const [open, setOpen] = useState(false);

	const handleEmailChange = (index: number, value: string) => {
		const newEmails = [...emails];
		newEmails[index] = value;
		setEmails(newEmails);
	};

	const addEmailField = () => {
		setEmails([...emails, ""]);
	};

	const removeEmailField = (index: number) => {
		const newEmails = emails.filter((_, i) => i !== index);
		setEmails(newEmails);
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		console.log(emails)
		console.log(teamId)
	};

	const handleOpen = (open: boolean) => {
		setOpen(open);
		if (!open) setEmails([""]);
	};

	return {
		open,
		setOpen,
		emails,
		errors: [],
		loading: false, // Replace with actual loading state if needed
		handleEmailChange,
		addEmailField,
		removeEmailField,
		handleSubmit,
		handleOpen,
	};
}
