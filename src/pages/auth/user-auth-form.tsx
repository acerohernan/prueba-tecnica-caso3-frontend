import { useState } from "react";

import { Icons } from "@/components/icons";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PasswordInput } from "@/components/ui/password-input";

import { cn } from "@/lib/utils";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [password, setPassword] = useState("");

	function onSubmit(event: React.SyntheticEvent) {
		event.preventDefault();
		setIsLoading(true);

		setTimeout(() => {
			setIsLoading(false);
		}, 3000);
	}

	return (
		<div className={cn("grid gap-6", className)} {...props}>
			<form onSubmit={onSubmit}>
				<div className="grid gap-4">
					<div className="grid gap-1">
						<Label htmlFor="email">Correo electrónico</Label>
						<Input
							id="email"
							placeholder="correo@empresa.com"
							type="email"
							autoCapitalize="none"
							autoComplete="email"
							autoCorrect="off"
							disabled={isLoading}
						/>
					</div>
					<div className="grid gap-1">
						<Label htmlFor="email">Contraseña</Label>
						<PasswordInput
							id="password"
							placeholder="••••••••••"
							value={password}
							onChange={(e) => {
								setPassword(e.target.value);
							}}
							autoComplete="current-password"
							autoCapitalize="none"
							autoCorrect="off"
							disabled={isLoading}
						/>
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
