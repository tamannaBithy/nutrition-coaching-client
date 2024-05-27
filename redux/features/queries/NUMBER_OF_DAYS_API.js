import { apiSlice } from "../apiSlice";

export const { injectEndpoints } = apiSlice;

export const NUMBER_OF_DAYS_API = injectEndpoints({
  // Define API endpoints
  endpoints: (builder) => ({
    // Mutation to create a Number of Days Record (specifically for admin users)
    createNumberOfDays: builder.mutation({
      query: (data) => ({
        url: "/number-of-days",
        method: "POST",
        body: data,
      }),
      // Invalidates the cache for "NumberOfDays" after a successful creation
      invalidatesTags: ["NumberOfDays"],
    }),

    // Query to get all Number of Days Records
    getAllNumberOfDays: builder.query({
      query: () => "/number-of-days",
      // Provides the cache tag for "NumberOfDays" for better caching
      providesTags: ["NumberOfDays"],
    }),

    // Query to get Single Number of Days Record by ID (specifically for admin users)
    getNumberOfDaysById: builder.query({
      query: (id) => `/number-of-days/${id}`,
      // Provides the cache tag for "NumberOfDays" for better caching
      providesTags: ["NumberOfDays"],
    }),

    // Mutation to update Number of Days Record by ID (specifically for admin users)
    updateNumberOfDays: builder.mutation({
      query: ({ id, data }) => ({
        url: `/number-of-days/${id}`,
        method: "PUT",
        body: data,
      }),
      // Invalidates the cache for "NumberOfDays" after a successful update
      invalidatesTags: ["NumberOfDays"],
    }),

    // Mutation to delete Number of Days Record by ID (specifically for admin users)
    deleteNumberOfDays: builder.mutation({
      query: (id) => ({
        url: `/number-of-days/${id}`,
        method: "DELETE",
      }),
      // Invalidates the cache for "NumberOfDays" after a successful deletion
      invalidatesTags: ["NumberOfDays"],
    }),

    // Query to get all Number of Days Records for admin
    getAllNumberOfDaysForAdmin: builder.query({
      query: () => "/number-of-days/admin",
      // Provides the cache tag for "NumberOfDays" for better caching
      providesTags: ["NumberOfDays"],
    }),
  }),
});

// Destructure the generated hooks for ease of use
export const {
  useCreateNumberOfDaysMutation,
  useGetAllNumberOfDaysQuery,
  useGetNumberOfDaysByIdQuery,
  useUpdateNumberOfDaysMutation,
  useDeleteNumberOfDaysMutation,
  useGetAllNumberOfDaysForAdminQuery,
} = NUMBER_OF_DAYS_API;
