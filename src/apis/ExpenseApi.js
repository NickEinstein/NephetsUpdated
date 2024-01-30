import { SoftwrkApi } from "configs/StoreQueryConfig";
// import useAuthUser from "hooks/useAuthUser";

const BASE_URL = '/expenses/api/Expenses'


// const user = useAuthUser();
export const ExpenseApi = SoftwrkApi.injectEndpoints({
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

    getBudgetItemz: builder.query({
      query: (arg) => {
        const { id } = arg;
        return {
          url: `${BASE_URL}/budgetitems/${id}`,
          method: "GET",
          // params: { userType },
        };
      },
    }),
   
  
  }),
});

// ;

export default ExpenseApi;
