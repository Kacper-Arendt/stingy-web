import { Link, useNavigate } from "@tanstack/react-router";
import { AlertCircle, Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useState } from "react";
import { z } from "zod";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { FormItem } from "@/components/ui/FormItem";
import { Input } from "@/components/ui/input";
import { useT } from "@/locales/useT";
import { register } from "./api/register.api";
import type { RegisterUserPayload } from "./types/register";

const createRegisterSchema = () =>
	z.object({
		email: z.string(),
		password: z.string(),
	});

type RegisterFormData = z.infer<ReturnType<typeof createRegisterSchema>>;

export const Register = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");
	const navigate = useNavigate();
	const { t } = useT();

	const onSubmit = async (data: RegisterFormData) => {
		setError("");
		setIsLoading(true);

		try {
			const payload: RegisterUserPayload = {
				email: data.email,
				password: data.password,
			};

			const res = await register(payload);
			if (!res.ok) {
				const responseData = await res.json();
				if (
					responseData?.message === `Username '${data.email}' is already taken.`
				) {
					setError("This email is already registered");
				} else {
					setError(t("register_error_general"));
				}
			} else {
				navigate({ to: "/auth" });
			}
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="space-y-6">
			{/* Title and subtitle */}
			<div className="text-center space-y-2">
				<h2 className="text-2xl font-bold">{t("register_new_title")}</h2>
				<p className="text-muted-foreground">{t("register_new_subtitle")}</p>
			</div>

			<form onSubmit={onSubmit} className="space-y-4">
				{error && (
					<Alert variant="destructive">
						<AlertCircle className="h-4 w-4" />
						<AlertDescription>{error}</AlertDescription>
					</Alert>
				)}

				{/* Email */}
				<FormItem
					id="email"
					label={{ text: t("register_email_label"), required: true }}
				>
					<div className="relative">
						<Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
						<Input
							id="email"
							type="email"
							placeholder={t("register_email_placeholder")}
							className="pl-10"
							disabled={isLoading}
						/>
					</div>
				</FormItem>

				{/* Password */}
				<FormItem
					id="password"
					label={{ text: t("register_password_label"), required: true }}
				>
					<div className="relative">
						<Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
						<Input
							id="password"
							type={showPassword ? "text" : "password"}
							placeholder={t("register_password_placeholder")}
							className="pl-10 pr-10"
							disabled={isLoading}
						/>
						<Button
							type="button"
							variant="ghost"
							size="sm"
							className="absolute right-1 top-1 h-8 w-8 p-0"
							onClick={() => setShowPassword(!showPassword)}
							disabled={isLoading}
						>
							{showPassword ? (
								<EyeOff className="h-4 w-4" />
							) : (
								<Eye className="h-4 w-4" />
							)}
						</Button>
					</div>
				</FormItem>

				{/* Submit Button */}
				<Button type="submit" className="w-full" size="lg" disabled={isLoading}>
					{isLoading
						? t("register_button_creating")
						: t("register_button_create")}
				</Button>
			</form>

			{/* Login Link */}
			<div className="text-center">
				<p className="text-sm text-muted-foreground">
					{t("register_already_account")}{" "}
					<Link to="/auth" className="text-primary hover:underline font-medium">
						{t("register_sign_in")}
					</Link>
				</p>
			</div>
		</div>
	);
};
