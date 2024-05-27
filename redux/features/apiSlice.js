import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  tagTypes: [
    /* For user endpoints */
    "Users",
    "User",

    /* For main meals endpoints */
    "MainMealMenus",
    "MainMealMenu",
    "AdminMainMealMenus",

    /* For number of days endpoints */
    "NumberOfDays",

    /* For meal per day endpoints */
    "MealsPerDay",

    /* For meal preference endpoints */
    "MealPreferences",
    "MealPreference",
    "MealPreferencesForAdmin",

    /* For meal type endpoints */
    "MealTypes",
    "MealType",

    /* For weekly meals endpoints */
    "WeeklyMealCategory",
    "WeeklyMealCategories",

    /* For weekly menu endpoints */
    "WeeklyMealMenu",
    "AdminWeeklyMealMenu",

    /* For blog endpoints */
    "Blog",
    "AdminBlog",

    /* For instructors endpoints */
    "Instructors",

    /* For Banner endpoints */
    "Banners",
    "VisibleBanners",

    /* For Offered Menu endpoints */
    "OfferedMeals",
    "AdminOfferedMeals",
    "OfferedMealById",
    "OfferedPackages",

    /* For Orders endpoints */
    "Orders",

    /* For Keto endpoints */
    "AdminKetoInput",
    "UserMacroCalc",

    /* For Carts endpoints */
    "AllCarts",

    /* For Custom Meals endpoints */
    "CustomizedMeals",

    /* For Notification endpoints */
    "Notification",

    /* For Discount endpoints */
    "DiscountsForOrder",

    /* For Book Session endpoints */
    "Sessions",

    /* For Admin Customized Meals endpoints */
    "CustomizedMealsAdmin",

    /* For Admin FAQ */
    "FAQ",

    /* For Admin Privacy Policy */
    "PrivacyPolicy",

    /* For Admin TermsAndConditions */
    "TermsAndConditions",
  ],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/api/v1",
    prepareHeaders: async (headers, { getState, endpoint }) => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        headers.set("Authorization", `${token}`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({}), // Endpoints will be injected here
});

export const { useLazyApiRequest } = apiSlice;

// Export the hook that will be used to inject endpoints in another file
export const { injectEndpoints } = apiSlice;
