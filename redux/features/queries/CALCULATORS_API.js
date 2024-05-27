import { apiSlice } from "../apiSlice";

export const { injectEndpoints } = apiSlice;

export const CALCULATORS_API = injectEndpoints({
  endpoints: (builder) => ({
    // Mutation to create user keto calculation
    createUserKetoCalc: builder.mutation({
      query: (data) => ({
        url: "/create-userKetoCalc",
        method: "POST",
        body: data,
      }),
    }),

    // Mutation to create user macro calculation
    createUserMacroCalc: builder.mutation({
      query: (data) => ({
        url: "/create-userMacroCalc",
        method: "POST",
        body: data,
      }),
    }),

    // Mutation to create admin cal input
    createAdminCalcInput: builder.mutation({
      query: (data) => ({
        url: "/create-adminInput",
        method: "POST",
        body: data,
      }),
    }),

    // Mutation to update admin cal input
    updateAdminCalcInput: builder.mutation({
      query: (data) => ({
        url: "/update-adminInput",
        method: "PATCH",
        body: data,
      }),
    }),
  }),
});

// Destructure the generated hooks for ease of use
export const {
  useCreateUserKetoCalcMutation,
  useCreateUserMacroCalcMutation,
  useCreateAdminCalcInputMutation,
  useUpdateAdminCalcInputMutation,
} = CALCULATORS_API;
