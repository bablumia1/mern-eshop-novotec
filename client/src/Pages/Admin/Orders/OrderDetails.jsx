import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getOrderByIdAction } from "../../../redux/slices/orders/oderSlice";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";

const OrderDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { order, loading } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(getOrderByIdAction(id));
  }, [dispatch, id]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!order) {
    return <LoadingSpinner />;
  }

  return (
    <div className="mt-8 max-w-3xl mx-auto p-8 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-semibold text-indigo-700 mb-4">
        Order Details
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-indigo-100 p-4 rounded-lg">
          <p className="text-lg font-semibold mb-5">Order Information</p>
          <p>
            <span className="font-semibold">Order Number:</span>{" "}
            {order.orderNumber}
          </p>
          <p>
            <span className="font-semibold">Total Price:</span> $
            {order.totalPrice}
          </p>
          <p>
            <span className="font-semibold">Status:</span> {order.status}
          </p>
          <p>
            <span className="font-semibold">Payment Status:</span>{" "}
            {order.paymentStatus}
          </p>
          <p>
            <span className="font-semibold">Payment Method:</span>{" "}
            {order.paymentMethod}
          </p>
          <p>
            <span className="font-semibold">Currency:</span> {order.currency}
          </p>
          <p>
            <span className="font-semibold">Created At:</span>{" "}
            {new Date(order.createdAt).toLocaleString()}
          </p>
        </div>
        <div className="bg-indigo-100 p-4 rounded-lg">
          <p className="text-lg font-semibold mb-5">User Information</p>
          <p>
            <span className="font-semibold">User Name:</span> {order.user.name}
          </p>
          <p>
            <span className="font-semibold">User Email:</span>{" "}
            {order.user.email}
          </p>
        </div>
      </div>

      <div className="bg-indigo-100 p-4 rounded-lg mt-4">
        <p className="text-lg font-semibold mb-5">Shipping Address</p>
        <p>
          <span className="font-semibold">First Name:</span>{" "}
          {order.shippingAddress.firstName}
        </p>
        <p>
          <span className="font-semibold">Last Name:</span>{" "}
          {order.shippingAddress.lastName}
        </p>
        <p>
          <span className="font-semibold">Address:</span>{" "}
          {order.shippingAddress.address}
        </p>
        <p>
          <span className="font-semibold">City:</span>{" "}
          {order.shippingAddress.city}
        </p>
        <p>
          <span className="font-semibold">Country:</span>{" "}
          {order.shippingAddress.country}
        </p>
        <p>
          <span className="font-semibold">Postal Code:</span>{" "}
          {order.shippingAddress.postalCode}
        </p>
        <p>
          <span className="font-semibold">Province:</span>{" "}
          {order.shippingAddress.province}
        </p>
        <p>
          <span className="font-semibold">Phone:</span>{" "}
          {order.shippingAddress.phone}
        </p>
      </div>

      <div className="bg-indigo-100 p-4 rounded-lg mt-4">
        <p className="text-lg font-semibold mb-5">Order Items</p>
        <ul>
          {order?.orderItems?.map((item, index) => (
            <li key={index} className="mb-4">
              <p className="font-semibold">Product Name: {item.name}</p>
              <p>Quantity: {item.quantity}</p>
              <p>Price: ${item.price}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default OrderDetails;
