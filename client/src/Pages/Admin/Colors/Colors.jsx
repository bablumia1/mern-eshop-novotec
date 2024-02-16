import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteColor,
  fetchColors,
  resetColorState,
} from "../../../redux/slices/colors/colorSlice";
import DeleteSVG from "../../../components/SVG/DeleteSVG";

import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import DeleteConfirmDialog from "../../../components/Admin/ConfirmDialog/DeleteConfirmDialog";
import toast from "react-hot-toast";

const Colors = () => {
  const dispatch = useDispatch();
  const { colors, loading, error, isDeleted, isAdded } = useSelector(
    (state) => state.colors
  );
  const { isAdmin } = useSelector((state) => state.users);
  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
    if (isDeleted) {
      toast.success("Color deleted successfully");
    }
  }, [error, isDeleted]);

  useEffect(() => {
    dispatch(fetchColors());
  }, [dispatch, isDeleted, isAdded]);

  const handleDelete = DeleteConfirmDialog(
    "color",
    deleteColor,
    resetColorState,
    dispatch
  );

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Colors</h1>

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
                        Color
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
                    {colors?.map((color) => (
                      <tr key={color._id}>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          <div className="text-gray-900">
                            {colors.indexOf(color) + 1}
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          <div className="text-gray-900">{color?.name}</div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          <div
                            className="w-6 h-6 rounded-full"
                            style={{
                              backgroundColor: color?.code,
                            }}
                          ></div>
                        </td>

                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4  text-sm font-medium sm:pr-6">
                          <button
                            disabled={!isAdmin}
                            onClick={handleDelete(color._id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <DeleteSVG />
                            <span className="sr-only">Delete {color.name}</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                    {
                      // Show empty row if there are no colors
                      colors.length === 0 && (
                        <tr>
                          <td
                            colSpan="8"
                            className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-center"
                          >
                            No colors found
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

export default Colors;
