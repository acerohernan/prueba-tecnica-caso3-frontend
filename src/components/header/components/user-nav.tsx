import { Link, useNavigate } from "react-router-dom";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import UserAvatarImg from "@/assets/images/user-placeholder.png";
import { removeAccessToken } from "@/lib/token";

import { useSession } from "@/hooks/useSession";

export function UserNav() {
	const { data: session } = useSession();

	const navigate = useNavigate();

	function handleCloseSession() {
		removeAccessToken();
		navigate("/login");
	}

	if (!session) return null;

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" className="relative h-10 w-10 rounded-full">
					<Avatar className="h-10 w-10">
						<AvatarImage src={UserAvatarImg} alt="" />
						<AvatarFallback>SC</AvatarFallback>
					</Avatar>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-56" align="end" forceMount>
				<DropdownMenuLabel className="font-normal">
					<div className="flex flex-col space-y-1">
						<p className="text-sm font-medium leading-none">ID: {session.id}</p>
						<p className="text-xs leading-none text-muted-foreground">
							{session.email}
						</p>
					</div>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />

				<Link to="/login">
					<DropdownMenuItem onClick={handleCloseSession}>
						Cerrar sesión
					</DropdownMenuItem>
				</Link>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
