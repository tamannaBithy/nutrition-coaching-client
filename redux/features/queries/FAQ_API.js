import { apiSlice } from "../apiSlice";

export const { injectEndpoints } = apiSlice;

// Injecting API endpoints for FAQ operations
export const FAQ_API = injectEndpoints({
  // Define endpoints for creating, retrieving, updating, and deleting FAQs
  endpoints: (builder) => ({
    // Mutation to create a new FAQ
    createFAQ: builder.mutation({
      query: (data) => ({
        url: "/faq",
        method: "POST",
        body: data,
      }),
      // Invalidates cache for FAQs after creation
      invalidatesTags: ["FAQ"],
    }),

    // Query to get all FAQs
    getAllFAQs: builder.query({
      query: ({ lang }) => `/faq?lang=${lang}`,
      // Provides cache tag for FAQs
      providesTags: ["FAQ"],
    }),

    // Mutation to update an existing FAQ
    updateFAQ: builder.mutation({
      query: ({ id, data }) => ({
        url: `/faq/${id}`,
        method: "PUT",
        body: data,
      }),
      // Invalidates cache for FAQs after update
      invalidatesTags: ["FAQ"],
    }),

    // Mutation to delete an existing FAQ
    deleteFAQ: builder.mutation({
      query: (id) => ({
        url: `/faq/${id}`,
        method: "DELETE",
      }),
      // Invalidates cache for FAQs after deletion
      invalidatesTags: ["FAQ"],
    }),
  }),
});

// Destructure the generated hooks for ease of use
export const {
  useCreateFAQMutation,
  useGetAllFAQsQuery,
  useUpdateFAQMutation,
  useDeleteFAQMutation,
} = FAQ_API;
