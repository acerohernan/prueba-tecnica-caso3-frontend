export type IRole = "Admin" | "Editor" | "Viewer";

export interface ICreateUserForm {
	username: string;
	email: string;
	password: string;
	confirmPassword: string;
	role: IRole;
}

export interface IUpdateUserForm {
	username: string;
	email: string;
	role: IRole;
}
