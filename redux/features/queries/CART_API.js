import { apiSlice } from "../apiSlice";

export const { injectEndpoints } = apiSlice;

export const CART_API = injectEndpoints({
  // Define API endpoints
  endpoints: (builder) => ({
    // Mutation to add a Main Meal to the user's cart
    addToMainMealCart: builder.mutation({
      query: (data) => ({
        url: "/cart/main-meal",
        method: "POST",
        body: data,
      }),
      // Invalidates the cache for "AllCarts" after a successful addition
      invalidatesTags: ["AllCarts"],
    }),

    // Mutation to add an Offered Meal to the user's cart
    addToOfferedMealCart: builder.mutation({
      query: (data) => ({
        url: "/cart/offered-meal",
        method: "POST",
        body: data,
      }),
      // Invalidates the cache for "AllCarts" after a successful addition
      invalidatesTags: ["AllCarts"],
    }),

    // Query to get all carts for a user with aggregated prices
    getAllCarts: builder.query({
      query: () => "/carts",
      // Provides the cache tag for "AllCarts" for better caching
      providesTags: ["AllCarts"],
    }),

    // Mutation to delete a Main Meal from the user's cart
    deleteMealFromMainMealCart: builder.mutation({
      query: ({ cartId, menuId }) => ({
        url: `/cart/main-meal/${cartId}/${menuId}`,
        method: "DELETE",
      }),
      // Invalidates the cache for "AllCarts" after a successful deletion
      invalidatesTags: ["AllCarts"],
    }),

    // Mutation to delete an Offered Meal from the user's cart
    deleteMealFromOfferedMealCart: builder.mutation({
      query: ({ cartId, menuId }) => ({
        url: `/cart/offered-meal/${cartId}/${menuId}`,
        method: "DELETE",
      }),
      // Invalidates the cache for "AllCarts" after a successful deletion
      invalidatesTags: ["AllCarts"],
    }),
  }),
});

// Destructure the generated hooks for ease of use
export const {
  useAddToMainMealCartMutation,
  useAddToOfferedMealCartMutation,
  useGetAllCartsQuery,
  useDeleteMealFromMainMealCartMutation,
  useDeleteMealFromOfferedMealCartMutation,
} = CART_API;
