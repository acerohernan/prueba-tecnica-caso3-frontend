const tokenKey = "__token";

export const saveAccessToken = (accessToken: string) => {
	localStorage.setItem(tokenKey, accessToken);
};

export const getAccessToken = (): string => {
	return localStorage.getItem(tokenKey) || "";
};

export const removeAccessToken = () => {
	localStorage.removeItem(tokenKey);
};
