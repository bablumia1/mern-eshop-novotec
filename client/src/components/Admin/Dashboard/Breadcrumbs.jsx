import { Link, useLocation } from "react-router-dom";
import { ChevronRightIcon, HomeIcon } from "@heroicons/react/24/solid";

const Breadcrumbs = () => {
  const location = useLocation();
  const paths = location.pathname.split("/").filter((path) => path !== "");

  const cleanPathSegment = (segment) => {
    // Remove hyphens from the segment
    return segment.replace(/-/g, " ");
  };
  return (
    <nav
      className="flex border-b border-gray-200 bg-gray-900 fixed w-full z-10 top-0 py-4"
      aria-label="Breadcrumb"
    >
      <ol
        role="list"
        className="mx-auto flex w-full max-w-screen-xl space-x-2 px-4 sm:px-6 lg:px-8"
      >
        {paths.map((path, index) => (
          <li key={index} className="flex">
            <div className="flex items-center">
              {index === 0 ? (
                <Link to="/" className="text-white hover:text-gray-300">
                  <HomeIcon
                    className="flex-shrink-0 h-5 w-5"
                    aria-hidden="true"
                  />
                  <span className="sr-only">Home</span>
                </Link>
              ) : (
                <ChevronRightIcon className="flex-shrink-0 h-5 w-5 text-gray-300" />
              )}
              {index === paths.length - 1 ? (
                <span className="ml-2 text-sm capitalize font-medium text-white">
                  {cleanPathSegment(path)}
                </span>
              ) : (
                <Link
                  to={"/" + paths.slice(0, index + 1).join("/")}
                  className="ml-4 capitalize text-sm font-medium text-white hover:text-gray-300"
                >
                  {cleanPathSegment(path)}
                </Link>
              )}
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
