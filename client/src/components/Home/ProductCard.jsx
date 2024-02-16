import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";

const ProductCard = ({ product, loading }) => {
  return (
    <div className="bg-white border border-gray-200 rounded max-w-md">
      <div className="mx-auto px-4 py-4 sm:px-6 sm:py-4 lg:px-4">
        <div className="relative">
          <div className="relative h-48 w-full overflow-hidden rounded-lg">
            {loading ? (
              <Skeleton height={128} />
            ) : (
              <img
                src={product.images[0]}
                alt={product.name}
                className="h-full w-full object-cover object-center"
              />
            )}
          </div>
          <div className="relative mt-2">
            <h3 className="text-xs font-medium text-gray-900">
              {loading ? <Skeleton width={60} /> : product.name}
            </h3>
            <p className="mt-1 text-xs text-gray-500 capitalize">
              {loading ? <Skeleton width={40} /> : product.brand?.name}
            </p>
          </div>
          <div className="absolute inset-x-0 top-0 flex h-48 items-end justify-end overflow-hidden rounded-lg p-2">
            <div
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black opacity-50"
            ></div>
            <p className="relative text-sm font-semibold text-white">
              {loading ? <Skeleton width={30} /> : `$${product.price}`}
            </p>
          </div>
        </div>
        <div className="mt-2">
          <Link
            to={`/product/${product?._id}`}
            className="relative flex items-center justify-center rounded-md border border-transparent bg-gray-100 px-4 py-2 text-xs font-medium text-gray-900 hover:bg-gray-200"
          >
            {loading ? <Skeleton width={80} /> : "Details"}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
