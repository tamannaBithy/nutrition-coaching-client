import { apiSlice } from "../apiSlice";

export const { injectEndpoints } = apiSlice;

export const MEAL_PREFERENCE_API = injectEndpoints({
  // Define API endpoints
  endpoints: (builder) => ({
    // Mutation to create a Meal Preference
    createMealPreference: builder.mutation({
      query: (data) => ({
        url: "/meal-preferences",
        method: "POST",
        body: data,
      }),
      // Invalidates the cache for "MealPreferences" and "MealPreferencesForAdmin" after a successful creation
      invalidatesTags: ["MealPreferences", "MealPreferencesForAdmin"],
    }),

    // Query to get all Meal Preferences
    getAllMealPreferences: builder.query({
      query: ({ lang }) => `/meal-preferences?langCode=${lang}`,
      // Provides the cache tag for "MealPreferences" for better caching
      providesTags: ["MealPreferences"],
    }),

    // Query to get Meal Preference by id
    getMealPreferenceById: builder.query({
      query: ({ id }) => `/meal-preferences/${id}`,
      // Provides the cache tag for "MealPreference" for better caching
      providesTags: ["MealPreference"],
    }),

    // Mutation to update a Meal Preference
    updateMealPreference: builder.mutation({
      query: ({ id, data }) => ({
        url: `/meal-preferences/${id}`,
        method: "PUT",
        body: data,
      }),
      // Invalidates the cache for "MealPreference" after a successful update
      invalidatesTags: ["MealPreference"],
    }),

    // Mutation to delete a Meal Preference
    deleteMealPreference: builder.mutation({
      query: (id) => ({
        url: `/meal-preferences/${id}`,
        method: "DELETE",
      }),
      // Invalidates the cache for "MealPreferences" and "MealPreferencesForAdmin" after a successful deletion
      invalidatesTags: ["MealPreferences", "MealPreferencesForAdmin"],
    }),

    // Query to get all Meal Preferences for admin
    getAllMealPreferencesForAdmin: builder.query({
      query: ({ lang }) => `/admin/meal-preferences?langCode=${lang}`,
      // Provides the cache tag for "MealPreferencesForAdmin" for better caching
      providesTags: ["MealPreferencesForAdmin"],
    }),
  }),
});

// Destructure the generated hooks for ease of use
export const {
  useCreateMealPreferenceMutation,
  useGetAllMealPreferencesQuery,
  useGetMealPreferenceByIdQuery,
  useUpdateMealPreferenceMutation,
  useDeleteMealPreferenceMutation,
  useGetAllMealPreferencesForAdminQuery,
} = MEAL_PREFERENCE_API;
