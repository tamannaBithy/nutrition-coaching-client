"use client";
import AccessToken from "@/components/AccessToken";
import Header from "@/components/Dashboard/Header/Header";
import Sidebar from "@/components/Dashboard/Sidebar/Sidebar";
import { Suspense, useState } from "react";
import "./Dashboard.css";
import DashboardLoading from "./loading";

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className='dashboard-main'>
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className={`main-wrapper  ${sidebarOpen ? "m-0" : ""}`}>
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <div className='main-content p-5'>
          <Suspense fallback={<DashboardLoading />}>{children}</Suspense>
          <AccessToken />
        </div>
      </div>
    </div>
  );
}
