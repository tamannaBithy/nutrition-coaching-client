const { apiSlice } = require("../apiSlice");

export const { injectEndpoints } = apiSlice;

export const OFFERED_MEALS_API = injectEndpoints({
  // Define API endpoints for Offered Meals
  endpoints: (builder) => ({
    // Mutation to create an offered meal package (specifically for admin users)
    createOfferedMealPackage: builder.mutation({
      query: (data) => ({
        url: "/offered-meals-package",
        method: "POST",
        body: data,
      }),

      // Invalidates the cache for "OfferedMeals" after a successful creation
      invalidatesTags: ["OfferedMeals", "AdminOfferedMeals", "OfferedPackages"],
    }),

    // Mutation to create an offered meal for a package (specifically for admin users)
    createOfferedMeal: builder.mutation({
      query: (data) => ({
        url: "/offered-meals",
        method: "POST",
        body: data,
      }),

      // Invalidates the cache for "OfferedMeals" after a successful creation
      invalidatesTags: ["OfferedMeals", "AdminOfferedMeals"],
    }),

    // Query to get all offered meals
    getAllOfferedMeals: builder.query({
      query: ({ lang }) => `/offered-meals?langCode=${lang}`,
      // Provide cache tag for better caching
      providesTags: ["OfferedMeals"],
    }),

    // Query to get all offered meals for admin dashboard
    getAllOfferedMealsDashboard: builder.query({
      query: ({ showPerPage, pageNo, lang, searchKeyword }) =>
        `/admin/offered-meals?showPerPage=${showPerPage}&pageNo=${pageNo}&langCode=${lang}&searchKeyword=${searchKeyword}`,
      // Provide cache tag for better caching
      providesTags: ["AdminOfferedMeals"],
    }),

    // Query to get a single offered meal by ID
    getOfferedMealById: builder.query({
      query: ({ mealId }) => `/offered-meals/${mealId}`,
      // Provide cache tag for better caching
      providesTags: ["OfferedMealById"],
    }),

    // Mutation to delete an offered meal by ID (specifically for admin users)
    deleteOfferedMeal: builder.mutation({
      query: ({ mealId }) => ({
        url: `/offered-meals/${mealId}`,
        method: "DELETE",
      }),
      // Optionally, you can include invalidation of cache tags if needed
      invalidatesTags: [
        "OfferedMeals",
        "AdminOfferedMeals",
        "OfferedMealById",
        "OfferedPackages",
      ],
    }),

    // Query to get all offered packages names
    getPackagesList: builder.query({
      query: () => "/offered-packages",
      // Provide cache tag for better caching
      providesTags: ["OfferedPackages"],
    }),
  }),
});

// Destructure the generated hooks for ease of use
export const {
  useCreateOfferedMealPackageMutation,
  useCreateOfferedMealMutation,
  useGetAllOfferedMealsQuery,
  useGetAllOfferedMealsDashboardQuery,
  useGetOfferedMealByIdQuery,
  useDeleteOfferedMealMutation,
  useGetPackagesListQuery,
} = OFFERED_MEALS_API;
