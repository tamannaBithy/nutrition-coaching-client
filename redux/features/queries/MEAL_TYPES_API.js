import { apiSlice } from "../apiSlice";

export const { injectEndpoints } = apiSlice;

export const MEAL_TYPES_API = injectEndpoints({
  // Define API endpoints
  endpoints: (builder) => ({
    // Mutation to create a Meal Type (specifically for admin users)
    createMealType: builder.mutation({
      query: (data) => ({
        url: "/meal-types",
        method: "POST",
        body: data,
      }),
      // Invalidates the cache for "MealTypes" after a successful creation
      invalidatesTags: ["MealTypes"],
    }),

    // Query to get all Meal Types
    getAllMealTypes: builder.query({
      query: ({ lang }) => `/meal-types?langCode=${lang}`,
      // Provides the cache tag for "MealTypes" for better caching
      providesTags: ["MealTypes"],
    }),

    // Query to get Meal Type by id (specifically for admin users)
    getMealTypeById: builder.query({
      query: ({ id }) => `/meal-types/${id}`,
      // Provides the cache tag for "MealType" for better caching
      providesTags: ["MealType"],
    }),

    // Mutation to update a Meal Type (specifically for admin users)
    updateMealType: builder.mutation({
      query: ({ id, data }) => ({
        url: `/meal-types/${id}`,
        method: "PUT",
        body: data,
      }),
      // Invalidates the cache for "MealTypes" after a successful update
      invalidatesTags: ["MealTypes"],
    }),

    // Mutation to delete a Meal Type (specifically for admin users)
    deleteMealType: builder.mutation({
      query: (id) => ({
        url: `/meal-types/${id}`,
        method: "DELETE",
      }),
      // Invalidates the cache for "MealTypes" after a successful deletion
      invalidatesTags: ["MealTypes"],
    }),
  }),
});

// Destructure the generated hooks for ease of use
export const {
  useCreateMealTypeMutation,
  useGetAllMealTypesQuery,
  useGetMealTypeByIdQuery,
  useUpdateMealTypeMutation,
  useDeleteMealTypeMutation,
} = MEAL_TYPES_API;
