import { apiSlice } from "../apiSlice";

// Destructure injectEndpoints from apiSlice
export const { injectEndpoints } = apiSlice;

// Injecting API endpoints for Privacy Policy operations
export const Privacy_Policy_API = injectEndpoints({
  // Define endpoints for creating or updating and retrieving Privacy Policy
  endpoints: (builder) => ({
    // Mutation to create or update Privacy Policy (admin only)
    createOrUpdatePrivacyPolicy: builder.mutation({
      query: (data) => ({
        url: "/privacy-policy",
        method: "POST",
        body: data,
      }),
      // Invalidates cache for Privacy Policy after creation or update
      invalidatesTags: ["PrivacyPolicy"],
    }),

    // Query to get Privacy Policy
    getPrivacyPolicy: builder.query({
      query: ({ lang }) => `/privacy-policy?lang=${lang}`,
      // Provides cache tag for Privacy Policy
      providesTags: ["PrivacyPolicy"],
    }),
  }),
});

// Destructure the generated hooks for ease of use
export const {
  useCreateOrUpdatePrivacyPolicyMutation,
  useGetPrivacyPolicyQuery,
} = Privacy_Policy_API;
