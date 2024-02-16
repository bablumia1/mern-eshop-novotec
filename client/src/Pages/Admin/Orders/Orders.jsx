import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getOrdersAction,
  updateOrderStatusAction,
} from "../../../redux/slices/orders/oderSlice";
import { Link } from "react-router-dom";
import EyeSVG from "../../../components/SVG/EyeSVG";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";

const Orders = () => {
  const dispatch = useDispatch();
  const { orders, loading, error, isUpdated } = useSelector(
    (state) => state.orders
  );
  const [searchOrderNumber, setSearchOrderNumber] = useState("");

  const url = "/orders";
  useEffect(() => {
    dispatch(getOrdersAction(url));
  }, [dispatch, isUpdated]);

  const updateStatus = (order, newStatus) => {
    dispatch(updateOrderStatusAction({ id: order._id, status: newStatus }));
  };

  const handleSearch = () => {
    const searchUrl = `/orders?orderNumber=${searchOrderNumber}`;
    dispatch(getOrdersAction(searchUrl));
  };

  const handleReset = () => {
    setSearchOrderNumber("");
    dispatch(getOrdersAction(url));
  };

  return (
    <div className="mt-8">
      {loading && <LoadingSpinner />}
      <div className="overflow-x-auto">
        <div className="mb-4 px-1">
          <label
            htmlFor="searchOrderNumber"
            className="block text-sm font-medium text-gray-700"
          >
            Search by Order Number
          </label>
          <div className="mt-1 flex shadow-sm">
            <input
              type="text"
              id="searchOrderNumber"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-800"
              placeholder="Enter order number"
              value={searchOrderNumber}
              onChange={(e) => setSearchOrderNumber(e.target.value)}
            />
            <button
              onClick={handleSearch}
              className="ml-3 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-200 focus:ring-opacity-50 active:bg-indigo-800"
            >
              Search
            </button>
            <button
              onClick={handleReset}
              className="ml-3 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-indigo-600 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring focus:ring-indigo-200 focus:ring-opacity-50 active:bg-indigo-800"
            >
              Reset
            </button>
          </div>
        </div>
        <table className="min-w-full divide-y divide-gray-200 bg-white">
          <thead className="bg-white">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Order Number
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>

              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Update Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {error ? (
              <tr>
                <td colSpan="7" className="px-6 py-4 text-sm text-red-500">
                  Error: {error}
                </td>
              </tr>
            ) : orders.length === 0 ? (
              <tr>
                <td colSpan="7" className="px-6 py-4 text-sm text-gray-500">
                  No orders found
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr key={order._id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {order.orderNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    ${order.totalPrice}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        order.status === "Pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {new Date(order.createdAt).toLocaleString()}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <select
                      value={order.status}
                      onChange={(e) => updateStatus(order, e.target.value)}
                      className="block w-full px-4 py-2 border border-gray-300 rounded-md bg-white text-sm text-gray-700 focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap ">
                    <Link to={`/dashboard/order/${order._id}`}>
                      <button className="text-indigo-600 hover:text-indigo-900">
                        <EyeSVG />
                      </button>
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
