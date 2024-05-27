import { apiSlice } from "../apiSlice";

export const { injectEndpoints } = apiSlice;

export const MAIN_MEAL_MENU_API = injectEndpoints({
  // Define API endpoints
  endpoints: (builder) => ({
    // Mutation to create a Main Meal Menu (specifically for admin users)
    createMainMealMenu: builder.mutation({
      query: (data) => ({
        url: "/main-meal-menus",
        method: "POST",
        body: data,
      }),
      // Invalidates the cache for "MainMealMenus" and "AdminMainMealMenus" after a successful creation
      invalidatesTags: ["MainMealMenus", "AdminMainMealMenus"],
    }),

    // Query to get all Main Meal Menus (for users)
    getAllMainMealMenusForUsers: builder.mutation({
      query: ({ data, lang }) => ({
        url: `/get-main-meal-menus?langCode=${lang}`,
        method: "POST",
        body: data,
      }),
      // Provides the cache tag for "MainMealMenus" for better caching
      providesTags: ["MainMealMenus"],
    }),

    // Query to get all Previous Main Meal Menus (specifically for admin users)
    getAllMainMealMenusForAdmin: builder.query({
      query: ({ lang, showPerPage, pageNo, searchKeyword }) =>
        `/main-meal-menus/admin?langCode=${lang}&showPerPage=${showPerPage}&pageNo=${pageNo}&searchKeyword=${searchKeyword}`,
      // Provides the cache tag for "AdminMainMealMenus" for better caching
      providesTags: ["AdminMainMealMenus"],
    }),

    // Query to get Single Main Meal Menu by ID
    getMainMealMenuById: builder.query({
      query: ({ id }) => `/main-meal-menus/${id}`,
      // Provides the cache tag for "MainMealMenu" for better caching
      providesTags: ["MainMealMenu"],
    }),

    // Mutation to update Main Meal Menu by ID (specifically for admin users)
    updateMainMealMenu: builder.mutation({
      query: ({ id, data }) => ({
        url: `/main-meal-menus/${id}`,
        method: "PUT",
        body: data,
      }),
      // Invalidates the cache for "MainMealMenu" after a successful update
      invalidatesTags: ["MainMealMenu"],
    }),

    // Mutation to delete Main Meal Menu by ID (specifically for admin users)
    deleteMainMealMenu: builder.mutation({
      query: (id) => ({
        url: `/main-meal-menus/${id}`,
        method: "DELETE",
      }),
      // Invalidates the cache for "MainMealMenus" and "AdminMainMealMenus" after a successful deletion
      invalidatesTags: ["MainMealMenus", "AdminMainMealMenus"],
    }),
  }),
});

// Destructure the generated hooks for ease of use
export const {
  useCreateMainMealMenuMutation,
  useGetAllMainMealMenusForUsersMutation,
  useGetAllMainMealMenusForAdminQuery,
  useGetMainMealMenuByIdQuery,
  useUpdateMainMealMenuMutation,
  useDeleteMainMealMenuMutation,
} = MAIN_MEAL_MENU_API;
