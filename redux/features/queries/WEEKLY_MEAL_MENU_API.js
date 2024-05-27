import { apiSlice } from "../apiSlice";

export const { injectEndpoints } = apiSlice;

export const WEEKLY_MEAL_MENU_API = injectEndpoints({
  endpoints: (builder) => ({
    // Mutation to create a Weekly Meal Menu (specifically for admin users)
    createWeeklyMealMenu: builder.mutation({
      query: (data) => ({
        url: "/weekly-meal-menus",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["WeeklyMealMenu", "AdminWeeklyMealMenu"], // Invalidates the cache for "WeeklyMealMenu" and "AdminWeeklyMealMenu" after creation
    }),

    // Query to get all Weekly Meal Menus
    getAllWeeklyMealMenus: builder.query({
      query: ({ lang }) => `/weekly-meal-menus?langCode=${lang}`,
      providesTags: ["WeeklyMealMenu"], // Provides the cache tag for "WeeklyMealMenu" for better caching
    }),

    // Query to get all Previous Weekly Meal Menus (specifically for admin users)
    getPreviousWeeklyMealMenus: builder.query({
      query: ({
        showPerPage,
        pageNo,
        unavailable_from_start,
        unavailable_from_end,
        lang,
        searchKeyword,
      }) =>
        `/weekly-meal-menus/previous?showPerPage=${showPerPage}&pageNo=${pageNo}&unavailable_from_start=${unavailable_from_start}&unavailable_from_end=${unavailable_from_end}&langCode=${lang}&searchKeyword=${searchKeyword}`,
      providesTags: ["AdminWeeklyMealMenu"], // Provides the cache tag for "AdminWeeklyMealMenu"
    }),

    // Query to get all Running Weekly Meal Menus (specifically for admin users)
    getRunningWeeklyMealMenus: builder.query({
      /* weekly-meal-menus/running?showPerPage=6&pageNo=1&langCode=en */
      query: ({ showPerPage, pageNo, lang, searchKeyword }) =>
        `/weekly-meal-menus/running?showPerPage=${showPerPage}&pageNo=${pageNo}&&langCode=${lang}&searchKeyword=${searchKeyword}`,
      providesTags: ["AdminWeeklyMealMenu"], // Provides the cache tag for "AdminWeeklyMealMenu"
    }),

    // Query to get all Upcoming Weekly Meal Menus (specifically for admin users)
    getUpcomingWeeklyMealMenus: builder.query({
      query: ({
        showPerPage,
        pageNo,
        available_from,
        unavailable_from,
        lang,
        searchKeyword,
      }) =>
        `/weekly-meal-menus/upcoming?showPerPage=${showPerPage}&pageNo=${pageNo}&available_from=${available_from}&unavailable_from=${unavailable_from}&langCode=${lang}&searchKeyword=${searchKeyword}`,
      providesTags: ["AdminWeeklyMealMenu"], // Provides the cache tag for "AdminWeeklyMealMenu"
    }),

    // Query to get Single Weekly Meal Menu
    getWeeklyMealMenuById: builder.query({
      query: (id) => `/weekly-meal-menus/${id}`,
      providesTags: ["AdminWeeklyMealMenu"], // Provides the cache tag for "AdminWeeklyMealMenu"
    }),

    // Mutation to delete Weekly Meal Menu (specifically for admin users)
    deleteWeeklyMealMenu: builder.mutation({
      query: (id) => ({
        url: `/weekly-meal-menus/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["WeeklyMealMenu", "AdminWeeklyMealMenu"], // Invalidates the cache for "WeeklyMealMenu" and "AdminWeeklyMealMenu" after deletion
    }),
  }),
});

// Destructure the generated hooks for ease of use
export const {
  useCreateWeeklyMealMenuMutation,
  useGetAllWeeklyMealMenusQuery,
  useGetPreviousWeeklyMealMenusQuery,
  useGetRunningWeeklyMealMenusQuery,
  useGetUpcomingWeeklyMealMenusQuery,
  useGetWeeklyMealMenuByIdQuery,
  useDeleteWeeklyMealMenuMutation,
} = WEEKLY_MEAL_MENU_API;
