import { SoftwrkApi } from "configs/StoreQueryConfig";

const BASE_URL = "/";

export const UserApi = SoftwrkApi.injectEndpoints({
  endpoints: (builder) => ({
    getTransactions: builder.query({
      query: (arg) => {
        const { userType } = arg;
        return {
          url: `${BASE_URL}transactions`,
          method: "GET",
          // params: { userType },
        };
      },
    }),

    getUser: builder.query({
      query: (arg) => {
        const { userType } = arg;
        return {
          url: `${BASE_URL}user`,
          method: "GET",
          // params: { userType },
        };
      },
    }),
    getWallet: builder.query({
      query: (arg) => {
        const { userType } = arg;
        return {
          url: `${BASE_URL}wallet`,
          method: "GET",
          // params: { userType },
        };
      },
    }),
  }),
});

// ;

export default UserApi;
