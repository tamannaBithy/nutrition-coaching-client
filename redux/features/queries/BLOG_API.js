import { apiSlice } from "../apiSlice";

export const { injectEndpoints } = apiSlice;

export const BLOG_API = injectEndpoints({
  endpoints: (builder) => ({
    // Mutation to create a blog (specifically for admin users)
    createBlog: builder.mutation({
      query: (data) => ({
        url: "/create-blog",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Blog"], // Invalidates the cache for "Blog" after creation
    }),

    // Mutation to update a blog (specifically for admin users)
    updateBlog: builder.mutation({
      query: ({ id, data }) => ({
        url: `/update-blog/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Blog"], // Invalidates the cache for "Blog" after update
    }),

    // Mutation to delete a blog (specifically for admin users)
    deleteBlog: builder.mutation({
      query: (id) => ({
        url: `/delete-blog/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Blog"], // Invalidates the cache for "Blog" after deletion
    }),

    // Query to get all blogs
    getAllBlogs: builder.query({
      query: ({ page, showPerPage, langCode, searchKeyword }) =>
        `get-blogs?pageNo=${page}&showPerPage=${showPerPage}&searchKeyword=${searchKeyword}&langCode=${langCode}`,
      providesTags: ["Blog"], // Provides the cache tag for "Blog" for better caching
    }),

    // Query to get all blogs for admin
    getAllBlogsForAdmin: builder.query({
      query: ({ pageNo, showPerPage, langCode, searchKeyword }) =>
        `get-blogs-admin?pageNo=${pageNo}&showPerPage=${showPerPage}&searchKeyword=${searchKeyword}&langCode=${langCode}`,
      providesTags: ["Blog"], // Provides the cache tag for "Blog" for better caching
    }),

    // Query to get a single blog
    getSingleBlog: builder.query({
      query: (id) => `/get-blog/${id}`,
      providesTags: ["Blog"], // Provides the cache tag for "Blog" for better caching
    }),
  }),
});

// Destructure the generated hooks for ease of use
export const {
  useCreateBlogMutation,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
  useGetAllBlogsQuery,
  useGetAllBlogsForAdminQuery,
  useGetSingleBlogQuery,
} = BLOG_API;
