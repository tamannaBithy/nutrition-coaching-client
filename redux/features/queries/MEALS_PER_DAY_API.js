import { apiSlice } from "../apiSlice";

export const { injectEndpoints } = apiSlice;

export const MEALS_PER_DAY_API = injectEndpoints({
  // Define API endpoints
  endpoints: (builder) => ({
    // Mutation to create a Meal Per Day (specifically for admin users)
    createMealPerDay: builder.mutation({
      query: (data) => ({
        url: "/meal-per-day",
        method: "POST",
        body: data,
      }),
      // Invalidates the cache for "MealsPerDay" after a successful creation
      invalidatesTags: ["MealsPerDay"],
    }),

    // Query to get all Meals Per Day
    getAllMealPerDay: builder.query({
      query: () => "/meal-per-day",
      // Provides the cache tag for "MealsPerDay" for better caching
      providesTags: ["MealsPerDay"],
    }),

    // Query to get Single Meal Per Day by ID (specifically for admin users)
    getMealPerDayById: builder.query({
      query: (id) => `/meal-per-day/${id}`,
      // Provides the cache tag for "MealsPerDay" for better caching
      providesTags: ["MealsPerDay"],
    }),

    // Mutation to update Meal Per Day by ID (specifically for admin users)
    updateMealPerDay: builder.mutation({
      query: ({ id, data }) => ({
        url: `/meal-per-day/${id}`,
        method: "PUT",
        body: data,
      }),
      // Invalidates the cache for "MealsPerDay" after a successful update
      invalidatesTags: ["MealsPerDay"],
    }),

    // Mutation to delete Meal Per Day by ID (specifically for admin users)
    deleteMealPerDay: builder.mutation({
      query: (id) => ({
        url: `/meal-per-day/${id}`,
        method: "DELETE",
      }),
      // Invalidates the cache for "MealsPerDay" after a successful deletion
      invalidatesTags: ["MealsPerDay"],
    }),

    // Query to get all Meals Per Day for Admin
    getAllMealPerDayForAdmin: builder.query({
      query: () => "/meal-per-day/admin",
      // Provides the cache tag for "MealsPerDay" for better caching
      providesTags: ["MealsPerDay"],
    }),
  }),
});

// Destructure the generated hooks for ease of use
export const {
  useCreateMealPerDayMutation,
  useGetAllMealPerDayQuery,
  useGetMealPerDayByIdQuery,
  useUpdateMealPerDayMutation,
  useDeleteMealPerDayMutation,
  useGetAllMealPerDayForAdminQuery,
} = MEALS_PER_DAY_API;
