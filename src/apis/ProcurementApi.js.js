import { SoftwrkApi } from "configs/StoreQueryConfig";

const BASE_URL = "/requisitionmanager/api/v1/Procurement";

export const ProcurementApi = SoftwrkApi.injectEndpoints({
  endpoints: (builder) => ({
    submitProcurement: builder.mutation({
      query: (config) => ({
        url: `${BASE_URL}/procurement`,
        method: "POST",
        ...config,
      }),
    }),
    submitProcurementMethod: builder.mutation({
      query: (config) => ({
        url: `${BASE_URL}/procurement-method`,
        method: "POST",
        ...config,
      }),
    }),
    submitApprovedExistingProcurementMethod: builder.mutation({
      query: (config) => ({
        url: `${BASE_URL}/approve-existing`,
        method: "PUT",
        ...config,
      }),
    }),
    submitExistingProcurement: builder.mutation({
      query: (config) => ({
        url: `${BASE_URL}/existing-procurement`,
        method: "POST",
        ...config,
      }),
    }),

    submitReply: builder.mutation({
      query: (config) => ({
        url: `${BASE_URL}/reply`,
        method: "POST",
        ...config,
      }),
    }),
    //
    submitAdvancePaymentRequest: builder.mutation({
      query: (config) => ({
        url: `${BASE_URL}/AdvancePaymentRequest`,
        method: "POST",
        ...config,
      }),
    }),
    approveAdvancePaymentRequest: builder.mutation({
      query: (config) => ({
        url: `${BASE_URL}/ApproveAdvancePaymentRequest`,
        method: "POST",
        ...config,
      }),
    }),

    approveProcurementRequest: builder.mutation({
      query: ({ path, ...config }) => ({
        url: `${BASE_URL}/approve`,
        method: "PUT",
        ...config,
      }),
      // invalidatesTags: (_, error, { path }) =>
      //   !error
      //     ? invalidateTags(StoreQueryTagEnum.CONTRACT, { ids: [path.id] })
      //     : [],
    }),
    // AdvancePaymentRequest
    // approveProcurementRequest: builder.mutation({
    //   query: (config) => ({
    //     url: `${BASE_URL}/approve`,
    //     method: "PATCH",
    //     ...config,
    //   }),
    // }),
    GetProcurementMethodTypes: builder.query({
      query: (arg) => {
        const { id } = arg;
        return {
          url: `${BASE_URL}/GetProcurementMethodTypes`,
          method: "GET",
          // params: { userType },
        };
      },
    }),
    GetAssignerEnquiryById: builder.query({
      query: (arg) => {
        const { id } = arg;
        return {
          url: `${BASE_URL}/GetAssignerEnquiryById?page=${1}&requestId=${id}&pageSize=${30}`,
          method: "GET",
          // params: { userType },
        };
      },
    }),
    GetAssignerEnquiry: builder.query({
      query: (arg) => {
        const { id } = arg;
        return {
          url: `${BASE_URL}/assigner-enquiry?page=${1}&pageSize=${30}`,
          method: "GET",
          // params: { userType },
        };
      },
    }),
    GetAssignedProcurementsById: builder.query({
      query: (arg) => {
        const { id } = arg;
        return {
          url: `${BASE_URL}/GetAssignedProcurementsById?page=${1}&Id=${id}&pageSize=${30}`,
          method: "GET",
          // params: { userType },
        };
      },
    }),
    getProcurementByReferenceId: builder.query({
      query: (arg) => {
        const { id } = arg;
        return {
          url: `${BASE_URL}/GetProcurementByReferenceId?id=${id}`,
          method: "GET",
          // params: { userType },
        };
      },
    }),
    getMyProcurementRequests: builder.mutation({
      query: (config) => ({
        url: `${BASE_URL}/procurements?status=${+config.data?.status}`,
        method: "POST",
        ...config,
      }),
    }),
    getPendingApprovals: builder.mutation({
      query: (config) => ({
        url: `${BASE_URL}/pending-approvals`,
        method: "POST",
        ...config,
      }),
    }),
    getActionedProcurements: builder.mutation({
      query: (config) => ({
        url: `${BASE_URL}/actioned-procurements`,
        method: "POST",
        ...config,
      }),
    }),
    getApprovedProcurements: builder.mutation({
      query: (config) => ({
        url: `${BASE_URL}/approved-procurements`,
        method: "POST",
        ...config,
      }),
    }),

    getPendingExistingProcurements: builder.mutation({
      query: (config) => ({
        url: `${BASE_URL}/pending-existing-approvals`,
        method: "POST",
        ...config,
      }),
    }),

    approveComplianceRequist: builder.mutation({
      query: (config) => ({
        url: `${BASE_URL}/approve`,
        method: "PATCH",
        ...config,
      }),
    }),

    getrecentprocurements: builder.query({
      query: (arg) => {
        const { userType } = arg;
        return {
          url: `${BASE_URL}/recent-procurements`,
          method: "GET",
          // params: { userType },
        };
      },
    }),
    getAssignedProcurements: builder.query({
      query: (arg) => {
        const { page, pageSize } = arg;
        return {
          url: `${BASE_URL}/assigned-procurements`,
          method: "GET",
          params: { page, pageSize },
        };
      },
    }),

    getProcurementApprovers: builder.query({
      query: (arg) => {
        const { costs: cost, requestType, procurementMethod } = arg;
        return {
          url: `${BASE_URL}/get-approvers`,
          method: "GET",
          params: { cost, requestType, procurementMethod },
        };
      },
    }),
    getProcurementPendingApprovers: builder.query({
      query: (arg) => {
        const { userType } = arg;
        return {
          url: `${BASE_URL}/pending-approvals`,
          method: "GET",
          // params: { userType },
        };
      },
    }),

    getPendingAdvancePaymentRequest: builder.query({
      query: (arg) => {
        const { userType } = arg;
        return {
          url: `${BASE_URL}/PendingAdvancePaymentRequest`,
          method: "GET",
          // params: { userType },
        };
      },
    }),

    getmdasList: builder.query({
      query: (arg) => {
        const { userType } = arg;
        return {
          url: `${BASE_URL}/PendingAdvancePaymentRequest`,
          method: "GET",
          // params: { userType },
        };
      },
    }),

    // PendingAdvancePaymentRequest

    getprocurementById: builder.query({
      query: (arg) => {
        const { id } = arg;
        return {
          url: `${BASE_URL}/procurement/${id}`,
          method: "GET",
          // params: { userType },
        };
      },
    }),
  }),
});

// ;

export default ProcurementApi;
