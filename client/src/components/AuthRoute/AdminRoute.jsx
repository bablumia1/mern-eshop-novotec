import { useSelector } from "react-redux";
import AdminOnly from "../NotFound/AdminOnly";

const AdminRoute = ({ children }) => {
  const { userAuth } = useSelector((state) => state.users);
  const isAdmin = userAuth?.userInfo?.user?.type === "admin";
  const isManager = userAuth?.userInfo?.user?.type === "manager";

  if (!isAdmin && !isManager) {
    return <AdminOnly />;
  }

  return <>{children}</>;
};

export default AdminRoute;
