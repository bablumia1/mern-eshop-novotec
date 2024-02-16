import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";

const CategoryItem = ({ category, loading }) => {
  return (
    <Link
      to={`/category/${category?._id}/products`}
      className="relative flex h-72  flex-col overflow-hidden rounded-lg p-6 hover:opacity-75 xl:w-auto mr-4"
    >
      {loading ? (
        <div className="">
          <div className="skeleton-container">
            <Skeleton
              width={550}
              height={300}
              className=" rounded-lg p-6 hover:opacity-75  mr-4"
            />
          </div>
        </div>
      ) : (
        <>
          <span aria-hidden="true" className="absolute inset-0">
            <img
              src={category.image}
              alt=""
              className="h-full w-full object-cover object-center"
            />
          </span>
          <span
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-gray-800 opacity-50"
          />
          <span className="relative capitalize mt-auto text-center text-xl font-bold text-white">
            {category.name}
          </span>
        </>
      )}
    </Link>
  );
};

export default CategoryItem;
