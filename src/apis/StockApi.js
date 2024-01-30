import { SoftwrkApi } from "configs/StoreQueryConfig";

const BASE_URL = "/stocks";

export const StockApi = SoftwrkApi.injectEndpoints({
  endpoints: (builder) => ({
    // signup: builder.mutation({
    //   query: (config) => ({
    //     url: `${BASE_URL}/signup`,
    //     method: "POST",
    //     ...config,
    //   }),
    // }),
    stockIntake: builder.mutation({
      query: (config) => ({
        url: `${BASE_URL}/intake`,
        method: "POST",
        ...config,
      }),
    }),
    stockTransferIntake: builder.mutation({
      query: (config) => ({
        url: `${BASE_URL}/Transfer-Intake`,
        method: "POST",
        ...config,
      }),
    }),
    stockOutbound: builder.mutation({
      query: (config) => ({
        url: `${BASE_URL}/Outbound`,
        method: "POST",
        ...config,
      }),
    }),

    getIntakes: builder.query({
      query: (arg) => {
        // const { userType } = arg;
        return {
          url: `${BASE_URL}/intakes`,
          method: "GET",
          // params: { userType },
        };
      },
    }),
  }),
});

// ;

export default StockApi;
