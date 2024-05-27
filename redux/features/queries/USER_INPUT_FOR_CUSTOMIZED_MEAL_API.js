import { apiSlice } from "../apiSlice";

export const { injectEndpoints } = apiSlice;

export const USER_INPUT_FOR_CUSTOMIZED_MEAL_API = injectEndpoints({
  // Define API endpoints
  endpoints: (builder) => ({
    // Mutation to create an user customized meal input
    createUserCustomizedMealInput: builder.mutation({
      query: (data) => ({
        url: "/create-userCustomizedMealInput",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["CustomizedMealsAdmin"],
    }),

    // Query to get all user inputs for customized meals
    getUserCustomizedMealInput: builder.query({
      query: () => `/get-userCustomizedMealInput`,
    }),
  }),
});

// Destructure the generated hooks for ease of use
export const {
  useCreateUserCustomizedMealInputMutation,
  useGetUserCustomizedMealInputQuery,
} = USER_INPUT_FOR_CUSTOMIZED_MEAL_API;
