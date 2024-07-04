import { axiosInstance } from "../config";
import { APIResponse } from "../types";
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
