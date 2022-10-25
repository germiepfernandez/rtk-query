import { BaseQueryFn, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { RootState } from "./store";

export const BASE_URL = import.meta.env.VITE_POKEMON_API_URL;

export const getBaseQuery = () => {
	const baseQuery = fetchBaseQuery({ baseUrl: BASE_URL });

	// const baseQueryWithSelectedURL = fetchBaseQuery({
	// 	baseUrl: BASE_URL,
	// 	prepareHeaders: (headers, { getState }) => {
	// 		const accessToken = '';

	// 		if (accessToken) {
	// 			headers.set("x-access-token", accessToken);
	// 		}

	// 		return headers;
	// 	},
	// });

	// const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
	// 	let result = await baseQueryWithSelectedURL(args, api, extraOptions);
	// 	if (result.error && result.error.status === 403) {
	// 		try to get a new token
	// 		const { user, refreshToken } = (api.getState() as RootState).auth;
	// 		if (!user && !refreshToken) {
	// 		    return result;
	// 		}
	// 		const refreshResult = (await baseQuery(
	// 		    { url: `auth/refreshToken/${user}`, body: { refreshToken }, method: 'POST' },
	// 		    api,
	// 		    extraOptions,
	// 		)) as QueryReturnValue<RefreshTokenResponse>;
	// 		if (refreshResult.data?.success) {
	// 		    const { accessToken, refreshToken: newRefreshToken } = refreshResult.data;
	// 		    // store the new token
	// 		    api.dispatch(setCredentials({ user, accessToken, refreshToken: newRefreshToken }));
	// 		    // retry the initial query
	// 		    result = await baseQueryWithSelectedURL(args, api, extraOptions);
	// 		} else {
	// 		    api.dispatch(clearCredentials());
	// 		}
	// 	}
	// 	return result;
	// };

	return baseQuery;
};
