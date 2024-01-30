import { SoftwrkApi } from "configs/StoreQueryConfig";

const BASE_URL = '/tagging'

export const TaggingApi = SoftwrkApi.injectEndpoints({
  endpoints: (builder) => ({
    // signup: builder.mutation({
    //   query: (config) => ({
    //     url: `${BASE_URL}/signup`,
    //     method: "POST",
    //     ...config,
    //   }),
    // }),
    tagging: builder.mutation({
      query: (config) => ({
        url: `${BASE_URL}/`,
        method: "POST",
        ...config,
      }),
    }),

    getTagging: builder.query({
      query: (arg) => {
        const { userType } = arg;
        return {
          url: `${BASE_URL}/`,
          method: "GET",
          // params: { userType },
        };
      },
    }),

    getAwaitingTaggingApprovals: builder.query({
      query: (arg) => {
        const { userType } = arg;
        return {
          url: `${BASE_URL}/Get-Awaiting-Tagging-Approvals`,
          method: "GET",
          // params: { userType },
        };
      },
    }),
    getPendingStockDetail: builder.query({
      query: (arg) => {
        const { TaggingId } = arg;
        console.log(TaggingId);
        return {
          url: `${BASE_URL}/Get-PendingStock-Detail`,
          method: "GET",
          params: { TaggingId },
        };
      },
    }),

    getApprovedStockTaggging: builder.query({
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

export default TaggingApi;
