"use client";

import LocaleSwitcher from "@/components/Common/LocaleSwitcher";
import { signOut, useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { FaShoppingCart } from "react-icons/fa";
import { useGetAllCartsQuery } from "../../../../../redux/features/queries/CART_API";
import "./Nav.css";

const Navbar = () => {
  const t = useTranslations("Navbar");

  const { locale } = useParams();

  const {
    data: allCarts,
    isLoading: allCartsLoading,
    isError: allCartsError,
  } = useGetAllCartsQuery();

  // User logged in or not status
  const session = useSession();

  return (
    <div className='px-0'>
      <div className='container container-fluid shadow-lg'>
        <div className='px-5'>
          <nav className='navbar fixed-top bg-white shadow-lg navbar-expand-xl'>
            <Link href='/' className='navbar-brand'>
              <Image
                src='/assets/logoOne.png'
                alt='GigaDiet Meals Logo'
                width={150}
                height={150}
                style={{
                  width: "100%",
                  height: "auto",
                }}
              />
            </Link>
            <button
              className='navbar-toggler py-1 px-2'
              type='button'
              data-bs-toggle='collapse'
              data-bs-target='#navbarCollapse'>
              <span className='navbar-toggler-icon'></span>
            </button>
            <div
              className='collapse text-center navbar-collapse  py-3'
              id='navbarCollapse'>
              <div className='navbar-nav position-relative mx-auto border-top'>
                <Link href={`/${locale}`} className='nav-item nav-link'>
                  {t("Home")}
                </Link>
                <Link href='/weekly-menu' className='nav-item nav-link'>
                  {t("WeeklyMenu")}
                </Link>
                <Link href='/our-plans' className='nav-item nav-link'>
                  {t("OurPlans")}
                </Link>
                <Link href='/offered-menu' className='nav-item nav-link'>
                  {t("OfferedMenu")}
                </Link>
                <Link href='/calculators' className='nav-item nav-link'>
                  {t("Calculators")}
                </Link>
                <Link href='/blogs' className='nav-item nav-link'>
                  {t("Blogs")}
                </Link>
                <Link href='/customized-meal' className='nav-item nav-link'>
                  {t("customizedMeals")}
                </Link>
                <Link href='/nutrition-coaching' className='nav-item nav-link'>
                  {t("NutritionCoaching")}
                </Link>
                <LocaleSwitcher />
              </div>

              <div className='d-flex align-items-center nav-right justify-content-center justify-content-xl-start flex-nowrap pt-xl-0'>
                {/* Rendering items based on the user login status */}
                {session?.data ? (
                  <div className='d-flex align-items-center column-gap-3 mt-4 mt-xl-0'>
                    <Link href='/cart' className='nav-item nav-link'>
                      <div className='cart_icon'>
                        <FaShoppingCart />
                        <div className='base_flag'>
                          <span>
                            {(allCarts?.data?.mainMealCart[0]?.menus?.length ||
                              0) +
                              (allCarts?.data?.offeredMealCart[0]?.menus
                                ?.length || 0)}
                          </span>
                        </div>
                      </div>
                    </Link>

                    <div className='nav-item dropdown'>
                      <Link
                        href='#'
                        className='nav-link dropdown-toggle'
                        data-bs-toggle='dropdown'>
                        <div className='profile'>
                          <Image
                            src='/assets/profile.png'
                            width={40}
                            height={40}
                            alt='Profile'
                          />
                        </div>
                      </Link>

                      <div
                        className={`dropdown-menu dropdown-menu2 m-0 bg-secondary rounded-0`}>
                        <Link
                          href={
                            session?.data?.user?.role === "admin"
                              ? "/admin/dashboard"
                              : "/user/dashboard"
                          }
                          className='dropdown-item'>
                          {t("Dashboard")}
                        </Link>
                        <button
                          className='dropdown-item'
                          onClick={() => signOut()}>
                          {t("Logout")}
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className='d-flex align-items-center column-gap-2'>
                    <Link href='/login' className='nav-item nav-link'>
                      <button className='nav_btn'> {t("Login")}</button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
