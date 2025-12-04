import * as m from "@/paraglide/messages";

export const PasswordRequirements = ({ value }: { value: string }) => {
	const hasLowercase = /[a-z]/.test(value);
	const hasUppercase = /[A-Z]/.test(value);
	const hasDigit = /\d/.test(value);
	const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(value);

	return (
		<ul className="text-sm text-gray-500 mt-1">
			<li className={hasLowercase ? "text-lime-700" : "text-red-500"}>
				<strong>abc</strong> {m.register_password_requirements_lowercase()}
			</li>
			<li className={hasUppercase ? "text-lime-700" : "text-red-500"}>
				<strong>ABC</strong> {m.register_password_requirements_uppercase()}
			</li>
			<li className={hasDigit ? "text-lime-700" : "text-red-500"}>
				<strong>123</strong> {m.register_password_requirements_digit()}
			</li>
			<li className={hasSpecial ? "text-lime-700" : "text-red-500"}>
				<strong>!@#</strong> {m.register_password_requirements_special()}
			</li>
		</ul>
	);
};
