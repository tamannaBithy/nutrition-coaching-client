import { apiSlice } from "../apiSlice";

export const { injectEndpoints } = apiSlice;

export const BANNER_API = injectEndpoints({
  // Define API endpoints
  endpoints: (builder) => ({
    // Mutation to create a banner (specifically for admin users)
    createBanner: builder.mutation({
      query: (data) => ({
        url: "/create-banner",
        method: "POST",
        body: data,
      }),
      // Invalidates the cache for "Banners" after a successful creation
      invalidatesTags: ["Banners", "VisibleBanners"],
    }),

    // Mutation to update a banner (specifically for admin users)
    updateBanner: builder.mutation({
      query: ({ id, data }) => ({
        url: `/update-banner/${id}`,
        method: "PUT",
        body: data,
      }),
      // Invalidates the cache for "Banners" after a successful update
      invalidatesTags: ["Banners"],
    }),

    // Mutation to delete a banner (specifically for admin users)
    deleteBanner: builder.mutation({
      query: (id) => ({
        url: `/delete-banner/${id}`,
        method: "DELETE",
      }),
      // Invalidates the cache for "Banners" after a successful deletion
      invalidatesTags: ["Banners"],
    }),

    // Query to get all banners (specifically for admin users)
    getAllBanners: builder.query({
      query: ({ lang }) => `/get-allBanners?langCode=${lang}`,
      // Provides the cache tag for "Banners" for better caching
      providesTags: ["Banners"],
    }),

    // Query to get visible banners
    getVisibleBanners: builder.query({
      query: ({ lang }) => `/get-visibleBanner?langCode=${lang}`,
      // Provides the cache tag for "VisibleBanners" for better caching
      providesTags: ["VisibleBanners"],
    }),
  }),
});

// Destructure the generated hooks for ease of use
export const {
  useCreateBannerMutation,
  useUpdateBannerMutation,
  useDeleteBannerMutation,
  useGetAllBannersQuery,
  useGetVisibleBannersQuery,
} = BANNER_API;
