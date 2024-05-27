import { apiSlice } from "../apiSlice";

export const { injectEndpoints } = apiSlice;

export const NOTIFICATION_API = injectEndpoints({
  endpoints: (builder) => ({
    // Mutation to mark a notification as read
    markNotificationAsRead: builder.mutation({
      query: (id) => ({
        url: `/mark-as-read/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["Notification"], // Invalidates the cache for "Notification" after marking as read
    }),

    // Mutation to mark all notifications as read
    markAllNotificationsAsRead: builder.mutation({
      query: () => ({
        url: `/mark-all-as-read`,
        method: "PUT",
      }),
      invalidatesTags: ["Notification"], // Invalidates the cache for "Notification" after marking all as read
    }),

    // Query to get notifications
    getNotifications: builder.query({
      query: ({ limit }) => `/notifications?limit=${limit}`,
      providesTags: ["Notification"], // Provides the cache tag for "Notification" for better caching
    }),
  }),
});

// Destructure the generated hooks for ease of use
export const {
  useMarkNotificationAsReadMutation,
  useMarkAllNotificationsAsReadMutation,
  useGetNotificationsQuery,
} = NOTIFICATION_API;
