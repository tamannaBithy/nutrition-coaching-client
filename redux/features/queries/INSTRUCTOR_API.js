import { apiSlice } from "../apiSlice";

export const { injectEndpoints } = apiSlice;

export const INSTRUCTOR_API = injectEndpoints({
  endpoints: (builder) => ({
    // Mutation to create an Instructor (specifically for admin users)
    createInstructor: builder.mutation({
      query: (data) => ({
        url: "/create-instructor",
        method: "POST",
        body: data,
      }),
      // Invalidates the cache for "Instructors" after a successful creation
      invalidatesTags: ["Instructors"],
    }),

    // Mutation to update an Instructor by ID (specifically for admin users)
    updateInstructor: builder.mutation({
      query: ({ id, data }) => ({
        url: `/update-instructor/${id}`,
        method: "PUT",
        body: data,
      }),
      // Invalidates the cache for "Instructors" after a successful update
      invalidatesTags: ["Instructors"],
    }),

    // Mutation to delete an Instructor by ID (specifically for admin users)
    deleteInstructor: builder.mutation({
      query: (id) => ({
        url: `/delete-instructor/${id}`,
        method: "DELETE",
      }),
      // Invalidates the cache for "Instructors" after a successful deletion
      invalidatesTags: ["Instructors"],
    }),

    // Query to get all Instructors
    getAllInstructors: builder.query({
      query: ({ showPerPage, pageNo, lang }) =>
        `/get-instructors?showPerPage=${showPerPage}&pageNo=${pageNo}&langCode=${lang}`,
      // Provides the cache tag for "Instructors" for better caching
      providesTags: ["Instructors"],
    }),

    // Query to get all Instructors (specifically for admin users)
    getAllInstructorsForAdmin: builder.query({
      query: ({ showPerPage, pageNo, lang, searchKeyword }) =>
        `/admin/get-instructors?showPerPage=${showPerPage}&pageNo=${pageNo}&langCode=${lang}&searchKeyword=${searchKeyword}`,
      // Provides the cache tag for "Instructors" for better caching
      providesTags: ["Instructors"],
    }),
  }),
});

// Destructure the generated hooks for ease of use
export const {
  useCreateInstructorMutation,
  useUpdateInstructorMutation,
  useDeleteInstructorMutation,
  useGetAllInstructorsQuery,
  useGetAllInstructorsForAdminQuery,
} = INSTRUCTOR_API;
