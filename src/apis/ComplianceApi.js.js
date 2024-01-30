import { SoftwrkApi } from "configs/StoreQueryConfig";

const BASE_URL = "requisitionmanager/api/ComplianceRequisition";

export const ComplianceApi = SoftwrkApi.injectEndpoints({
  endpoints: (builder) => ({
    complianceRequest: builder.mutation({
      query: (config) => ({
        url: `${BASE_URL}/`,
        method: "POST",
        ...config,
      }),
    }),
    complianceSTBDecision: builder.mutation({
      query: (config) => ({
        url: `${BASE_URL}/StbDecision`,
        method: "POST",
        ...config,
      }),
    }),

    complianceExcoConclusion: builder.mutation({
      query: (config) => ({
        url: `${BASE_URL}/ExcoConclusion`,
        method: "POST",
        ...config,
      }),
    }),

    
    approveComplianceRequest: builder.mutation({
      query: (config) => ({
        url: `${BASE_URL}/approve`,
        method: "PUT",
        ...config,
      }),
    }),
    putComplianceRequest: builder.mutation({
      query: (config) => ({
        url: `${BASE_URL}/complianceRequest`,
        method: "PUT",
        ...config,
      }),
    }),
    approveComplianceRequist: builder.mutation({
      query: (config) => ({
        url: `${BASE_URL}/ComplianceRequisition/approve`,
        method: "POST",
        ...config,
      }),
    }),

    getComplianceRequest: builder.query({
      query: (arg) => {
        const { id } = arg;
        return {
          url: `${BASE_URL}/${id}`,
          method: "GET",
          // params: { userType },
        };
      },
    }),
  getComplianceByReferenceId: builder.query({
      query: (arg) => {
        const { id } = arg;
        return {
          url: `${BASE_URL}/GetComplianceByReferenceId?id=${id}`,
          method: "GET",
          // params: { userType },
        };
      },
    }),

    // GetApprovedComplianceCertificateRequestList/1/10
    getInitiatorsApproved: builder.query({
      query: (arg) => {
        const { id } = arg;
        return {
          url: `${BASE_URL}/GetMyApprovedComplianceCertificateRequestList/1/40`,
          method: "GET",
          // params: { userType },
        };
      },
    }),

    getReadyForAdvancedPayment: builder.query({
      query: (arg) => {
        const { id } = arg;
        return {
          url: `${BASE_URL}/GetApprovedComplianceCertificateRequestList/1/40`,
          method: "GET",
          // params: { userType },
        };
      },
    }),
    // https://edogoverp.com/requisitionmanager/api/ComplianceRequisition/GetApproverApprovedComplianceCertificateRequestList/1/10
    getBudgetType: builder.query({
      query: (arg) => {
        // const { userType } = arg;
        return {
          url: `${BASE_URL}/GetBudgetType`,
          method: "GET",
          // params: { userType },
        };
      },
    }),

    getBudgetItems: builder.query({
      query: (arg) => {
        // const { userType } = arg;
        return {
          url: `${BASE_URL}/GetBudgetItems`,
          method: "GET",
          // params: { userType },
        };
      },
    }),
    getComplianceLitForApproval: builder.query({
      query: (arg) => {
        // const { userType } = arg;
        return {
          url: `${BASE_URL}/GetPendingApproverComplianceCertificateRequestList/1/30`,
          method: "GET",
          // params: { userType },
        };
      },
    }),
    getComplianceListApproved: builder.query({
      query: (arg) => {
        // const { userType } = arg;
        return {
          url: `${BASE_URL}/GetApproverApprovedComplianceCertificateRequestList/1/30`,
          method: "GET",
          // params: { userType },
        };
      },
    }),

    getComplianceListDeclined: builder.query({
      query: (arg) => {
        // const { userType } = arg;
        return {
          url: `${BASE_URL}/GetApproverDeclinedComplianceCertificateRequestList/1/30`,
          method: "GET",
          // params: { userType },
        };
      },
    }),

    getComplianceRequestList: builder.query({
      query: (arg) => {
        // const { userType } = arg;
        return {
          url: `${BASE_URL}/getComplianceRequest/list`,
          method: "GET",
          // params: { userType },
        };
      },
    }),
  }),
});

// ;

export default ComplianceApi;
