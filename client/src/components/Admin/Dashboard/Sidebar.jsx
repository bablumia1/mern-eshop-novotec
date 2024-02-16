import classNames from "classnames";
import { Link, useLocation } from "react-router-dom";
import { DASHBOARD_SIDEBAR_ADMIN } from "./Links";

const linkClass =
  "flex items-center gap-2 font-medium px-3 py-2 text-gray-600 hover:text-neutral-300 hover:bg-gray-700 rounded-sm  mx-2 text-base transition-colors duration-200 ease-in-out ";

export default function Sidebar() {
  return (
    <div className="flex flex-col w-64  overflow-scroll scrollbar-hide bg-gray-900 text-neutral-300">
      <div className="py-8 flex flex-1 flex-col gap-2">
        {DASHBOARD_SIDEBAR_ADMIN.map((link, index) => (
          <SidebarLink
            key={link.key}
            link={link}
            isLast={index === DASHBOARD_SIDEBAR_ADMIN.length - 1}
          />
        ))}
      </div>
    </div>
  );
}

function SidebarLink({ link, isLast }) {
  const { pathname } = useLocation();

  return (
    <>
      <Link
        to={link.path}
        className={classNames(
          pathname === link.path
            ? "bg-[#FFC800] text-gray-900"
            : "text-neutral-400 bg-gray-800",
          linkClass,
          isLast ? "" : "border rounded-sm mt-4 border-neutral-600"
        )}
      >
        <span className="text-xl font-bold">{link.icon}</span>
        {link.label}
      </Link>
      {link.sublinks && (
        <div className="pl-5">
          {link.sublinks.map((sublink, index) => (
            <Link
              key={sublink.key}
              to={sublink.path}
              className={classNames(
                pathname === sublink.path
                  ? "bg-[#FFC800] text-gray-900"
                  : "text-neutral-400",
                linkClass,
                index === sublink.length - 1 ? "" : ""
              )}
            >
              <span className="text-xl font-bold">{sublink.icon}</span>
              {sublink.label}
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
