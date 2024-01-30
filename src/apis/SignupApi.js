import { SoftwrkApi } from "configs/StoreQueryConfig";

const BASE_URL = '/Auth'

console.log(BASE_URL)

export const SignupApi = SoftwrkApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (config) => ({ url: `${BASE_URL}/Sign-In`,method:'POST', ...config }),
    }),
    
      }),
});

export default SignupApi;
