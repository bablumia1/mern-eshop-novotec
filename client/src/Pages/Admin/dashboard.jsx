import { Outlet } from "react-router-dom";
import Breadcrumbs from "../../components/Admin/Dashboard/Breadcrumbs";
import Sidebar from "../../components/Admin/Dashboard/Sidebar";

function Dashboard() {
  return (
    <div className="flex flex-col w-full  overflow-hidden bg-neutral-100">
      <div className="flex flex-row flex-1 overflow-hidden">
        <Sidebar open={open} />

        <div className="flex-1  overflow-auto scrollbar-hide">
          <Breadcrumbs />
          <div className="P-4  m-5 mt-20  ">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
