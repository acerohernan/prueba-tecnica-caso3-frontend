import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";

import { useAppDispatch } from "@/store";
import { navigationActions } from "@/store/navigation";

interface IProps {
	open: boolean;
}

export function DeleteUserDialog({ open }: IProps) {
	const dispatch = useAppDispatch();

	return (
		<Dialog
			open={open}
			onOpenChange={(open) => {
				if (!open) dispatch(navigationActions.closeAllModals());
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
						onClick={() => dispatch(navigationActions.closeAllModals())}
					>
						Cancelar
					</Button>
					<Button type="button" variant="destructive">
						Eliminar
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
