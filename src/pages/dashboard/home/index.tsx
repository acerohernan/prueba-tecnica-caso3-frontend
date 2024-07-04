import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";

import { Task } from "./data/schema";

export default function DashboardHomePage() {
	const tasks: Task[] = [];

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
				<DataTable data={tasks} columns={columns} />
			</div>
		</>
	);
}
