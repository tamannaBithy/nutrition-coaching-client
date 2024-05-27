import { apiSlice } from "../apiSlice";

export const { injectEndpoints } = apiSlice;

export const USER_API = injectEndpoints({
  // Define API endpoints
  endpoints: (builder) => ({
    // Mutation to update a user profile
    updateUserProfile: builder.mutation({
      query: (data) => ({
        url: "/update-user",
        method: "PUT",
        body: data,
      }),
      // Invalidates the cache for "Users" and "User" after a successful update
      invalidatesTags: ["Users", "User"],
    }),

    // Mutation to delete the user's own profile
    deleteUserOwnProfile: builder.mutation({
      query: () => ({
        url: "/delete-user",
        method: "DELETE",
      }),
      // Invalidates the cache for "Users" after a successful deletion
      invalidatesTags: ["Users"],
    }),

    // Query to get the user profile
    getUserProfile: builder.query({
      query: () => "/get-profile",
      // Provides the cache tag for "User" for better caching
      providesTags: ["User"],
    }),

    // Query to get all users
    getAllUsers: builder.query({
      query: ({ showPerPage, pageNo, searchKeyword }) =>
        `all-users?showPerPage=${showPerPage}&pageNo=${pageNo}&searchKeyword=${searchKeyword}`,
      // Provides the cache tag for "Users" for better caching
      providesTags: ["Users"],
    }),

    // Mutation to initiate the forget password otp process (To send OTP to user phone)
    forgetPasswordOtp: builder.mutation({
      query: (data) => ({
        url: "/forget-password-otp",
        method: "POST",
        body: data,
      }),
    }),

    // Mutation to verify the forget Password OTP
    verifyForgetPasswordOTP: builder.mutation({
      query: (otp) => ({
        url: `/forget-password-otp/${otp}`,
        method: "PUT",
      }),
    }),

    // Mutation to reset forget password
    resetForgetPassword: builder.mutation({
      query: (data) => ({
        url: "/reset-forget-password",
        method: "PUT",
        body: data,
      }),
    }),

    // Mutation to change the old password
    changeOldPassword: builder.mutation({
      query: (data) => ({
        url: "/change-password",
        method: "PUT",
        body: data,
      }),
    }),

    // Mutation to disable or enable a user by ID
    disableOrEnableUserById: builder.mutation({
      query: (userId) => ({
        url: `/disable-or-enable-user/${userId}`,
        method: "PUT",
      }),
      // Invalidates the cache for "Users" after a successful operation
      invalidatesTags: ["Users"],
    }),
  }),
});

// Destructure the generated hooks for ease of use
export const {
  useUpdateUserProfileMutation,
  useDeleteUserOwnProfileMutation,
  useGetUserProfileQuery,
  useGetAllUsersQuery,
  useForgetPasswordOtpMutation,
  useVerifyForgetPasswordOTPMutation,
  useResetForgetPasswordMutation,
  useChangeOldPasswordMutation,
  useDisableOrEnableUserByIdMutation,
} = USER_API;
