import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { API } from "@/api";

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

import { useAppDispatch, useAppSelector } from "@/store";
import { navigationActions } from "@/store/navigation";

interface IProps {
	open: boolean;
}

export function DeleteUserDialog({ open }: IProps) {
	const [loading, setLoading] = useState(false);
	const dispatch = useAppDispatch();
	const selectedUser = useAppSelector((state) => state.navigation.selectedUser);
	const queryClient = useQueryClient();
	const { toast } = useToast();

	function closeModal() {
		dispatch(navigationActions.closeAllModals());
	}

	async function handleDeleteUser() {
		if (!selectedUser) {
			closeModal();
			return;
		}

		setLoading(true);
		const res = await API.users.deleteUser(selectedUser.id);
		setLoading(false);

		if (res.success) {
			await queryClient.invalidateQueries({ queryKey: ["users"] });
			closeModal();
			return;
		}

		toast({
			variant: "destructive",
			title: "Error al eliminar usuario",
			description:
				"Oh! lo sentimos. Algo salió mal y no podremos eliminar al usuario",
		});
		closeModal();
	}

	return (
		<Dialog
			open={open}
			onOpenChange={(open) => {
				if (!open) closeModal();
			}}
		>
			<DialogContent className="sm:max-w-[500px]">
				<DialogHeader>
					<DialogTitle>Eliminar usuario</DialogTitle>
					<DialogDescription>
						¿Está seguro que desea eliminar este usuario?
					</DialogDescription>
				</DialogHeader>
				<DialogFooter className="grid md:flex gap-2">
					<Button
						type="button"
						variant="outline"
						onClick={closeModal}
						disabled={loading}
					>
						Cancelar
					</Button>
					<Button
						type="button"
						variant="destructive"
						onClick={handleDeleteUser}
						disabled={loading}
					>
						Eliminar
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
