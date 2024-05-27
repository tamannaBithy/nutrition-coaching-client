import { apiSlice } from "../apiSlice";

export const { injectEndpoints } = apiSlice;

export const WEEKLY_MEAL_CATEGORIES_API = injectEndpoints({
  // Define API endpoints
  endpoints: (builder) => ({
    // Mutation to create a Weekly Meal Category (specifically for admin users)
    createWeeklyMealCategory: builder.mutation({
      query: (data) => ({
        url: "/weekly-meal-categories",
        method: "POST",
        body: data,
      }),
      // Invalidates the cache for "WeeklyMealCategories" after a successful creation
      invalidatesTags: ["WeeklyMealCategories"],
    }),

    // Query to get all Weekly Meal Categories
    getAllWeeklyMealCategories: builder.query({
      query: ({ lang }) => `/weekly-meal-categories?langCode=${lang}`,
      // Provides the cache tag for "WeeklyMealCategories" for better caching
      providesTags: ["WeeklyMealCategories"],
    }),

    // Query to get Weekly Meal Category by id (specifically for admin users)
    getWeeklyMealCategoryById: builder.query({
      query: ({ id }) => `/weekly-meal-categories/${id}`,
      // Provides the cache tag for "WeeklyMealCategory" for better caching
      providesTags: ["WeeklyMealCategory"],
    }),

    // Mutation to update a Weekly Meal Category (specifically for admin users)
    updateWeeklyMealCategory: builder.mutation({
      query: ({ id, data }) => ({
        url: `/weekly-meal-categories/${id}`,
        method: "PUT",
        body: data,
      }),
      // Invalidates the cache for "WeeklyMealCategories" after a successful update
      invalidatesTags: ["WeeklyMealCategories"],
    }),

    // Mutation to delete a Weekly Meal Category (specifically for admin users)
    deleteWeeklyMealCategory: builder.mutation({
      query: (id) => ({
        url: `/weekly-meal-categories/${id}`,
        method: "DELETE",
      }),
      // Invalidates the cache for "WeeklyMealCategories" after a successful deletion
      invalidatesTags: ["WeeklyMealCategories"],
    }),
  }),
});

// Destructure the generated hooks for ease of use
export const {
  useCreateWeeklyMealCategoryMutation,
  useGetAllWeeklyMealCategoriesQuery,
  useGetWeeklyMealCategoryByIdQuery,
  useUpdateWeeklyMealCategoryMutation,
  useDeleteWeeklyMealCategoryMutation,
} = WEEKLY_MEAL_CATEGORIES_API;
