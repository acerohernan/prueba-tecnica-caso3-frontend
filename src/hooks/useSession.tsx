import { useQuery } from "@tanstack/react-query";

import { API } from "@/api";
import { IUser } from "@/api/users/types";

import { removeAccessToken } from "@/lib/token";

export const useSession = () =>
	useQuery<IUser>({
		queryKey: ["session"],
		queryFn: async () => {
			const result = await API.auth.getSession();
			if (!result.success) {
				if (result.statusCode === 401) {
					removeAccessToken();
				}

				throw new Error(
					"Couldn't get session. http status: " + String(result.statusCode)
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
