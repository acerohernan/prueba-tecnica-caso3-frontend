import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { getAccessToken } from "@/lib/token";

import { UserAuthForm } from "./user-auth-form";

export default function LoginPage() {
	const navigate = useNavigate();

	useEffect(() => {
		// si hay token, se redirecciona al panel de usuarios
		const token = getAccessToken();
		if (token) navigate("/");
	}, [navigate]);

	return (
		<>
			<div className="container relative h-dvh flex-col items-center justify-center grid lg:px-0">
				<div className="lg:p-8">
					<div className="mx-auto flex w-full flex-col justify-center space-y-12 sm:w-[400px]">
						<div className="flex flex-col space-y-2 text-center">
							<h1 className="text-3xl mb-2 font-semibold tracking-tight">
								Accede a tu cuenta
							</h1>
							<p className="text-sm text-muted-foreground">
								Ingresa tu correo electrónico y tu contraseña para poder acceder
								a sistema
							</p>
						</div>
						<UserAuthForm />
						<p className="px-6 text-center text-sm text-muted-foreground">
							Al ingresar al sistema, usted está de acuerdo con nuestros{" "}
							<a
								className="underline underline-offset-4 hover:text-primary"
								href="#"
							>
								Terminos y Condiciones
							</a>{" "}
							y nuestra{" "}
							<a
								className="underline underline-offset-4 hover:text-primary"
								href="#"
							>
								Política de Privacidad
							</a>
							.
						</p>
					</div>
				</div>
			</div>
		</>
	);
}
