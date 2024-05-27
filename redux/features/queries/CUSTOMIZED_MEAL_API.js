import { apiSlice } from "../apiSlice";

export const { injectEndpoints } = apiSlice;

export const CUSTOMIZED_MEAL_API = injectEndpoints({
  // Define API endpoints
  endpoints: (builder) => ({
    // Mutation to create a customized meal
    createCustomizedMeal: builder.mutation({
      query: (data) => ({
        url: "/create-customizedMeal",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["CustomizedMeals"], // Invalidate CustomizedMeals tag after a successful creation
    }),

    // Mutation to delete a customized meal by ID
    deleteCustomizedMeal: builder.mutation({
      query: (id) => ({
        url: `/delete-customizedMeal/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["CustomizedMeals"], // Invalidate CustomizedMeals tag after a successful deletion
    }),

    // Query to get all customized meals
    getAllCustomizedMeals: builder.query({
      query: ({ showPerPage, pageNo, lang }) =>
        `/get-customizedMeals?showPerPage=${showPerPage}&pageNo=${pageNo}&langCode=${lang}`,
      providesTags: ["CustomizedMeals"], // Provide CustomizedMeals tag for caching
    }),

    // Query to get a single customized meal by ID
    getSingleCustomizedMeal: builder.query({
      query: (id) => `/get-customizedMeal/${id}`,
      providesTags: ["CustomizedMeals"], // Provide CustomizedMeals tag for caching
    }),

    // Query to get all customized meals for admin users
    getAdminCustomizedMeals: builder.query({
      query: ({ showPerPage, pageNo, lang, searchKeyword }) =>
        `/get-adminCustomizedMeal?showPerPage=${showPerPage}&pageNo=${pageNo}&langCode=${lang}&searchKeyword=${searchKeyword}`,
      providesTags: ["CustomizedMeals"], // Provide CustomizedMeals tag for caching
    }),

    // Mutation to update a customized meal by ID
    updateCustomizedMeal: builder.mutation({
      query: ({ id, data }) => ({
        url: `/update-customizedMeal/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["CustomizedMeals"], // Invalidate CustomizedMeals tag after a successful update
    }),
  }),
});

// Destructure the generated hooks for ease of use
export const {
  useCreateCustomizedMealMutation,
  useDeleteCustomizedMealMutation,
  useGetAllCustomizedMealsQuery,
  useGetSingleCustomizedMealQuery,
  useGetAdminCustomizedMealsQuery,
  useUpdateCustomizedMealMutation,
} = CUSTOMIZED_MEAL_API;
