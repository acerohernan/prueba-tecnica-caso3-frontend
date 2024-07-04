import type { ICreateUserForm, IUpdateUserForm } from "./types";
import { parseAxiosError } from "../utils";
import { authHeaders, axiosInstance } from "../config";

export const createUser = async (form: ICreateUserForm) => {
	try {
		await axiosInstance.post("/Users", form, { headers: authHeaders() });
		return { success: true };
	} catch (error) {
		return parseAxiosError(error);
	}
};

export const updateUser = async (userId: string, form: IUpdateUserForm) => {
	try {
		await axiosInstance.patch(`/Users/${userId}`, form, {
			headers: authHeaders(),
		});
		return { success: true };
	} catch (error) {
		return parseAxiosError(error);
	}
};

export const deleteUser = async (userId: string) => {
	try {
		await axiosInstance.delete(`/Users/${userId}`, { headers: authHeaders() });
		return { success: true };
	} catch (error) {
		return parseAxiosError(error);
	}
};
