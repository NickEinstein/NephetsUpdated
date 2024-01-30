import { SoftwrkApi } from "configs/StoreQueryConfig";

const BASE_URL = "/req";

export const ReqApi = SoftwrkApi.injectEndpoints({
  endpoints: (builder) => ({
    confirmRelease: builder.mutation({
      query: (config) => ({
        url: `${BASE_URL}/confirm-release`,
        method: "POST",
        ...config,
      }),
    }),
    approval: builder.mutation({
      query: (config) => ({
        url: `${BASE_URL}/approval`,
        method: "POST",
        ...config,
      }),
    }),
    request: builder.mutation({
      query: (config) => ({
        url: `${BASE_URL}/request`,
        method: "POST",
        ...config,
      }),
    }),

    getRequest: builder.query({
      query: (arg) => {
        const { userType } = arg;
        return {
          url: `${BASE_URL}/`,
          method: "GET",
          // params: { userType },
        };
      },
    }),

    getRequestDetail: builder.query({
      query: (arg) => {
        const { RequestCode } = arg;
        return {
          url: `${BASE_URL}/Get-Request-Detail/${RequestCode}`,
          method: "GET",
          // params: { userType },
        };
      },
    }),

    getReleasedStocks: builder.query({
      query: (arg) => {
        const { RequestCode } = arg;
        return {
          url: `${BASE_URL}/Get-Released-Stocks/${RequestCode}`,
          method: "GET",
          // params: { userType },
        };
      },
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

    getPendingRelease: builder.query({
      query: (arg) => {
        const { userType } = arg;
        return {
          url: `${BASE_URL}/Pending-Release`,
          method: "GET",
          // params: { userType },
        };
      },
    }),

    getProcessedApprovalRequest: builder.query({
      query: (arg) => {
        const { userType } = arg;
        return {
          url: `${BASE_URL}/Get-Processed-Approval-Requests`,
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
  }),
});

// ;

export default ReqApi;
