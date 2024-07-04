import { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { IUser } from "@/api/users/types";

export const columns: ColumnDef<IUser>[] = [
	{
		accessorKey: "userName",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Usuario" />
		),
		cell: ({ row }) => <div>{row.getValue("userName")}</div>,
		enableHiding: false,
	},
	{
		accessorKey: "email",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Correo" />
		),
		cell: ({ row }) => <div>{row.getValue("email")}</div>,

		enableHiding: false,
	},
	{
		accessorKey: "roles",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Rol" />
		),
		cell: ({ row }) => (
			<div>{(row.getValue("roles") satisfies string[])[0]}</div>
		),

		enableHiding: false,
	},
	{
		id: "actions",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Acciones" />
		),
		cell: ({ row }) => <DataTableRowActions row={row} />,
	},
];
