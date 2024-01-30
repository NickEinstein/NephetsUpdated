import { SoftwrkApi } from "configs/StoreQueryConfig";

const BASE_URL = "/rack";

export const UserApi = SoftwrkApi.injectEndpoints({
  endpoints: (builder) => ({
    // receiveStock: builder.mutation({
    //   query: (config) => ({
    //     url: `${BASE_URL}/Receive-Stock`,
    //     method: "POST",
    //     ...config,
    //   }),
    // }),
    productRack: builder.mutation({
      query: (config) => ({
        url: `${BASE_URL}/Product-Rack`,
        method: "PUT",
        ...config,
      }),
    }),
    createRacks: builder.mutation({
      query: (config) => ({
        url: `${BASE_URL}/`,
        method: "POST",
        ...config,
      }),
    }),

    getRack: builder.query({
      query: (arg) => {
        const { reloadItems } = arg;
        return {
          url: `${BASE_URL}`,
          method: "GET",
          // params: { reloadItems },
        };
      },
    }),

    getRackShelves: builder.query({
      query: (arg) => {
        const { reloadItems } = arg;
        return {
          url: `${BASE_URL}/shelves`,
          method: "GET",
          // params: { reloadItems },
        };
      },
    }),

    getShelvesByRackId: builder.query({
      query: (arg) => {
        const { id } = arg;
        return {
          url: `${BASE_URL}/${id}`,
          method: "GET",
          // params: { userType },
        };
      },
    }),

    getShelves: builder.query({
      query: (arg) => {
        const { userType } = arg;
        return {
          url: `${BASE_URL}/shelves`,
          method: "GET",
          // params: { userType },
        };
      },
    }),
    getProductsByRack: builder.query({
      query: (arg) => {
        const { RackId } = arg;
        return {
          url: `${BASE_URL}/Rack-Products/${RackId}`,
          method: "GET",
          // params: { RackId },
        };
      },
    }),

    // getStoreStock: builder.query({
    //   query: (arg) => {
    //     const { userType } = arg;
    //     return {
    //       url: `${BASE_URL}/products`,
    //       method: "GET",
    //       // params: { userType },
    //     };
    //   },
    // }),

    // getStoreTaggingDetail: builder.query({
    //   query: (arg) => {
    //     const { deliveryItemId, unit } = arg;
    //     return {
    //       url: `${BASE_URL}/get-taggingDetail`,
    //       method: "GET",
    //       params: {  deliveryItemId, unit },
    //     };
    //   },
    // }),

    // getTempStocks: builder.query({
    //   query: (arg) => {
    //     const { userType } = arg;
    //     return {
    //       url: `${BASE_URL}/Get-TmpStocks`,
    //       method: "GET",
    //       // params: { userType },
    //     };
    //   },
    // }),
    // getItemDetail: builder.query({
    //   query: (arg) => {
    //     const { itemId } = arg;
    //     // console.log(pageNo);
    //     return {
    //       url: `${BASE_URL}/Get-ItemDetails/${itemId}/`,
    //       method: "GET",
    //       // params: { pageNo },
    //     };
    //   },
    // }),

    // getStoreStocks: builder.query({
    //   query: (arg) => {
    //     const { userType, pageNo } = arg;
    //     return {
    //       url: `${BASE_URL}/Get-Store-Stocks`,
    //       method: "GET",
    //       params: { userType, pageNo },
    //     };
    //   },
    // }),
    // getGlobalBin: builder.query({
    //   query: (arg) => {
    //     const { ProjectType, Location} = arg;
    //     return {
    //       url: `${BASE_URL}/Get-Global-Bincard`,
    //       method: "GET",
    //       // param nas: {  ProjectType, Location },
    //     };
    //   },
    // }),

    // getBinCard: builder.query({
    //   query: (arg) => {
    //     const { ProjectType, Location} = arg;
    //     return {
    //       url: `${BASE_URL}/Get-BinCard`,
    //       method: "GET",
    //       params: {  ProjectType, Location },
    //     };
    //   },
    // }),

    // getAllCompanyRiders: builder.query({
    //   query: (arg) => {
    //     const { userType } = arg;
    //     return {
    //       url: `${BASE_URL}/company/getalluser`,
    //       method: "GET",
    //       params: { userType },
    //     };
    //   },
    // }),

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

export default UserApi;
