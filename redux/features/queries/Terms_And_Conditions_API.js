import { apiSlice } from "../apiSlice";

// Destructure injectEndpoints from apiSlice
export const { injectEndpoints } = apiSlice;

// Injecting API endpoints for Terms and Conditions operations
export const TermsAndConditions_API = injectEndpoints({
  // Define endpoints for creating or updating and retrieving Terms and Conditions
  endpoints: (builder) => ({
    // Mutation to create or update Terms and Conditions (admin only)
    createOrUpdateTermsAndConditions: builder.mutation({
      query: (data) => ({
        url: "/terms-and-conditions",
        method: "POST",
        body: data,
      }),
      // Invalidates cache for Terms and Conditions after creation or update
      invalidatesTags: ["TermsAndConditions"],
    }),

    // Query to get Terms and Conditions
    getTermsAndConditions: builder.query({
      query: ({ lang }) => `/terms-and-conditions?lang=${lang}`,
      // Provides cache tag for Terms and Conditions
      providesTags: ["TermsAndConditions"],
    }),
  }),
});

// Destructure the generated hooks for ease of use
export const {
  useCreateOrUpdateTermsAndConditionsMutation,
  useGetTermsAndConditionsQuery,
} = TermsAndConditions_API;
