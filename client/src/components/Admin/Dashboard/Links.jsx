import { FaShoppingBag, FaCubes, FaPlusCircle, FaUsers } from "react-icons/fa";
import { ImStatsDots } from "react-icons/im";
import { TbCategory2, TbBrandAdobe } from "react-icons/tb";
import { MdOutlineSpaceDashboard, MdInvertColors } from "react-icons/md";
import { RiCoupon3Fill } from "react-icons/ri";

export const DASHBOARD_SIDEBAR_ADMIN = [
  {
    key: "dashboard",
    label: "Dashboard",
    path: "/dashboard",
    icon: <MdOutlineSpaceDashboard />,
  },

  {
    key: "orders",
    label: "Orders",
    path: "/dashboard/orders",
    icon: <ImStatsDots />,
  },
  {
    key: "users",
    label: "Manage Users",
    path: "/dashboard/users",
    icon: <FaUsers />,
  },
  {
    key: "products",
    label: "Manage Products",
    icon: <FaShoppingBag />,
    sublinks: [
      {
        key: "all-products",
        label: "Manage Stock",
        path: "/dashboard/all-products",
        icon: <FaCubes />,
      },
      {
        key: "create-product",
        label: "Add Product",
        path: "/dashboard/add-product",
        icon: <FaPlusCircle />,
      },
    ],
  },
  {
    key: "categories",
    label: "Manage Categories",
    icon: <TbCategory2 />,
    sublinks: [
      {
        key: "all-categories",
        label: "All Categories",
        path: "/dashboard/all-categories",
        icon: <FaCubes />,
      },
      {
        key: "create-category",
        label: "Add Category",
        path: "/dashboard/add-category",
        icon: <FaPlusCircle />,
      },
    ],
  },
  {
    key: "brands",
    label: "Manage Brands",
    icon: <TbBrandAdobe />,
    sublinks: [
      {
        key: "all-brands",
        label: "All Brands",
        path: "/dashboard/all-brands",
        icon: <FaCubes />,
      },
      {
        key: "create-brand",
        label: "Add Brand",
        path: "/dashboard/add-brand",
        icon: <FaPlusCircle />,
      },
    ],
  },
  {
    key: "colors",
    label: "Manage Colors",
    icon: <MdInvertColors />,
    sublinks: [
      {
        key: "all-colors",
        label: "All Colors",
        path: "/dashboard/all-colors",
        icon: <FaCubes />,
      },
      {
        key: "create-color",
        label: "Add Color",
        path: "/dashboard/add-color",
        icon: <FaPlusCircle />,
      },
    ],
  },
  {
    key: "coupons",
    label: "Manage Coupons",
    icon: <RiCoupon3Fill />,
    sublinks: [
      {
        key: "all-coupons",
        label: "All Coupons",
        path: "/dashboard/all-coupons",
        icon: <FaCubes />,
      },
      {
        key: "create-coupon",
        label: "Add Coupon",
        path: "/dashboard/add-coupon",
        icon: <FaPlusCircle />,
      },
    ],
  },
];
