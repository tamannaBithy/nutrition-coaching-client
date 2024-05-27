import { apiSlice } from "../apiSlice";

export const { injectEndpoints } = apiSlice;

export const DISCOUNT_API = injectEndpoints({
  // Define API endpoints
  endpoints: (builder) => ({
    // Create a new discount for orders
    createDiscountForOrder: builder.mutation({
      query: (data) => ({
        url: "/discounts-for-order",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["DiscountsForOrder"],
    }),

    // Get all discounts for orders
    getAllDiscountsForOrder: builder.query({
      query: (discountCategory) =>
        `/discounts-for-order?discount_category=${discountCategory}`,
      providesTags: ["DiscountsForOrder"],
    }),

    // Get details of a specific discount for orders by ID
    getDiscountForOrderById: builder.query({
      query: (discountId) => `/discounts-for-order/${discountId}`,
    }),

    // Update a discount for orders by ID
    updateDiscountForOrderById: builder.mutation({
      query: ({ discountId, rangeId, data }) => ({
        url: `/discounts-for-order/${discountId}/${rangeId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["DiscountsForOrder"],
    }),

    // Delete a discount for orders by ID
    deleteDiscountForOrderById: builder.mutation({
      query: ({ discountId, rangeId }) => ({
        url: `/discounts-for-order/${discountId}/${rangeId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["DiscountsForOrder"],
    }),
  }),
});

// Destructure the generated hooks for ease of use
export const {
  useCreateDiscountForOrderMutation,
  useGetAllDiscountsForOrderQuery,
  useGetDiscountForOrderByIdQuery,
  useUpdateDiscountForOrderByIdMutation,
  useDeleteDiscountForOrderByIdMutation,
} = DISCOUNT_API;
