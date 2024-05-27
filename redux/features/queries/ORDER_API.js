import { apiSlice } from "../apiSlice";

export const { injectEndpoints } = apiSlice;

export const ORDER_API = injectEndpoints({
  endpoints: (builder) => ({
    // Mutation to place a new order
    placeOrder: builder.mutation({
      query: (data) => ({
        url: "/place-order",
        method: "POST",
        body: data,
      }),
      // Invalidates relevant caches after a successful order placement
      invalidatesTags: ["Orders", "Notification"],
    }),

    // Query to get all orders for a user
    getMyOrders: builder.query({
      query: ({ showPerPage, pageNo, orders_from, orders_end }) =>
        `/my-orders?showPerPage=${showPerPage}&pageNo=${pageNo}&orders_from=${orders_from}&orders_end=${orders_end}`,
      // Provides the cache tag for "Orders" for better caching
      providesTags: ["Orders"],
    }),

    // Query to get all orders for admin
    getAllOrdersForAdmin: builder.query({
      // ?showPerPage=1&pageNo=1&orders_from=2024-01-01&orders_end=2024-01-31
      query: ({ showPerPage, pageNo, orders_from, orders_end }) =>
        `/admin/orders?showPerPage=${showPerPage}&pageNo=${pageNo}&orders_from=${orders_from}&orders_end=${orders_end}`,
      // Provides the cache tag for "Orders" for better caching
      providesTags: ["Orders"],
    }),

    // Mutation to update order status by admin
    updateOrderStatusByAdmin: builder.mutation({
      query: ({ orderId, data }) => ({
        url: `/admin/update-order/${orderId}`,
        method: "PUT",
        body: data,
      }),
      // Invalidates relevant caches after a successful update
      invalidatesTags: ["Orders", "Notification"],
    }),

    // Mutation to update delivery status by admin
    updateDeliveryStatusByAdmin: builder.mutation({
      query: ({ orderId, data }) => ({
        url: `/admin/update-delivery/${orderId}`,
        method: "PUT",
        body: data,
      }),
      // Invalidates relevant caches after a successful update
      invalidatesTags: ["Orders", "Notification"],
    }),

    // Mutation to update payment status by admin
    updatePaymentStatusByAdmin: builder.mutation({
      query: ({ orderId, data }) => ({
        url: `/admin/update-payment/${orderId}`,
        method: "PUT",
        body: data,
      }),
      // Invalidates relevant caches after a successful update
      invalidatesTags: ["Orders", "Notification"],
    }),
  }),
});

// Destructure the generated hooks for ease of use
export const {
  usePlaceOrderMutation,
  useGetMyOrdersQuery,
  useGetAllOrdersForAdminQuery,
  useUpdateOrderStatusByAdminMutation,
  useUpdateDeliveryStatusByAdminMutation,
  useUpdatePaymentStatusByAdminMutation,
} = ORDER_API;
