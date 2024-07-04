import { useAppSelector } from "@/store";
import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";
import { DataTableSkeleton } from "./components/data-table-skeleton";

import { useUsers } from "@/hooks/useUsers";
import { EditUserDialog } from "@/components/dialogs/edit-user-dialog";
import { DeleteUserDialog } from "@/components/dialogs/delete-user-dialog";

export default function DashboardHomePage() {
	const showUpdateModal = useAppSelector(
		(state) => state.navigation.showUpdateModal
	);
	const showDeleteModal = useAppSelector(
		(state) => state.navigation.showDeleteModal
	);
	const { data: users, isLoading } = useUsers();

	return (
		<>
			<div className="flex flex-1 flex-col space-y-8 p-8 ">
				<div className="flex items-center justify-between space-y-2">
					<div>
						<h2 className="text-2xl font-bold tracking-tight">
							Panel de usuarios
						</h2>
						<p className="text-muted-foreground">
							A continuación se mostrarán todos los usuarios del sistema actual.
							Requieres permisos de &apos;Editor&apos; o de
							&apos;Administrador&apos; para crear, modificar o eliminar
							usuarios.
						</p>
					</div>
				</div>
				{isLoading ? (
					<DataTableSkeleton />
				) : (
					<DataTable data={users ?? []} columns={columns} />
				)}
			</div>
			{/* Only show dialogs when are invoked */}
			<EditUserDialog open={showUpdateModal} />
			<DeleteUserDialog open={showDeleteModal} />
		</>
	);
}
