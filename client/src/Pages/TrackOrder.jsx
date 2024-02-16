import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOrderByIdAction } from "../redux/slices/orders/oderSlice";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";

function TrackOrder() {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrderByIdAction(id));
  }, [dispatch, id]);

  const { order, loading } = useSelector((state) => state.orders);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!order) {
    return <div>Order not found</div>;
  }

  const orderStatusOptions = ["Pending", "Processing", "Shipped", "Delivered"];
  const currentStatusIndex = orderStatusOptions.indexOf(order.status);

  return (
    <div className="bg-gray-50">
      <main className="mx-auto max-w-2xl pb-24 pt-8 sm:px-6 sm:pt-16 lg:max-w-7xl lg:px-8">
        <div className="space-y-2 px-4 sm:flex sm:items-baseline sm:justify-between sm:space-y-0 sm:px-0">
          <div className="flex sm:items-baseline sm:space-x-4">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Order #{order.orderNumber}
            </h1>
          </div>
          <p className="text-sm text-gray-600">
            Order placed{" "}
            <time
              dateTime={order.createdAt}
              className="font-medium text-gray-900"
            >
              {new Date(order.createdAt).toDateString()}
            </time>
          </p>
        </div>

        {/* Products */}
        <section aria-labelledby="products-heading" className="mt-6">
          <h2
            id="products-heading"
            className="text-2xl font-bold tracking-tight text-gray-900"
          >
            Products Purchased
          </h2>
          <div className="border-b border-t border-gray-200 bg-white shadow-sm sm:rounded-lg sm:border mt-6">
            <div className="px-4 py-6 sm:px-6 lg:grid lg:grid-cols-12 lg:gap-x-8 lg:p-8">
              <div className="sm:flex lg:col-span-7">
                {order.orderItems.map((orderItem, index) => (
                  <div key={index} className="mt-6 sm:ml-6 sm:mt-0">
                    <h3 className="text-base font-medium text-gray-900">
                      {orderItem.name}
                    </h3>
                    <p className="mt-2 text-sm font-medium text-gray-900">
                      ${orderItem.price}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-6 lg:col-span-5 lg:mt-0">
                <dl className="grid grid-cols-2 gap-x-6 text-sm">
                  <div>
                    <dt className="font-medium text-gray-900">
                      Delivery address
                    </dt>
                    <dd className="mt-3 text-gray-500">
                      <span className="block">
                        {order.shippingAddress.address}
                      </span>
                      <span className="block">
                        {order.shippingAddress.city}
                      </span>
                      <span className="block">{`${order.shippingAddress.province}, ${order.shippingAddress.postalCode}`}</span>
                    </dd>
                  </div>
                  <div>
                    <dt className="font-medium text-gray-900">
                      Shipping updates
                    </dt>
                    <dd className="mt-3 space-y-3 text-gray-500">
                      <p>{order.user.email}</p>
                      <p>{order.shippingAddress.phone}</p>
                      <button
                        type="button"
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        Edit
                      </button>
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </section>

        {/* Order Status */}
        <section aria-labelledby="status-heading" className="mt-6">
          <h2
            id="status-heading"
            className="text-2xl font-bold tracking-tight text-gray-900"
          >
            Order Status
          </h2>
          <div className="mt-6 bg-white shadow-sm sm:rounded-lg p-6">
            <p className="text-sm font-medium text-gray-900">
              {order.status} on{" "}
              <time dateTime={order.updatedAt}>
                {new Date(order.updatedAt).toDateString()}
              </time>
            </p>
            <div className="mt-6">
              <div className="overflow-hidden rounded-full bg-gray-200">
                <div
                  className="h-2 rounded-full bg-indigo-600"
                  style={{
                    width: `${
                      ((currentStatusIndex + 1) / orderStatusOptions.length) *
                      100
                    }%`,
                  }}
                />
              </div>
              <div className="mt-6 grid grid-cols-4 text-sm font-medium text-gray-600 sm:grid">
                {orderStatusOptions.map((status, index) => (
                  <div
                    key={index}
                    className={`text-indigo-600 ${
                      index <= currentStatusIndex ? "text-indigo-600" : ""
                    }`}
                  >
                    {status}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Billing Summary */}
        <section aria-labelledby="summary-heading" className="mt-6">
          <h2
            id="summary-heading"
            className="text-2xl font-bold tracking-tight text-gray-900"
          >
            Billing Summary
          </h2>

          <div className="bg-white shadow-sm sm:rounded-lg mt-6">
            <dl className="grid grid-cols-2 gap-6 px-4 py-6 text-sm">
              <div className="col-span-2 sm:col-span-1">
                <dt className="font-medium text-gray-900">Total Price</dt>
                <dd className="mt-1 font-medium text-gray-900">
                  ${order.totalPrice}
                </dd>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <dt className="font-medium text-gray-900">Payment Method</dt>
                <dd className="mt-1 font-medium text-gray-900">
                  {order.paymentMethod}
                </dd>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <dt className="font-medium text-gray-900">Payment Status</dt>
                <dd className="mt-1 font-medium text-gray-900">
                  {order.paymentStatus}
                </dd>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <dt className="font-medium text-gray-900">Currency</dt>
                <dd className="mt-1 font-medium text-gray-900">
                  {order.currency}
                </dd>
              </div>
            </dl>
          </div>
        </section>
      </main>
    </div>
  );
}

export default TrackOrder;
