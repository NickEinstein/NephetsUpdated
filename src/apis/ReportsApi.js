import { SoftwrkApi } from "configs/StoreQueryConfig";

const BASE_URL = "/Reports";

export const ReportsApi = SoftwrkApi.injectEndpoints({
  endpoints: (builder) => ({
    // signup: builder.mutation({
    //   query: (config) => ({
    //     url: `${BASE_URL}/signup`,
    //     method: "POST",
    //     ...config,
    //   }),
    // }),
    // stockDelivery: builder.mutation({
    //   query: (config) => ({
    //     url: `${BASE_URL}/add-delivery-Item`,
    //     method: "POST",
    //     ...config,
    //   }),
    // }),

    getSkuStocks: builder.query({
      query: (arg) => {
        const { productId } = arg;
        return {
          url: `${BASE_URL}/Get-Stocks-SKU/${productId}`,
          method: "GET",
          //   params: { productId },
        };
      },
    }),
    getStocksByLocation: builder.query({
      query: (arg) => {
        const { locationId } = arg;
        return {
          url: `${BASE_URL}/Get-Stocks-Location/${locationId}`,
          method: "GET",
          //   params: { productId },
        };
      },
    }),

    getProductBalances: builder.query({
      // Get-Products-Balances
      query: (arg) => {
        const { userType } = arg;
        return {
          url: `${BASE_URL}/Get-Products-Store-Balances`,
          method: "GET",
          // params: { userType },
        };
      },
    }),


    getAllProductsBalance: builder.query({
      query: (arg) => {
        const { userType } = arg;
        return {
          url: `${BASE_URL}/Get-Products-Balances`,
          method: "GET",
          // params: { userType },
        };
      },
    }),
    getAuditLogs: builder.query({
      query: (arg) => {
        const { pageNo } = arg;
        console.log(pageNo);
        return {
          url: `${BASE_URL}/Get-AuditLogs`,
          method: "GET",
          params: { pageNo },
        };
      },
    }),

    getTransactionLogs: builder.query({
      query: (arg) => {
        const { From, To, filter } = arg;
        // console.log(pageNo);
        return {
          url: `${BASE_URL}/Get-TransactionLogs`,
          method: "GET",
          params: { From, To, filter  },
        };
      },
    }),
    getRackBalance: builder.query({
      query: (arg) => {
        const { RackId } = arg;
        return {
          url: `${BASE_URL}/Get-Rack-Balance/${RackId}`,
          method: "GET",
          // params: { RackId },
        };
      },
    }),

    getReceivingLog: builder.query({
      query: (arg) => {
        const { userType } = arg;
        return {
          url: `${BASE_URL}/Receiving-Log`,
          method: "GET",
          params: { userType },
        };
      },
    }),

    getReleaseLog: builder.query({
      query: (arg) => {
        const { userType } = arg;
        return {
          url: `${BASE_URL}/Receiving-Log`,
          method: "GET",
          params: { userType },
        };
      },
    }),
    getMeasuringUnits: builder.query({
      query: (arg) => {
        // const { userType } = arg;
        return {
          url: `${BASE_URL}/Get-MeasureUnits`,
          method: "GET",
          // params: { userType },
        };
      },
    }),

   
    // getAllCompanyCustomers: builder.query({
    //   query: (arg) => {
    //     const { userType } = arg;
    //     return {
    //       url: `${BASE_URL}/company/getalluser`,
    //       method: "GET",
    //       params: { userType },
    //     };
    //   },
    // }),

    // getAllTrips: builder.query({
    //   query: (arg) => {
    //     // const { userType } = arg;
    //     return {
    //       url: `${BASE_URL}/super-admin/getAllTripRequest`,
    //       method: "GET",
    //       // params: { userType },
    //     };
    //   },
    // }),

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

export default ReportsApi;
