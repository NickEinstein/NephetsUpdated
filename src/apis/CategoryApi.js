import { SoftwrkApi } from "configs/StoreQueryConfig";

const BASE_URL = '/category'

export const CategoryApi = SoftwrkApi.injectEndpoints({
  endpoints: (builder) => ({
    // receiveStock: builder.mutation({
    //   query: (config) => ({
    //     url: `${BASE_URL}/Receive-Stock`,
    //     method: "POST",
    //     ...config,
    //   }),
    // }),
    // receiveStock: builder.mutation({
    //   query: (config) => ({
    //     url: `${BASE_URL}/receive-stock`,
    //     method: "POST",
    //     ...config,
    //   }),
    // }),
    // receiveStomaterialReturnck: builder.mutation({
    //   query: (config) => ({
    //     url: `${BASE_URL}/Material-Return`,
    //     method: "POST",
    //     ...config,
    //   }),
    // }),

    getCategory: builder.query({
      query: (arg) => {
        const { userType } = arg;
        return {
          url: `${BASE_URL}`,
          method: "GET",
          // params: { userType },
        };
      },
    }),

    

    getStats: builder.query({
      query: (arg) => {
        // const { userType } = arg;
        return {
          url: `${BASE_URL}/super-admin/userStatsChart`,
          method: "GET",
          // params: { userType },
        };
      },
    }),
  }),
});

// ;

export default CategoryApi;
