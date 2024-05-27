import moment from "moment";
import { signOut, useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import { CiClock2 } from "react-icons/ci";
import { FaLanguage, FaRegBell, FaRegUser } from "react-icons/fa";
import { GoArrowRight } from "react-icons/go";
import { LuLogOut } from "react-icons/lu";
import { RiMenu3Fill } from "react-icons/ri";
import {
  useGetNotificationsQuery,
  useMarkAllNotificationsAsReadMutation,
  useMarkNotificationAsReadMutation,
} from "../../../../redux/features/queries/NOTIFICATION_API";
import LocaleSwitcher from "../../Common/LocaleSwitcher";
import "./Header.css";

export default function Header({ sidebarOpen, setSidebarOpen }) {
  const t = useTranslations("Dashboard");

  // Extract lang parameter from URL
  const { locale } = useParams();

  // Fetch session information
  const session = useSession();

  const userRole = session?.data?.user?.role;

  // State variables for pagination
  const [notificationsLimit, setNotificationsLimit] = useState(5);

  // Fetch notifications data
  const {
    data: notifications,
    error: notificationsError,
    isLoading: notificationsLoading,
  } = useGetNotificationsQuery({
    limit: notificationsLimit,
  });

  // mark notification As Read Mutation
  const [markNotificationAsRead] = useMarkNotificationAsReadMutation();
  // mark notification As Read Mutation
  const [markAllNotificationsAsRead] = useMarkAllNotificationsAsReadMutation();

  // State variables and ref for dropdown
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);
  const dropdownRef = useRef(null);

  // Function to toggle sidebar
  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Function to handle dropdown visibility
  const handleHeaderDropdown = (index) => {
    if (openDropdownIndex === index) {
      setOpenDropdownIndex(null);
    } else {
      setOpenDropdownIndex(index);
    }
  };

  // Mark Notification As Read Update Handler
  const handleMarkNotificationAsReadUpdate = (markId) => {
    markNotificationAsRead(markId);
  };

  // Mark All Notification As Read Update Handler
  const handleMarkAllNotificationsAsReadUpdate = () => {
    markAllNotificationsAsRead();
  };

  const router = useRouter();

  // Handle sign out
  const signOutHandler = () => {
    signOut();
    router.push("/");
  };

  const loadMoreNotifications = () => {
    setNotificationsLimit((prevLimit) => prevLimit + 5);
  };

  return (
    <header className='d-flex shadow align-items-center justify-content-center'>
      <div className='container-fluid d-flex align-items-center justify-content-between px-4'>
        {/* begin: sidebar toggle & search area */}
        <div className='d-flex align-items-center column-gap-3'>
          <div onClick={handleSidebarToggle} className='toggle-button'>
            <RiMenu3Fill />
          </div>
        </div>
        {/* end: sidebar toggle & search area */}

        {/* Header right area */}
        <div className='d-flex align-items-center column-gap-4'>
          {/* begin: notification content */}
          <div className='notification' ref={dropdownRef}>
            <div className='icon' onClick={() => handleHeaderDropdown(2)}>
              <span className='badge'>{notifications?.unreadCount}</span>
              <FaRegBell />
            </div>

            <div
              className={`notification-content  ${
                openDropdownIndex === 2 ? "show animate-fade-in-up" : ""
              }`}>
              <div className='notification-header'>
                <h6>{t("Header.notifications.title")}</h6>
                <button onClick={handleMarkAllNotificationsAsReadUpdate}>
                  {t("Header.notifications.markAsReadAll")}
                </button>
              </div>
              <hr />
              {/* begin:notification single item */}

              {notifications &&
                notifications?.data?.map((notification, index) => (
                  <React.Fragment key={notification._id}>
                    <div
                      className='notification-item'
                      style={
                        !notification.mark_as_read
                          ? { backgroundColor: "#ddd" }
                          : {}
                      }>
                      <div className='order-icon'>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          width='20'
                          height='20'
                          viewBox='0 0 24 24'
                          fill='none'
                          stroke='currentColor'
                          strokeWidth='2'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          className='feather feather-alert-circle'>
                          <circle cx='12' cy='12' r='10'></circle>
                          <line x1='12' y1='8' x2='12' y2='12'></line>
                          <line x1='12' y1='16' x2='12.01' y2='16'></line>
                        </svg>
                      </div>
                      <div className='d-flex flex-column'>
                        <h6>{notification.title[locale]}</h6>
                        <span>{notification.description[locale]}</span>
                        <span className='d-flex align-items-center column-gap-1'>
                          <CiClock2 />
                          <div className='time'>
                            {moment(notification?.createdAt).format(
                              "h:mm:ss a"
                            )}
                          </div>
                        </span>
                        {!notification?.mark_as_read && (
                          <button
                            onClick={() =>
                              handleMarkNotificationAsReadUpdate(
                                notification?._id
                              )
                            }
                            type='button'
                            className='btn-mark-read'>
                            <small>
                              {t("Header.notifications.markAsRead")}
                            </small>
                          </button>
                        )}
                      </div>
                    </div>
                    {index !== notifications.data.length - 1 && <hr />}
                    <div></div>
                  </React.Fragment>
                ))}
              <div
                className='w-100 custom-cursor-icon p-2 text-center'
                onClick={loadMoreNotifications}>
                {t("Header.notifications.loadMore")}
                <GoArrowRight />
              </div>

              {/* end:notification single item */}
            </div>
          </div>
          {/* end: notification content */}

          {/* begin: profile toggler */}
          <div className='profile' ref={dropdownRef}>
            <div
              onClick={() => handleHeaderDropdown(1)}
              className='profile-toggler'>
              <Image
                src='/assets/user.png'
                width={40}
                height={40}
                alt='USER-IMAGE'
              />
            </div>
            <div
              className={`profileDropdown-content  ${
                openDropdownIndex === 1 ? "show animate-fade-in-up" : ""
              }`}>
              {/* begin: user profile route */}
              <div className='profile-item'>
                <div className='email'>
                  <p>{t("Header.profileToggle.signInAs")}</p>
                  <p className='fw-medium'>
                    {session?.data?.user?.email
                      ? session?.data?.user?.email
                      : session?.data?.user?.phone}
                  </p>
                </div>

                <hr />
              </div>
              {/* end: user email route */}

              {/* begin: locale change button */}
              <div className='profile-item mb-1'>
                <div className='user-profile'>
                  <div className='d-flex align-items-center column-gap-2'>
                    <div className='icon'>
                      <FaLanguage />
                    </div>
                    <LocaleSwitcher />
                  </div>
                </div>
              </div>
              {/* end: locale change button */}

              {/* begin: user profile route */}
              <div className='profile-item mb-1'>
                <div className='user-profile'>
                  <Link href='/dashboard/profile'>
                    <div className='d-flex align-items-center column-gap-2'>
                      <div className='icon'>
                        <FaRegUser />
                      </div>
                      <span className='item-text'>
                        {t("Header.profileToggle.profile")}
                      </span>
                    </div>
                  </Link>
                </div>
              </div>
              {/* end: user profile route */}

              {/* begin: user profile route */}
              <div className='profile-item'>
                <hr />
                <div className='sing-out' onClick={signOutHandler}>
                  <LuLogOut />
                  <button>{t("Header.profileToggle.logout")}</button>
                </div>
              </div>
              {/* end: user email route */}
            </div>
          </div>
          {/* end: profile toggler */}
        </div>
      </div>
    </header>
  );
}
