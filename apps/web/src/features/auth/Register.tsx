"use client";

import { FormItem } from "@/components/ui/FormItem";
import RequiredIndicator from "@/components/ui/RequiredIndicator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import * as m from "@/paraglide/messages";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "@tanstack/react-router";
import { AlertCircle, Check, Eye, EyeOff, Lock, Mail, X } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { register } from "./api/register.api";
import { LegalDocumentModal } from "./components/LegalDocumentModal";
import type { RegisterUserPayload } from "./types/register";

const createRegisterSchema = () =>
	z.object({
		email: z.string().min(1).email(),
		password: z
			.string()
			.min(8)
			.regex(/[A-Z]/, m.register_validation_password_uppercase())
			.regex(/[a-z]/, m.register_validation_password_lowercase())
			.regex(/[0-9]/, m.register_validation_password_number())
			.regex(/[^A-Za-z0-9]/, m.register_validation_password_special()),
		requiredConsent: z
			.boolean()
			.refine((val) => val === true, m.register_validation_required_consent()),
		// marketingConsent: z.boolean().optional(), // TODO: Add later
	});

type RegisterFormData = z.infer<ReturnType<typeof createRegisterSchema>>;

export const Register = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");
	const [legalModal, setLegalModal] = useState<{
		isOpen: boolean;
		type: "terms" | "privacy" | "cookies" | null;
	}>({ isOpen: false, type: null });
	const navigate = useNavigate();

	const {
		register: registerField,
		handleSubmit,
		watch,
		setValue,
		formState: { errors },
	} = useForm<RegisterFormData>({
		resolver: zodResolver(createRegisterSchema()),
		defaultValues: {
			email: "",
			password: "",
			requiredConsent: false,
			// marketingConsent: false, // TODO: Add later
		},
	});

	const password = watch("password");
	const requiredConsent = watch("requiredConsent");
	// const marketingConsent = watch("marketingConsent"); // TODO: Add later

	const passwordRequirements = [
		{
			label: m.register_password_req_8_chars(),
			test: (pwd: string) => pwd.length >= 8,
		},
		{
			label: m.register_password_req_uppercase(),
			test: (pwd: string) => /[A-Z]/.test(pwd),
		},
		{
			label: m.register_password_req_lowercase(),
			test: (pwd: string) => /[a-z]/.test(pwd),
		},
		{
			label: m.register_password_req_number(),
			test: (pwd: string) => /[0-9]/.test(pwd),
		},
		{
			label: m.register_password_req_special(),
			test: (pwd: string) => /[^A-Za-z0-9]/.test(pwd),
		},
	];

	const calculatePasswordStrength = () => {
		const passedRequirements = passwordRequirements.filter((req) =>
			req.test(password || ""),
		).length;
		return (passedRequirements / passwordRequirements.length) * 100;
	};

	const getPasswordStrengthColor = () => {
		const strength = calculatePasswordStrength();
		if (strength < 40) return "bg-red-500";
		if (strength < 80) return "bg-yellow-500";
		return "bg-green-500";
	};

	const getPasswordStrengthText = () => {
		const strength = calculatePasswordStrength();
		if (strength < 40) return m.register_password_strength_weak();
		if (strength < 80) return m.register_password_strength_medium();
		return m.register_password_strength_strong();
	};

	const openLegalModal = (type: "terms" | "privacy" | "cookies") => {
		setLegalModal({ isOpen: true, type });
	};

	const closeLegalModal = () => {
		setLegalModal({ isOpen: false, type: null });
	};

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
					setError(m.register_error_general());
				}
			} else {
				toast.success(m.register_success_message());
				navigate({ to: "/auth" });
			}
		} catch (err) {
			setError(m.register_error_general());
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="space-y-6">
			{/* Title and subtitle */}
			<div className="text-center space-y-2">
				<h2 className="text-2xl font-bold">{m.register_new_title()}</h2>
				<p className="text-muted-foreground">{m.register_new_subtitle()}</p>
			</div>

			<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
				{error && (
					<Alert variant="destructive">
						<AlertCircle className="h-4 w-4" />
						<AlertDescription>{error}</AlertDescription>
					</Alert>
				)}

				{/* Email */}
				<FormItem
					id="email"
					label={{ text: m.register_email_label(), required: true }}
					errors={errors.email?.message ? [errors.email.message] : null}
				>
					<div className="relative">
						<Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
						<Input
							{...registerField("email")}
							id="email"
							type="email"
							placeholder={m.register_email_placeholder()}
							className="pl-10"
							disabled={isLoading}
						/>
					</div>
				</FormItem>

				{/* Password */}
				<FormItem
					id="password"
					label={{ text: m.register_password_label(), required: true }}
					errors={errors.password?.message ? [errors.password.message] : null}
				>
					<div className="relative">
						<Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
						<Input
							{...registerField("password")}
							id="password"
							type={showPassword ? "text" : "password"}
							placeholder={m.register_password_placeholder()}
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

				{/* Password Requirements */}
				{password && (
					<div className="space-y-2">
						<div className="flex items-center justify-between text-xs">
							<span>{m.register_password_strength()}</span>
							<span
								className={`font-medium ${
									calculatePasswordStrength() < 40
										? "text-red-600"
										: calculatePasswordStrength() < 80
											? "text-yellow-600"
											: "text-green-600"
								}`}
							>
								{getPasswordStrengthText()}
							</span>
						</div>
						<div className="w-full bg-muted rounded-full h-1">
							<div
								className={`h-1 rounded-full transition-all ${getPasswordStrengthColor()}`}
								style={{ width: `${calculatePasswordStrength()}%` }}
							/>
						</div>
						<div className="space-y-1">
							{passwordRequirements.map((req, index) => (
								<div
									key={index}
									className="flex items-center space-x-2 text-xs"
								>
									{req.test(password) ? (
										<Check className="h-3 w-3 text-green-600" />
									) : (
										<X className="h-3 w-3 text-muted-foreground" />
									)}
									<span
										className={
											req.test(password)
												? "text-green-600"
												: "text-muted-foreground"
										}
									>
										{req.label}
									</span>
								</div>
							))}
						</div>
					</div>
				)}

				{/* Legal Consents - Simplified */}
				<div className="space-y-4 border-t pt-4">
					{/* Required Consent - All-in-one */}
					<FormItem
						id="requiredConsent"
						errors={
							errors.requiredConsent?.message
								? [errors.requiredConsent.message]
								: null
						}
					>
						<div className="flex items-start space-x-3">
							<Checkbox
								id="requiredConsent"
								checked={requiredConsent}
								onCheckedChange={(checked) =>
									setValue("requiredConsent", checked as boolean)
								}
								disabled={isLoading}
								className="mt-1"
							/>
							<div className="space-y-2">
								<label
									htmlFor="requiredConsent"
									className="text-sm font-medium leading-5"
								>
									{m.register_required_consent()}
									<RequiredIndicator />
								</label>
								<p className="text-xs text-muted-foreground">
									{m.register_required_consent_desc()}
								</p>
								<div className="flex flex-wrap gap-2 text-xs">
									<Button
										type="button"
										variant="link"
										className="px-0 h-auto text-xs text-primary"
										onClick={() => openLegalModal("terms")}
									>
										{m.register_terms_service()}
									</Button>
									<span className="text-muted-foreground">•</span>
									<Button
										type="button"
										variant="link"
										className="px-0 h-auto text-xs text-primary"
										onClick={() => openLegalModal("privacy")}
									>
										{m.register_privacy_policy()}
									</Button>
									<span className="text-muted-foreground">•</span>
									<Button
										type="button"
										variant="link"
										className="px-0 h-auto text-xs text-primary"
										onClick={() => openLegalModal("cookies")}
									>
										{m.register_cookie_policy()}
									</Button>
								</div>
							</div>
						</div>
					</FormItem>

					{/* Optional Marketing Consent - TODO: Add later */}
					{/* <FormItem id="marketingConsent">
						<div className="flex items-start space-x-3">
							<Checkbox
								id="marketingConsent"
								checked={marketingConsent}
								onCheckedChange={(checked) =>
									setValue("marketingConsent", checked as boolean)
								}
								disabled={isLoading}
								className="mt-1"
							/>
							<div className="space-y-1">
								<label htmlFor="marketingConsent" className="text-sm leading-5">
									{m.register_marketing_consent()}
								</label>
								<p className="text-xs text-muted-foreground">
									{m.register_marketing_consent_desc()}
								</p>
							</div>
						</div>
					</FormItem> */}

					{/* Privacy Summary */}
					<div className="bg-muted/30 p-3 rounded-md border">
						<p className="text-xs text-muted-foreground">
							<strong className="text-foreground">
								{m.register_privacy_summary()}:
							</strong>{" "}
							{m.register_privacy_summary_desc()}
						</p>
					</div>
				</div>

				{/* Submit Button */}
				<Button type="submit" className="w-full" size="lg" disabled={isLoading}>
					{isLoading
						? m.register_button_creating()
						: m.register_button_create()}
				</Button>
			</form>

			{/* Login Link */}
			<div className="text-center">
				<p className="text-sm text-muted-foreground">
					{m.register_already_account()}{" "}
					<Link to="/auth" className="text-primary hover:underline font-medium">
						{m.register_sign_in()}
					</Link>
				</p>
			</div>

			{/* Legal Document Modal */}
			{legalModal.type && (
				<LegalDocumentModal
					isOpen={legalModal.isOpen}
					onClose={closeLegalModal}
					documentType={legalModal.type}
				/>
			)}
		</div>
	);
};
