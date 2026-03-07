import { Outlet } from "react-router-dom";
import { AppSidebar } from "@/components/AppSidebar";
import { DashboardTopBar } from "@/components/DashboardTopBar";

const DashboardLayout = () => {
  return (
    <div className="min-h-screen flex">
      <AppSidebar />
      <div className="flex-1 flex flex-col ml-[72px]">
        <DashboardTopBar />
        <main className="flex-1 p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
