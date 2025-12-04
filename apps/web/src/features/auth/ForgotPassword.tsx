"use client";

import { FormItem } from "@/components/ui/FormItem";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import * as m from "@/paraglide/messages";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, CheckCircle, Mail } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
	type ForgotPasswordFormData,
	createForgotPasswordSchema,
} from "./types/forgotPassword.schema";

interface ForgotPasswordProps {
	onSendResetEmail?: (email: string) => Promise<void>;
}

export const ForgotPassword = ({ onSendResetEmail }: ForgotPasswordProps) => {
	const [emailSent, setEmailSent] = useState(false);
	const [sentEmail, setSentEmail] = useState("");

	const {
		register: registerField,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<ForgotPasswordFormData>({
		resolver: zodResolver(createForgotPasswordSchema()),
		defaultValues: {
			email: "",
		},
	});

	const onSubmit = async (data: ForgotPasswordFormData) => {
		try {
			if (onSendResetEmail) {
				await onSendResetEmail(data.email);
			}

			setSentEmail(data.email);
			setEmailSent(true);
			toast.success(m.forgot_password_success());
		} catch (err) {
			toast.error(m.forgot_password_error_general());
		}
	};

	const handleResendEmail = async () => {
		try {
			if (onSendResetEmail) {
				await onSendResetEmail(sentEmail);
			}
			toast.success(m.forgot_password_resend_success());
		} catch (err) {
			toast.error(m.forgot_password_error_general());
		}
	};

	if (emailSent) {
		return (
			<div className="space-y-6">
				{/* Title and subtitle */}
				<div className="text-center space-y-2">
					<h2 className="text-2xl font-bold">
						{m.forgot_password_email_sent_title()}
					</h2>
					<p className="text-muted-foreground">
						{m.forgot_password_email_sent_subtitle()}
					</p>
				</div>

				{/* Success Card */}
				<Card className="border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/20">
					<CardContent className="pt-6">
						<div className="flex items-center space-x-3">
							<CheckCircle className="h-8 w-8 text-green-600" />
							<div>
								<h3 className="font-medium text-green-900 dark:text-green-100">
									{m.forgot_password_email_sent_success()}
								</h3>
								<p className="text-sm text-green-700 dark:text-green-200">
									{m.forgot_password_email_sent_to({ email: sentEmail })}
								</p>
							</div>
						</div>
					</CardContent>
				</Card>

				{/* Next Steps */}
				<div className="space-y-4 text-center">
					<div className="space-y-2">
						<h4 className="font-medium">{m.forgot_password_whats_next()}</h4>
						<div className="text-sm text-muted-foreground space-y-1">
							<p>{m.forgot_password_step_1()}</p>
							<p>{m.forgot_password_step_2()}</p>
							<p>{m.forgot_password_step_3()}</p>
						</div>
					</div>

					<div className="space-y-3 pt-4">
						<p className="text-sm text-muted-foreground">
							{m.forgot_password_no_email()}
						</p>
						<Button
							variant="outline"
							onClick={handleResendEmail}
							className="w-full"
						>
							{m.forgot_password_resend()}
						</Button>
					</div>
				</div>

				{/* Back to Login */}
				<div className="text-center pt-4">
					<Link to="/auth">
						<Button variant="ghost" className="flex items-center space-x-2">
							<ArrowLeft className="h-4 w-4" />
							<span>{m.forgot_password_back_to_login()}</span>
						</Button>
					</Link>
				</div>
			</div>
		);
	}

	return (
		<div className="space-y-6">
			{/* Title and subtitle */}
			<div className="text-center space-y-2">
				<h2 className="text-2xl font-bold">{m.forgot_password_title()}</h2>
				<p className="text-muted-foreground">{m.forgot_password_subtitle()}</p>
			</div>

			<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
				{/* Email */}
				<FormItem
					id="email"
					label={{ text: m.forgot_password_email_label(), required: true }}
					errors={errors.email?.message ? [errors.email.message] : null}
				>
					<div className="relative">
						<Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
						<Input
							{...registerField("email")}
							id="email"
							type="email"
							placeholder={m.forgot_password_email_placeholder()}
							className="pl-10"
							disabled={isSubmitting}
							autoFocus
						/>
					</div>
				</FormItem>

				{/* Submit Button */}
				<Button type="submit" className="w-full" disabled={isSubmitting}>
					{isSubmitting
						? m.forgot_password_sending()
						: m.forgot_password_send_button()}
				</Button>
			</form>

			{/* Security Note */}
			<div className="space-y-4">
				<div className="bg-muted/50 rounded-lg p-4">
					<h4 className="font-medium text-sm mb-2">
						{m.forgot_password_security_note()}
					</h4>
					<p className="text-xs text-muted-foreground">
						{m.forgot_password_security_text()}
					</p>
				</div>

				{/* Back to Login */}
				<div className="text-center">
					<Link to="/auth">
						<Button
							variant="ghost"
							className="flex items-center space-x-2"
							disabled={isSubmitting}
						>
							<ArrowLeft className="h-4 w-4" />
							<span>{m.forgot_password_back_to_login()}</span>
						</Button>
					</Link>
				</div>
			</div>
		</div>
	);
};
