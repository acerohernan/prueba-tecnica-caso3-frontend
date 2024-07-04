import axios from "axios";

import { getAccessToken } from "@/lib/token";

export const axiosInstance = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
	timeout: 3000, // 3 seconds timeout
});

export const authHeaders = () => ({
	Authorization: `Bearer ${getAccessToken()}`,
});
