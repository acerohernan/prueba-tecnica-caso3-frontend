import React from "react";
import { Outlet } from "react-router-dom";

import { Header } from "@/components/header";

interface Props extends React.PropsWithChildren {}

export const DashboardLayout: React.FC<Props> = () => {
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
};