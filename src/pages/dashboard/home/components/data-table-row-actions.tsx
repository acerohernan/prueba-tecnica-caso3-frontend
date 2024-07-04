import { Row } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { PencilIcon, TrashIcon } from "lucide-react";
import { useAppDispatch } from "@/store";
import { navigationActions } from "@/store/navigation";

interface DataTableRowActionsProps<TData> {
	row: Row<TData>;
}

export function DataTableRowActions<TData>({
	row,
}: DataTableRowActionsProps<TData>) {
	const dispath = useAppDispatch();

	function handleUpdate() {
		dispath(navigationActions.openUpdateModal(row.original));
	}

	function handleDelete() {
		dispath(navigationActions.openDeleteModal(row.original));
	}

	return (
		<div className="flex items-center gap-3">
			<Button size="icon" variant="outline" onClick={handleUpdate}>
				<PencilIcon />
			</Button>
			<Button size="icon" variant="destructive" onClick={handleDelete}>
				<TrashIcon />
			</Button>
		</div>
	);
}
