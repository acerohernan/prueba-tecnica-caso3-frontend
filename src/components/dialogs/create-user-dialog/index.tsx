import { API } from "@/api";
import { ICreateUserForm, IRole } from "@/api/users/types";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import {
	atLeastOneNumberUppercaseSpecialRegExp,
	emailRegExp,
} from "@/lib/regexp";
import { PlusIcon } from "@radix-ui/react-icons";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";

export function CreateUserDialog() {
	const {
		register,
		handleSubmit,
		watch,
		setValue,
		formState: { errors },
	} = useForm<ICreateUserForm>();

	const { toast } = useToast();
	const queryClient = useQueryClient();

	const [open, setOpen] = useState(false);
	const [loading, setLoading] = useState(false);

	const passwordValue = watch("password");
	const roleValue = watch("role");

	async function onSubmit(form: ICreateUserForm) {
		setLoading(true);
		const res = await API.users.createUser(form);
		setLoading(false);

		if (res.success) {
			setOpen(false);
			await queryClient.invalidateQueries({ queryKey: ["users"] });
			return;
		}

		toast({
			variant: "destructive",
			title: "Error al crear el nuevo usuario",
			description: "Revisa la información y vuelve a intentarlo.",
		});
	}

	return (
		<Dialog open={open}>
			<DialogTrigger asChild>
				<Button
					size="sm"
					className="ml-auto h-8"
					onClick={() => {
						setOpen(true);
					}}
				>
					<PlusIcon className="mr-2 h-4 w-4" />
					<span>Crear usuario</span>
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[500px]">
				<DialogHeader>
					<DialogTitle>Crear nuevo usuario</DialogTitle>
					<DialogDescription>
						Asegurate de elegir correctamente el rol para el nuevo usuario.
					</DialogDescription>
				</DialogHeader>
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className="grid gap-4 py-4">
						<div className="items-center gap-4">
							<Label htmlFor="username">Nombre de usuario</Label>
							<Input
								disabled={loading}
								placeholder="@peduarte"
								{...register("username", {
									required: "Este campo es requerido",
									minLength: {
										value: 6,
										message: "Mínimo 6 caracteres",
									},
									maxLength: {
										value: 20,
										message: "Máximo 20 caracteres",
									},
								})}
							/>
							{errors.username ? (
								<span className="text-xs text-red-500 leading-none">
									{errors.username.message}
								</span>
							) : null}
						</div>
						<div className="items-center gap-4">
							<Label htmlFor="name">Correo electrónico</Label>
							<Input
								disabled={loading}
								placeholder="hernan@empresa.com"
								type="email"
								{...register("email", {
									required: "Este campo es requerido",
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
						<div className="items-center gap-4">
							<Label htmlFor="name">Contraseña</Label>
							<Input
								disabled={loading}
								type="password"
								placeholder="••••••••••"
								{...register("password", {
									required: "Este campo es requerido",
									pattern: {
										value: atLeastOneNumberUppercaseSpecialRegExp,
										message:
											"La contraseña debe de contener al menos una mayúscula, un número y un carácter especial. Ejemplo: @Password123",
									},
								})}
							/>
							{errors.password ? (
								<span className="text-xs text-red-500 leading-none">
									{errors.password.message}
								</span>
							) : null}
						</div>
						<div className="items-center gap-4">
							<Label htmlFor="name">Confirmar contraseña</Label>
							<Input
								type="password"
								disabled={loading}
								placeholder="••••••••••"
								{...register("confirmPassword", {
									required: "Este campo es requerido",
									validate: (value) =>
										value === passwordValue || "Las contraseñas no coinciden",
								})}
							/>
							{errors.confirmPassword ? (
								<span className="text-xs text-red-500 leading-none">
									{errors.confirmPassword.message}
								</span>
							) : null}
						</div>
						<div className="items-center gap-4">
							<Label htmlFor="name">Rol</Label>
							<Select
								onValueChange={(value) => {
									setValue("role", value as IRole);
								}}
								disabled={loading}
							>
								<SelectTrigger>
									<SelectValue placeholder="Selecciona el rol" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="Viewer">Viewer</SelectItem>
									<SelectItem value="Editor">Editor</SelectItem>
									<SelectItem value="Admin">Admin</SelectItem>
								</SelectContent>
							</Select>
							{!roleValue ? (
								<span className="text-xs text-red-500 leading-none">
									Campo es requerido
								</span>
							) : null}
						</div>
					</div>
					<DialogFooter>
						<Button type="submit" disabled={loading}>
							Guardar
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
