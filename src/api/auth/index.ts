import { authHeaders, axiosInstance } from "../config";
import { APIResponse } from "../types";
import { IUser } from "../users/types";
import { parseAxiosError } from "../utils";
import type { ILoginForm } from "./types";

export const login = async (
	form: ILoginForm
): Promise<APIResponse<{ token: string }>> => {
	try {
		const res = await axiosInstance.post("/Auth/Login", form);
		return { success: true, data: res.data };
	} catch (error) {
		return parseAxiosError(error);
	}
};

export const getSession = async (): Promise<APIResponse<IUser>> => {
	try {
		const res = await axiosInstance.get("/Auth/Session", {
			headers: authHeaders(),
		});
		return { success: true, data: res.data };
	} catch (error) {
		return parseAxiosError(error);
	}
};
