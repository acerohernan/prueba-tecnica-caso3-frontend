import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

import { API } from "@/api";
import { IUpdateUserForm } from "@/api/users/types";

import { emailRegExp } from "@/lib/regexp";

import { useAppDispatch, useAppSelector } from "@/store";
import { navigationActions } from "@/store/navigation";

interface IProps {
	open: boolean;
}

export function EditUserDialog({ open }: IProps) {
	const dispatch = useAppDispatch();
	const selectedUser = useAppSelector((state) => state.navigation.selectedUser);
	const queryClient = useQueryClient();
	const { toast } = useToast();

	const [loading, setLoading] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
	} = useForm<IUpdateUserForm>();

	useEffect(() => {
		if (!selectedUser) return;

		setValue("email", selectedUser.email);
		setValue("role", selectedUser.roles[0]);
		setValue("username", selectedUser.userName);
	}, [selectedUser, setValue]);

	async function onSubmit(form: IUpdateUserForm) {
		setLoading(true);
		const res = await API.users.updateUser(selectedUser?.id ?? "", form);
		setLoading(false);

		if (res.success) {
			await queryClient.invalidateQueries({ queryKey: ["users"] });
			return;
		}

		toast({
			variant: "destructive",
			title: "Error al editar el usuario",
			description: "Revisa la información y vuelve a intentarlo.",
		});
	}

	return (
		<Dialog
			open={open}
			onOpenChange={(open) => {
				if (!open) dispatch(navigationActions.closeAllModals());
			}}
		>
			<DialogContent className="sm:max-w-[500px]">
				<DialogHeader>
					<DialogTitle>Editar usuario</DialogTitle>
					<DialogDescription>
						Recuerda que el usuario solo podrá editar su contraseña desde su
						cuenta.
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
							<Label htmlFor="name">Rol</Label>
							<Select>
								<SelectTrigger>
									<SelectValue placeholder="Selecciona el rol" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="m@example.com">Viewer</SelectItem>
									<SelectItem value="m@google.com">Editor</SelectItem>
									<SelectItem value="m@support.com">Admin</SelectItem>
								</SelectContent>
							</Select>
						</div>
					</div>
					<DialogFooter>
						<Button type="submit">Guardar cambios</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
