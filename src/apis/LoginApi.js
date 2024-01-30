import { SoftwrkApi } from "configs/StoreQueryConfig";

const BASE_URL = '/Auth'

export const LoginAPi = SoftwrkApi.injectEndpoints({
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (config) => ({
        url: `${BASE_URL}/signup`,
        method: "POST",
        ...config,
      }),
    }),
    login: builder.mutation({
      query: (config) => ({
        url: `${BASE_URL}/Sign-In`,
        method: "POST",
        ...config,
      }),
    }),

    stockDelivery: builder.mutation({
      query: (config) => ({
        url: `${BASE_URL}/Sign-In`,
        method: "POST",
        ...config,
      }),
    }),

    getCompanyStatistics: builder.query({
      query: (arg) => {
        const { userType } = arg;
        return {
          url: `${BASE_URL}/super-admin/adminStatistics`,
          method: "GET",
          // params: { userType },
        };
      },
    }),

    getCategories: builder.query({
      query: (arg) => {
        const { userType } = arg;
        return {
          url: `${BASE_URL}/category`,
          method: "GET",
          // params: { userType },
        };
      },
    }),
    getAllBikes: builder.query({
      query: (arg) => {
        const { pageNo } = arg;
        console.log(pageNo);
        return {
          url: `${BASE_URL}/company/bikes`,
          method: "GET",
          params: { pageNo },
        };
      },
    }),

    getAll: builder.query({
      query: (arg) => {
        const { userType, pageNo } = arg;
        return {
          url: `${BASE_URL}/company/getalluser`,
          method: "GET",
          params: { userType, pageNo },
        };
      },
    }),
    getAllVerified: builder.query({
      query: (arg) => {
        const { userType, verified, pageNo } = arg;
        return {
          url: `${BASE_URL}/company/getBothVerifiedUnverifiedUsers`,
          method: "GET",
          params: { userType, verified },
        };
      },
    }),

    getAllCompanyRiders: builder.query({
      query: (arg) => {
        const { userType } = arg;
        return {
          url: `${BASE_URL}/company/getalluser`,
          method: "GET",
          params: { userType },
        };
      },
    }),

    getAllCompanyCustomers: builder.query({
      query: (arg) => {
        const { userType } = arg;
        return {
          url: `${BASE_URL}/company/getalluser`,
          method: "GET",
          params: { userType },
        };
      },
    }),

    getAllTrips: builder.query({
      query: (arg) => {
        // const { userType } = arg;
        return {
          url: `${BASE_URL}/super-admin/getAllTripRequest`,
          method: "GET",
          // params: { userType },
        };
      },
    }),

    // getAllRidersForCompany: builder.query({
    //   query: (arg) => {
    //     const { userId } = arg;
    //     return {
    //       url: `${BASE_URL}/super-admin/getallriderscompany`,
    //       method: "GET",
    //       params: { userId },
    //     };
    //   },
    // }),

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

export default LoginAPi;
