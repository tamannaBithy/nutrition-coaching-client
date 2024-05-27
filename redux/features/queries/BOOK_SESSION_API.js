import { apiSlice } from "../apiSlice";

export const { injectEndpoints } = apiSlice;

export const BOOK_SESSION_API = injectEndpoints({
  // Define API endpoints
  endpoints: (builder) => ({
    createSession: builder.mutation({
      query: (data) => ({
        url: "/create-session",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Sessions"], // Invalidate the cache for 'Sessions' after a successful creation
    }),
    updateSessionById: builder.mutation({
      query: ({ id, data }) => ({
        url: `/update-session/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Sessions"], // Invalidate the cache for 'Sessions' after a successful update
    }),
    getAllSessions: builder.query({
      query: () => "/get-sessions",
      providesTags: ["Sessions"], // Provide cache tag 'Sessions' for better caching
    }),
    getUserSessions: builder.query({
      query: () => "/get-userSession",
    }),
  }),
});

// Destructure the generated hooks for ease of use
export const {
  useCreateSessionMutation,
  useUpdateSessionByIdMutation,
  useGetAllSessionsQuery,
  useGetUserSessionsQuery,
} = BOOK_SESSION_API;
