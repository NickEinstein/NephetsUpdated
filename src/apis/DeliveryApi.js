import { SoftwrkApi } from "configs/StoreQueryConfig";

const BASE_URL = "/delivery";

export const DeliveryApi = SoftwrkApi.injectEndpoints({
  endpoints: (builder) => ({
    finalDelivery: builder.mutation({
      query: (config) => ({
        url: `${BASE_URL}`,
        method: "POST",
        ...config,
      }),
    }),
    // deleteJob: builder.mutation({
    //   query: ({ path, ...config }) => ({
    //     url: `${JOBS_BASE_URL}/${path.id}`,
    //     method: "DELETE",
    //     ...config,
    //   }),
    //   invalidatesTags: (_, error, { path }) =>
    //     !error ? invalidateTags(StoreQueryTagEnum.JOB, { ids: [path.id] }) : [],
    // }),

    discard: builder.mutation({
      query: (config) => ({
        url: `${BASE_URL}/Discard-Delivery`,
        method: "DELETE",
        ...config,
      }),
    }),
    stockDelivery: builder.mutation({
      query: (config) => ({
        url: `${BASE_URL}/add-delivery-Item`,
        method: "POST",
        ...config,
      }),
    }),

    getAllDeliveries: builder.query({
      query: (arg) => {
        // const { userType } = arg;
        return {
          url: `${BASE_URL}`,
          method: "GET",
          // params: { userType },
        };
      },
    }),

    // allDeliveries: builder.query({
    //   query: (arg) => {
    //     const { userType } = arg;
    //     return {
    //       url: `${BASE_URL}`,
    //       method: "GET",
    //       // params: { userType },
    //     };
    //   },
    // }),

    getTempDeliveries: builder.query({
      query: (arg) => {
        const { userType } = arg;
        return {
          url: `${BASE_URL}/Get-DeliveryDetails`,
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

   
  }),
});

// ;

export default DeliveryApi;
