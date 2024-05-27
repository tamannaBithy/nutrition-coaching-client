"use client";

import { Suspense, useState } from "react";
import AccessToken from "../../../../../components/AccessToken";
import Header from "../../../../../components/Dashboard/Header/Header";
import Sidebar from "../../../../../components/Dashboard/Sidebar/Sidebar";
import "./UserDashboard.css";
import UserDashboardLoading from "./loading";
export default function UserDashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className='dashboard-main'>
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className={`main-wrapper  ${sidebarOpen ? "m-0" : ""}`}>
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <div className='main-content p-5'>
          <Suspense fallback={<UserDashboardLoading />}>{children}</Suspense>
          <AccessToken />
        </div>
      </div>
    </div>
  );
}
