import { BaseQueryFn, FetchArgs, FetchBaseQueryError, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const BE_BASE_URL =  'http://localhost:8080/api/v1'
const baseQuery = fetchBaseQuery({
    baseUrl: BE_BASE_URL,
});

const baseQueryWrapper: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
    args,
    api,
    extraOptions
) => {
    const baseApiResult = await baseQuery(args, api, extraOptions);
    if (baseApiResult.error) {
        console.error(baseApiResult.error)
    }
    return baseApiResult;
};

export { baseQueryWrapper };

export const baseApi = createApi({
    baseQuery: baseQueryWrapper,
    endpoints: () => ({}),
    tagTypes: ['Envs', 'Deployments', 'Projects'],
});
