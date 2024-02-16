import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCategory,
  fetchCategories,
  resetCategoryState,
} from "../../../redux/slices/categories/categoriesSlice";
import DeleteSVG from "../../../components/SVG/DeleteSVG";
import EditSVG from "../../../components/SVG/EditSVG";
import { Link } from "react-router-dom";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import { toast } from "react-hot-toast";
import EyeSVG from "../../../components/SVG/EyeSVG";
import DeleteComfirmDialog from "../../../components/Admin/ConfirmDialog/DeleteConfirmDialog";

const Categories = () => {
  const dispatch = useDispatch();
  const { categories, loading, error, isDeleted, isAdded } = useSelector(
    (state) => state.categories
  );
  const { isAdmin } = useSelector((state) => state.users);
  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
    if (isDeleted) {
      toast.success("Category deleted successfully");
    }
  }, [error, isDeleted]);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch, isDeleted, isAdded]);

  const handleDelete = DeleteComfirmDialog(
    "category",
    deleteCategory,
    resetCategoryState,
    dispatch
  );

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Categorys</h1>

      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="mt-8 flex flex-col">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        N/A
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Image
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Show Products
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
                    {categories?.map((category) => (
                      <tr key={category._id}>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          <div className="text-gray-900">
                            {categories.indexOf(category) + 1}
                          </div>
                        </td>
                        <td className="px-2 inline-flex mt-7 text-sm leading-5 font-semibold rounded bg-green-100 text-green-800">
                          <div className="text-gray-900">{category?.name}</div>
                        </td>

                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          <img
                            src={category?.image}
                            className="h-10 w-10 rounded  object-cover"
                            alt=""
                          />
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          <Link
                            to={`/dashboard/categories/${category._id}/products`}
                            className="text-gray-800 hover:text-indigo-900"
                          >
                            <EyeSVG />
                            <span className="sr-only">, {category.name}</span>
                          </Link>
                        </td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                          <Link
                            to={`/dashboard/edit-category/${category._id}`}
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            <EditSVG />
                            <span className="sr-only">, {category.name}</span>
                          </Link>
                        </td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4  text-sm font-medium sm:pr-6">
                          <button
                            disabled={!isAdmin}
                            onClick={handleDelete(category._id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <DeleteSVG />
                            <span className="sr-only">, {category.name}</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                    {
                      // Show empty row if there are no categorys
                      categories.length === 0 && (
                        <tr>
                          <td
                            colSpan="8"
                            className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-center"
                          >
                            No categorys found
                          </td>
                        </tr>
                      )
                    }
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Categories;
