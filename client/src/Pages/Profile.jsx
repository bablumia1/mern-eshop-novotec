import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUserShippingAddressAction,
  getUserProfileAction,
} from "../redux/slices/users/userSlice";
import DeleteSVG from "../components/SVG/DeleteSVG";
import EyeSVG from "../components/SVG/EyeSVG";
import { Link } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";

const Profile = () => {
  const dispatch = useDispatch();
  const { profile, isDeleted, loading } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(getUserProfileAction());
  }, [dispatch, isDeleted]);

  const handleDelete = (addressId) => {
    return () => {
      dispatch(deleteUserShippingAddressAction(addressId));
    };
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto p-5">
        <div className="md:flex gap-2">
          <div className="w-full md:w-1/4 bg-white rounded-lg shadow-md p-4">
            <div className="text-center mb-4">
              <img
                className="w-20 h-20 mx-auto rounded-full"
                src={`https://ui-avatars.com/api/?name=${profile.name}&background=random&length=2&rounded=true&size=128`}
                alt=""
              />
              <h1 className="text-xl font-bold text-gray-900 mt-2">
                {profile.name}
              </h1>
              <p className="text-gray-600">{profile.email}</p>
              <ul className="text-sm text-gray-600 mt-4">
                <li className="py-2 flex items-center">
                  <span>Status</span>
                  <span className="ml-auto">
                    <span className="px-2 py-1 text-sm text-white bg-green-500 rounded">
                      Active
                    </span>
                  </span>
                </li>
              </ul>
            </div>
            <button
              className="w-full py-3 text-sm font-semibold text-blue-800 rounded-lg bg-gray-100 hover:bg-gray-200 focus:outline-none focus:shadow-outline"
              onClick={() => {
                // Handle adding a new address here
              }}
            >
              Settings
            </button>
          </div>
          <div className="w-full md:w-3/4 bg-white rounded-lg shadow-md p-4 mt-4 md:mt-0">
            {profile?.shippingAddress?.length === 0 && (
              <div className="text-gray-700 text-center">
                <div className="text-lg text-gray-900 mb-2">No Address</div>
                <div className="text-sm text-gray-600">
                  Please add an address to continue
                </div>
              </div>
            )}
            <div className="text-gray-700">
              {profile?.shippingAddress?.map((address, index) => (
                <div key={index} className="border-b p-2">
                  <div className="text-lg text-gray-900 mb-2">
                    Address {index + 1}
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    <div>
                      <div className="font-semibold text-gray-600 text-sm">
                        First Name
                      </div>
                      <div>{address.firstName}</div>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-600 text-sm">
                        Last Name
                      </div>
                      <div>{address.lastName}</div>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-600 text-sm">
                        Address
                      </div>
                      <div>{address.address}</div>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-600 text-sm">
                        City
                      </div>
                      <div>{address.city}</div>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-600 text-sm">
                        Country
                      </div>
                      <div>{address.country}</div>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-600 text-sm">
                        Postal Code
                      </div>
                      <div>{address.postalCode}</div>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-600 text-sm">
                        Province
                      </div>
                      <div>{address.province}</div>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-600 text-sm">
                        Phone
                      </div>
                      <div>{address.phone}</div>
                    </div>
                  </div>
                  <div className=" mt-4">
                    <button
                      className="px-2 py-1  text-red-400 rounded hover:text-red-600"
                      onClick={handleDelete(address._id)}
                    >
                      <DeleteSVG />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {profile?.orders?.length === 0 ? (
              <div className="text-gray-700 text-center">
                <div className="text-lg text-gray-900 mb-2">No Orders</div>
                <div className="text-sm text-gray-600">
                  Please add an order to continue
                </div>
              </div>
            ) : (
              <div className="mt-8">
                <table className="min-w-full table-auto">
                  <thead>
                    <tr>
                      <th className="px-4 py-2">Order Number</th>
                      <th className="px-4 py-2">Product</th>
                      <th className="px-4 py-2">Price</th>
                      <th className="px-4 py-2">Payment </th>
                      <th className="px-4 py-2">Status</th>
                      <th className="px-4 py-2">Track</th>
                    </tr>
                  </thead>
                  <tbody>
                    {profile?.orders?.map((order) => (
                      <tr key={order._id}>
                        <td className="border px-4 py-2">
                          {order.orderNumber}
                        </td>
                        <td className="border px-4 py-2">
                          {order?.orderItems?.map((item) => (
                            <>
                              <span className="block ">{item.name}</span>
                            </>
                          ))}
                        </td>
                        <td className="border px-4 py-2">{order.totalPrice}</td>
                        <td className="border px-4 py-2">
                          {order.paymentStatus}
                        </td>
                        <td className="border px-4 py-2">{order.status}</td>
                        <td className="border px-4 py-2">
                          <Link
                            to={`/order/track/${order._id}`}
                            className="px-2 py-1 text-gray-800 rounded hover:text-gray-700"
                            onClick={handleDelete(order._id)}
                          >
                            <EyeSVG />
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
