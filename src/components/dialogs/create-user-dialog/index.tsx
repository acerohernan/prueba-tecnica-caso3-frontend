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
import { PlusIcon } from "@radix-ui/react-icons";

export function CreateUserDialog() {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button size="sm" className="ml-auto h-8">
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
				<div className="grid gap-4 py-4">
					<div className="items-center gap-4">
						<Label htmlFor="username">Nombre</Label>
						<Input id="username" placeholder="@peduarte" />
					</div>
					<div className="items-center gap-4">
						<Label htmlFor="name">Correo electrónico</Label>
						<Input id="name" placeholder="Pedro Duarte" />
					</div>
					<div className="items-center gap-4">
						<Label htmlFor="name">Contraseña</Label>
						<Input id="password" placeholder="••••••••••" />
					</div>
					<div className="items-center gap-4">
						<Label htmlFor="name">Confirmar contraseña</Label>
						<Input id="confirmPassword" placeholder="••••••••••" />
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
					<Button type="submit">Guardar</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
