import { useState } from "react";
import { useForm } from "react-hook-form";

import { Icons } from "@/components/icons";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PasswordInput } from "@/components/ui/password-input";

import { cn } from "@/lib/utils";
import { ILoginForm } from "@/api/auth/types";
import { API } from "@/api";
import { useNavigate } from "react-router-dom";
import { saveAccessToken } from "@/lib/token";
import { useToast } from "@/components/ui/use-toast";
import { emailRegExp } from "@/lib/regexp";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ILoginForm>();

	const navigate = useNavigate();

	const { toast } = useToast();

	const [isLoading, setIsLoading] = useState<boolean>(false);

	async function onSubmit(form: ILoginForm) {
		setIsLoading(true);
		const res = await API.auth.login(form);
		setIsLoading(false);

		if (res.success) {
			saveAccessToken(res.data.token);
			navigate("/");
			return;
		}

		toast({
			variant: "destructive",
			title: "Credenciales inválidas",
			description: "Revisa tus credenciales y vuelve a intentarlo.",
		});
	}

	return (
		<div className={cn("grid gap-6", className)} {...props}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="grid gap-4">
					<div className="grid gap-1">
						<Label htmlFor="email">Correo electrónico</Label>
						<Input
							placeholder="correo@empresa.com"
							type="email"
							autoCapitalize="none"
							autoComplete="email"
							autoCorrect="off"
							disabled={isLoading}
							{...register("email", {
								required: "Campo requerido",
								pattern: {
									value: emailRegExp,
									message: "Ingresa un correo válido",
								},
							})}
						/>
						{errors.email ? (
							<span className="text-xs text-red-500 leading-none">
								{errors.email.message}
							</span>
						) : null}
					</div>
					<div className="grid gap-1">
						<Label htmlFor="email">Contraseña</Label>
						<PasswordInput
							placeholder="••••••••••"
							autoComplete="current-password"
							autoCapitalize="none"
							autoCorrect="off"
							disabled={isLoading}
							{...register("password", {
								required: "Campo requerido",
							})}
						/>
						{errors.password ? (
							<span className="text-xs text-red-500 leading-none">
								{errors.password.message}
							</span>
						) : null}
					</div>
				</div>
				<Button disabled={isLoading} className="w-full mt-8">
					{isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
					Accede
				</Button>
			</form>
		</div>
	);
}
