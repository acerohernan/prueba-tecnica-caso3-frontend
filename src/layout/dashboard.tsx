import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import { Header } from "@/components/header";

import { getAccessToken } from "@/lib/token";

export default function DashboardLayout() {
	const navigate = useNavigate();

	useEffect(() => {
		// si no hay token, se redirecciona al login
		const token = getAccessToken();
		if (!token) navigate("/login");
	}, [navigate]);

	return (
		<div>
			<div className="flex h-dvh overflow-hidden">
				<div className="relative h-dvh flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
					<Header />
					<main>
						<div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
							<Outlet />
						</div>
					</main>
				</div>
			</div>
		</div>
	);
}
