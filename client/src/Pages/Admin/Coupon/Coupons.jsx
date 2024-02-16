import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearCouponState,
  deleteCoupon,
  getCoupons,
} from "../../../redux/slices/coupon/couponSlice";
import DeleteSVG from "../../../components/SVG/DeleteSVG";
import { format } from "date-fns";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import DeleteConfirmDialog from "../../../components/Admin/ConfirmDialog/DeleteConfirmDialog";
import toast from "react-hot-toast";

const Coupons = () => {
  const dispatch = useDispatch();
  const { coupons, loading, error, isDeleted, isAdded } = useSelector(
    (state) => state.coupons
  );
  const { isAdmin } = useSelector((state) => state.users);
  // Function to format a date string to a human-readable format
  const formatHumanReadableDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, "MMMM dd, yyyy h:mm a"); // Customize the format as needed
  };

  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
    if (isDeleted) {
      toast.success("Coupon deleted successfully");
    }
  }, [error, isDeleted]);

  useEffect(() => {
    dispatch(getCoupons());
  }, [dispatch, isDeleted, isAdded]);

  const handleDelete = DeleteConfirmDialog(
    "coupon",
    deleteCoupon,
    clearCouponState,
    dispatch
  );

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Coupons</h1>

      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="mt-8 flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="align-middle md:px-6 lg:px-8">
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
                        Code
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Start Date
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        End Date
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Discount
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
                    {coupons?.map((coupon, index) => (
                      <tr key={coupon._id}>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          <div className="text-gray-900">{index + 1}</div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          <div className="text-gray-900">{coupon?.code}</div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          <div className="text-gray-900">
                            {formatHumanReadableDate(coupon?.startDate)}
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          <div className="text-gray-900">
                            {formatHumanReadableDate(coupon?.endDate)}
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          <div className="text-gray-900">
                            {coupon?.discount}
                          </div>
                        </td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-sm font-medium sm:pr-6">
                          <button
                            disabled={!isAdmin}
                            onClick={handleDelete(coupon._id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <DeleteSVG />
                            <span className="sr-only">Delete Coupon</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                    {coupons.length === 0 && (
                      <tr>
                        <td
                          colSpan="8"
                          className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-center"
                        >
                          No coupons found
                        </td>
                      </tr>
                    )}
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

export default Coupons;
