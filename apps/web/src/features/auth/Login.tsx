"use client";

import { FormItem } from "@/components/ui/FormItem";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import * as m from "@/paraglide/messages";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "@tanstack/react-router";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { login } from "./api/login.api";
import type { LoginUserPayload } from "./types/login";
import { type LoginFormData, createLoginSchema } from "./types/login.schema";

export const Login = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();

	const {
		register: registerField,
		handleSubmit,
		watch,
		setValue,
		formState: { errors },
	} = useForm<LoginFormData>({
		resolver: zodResolver(createLoginSchema()),
		defaultValues: {
			email: "",
			password: "",
			rememberMe: false,
		},
	});

	const rememberMe = watch("rememberMe");

	const onSubmit = async (data: LoginFormData) => {
		setIsLoading(true);
		try {
			const payload: LoginUserPayload = {
				email: data.email,
				password: data.password,
			};

			const res = await login(payload);
			if (!res.ok) {
				toast.error(m.login_error_invalid_credentials());
			} else {
				navigate({ to: "/" });
			}
		} catch (err) {
			toast.error(m.login_error_general());
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="space-y-6">
			{/* Title and subtitle */}
			<div className="text-center space-y-2">
				<h2 className="text-3xl font-bold">{m.login_new_title()}</h2>
				<p className="text-muted-foreground text-lg">
					{m.login_new_subtitle()}
				</p>
			</div>

			<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
				{/* Email */}
				<FormItem
					id="email"
					label={{ text: m.login_email_label(), required: true }}
					errors={errors.email?.message ? [errors.email.message] : null}
				>
					<div className="relative">
						<Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
						<Input
							{...registerField("email")}
							id="email"
							type="email"
							placeholder={m.login_email_placeholder()}
							className="pl-10"
							disabled={isLoading}
						/>
					</div>
				</FormItem>

				{/* Password */}
				<FormItem
					id="password"
					label={{ text: m.login_password_label(), required: true }}
					errors={errors.password?.message ? [errors.password.message] : null}
				>
					<div className="relative">
						<Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
						<Input
							{...registerField("password")}
							id="password"
							type={showPassword ? "text" : "password"}
							placeholder={m.login_password_placeholder()}
							className="pl-10 pr-10"
							disabled={isLoading}
						/>
						<Button
							type="button"
							variant="ghost"
							size="sm"
							className="absolute right-1 top-0.5 h-8 w-8 p-0"
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

				{/* Remember me and Forgot password */}
				<div className="flex items-center justify-between">
					<FormItem id="rememberMe">
						<div className="flex items-center space-x-2">
							<Checkbox
								id="rememberMe"
								checked={rememberMe}
								onCheckedChange={(checked) =>
									setValue("rememberMe", checked as boolean)
								}
								disabled={isLoading}
							/>
							<label htmlFor="rememberMe" className="text-sm">
								{m.login_remember_me()}
							</label>
						</div>
					</FormItem>
					{/* <Button variant="link" className="px-0 text-sm">
						{m.login_forgot_password()}
					</Button> */}
				</div>

				{/* Submit Button */}
				<Button type="submit" className="w-full" size="lg" disabled={isLoading}>
					{isLoading ? m.login_button_loading() : m.login_button()}
				</Button>
			</form>

			{/* Register */}
			<div className="text-center space-y-2">
				<Separator className="w-full" />
				<p className="text-sm text-muted-foreground">
					{m.login_no_account()}{" "}
					<Link
						to="/auth/register"
						className="text-primary hover:underline font-medium"
					>
						{m.login_sign_up()}
					</Link>
				</p>
			</div>
		</div>
	);
};
