import { apiSlice } from "../apiSlice";

export const { injectEndpoints } = apiSlice;

export const ADMIN_CUSTOMIZED_MEAL_API = injectEndpoints({
  // Define API endpoints
  endpoints: (builder) => ({
    // Mutation to create an admin customized meal input
    createAdminCustomizedMealInput: builder.mutation({
      query: (data) => ({
        url: "/create-adminCustomizedMealInput",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["CustomizedMealsAdmin"],
    }),

    // Mutation to update an admin customized meal input
    updateAdminCustomizedMealInput: builder.mutation({
      query: (data) => ({
        url: "/update-adminCustomizedMealInput",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["CustomizedMealsAdmin"],
    }),

    // Query to get all user meals input
    getAllUserMealsInput: builder.query({
      query: ({ pageNo, showPerPage }) =>
        `/get-allUserMealsInput?showPerPage=${showPerPage}&pageNo=${pageNo}`,
      providesTags: ["CustomizedMealsAdmin"],
    }),

    // Mutation to update meal duration by ID
    updateMealDuration: builder.mutation({
      query: ({ id, data }) => ({
        url: `/update-mealDuration/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["CustomizedMealsAdmin"],
    }),

    // Mutation to delete a customized meal by ID
    deleteUserInputMeal: builder.mutation({
      query: (id) => ({
        url: `/delete-userMealInput/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["CustomizedMealsAdmin"],
    }),
  }),
});

// Destructure the generated hooks for ease of use
export const {
  useCreateAdminCustomizedMealInputMutation,
  useUpdateAdminCustomizedMealInputMutation,
  useGetAllUserMealsInputQuery,
  useUpdateMealDurationMutation,
  useDeleteUserInputMealMutation,
} = ADMIN_CUSTOMIZED_MEAL_API;
