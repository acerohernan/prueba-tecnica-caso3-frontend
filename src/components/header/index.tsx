import { Link } from "react-router-dom";
import { UserNav } from "./components/user-nav";

import LogoIcon from "@/assets/icons/logo.svg";

export const Header = () => {
	return (
		<div className="border-b">
			<div className="flex h-16 items-center px-10">
				<Link to="/" className="flex items-center gap-3">
					<img src={LogoIcon} width={35} height={35} />
					<h1 className="hidden md:block text-md font-medium leading-4">
						Mantenimiento <br /> Simple
					</h1>
				</Link>
				<div className="ml-auto flex items-center space-x-3">
					<div className="grid text-end">
						<h4 className="font-medium leading-none">Hernan Acero</h4>
						<span className="text-sm text-muted-foreground leading-none">
							Editor
						</span>
					</div>
					<UserNav />
				</div>
			</div>
		</div>
	);
};
