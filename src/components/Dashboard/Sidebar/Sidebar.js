"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { useState } from "react";
import { BiFoodMenu, BiFoodTag } from "react-icons/bi";
import {
  FaCalculator,
  FaCartArrowDown,
  FaQq,
  FaRegUser,
  FaUsersCog,
} from "react-icons/fa";
import { FaBowlFood, FaCartFlatbed } from "react-icons/fa6";
import { GiHotMeal, GiNotebook } from "react-icons/gi";
import { ImBlogger2 } from "react-icons/im";
import { IoIosNotifications } from "react-icons/io";
import {
  MdArrowForwardIos,
  MdManageHistory,
  MdOutlineManageSearch,
  MdOutlinePolicy,
} from "react-icons/md";
import { PiBowlFoodFill } from "react-icons/pi";
import { RiUserStarFill } from "react-icons/ri";
import { RxCross1 } from "react-icons/rx";
import { TbDiscountCheckFilled } from "react-icons/tb";
import "./Sidebar.css";

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const { locale } = useParams();

  // Getting user session
  const session = useSession();

  const userRole = session?.data?.user?.role;

  const isLoggedIn = true;

  const pathname = usePathname();

  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);

  const handleDropdown = (index) => {
    if (openDropdownIndex === index) {
      setOpenDropdownIndex(null);
    } else {
      setOpenDropdownIndex(index);
    }
  };

  const handleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <aside
      className={`app-side-bar bg-white shadow animate-fade-in-left ${
        sidebarOpen ? "d-none" : ""
      }`}>
      <div onClick={handleSidebar} className='cross_icon'>
        <button>
          <RxCross1 />
        </button>
      </div>
      <div className='logo'>
        <Link href='/'>
          {" "}
          <Image
            src='/assets/logoOne.png'
            alt='LOGO'
            width={150}
            height={120}
            style={{
              width: "100%",
              height: "auto",
            }}
          />
        </Link>
      </div>
      {/* begin:sidebar content */}
      <div className='sidebar-content'>
        {userRole === "user" && (
          <>
            {/* begin: user Profile route */}
            <div className='single-item'>
              <Link href='/user/dashboard/profile'>
                <div
                  className={`menu ${
                    pathname === `/${locale}/user/dashboard/profile`
                      ? "menuActive_bg"
                      : ""
                  }`}>
                  <div className='d-flex align-items-center column-gap-2'>
                    <div
                      className={`side-bar-icon ${
                        pathname === `/${locale}/user/dashboard/profile` ||
                        pathname === `/${locale}/user/dashboard`
                          ? "active"
                          : ""
                      }`}>
                      <FaRegUser />
                    </div>
                    <h4 className='menu-text'>My Profile</h4>
                  </div>
                </div>
              </Link>
            </div>
            {/* end: User Profile route */}

            {/* begin: User Orders route */}
            <div className='single-item'>
              <Link href='/user/dashboard/my-orders'>
                <div
                  className={`menu ${
                    pathname === `/${locale}/user/dashboard/my-orders`
                      ? "menuActive_bg"
                      : ""
                  }`}>
                  <div className='d-flex align-items-center column-gap-2'>
                    <div
                      className={`side-bar-icon ${
                        pathname === `/${locale}/user/dashboard/my-orders`
                          ? "active"
                          : ""
                      }`}>
                      <FaCartFlatbed />
                    </div>
                    <h4 className='menu-text'>My Orders</h4>
                  </div>
                </div>
              </Link>
            </div>
            {/* end: User Orders route */}
            {/* begin: User my session route */}
            <div className='single-item'>
              <Link href='/user/dashboard/my-session'>
                <div
                  className={`menu ${
                    pathname === `/${locale}/user/dashboard/my-session`
                      ? "menuActive_bg"
                      : ""
                  }`}>
                  <div className='d-flex align-items-center column-gap-2'>
                    <div
                      className={`side-bar-icon ${
                        pathname === `/${locale}/user/dashboard/my-session`
                          ? "active"
                          : ""
                      }`}>
                      <MdManageHistory />
                    </div>
                    <h4 className='menu-text'>My Session</h4>
                  </div>
                </div>
              </Link>
            </div>
            {/* end: User my session route*/}
          </>
        )}

        {/* end: admin home route */}
        {/* ================ Routes for admin user ================ */}
        {userRole === "admin" && (
          <>
            {/* begin: Admin Profile route */}
            <div className='single-item'>
              <Link href='/admin/dashboard/profile'>
                <div
                  className={`menu ${
                    pathname === `/${locale}/admin/dashboard/profile`
                      ? "menuActive_bg"
                      : ""
                  }`}>
                  <div className='d-flex align-items-center column-gap-2'>
                    <div
                      className={`side-bar-icon ${
                        pathname === `/${locale}/admin/dashboard/profile` ||
                        pathname === `/${locale}/admin/dashboard`
                          ? "active"
                          : ""
                      }`}>
                      <FaRegUser />
                    </div>
                    <h4 className='menu-text'>My Profile</h4>
                  </div>
                </div>
              </Link>
            </div>
            {/* end: Admin Profile route */}

            {/* begin: Admin Orders route */}
            <div className='single-item'>
              <Link href='/admin/dashboard/my-orders'>
                <div
                  className={`menu ${
                    pathname === `/${locale}/admin/dashboard/my-orders`
                      ? "menuActive_bg"
                      : ""
                  }`}>
                  <div className='d-flex align-items-center column-gap-2'>
                    <div
                      className={`side-bar-icon ${
                        pathname === `/${locale}/admin/dashboard/my-orders`
                          ? "active"
                          : ""
                      }`}>
                      <FaCartFlatbed />
                    </div>
                    <h4 className='menu-text'>My Orders</h4>
                  </div>
                </div>
              </Link>
            </div>
            {/* end: Admin Orders route */}

            {/* begin: manage users menu */}
            <div className='single-item'>
              <div
                onClick={() => handleDropdown(2)}
                className={`menu ${
                  pathname ===
                  `/${locale}/admin/dashboard/manage-users/all-users`
                    ? "menuActive_bg"
                    : ""
                }`}>
                <div className='d-flex align-items-center column-gap-2'>
                  <div
                    className={`side-bar-icon ${
                      pathname ===
                      `/${locale}/admin/dashboard/manage-users/all-users`
                        ? "active"
                        : ""
                    }`}>
                    <FaUsersCog />
                  </div>
                  <h4 className='menu-text'>Manage Users</h4>
                </div>
                <div
                  className={`menu-arrow ${
                    openDropdownIndex === 2 ? "rotate" : ""
                  }`}>
                  <MdArrowForwardIos />
                </div>
              </div>
              <div
                className={`sub-menu ${
                  openDropdownIndex === 2
                    ? "submenu-height animate-fade-in-up"
                    : ""
                }`}>
                <Link href='/admin/dashboard/manage-users/all-users'>
                  <div
                    className={`item ${
                      pathname ===
                      `/${locale}/admin/dashboard/manage-users/all-users`
                        ? "active-item"
                        : ""
                    }`}>
                    All Users
                  </div>
                </Link>
              </div>
            </div>
            {/* end: manage users menu  */}

            {/* begin: Weekly meals route */}
            <div className='single-item'>
              <div
                onClick={() => handleDropdown(3)}
                className={`menu ${
                  pathname === `/${locale}/admin/dashboard/weekly-meals`
                    ? "menuActive_bg"
                    : ""
                }`}>
                <div className='d-flex align-items-center column-gap-2'>
                  <div
                    className={`side-bar-icon ${
                      pathname === `/${locale}/admin/dashboard/weekly-meals` ||
                      pathname ===
                        `/${locale}/admin/dashboard/weekly-meals/add-weekly-meals`
                        ? "active"
                        : ""
                    }`}>
                    <GiHotMeal />
                  </div>
                  <h4 className='menu-text'>Manage Weekly Meals</h4>
                </div>
                <div
                  className={`menu-arrow ${
                    openDropdownIndex === 3 ? "rotate" : ""
                  }`}>
                  <MdArrowForwardIos />
                </div>
              </div>
              <div
                className={`sub-menu ${
                  openDropdownIndex === 3
                    ? "submenu-height animate-fade-in-up"
                    : ""
                }`}>
                <Link href='/admin/dashboard/weekly-meals/add-weekly-meals'>
                  <div
                    className={`item ${
                      pathname ===
                      `/${locale}/admin/dashboard/weekly-meals/add-weekly-meals`
                        ? "active-item"
                        : ""
                    }`}>
                    Add Weekly Meals
                  </div>
                </Link>
                <Link href='/admin/dashboard/weekly-meals/running-weekly-meals'>
                  <div
                    className={`item ${
                      pathname ===
                      "/admin/dashboard/weekly-meals/running-weekly-meals"
                        ? "active-item"
                        : ""
                    }`}>
                    Running Week Meals
                  </div>
                </Link>
                <Link href='/admin/dashboard/weekly-meals/upcoming-weekly-meals'>
                  <div
                    className={`item ${
                      pathname ===
                      `/${locale}/admin/dashboard/weekly-meals/upcoming-weekly-meals`
                        ? "active-item"
                        : ""
                    }`}>
                    Up Coming Weekly Meals
                  </div>
                </Link>
                <Link href='/admin/dashboard/weekly-meals/expired-weekly-meals'>
                  <div
                    className={`item ${
                      pathname ===
                      `/${locale}/admin/dashboard/weekly-meals/expired-weekly-meals`
                        ? "active-item"
                        : ""
                    }`}>
                    Expired Weekly Meals
                  </div>
                </Link>
              </div>
            </div>
            {/* end: Weekly meals route  */}

            {/* begin: Main meals route */}
            <div className='single-item'>
              <div
                onClick={() => handleDropdown(4)}
                className={`menu ${
                  pathname === `/${locale}/admin/dashboard/main-meals`
                    ? "menuActive_bg"
                    : ""
                }`}>
                <div className='d-flex align-items-center column-gap-2'>
                  <div
                    className={`side-bar-icon ${
                      pathname === `/${locale}/admin/dashboard/main-meals` ||
                      pathname ===
                        `/${locale}/admin/dashboard/main-meals/all-main-meals` ||
                      pathname ===
                        `/${locale}/admin/dashboard/main-meals/add-main-meal`
                        ? "active"
                        : ""
                    }`}>
                    <PiBowlFoodFill />
                  </div>
                  <h4 className='menu-text'>Manage Main Meals</h4>
                </div>
                <div
                  className={`menu-arrow ${
                    openDropdownIndex === 4 ? "rotate" : ""
                  } `}>
                  <MdArrowForwardIos />
                </div>
              </div>
              <div
                className={`sub-menu ${
                  openDropdownIndex === 4
                    ? "submenu-height animate-fade-in-up"
                    : ""
                }`}>
                <Link href='/admin/dashboard/main-meals/add-main-meal'>
                  <div
                    className={`item ${
                      pathname ===
                      `/${locale}/admin/dashboard/main-meals/add-main-meal`
                        ? "active-item"
                        : ""
                    }`}>
                    Add Main Meals
                  </div>
                </Link>

                <Link href='/admin/dashboard/main-meals/all-main-meals'>
                  <div
                    className={`item ${
                      pathname ===
                      `/${locale}/admin/dashboard/main-meals/all-main-meals`
                        ? "active-item"
                        : ""
                    }`}>
                    All Main Meals
                  </div>
                </Link>
              </div>
            </div>
            {/* end: Main meals route  */}

            {/* begin: Offered meals route */}
            <div className='single-item'>
              <div
                onClick={() => handleDropdown(5)}
                className={`menu ${
                  pathname === `/${locale}/admin/dashboard/offered-meals`
                    ? "menuActive_bg"
                    : ""
                }`}>
                <div className='d-flex align-items-center column-gap-2'>
                  <div
                    className={`side-bar-icon ${
                      pathname === `/${locale}/admin/dashboard/offered-meals`
                        ? "active"
                        : ""
                    }`}>
                    <FaBowlFood />
                  </div>
                  <h4 className='menu-text'>Manage Offered Meals</h4>
                </div>
                <div
                  className={`menu-arrow ${
                    openDropdownIndex === 5 ? "rotate" : ""
                  } `}>
                  <MdArrowForwardIos />
                </div>
              </div>
              <div
                className={`sub-menu ${
                  openDropdownIndex === 5
                    ? "submenu-height animate-fade-in-up"
                    : ""
                }`}>
                <Link href='/admin/dashboard/offered-meals/add-offered-meal'>
                  <div
                    className={`item ${
                      pathname ===
                      `/${locale}/admin/dashboard/offered-meals/add-offered-meal`
                        ? "active-item"
                        : ""
                    }`}>
                    Add Offered Meals
                  </div>
                </Link>
                <Link href='/admin/dashboard/offered-meals/all-offered-meals'>
                  <div
                    className={`item ${
                      pathname ===
                      `/${locale}/admin/dashboard/offered-meals/all-offered-meals`
                        ? "active-item"
                        : ""
                    }`}>
                    All Offered Meals List
                  </div>
                </Link>
              </div>
            </div>
            {/* end: Offered meals route */}

            {/* begin: Customized meals route */}
            <div className='single-item'>
              <div
                onClick={() => handleDropdown(10)}
                className={`menu ${
                  pathname === `/${locale}/admin/dashboard/customized-meals`
                    ? "menuActive_bg"
                    : ""
                }`}>
                <div className='d-flex align-items-center column-gap-2'>
                  <div
                    className={`side-bar-icon ${
                      pathname === `/${locale}/admin/dashboard/customized-meals`
                        ? "active"
                        : ""
                    }`}>
                    <FaBowlFood />
                  </div>
                  <h4 className='menu-text'>Manage Customized Meals</h4>
                </div>
                <div
                  className={`menu-arrow ${
                    openDropdownIndex === 10 ? "rotate" : ""
                  } `}>
                  <MdArrowForwardIos />
                </div>
              </div>
              <div
                className={`sub-menu ${
                  openDropdownIndex === 10
                    ? "submenu-height animate-fade-in-up"
                    : ""
                }`}>
                <Link href='/admin/dashboard/customized-meals/add-customized-meals'>
                  <div
                    className={`item ${
                      pathname ===
                      `/${locale}/admin/dashboard/customized-meals/add-customized-meals`
                        ? "active-item"
                        : ""
                    }`}>
                    Add Customized Meals
                  </div>
                </Link>
                <Link href='/admin/dashboard/customized-meals/all-customized-meals'>
                  <div
                    className={`item ${
                      pathname ===
                      `/${locale}/admin/dashboard/customized-meals/all-customized-meals`
                        ? "active-item"
                        : ""
                    }`}>
                    All Customized Meals
                  </div>
                </Link>
              </div>
            </div>
            {/* end: Customized meals route */}

            {/* begin: Meal Preference route */}
            <div className='single-item'>
              <Link href='/admin/dashboard/manage-preference'>
                <div
                  className={`menu ${
                    pathname === `/${locale}/admin/dashboard/manage-preference`
                      ? "menuActive_bg"
                      : ""
                  }`}>
                  <div className='d-flex align-items-center column-gap-2'>
                    <div
                      className={`side-bar-icon ${
                        pathname ===
                        `/${locale}/admin/dashboard/manage-preference`
                          ? "active"
                          : ""
                      }`}>
                      <BiFoodMenu />
                    </div>
                    <h4 className='menu-text'>Manage Preferences</h4>
                  </div>
                </div>
              </Link>
            </div>
            {/* end: Meal Preference route */}

            {/* begin: Number Of Meal Per Week route */}
            <div className='single-item'>
              <Link href='/admin/dashboard/manage-meal-per-day'>
                <div
                  className={`menu ${
                    pathname ===
                    `/${locale}/admin/dashboard/manage-meal-per-day`
                      ? "menuActive_bg"
                      : ""
                  }`}>
                  <div className='d-flex align-items-center column-gap-2'>
                    <div
                      className={`side-bar-icon ${
                        pathname ===
                        `/${locale}/admin/dashboard/manage-meal-per-day`
                          ? "active"
                          : ""
                      }`}>
                      <BiFoodTag />
                    </div>
                    <h4 className='menu-text'>Manage Meals Per Day</h4>
                  </div>
                </div>
              </Link>
            </div>
            {/* end: Number Of Meal Per Week route */}

            {/* begin: Manage Meal Type route */}
            <div className='single-item'>
              <Link href='/admin/dashboard/manage-meal-type'>
                <div
                  className={`menu ${
                    pathname === `/${locale}/admin/dashboard/manage-meal-type`
                      ? "menuActive_bg"
                      : ""
                  }`}>
                  <div className='d-flex align-items-center column-gap-2'>
                    <div
                      className={`side-bar-icon ${
                        pathname ===
                        `/${locale}/admin/dashboard/manage-meal-type`
                          ? "active"
                          : ""
                      }`}>
                      <MdOutlineManageSearch />
                    </div>
                    <h4 className='menu-text'>Manage Meal Types</h4>
                  </div>
                </div>
              </Link>
            </div>
            {/* end: Manage Meal Type route */}

            {/* begin: Manage Orders route */}
            <div className='single-item'>
              <Link href='/admin/dashboard/manage-orders'>
                <div
                  className={`menu ${
                    pathname === `{/${locale}/admin/dashboard/manage-orders`
                      ? "menuActive_bg"
                      : ""
                  }`}>
                  <div className='d-flex align-items-center column-gap-2'>
                    <div
                      className={`side-bar-icon ${
                        pathname === `/${locale}/admin/dashboard/manage-orders`
                          ? "active"
                          : ""
                      }`}>
                      <FaCartArrowDown />
                    </div>
                    <h4 className='menu-text'>
                      <h4 className='menu-text'>Manage Orders</h4>
                    </h4>
                  </div>
                </div>
              </Link>
            </div>
            {/* end: Manage Orders route */}

            {/* begin: manage calculators route */}
            <div className='single-item'>
              <Link href='/admin/dashboard/manage-calculators'>
                <div
                  className={`menu ${
                    pathname === `/${locale}/admin/dashboard/manage-calculators`
                      ? "menuActive_bg"
                      : ""
                  }`}>
                  <div className='d-flex align-items-center column-gap-2'>
                    <div
                      className={`side-bar-icon ${
                        pathname ===
                        `/${locale}/admin/dashboard/manage-calculators`
                          ? "active"
                          : ""
                      }`}>
                      <FaCalculator />
                    </div>
                    <h4 className='menu-text'>Manage Calculators</h4>
                  </div>
                </div>
              </Link>
            </div>
            {/* end: manage calculators route */}

            {/* begin: Manage Discount route */}
            <div className='single-item'>
              <Link href='/admin/dashboard/manage-discount'>
                <div
                  className={`menu ${
                    pathname === `/${locale}/admin/dashboard/manage-discount`
                      ? "menuActive_bg"
                      : ""
                  }`}>
                  <div className='d-flex align-items-center column-gap-2'>
                    <div
                      className={`side-bar-icon ${
                        pathname ===
                        `/${locale}/admin/dashboard/manage-discount`
                          ? "active"
                          : ""
                      }`}>
                      <TbDiscountCheckFilled />
                    </div>
                    <h4 className='menu-text'>Manage Discounts</h4>
                  </div>
                </div>
              </Link>
            </div>
            {/* end: Manage Discount route */}

            {/* begin: manage session route */}
            <div className='single-item'>
              <Link href='/admin/dashboard/manage-session'>
                <div
                  className={`menu ${
                    pathname === `/${locale}/admin/dashboard/manage-session`
                      ? "menuActive_bg"
                      : ""
                  }`}>
                  <div className='d-flex align-items-center column-gap-2'>
                    <div
                      className={`side-bar-icon ${
                        pathname === `/${locale}/admin/dashboard/manage-session`
                          ? "active"
                          : ""
                      }`}>
                      <MdManageHistory />
                    </div>
                    <h4 className='menu-text'>Manage Sessions</h4>
                  </div>
                </div>
              </Link>
            </div>
            {/* end: manage session route */}

            {/* begin: Manage Coach route */}
            <div className='single-item'>
              <div
                onClick={() => handleDropdown(6)}
                className={`menu ${
                  pathname ===
                  `/${locale}/admin/dashboard/manage-coach/add-coach`
                    ? "menuActive_bg"
                    : ""
                }`}>
                <div className='d-flex align-items-center column-gap-2'>
                  <div
                    className={`side-bar-icon ${
                      pathname ===
                      `/${locale}/admin/dashboard/manage-coach/add-coach`
                        ? "active"
                        : ""
                    }`}>
                    <RiUserStarFill />
                  </div>
                  <h4 className='menu-text'>Manage Coach</h4>
                </div>
                <div
                  className={`menu-arrow ${
                    openDropdownIndex === 6 ? "rotate" : ""
                  } `}>
                  <MdArrowForwardIos />
                </div>
              </div>
              <div
                className={`sub-menu ${
                  openDropdownIndex === 6
                    ? "submenu-height animate-fade-in-up"
                    : ""
                }`}>
                <Link href='/admin/dashboard/manage-coach/add-coach'>
                  <div
                    className={`item ${
                      pathname ===
                      `/${locale}/admin/dashboard/manage-coach/add-coach`
                        ? "active-item"
                        : ""
                    }`}>
                    Add Coach
                  </div>
                </Link>
                <Link href='/admin/dashboard/manage-coach/all-coach'>
                  <div
                    className={`item ${
                      pathname ===
                      `/${locale}/admin/dashboard/manage-coach/all-coach`
                        ? "active-item"
                        : ""
                    }`}>
                    All Coach List
                  </div>
                </Link>
              </div>
            </div>
            {/* end: Manage Coach route  */}

            {/* begin: Manage Blog route */}
            <div className='single-item'>
              <div
                onClick={() => handleDropdown(7)}
                className={`menu ${
                  pathname === `/${locale}/admin/dashboard/manage-blog/add-blog`
                    ? "menuActive_bg"
                    : ""
                }`}>
                <div className='d-flex align-items-center column-gap-2'>
                  <div
                    className={`side-bar-icon ${
                      pathname ===
                      `/${locale}/admin/dashboard/manage-blog/add-blog`
                        ? "active"
                        : ""
                    }`}>
                    <ImBlogger2 />
                  </div>
                  <h4 className='menu-text'>Manage Blogs</h4>
                </div>
                <div
                  className={`menu-arrow ${
                    openDropdownIndex === 7 ? "rotate" : ""
                  }`}>
                  <MdArrowForwardIos />
                </div>
              </div>
              <div
                className={`sub-menu ${
                  openDropdownIndex === 7
                    ? "submenu-height animate-fade-in-up"
                    : ""
                }`}>
                <Link href='/admin/dashboard/manage-blog/add-blog'>
                  <div
                    className={`item ${
                      pathname ===
                      `/${locale}/admin/dashboard/manage-blog/add-blog`
                        ? "active-item"
                        : ""
                    }`}>
                    Add Blogs
                  </div>
                </Link>
                <Link href='/admin/dashboard/manage-blog/list-of-blogs'>
                  <div
                    className={`item ${
                      pathname ===
                      `/${locale}/admin/dashboard/manage-blog/list-of-blogs`
                        ? "active-item"
                        : ""
                    }`}>
                    All Blogs
                  </div>
                </Link>
              </div>
            </div>
            {/* end: Manage Blog route  */}

            {/* begin: send push notification route */}
            <div className='single-item'>
              <Link href='/admin/dashboard/push-notification'>
                <div
                  className={`menu ${
                    pathname === `/${locale}/admin/dashboard/push-notification`
                      ? "menuActive_bg"
                      : ""
                  }`}>
                  <div className='d-flex align-items-center column-gap-2'>
                    <div
                      className={`side-bar-icon ${
                        pathname ===
                        `/${locale}/admin/dashboard/push-notification`
                          ? "active"
                          : ""
                      }`}>
                      <IoIosNotifications />
                    </div>
                    <h4 className='menu-text'>Push Notification</h4>
                  </div>
                </div>
              </Link>
            </div>
            {/* end: send push notification route  */}

            {/* begin: Manage Home Banner route  */}
            <div className='single-item'>
              <div
                onClick={() => handleDropdown(8)}
                className={`menu ${
                  pathname ===
                  `/${locale}/admin/dashboard/manage-banner/add-banner`
                    ? "menuActive_bg"
                    : ""
                }`}>
                <div className='d-flex align-items-center column-gap-2'>
                  <div
                    className={`side-bar-icon ${
                      pathname ===
                        `/${locale}/admin/dashboard/manage-banner/add-banner` ||
                      pathname ===
                        `/${locale}/admin/dashboard/manage-banner/all-banners`
                        ? "active"
                        : ""
                    }`}>
                    <ImBlogger2 />
                  </div>
                  <h4 className='menu-text'>Manage Banner</h4>
                </div>
                <div
                  className={`menu-arrow ${
                    openDropdownIndex === 8 ? "rotate" : ""
                  }`}>
                  <MdArrowForwardIos />
                </div>
              </div>
              <div
                className={`sub-menu ${
                  openDropdownIndex === 8
                    ? "submenu-height animate-fade-in-up"
                    : ""
                }`}>
                <Link href='/admin/dashboard/manage-banner/add-banner'>
                  <div
                    className={`item ${
                      pathname ===
                      `/${locale}/admin/dashboard/manage-banner/add-banner`
                        ? "active-item"
                        : ""
                    }`}>
                    Add Banner
                  </div>
                </Link>
                <Link href='/admin/dashboard/manage-banner/all-banners'>
                  <div
                    className={`item ${
                      pathname ===
                      `/${locale}/admin/dashboard/manage-banner/all-banners`
                        ? "active-item"
                        : ""
                    }`}>
                    All Banners
                  </div>
                </Link>
              </div>
            </div>
            {/* end: Manage Home Banner route  */}

            {/* begin: manage-faq route */}
            <div className='single-item'>
              <div
                onClick={() => handleDropdown(9)}
                className={`menu ${
                  pathname === `/${locale}/admin/dashboard/manage-faq/add-faq`
                    ? "menuActive_bg"
                    : ""
                }`}>
                <div className='d-flex align-items-center column-gap-2'>
                  <div
                    className={`side-bar-icon ${
                      pathname ===
                        `/${locale}/admin/dashboard/manage-faq/add-faq` ||
                      pathname ===
                        `/${locale}/admin/dashboard/manage-faq/all-faq`
                        ? "active"
                        : ""
                    }`}>
                    <FaQq />
                  </div>
                  <h4 className='menu-text'>Manage FAQ</h4>
                </div>
                <div
                  className={`menu-arrow ${
                    openDropdownIndex === 9 ? "rotate" : ""
                  }`}>
                  <MdArrowForwardIos />
                </div>
              </div>
              <div
                className={`sub-menu ${
                  openDropdownIndex === 9
                    ? "submenu-height animate-fade-in-up"
                    : ""
                }`}>
                <Link href='/admin/dashboard/manage-faq/add-faq'>
                  <div
                    className={`item ${
                      pathname ===
                      `/${locale}/admin/dashboard/manage-faq/add-faq`
                        ? "active-item"
                        : ""
                    }`}>
                    Add FAQ
                  </div>
                </Link>
                <Link href='/admin/dashboard/manage-faq/all-faq'>
                  <div
                    className={`item ${
                      pathname ===
                      `/${locale}/admin/dashboard/manage-faq/all-faq`
                        ? "active-item"
                        : ""
                    }`}>
                    All FAQ
                  </div>
                </Link>
              </div>
            </div>
            {/* end: manage-faq route  */}

            {/* begin: privacy-policy route */}
            <div className='single-item'>
              <div
                onClick={() => handleDropdown(20)}
                className={`menu ${
                  pathname ===
                  `/${locale}/admin/dashboard/manage-privacy-policy/add-policy`
                    ? "menuActive_bg"
                    : ""
                }`}>
                <div className='d-flex align-items-center column-gap-2'>
                  <div
                    className={`side-bar-icon ${
                      pathname ===
                        `/${locale}/admin/dashboard/manage-privacy-policy/add-policy` ||
                      pathname ===
                        `/${locale}/admin/dashboard/manage-privacy-policy/all-policy`
                        ? "active"
                        : ""
                    }`}>
                    <MdOutlinePolicy />
                  </div>
                  <h4 className='menu-text'>Manage Privacy Policy</h4>
                </div>
                <div
                  className={`menu-arrow ${
                    openDropdownIndex === 20 ? "rotate" : ""
                  }`}>
                  <MdArrowForwardIos />
                </div>
              </div>
              <div
                className={`sub-menu ${
                  openDropdownIndex === 20
                    ? "submenu-height animate-fade-in-up"
                    : ""
                }`}>
                <Link href='/admin/dashboard/manage-privacy-policy/add-policy'>
                  <div
                    className={`item ${
                      pathname ===
                      `/${locale}/admin/dashboard/manage-privacy-policy/add-policy`
                        ? "active-item"
                        : ""
                    }`}>
                    Add Privacy Policy
                  </div>
                </Link>
              </div>
            </div>
            {/* end: privacy-policy route  */}
            {/* begin: manage-terms-conditions route */}
            <div className='single-item'>
              <div
                onClick={() => handleDropdown(21)}
                className={`menu ${
                  pathname ===
                  `/${locale}/admin/dashboard/manage-terms-conditions/add-terms-conditions`
                    ? "menuActive_bg"
                    : ""
                }`}>
                <div className='d-flex align-items-center column-gap-2'>
                  <div
                    className={`side-bar-icon ${
                      pathname ===
                        `/${locale}/admin/dashboard/manage-terms-conditions/add-terms-conditions` ||
                      pathname ===
                        `/${locale}/admin/dashboard/manage-terms-conditions/all-terms-conditions`
                        ? "active"
                        : ""
                    }`}>
                    <GiNotebook />
                  </div>
                  <h4 className='menu-text'>Manage Terms Conditions</h4>
                </div>
                <div
                  className={`menu-arrow ${
                    openDropdownIndex === 21 ? "rotate" : ""
                  }`}>
                  <MdArrowForwardIos />
                </div>
              </div>
              <div
                className={`sub-menu ${
                  openDropdownIndex === 21
                    ? "submenu-height animate-fade-in-up"
                    : ""
                }`}>
                <Link href='/admin/dashboard/manage-terms-conditions/add-terms-conditions'>
                  <div
                    className={`item ${
                      pathname ===
                      `/${locale}/admin/dashboard/manage-terms-conditions/add-terms-conditions`
                        ? "active-item"
                        : ""
                    }`}>
                    Add Terms Conditions
                  </div>
                </Link>
              </div>
            </div>
            {/* end: manage-terms-conditions route  */}
          </>
        )}
      </div>
      {/* end:sidebar content */}
    </aside>
  );
}
