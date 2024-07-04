import { useQuery } from "@tanstack/react-query";

import { API } from "@/api";
import { IUser } from "@/api/users/types";

import { removeAccessToken } from "@/lib/token";

export const useUsers = () =>
	useQuery<IUser[]>({
		queryKey: ["users"],
		queryFn: async () => {
			const result = await API.users.getUsers();
			if (!result.success) {
				if (result.statusCode === 401) {
					removeAccessToken();
				}

				throw new Error(
					"Couldn't get users. http status: " + String(result.statusCode)
				);
			}
			return result.data;
		},
		refetchOnMount: true,
		refetchInterval: false,
		refetchOnWindowFocus: false,
		refetchOnReconnect: false,
		refetchIntervalInBackground: false,
		retry: 1,
	});
