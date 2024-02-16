import { Link } from "react-router-dom";

import DeleteSVG from "../SVG/DeleteSVG";
import EditSVG from "../SVG/EditSVG";
import ArrowLeft from "../SVG/ArrowLeft";
import ArrowRight from "../SVG/ArrowRight";
import { useSelector } from "react-redux";

const ProductTable = ({
  products,
  currentPage,
  totalPages,
  handleDelete,
  prevPage,
  nextPage,
  total,
  itemsPerPage,
}) => {
  const { isAdmin } = useSelector((state) => state.users);
  return (
    <div className="mt-8 flex flex-col">
      <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
          <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Category
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Total Qty
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Total Sold
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Stock
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Price
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Edit
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Delete
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 capitalize bg-white">
                {products?.map((product) => (
                  <tr key={product._id}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0">
                          <img
                            className="h-10 w-10 rounded-full"
                            src={product?.images[0]}
                            alt={product?.name}
                          />
                        </div>
                        <div className="ml-4">
                          <div className="font-medium text-gray-900 text-base">
                            {product.name}
                          </div>
                          <div className="text-gray-700 ">
                            Brand: {product?.brand?.name}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      <div className="text-gray-900">
                        {product?.category?.name}
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {product?.qtyLeft < 0 ? (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                          Out of Stock
                        </span>
                      ) : (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          In Stock
                        </span>
                      )}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {product?.quantity}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {product?.totalSold}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {product?.quantityLeft}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {product?.price}
                    </td>
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                      <Link
                        to={`/dashboard/edit-product/${product._id}`}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        <EditSVG />
                        <span className="sr-only">, {product.name}</span>
                      </Link>
                    </td>
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                      <button
                        disabled={!isAdmin}
                        onClick={handleDelete(product._id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <DeleteSVG />
                        <span className="sr-only">, {product.name}</span>
                      </button>
                    </td>
                  </tr>
                ))}
                {products.length === 0 && (
                  <tr>
                    <td
                      colSpan="8"
                      className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-center"
                    >
                      No products found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 mt-3">
        <div className="flex flex-1 justify-between sm:hidden">
          <button
            onClick={prevPage}
            className={`relative inline-flex items-center rounded-md border ${
              currentPage === 1
                ? "bg-gray-300 text-gray-500"
                : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
            } px-4 py-2 text-sm font-medium`}
            disabled={currentPage === 1}
          >
            <span className="sr-only">Previous</span>
            <ArrowLeft />
            <span className="hidden sm:inline">Previous</span>
          </button>
          <button
            onClick={nextPage}
            className={`relative ml-3 inline-flex items-center rounded-md border ${
              currentPage === totalPages
                ? "bg-gray-300 text-gray-500"
                : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
            } px-4 py-2 text-sm font-medium`}
            disabled={currentPage === totalPages}
          >
            <span className="sr-only">Next</span>
            <span className="hidden sm:inline">Next</span>
            <ArrowRight />
          </button>
        </div>
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Showing{" "}
              <span className="font-medium">
                {(currentPage - 1) * itemsPerPage + 1}
              </span>
              to{" "}
              <span className="font-medium">
                {Math.min(currentPage * itemsPerPage, total)}
              </span>
              of <span className="font-medium">{total}</span>
              results
            </p>
          </div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            <button
              onClick={prevPage}
              className={`relative inline-flex items-center rounded-l-md border ${
                currentPage === 1
                  ? "bg-gray-300 text-gray-500"
                  : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
              } px-2 py-2 text-sm font-medium`}
              disabled={currentPage === 1}
            >
              <span className="sr-only">Previous</span>
              <ArrowLeft />
            </button>
            <button
              onClick={nextPage}
              className={`relative inline-flex items-center rounded-r-md border ${
                currentPage === totalPages
                  ? "bg-gray-300 text-gray-500"
                  : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
              } px-2 py-2 text-sm font-medium`}
              disabled={currentPage === totalPages}
            >
              <span className="sr-only">Next</span>
              <ArrowRight />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default ProductTable;
