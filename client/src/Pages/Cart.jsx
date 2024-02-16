import { useState } from "react";
import { Link } from "react-router-dom";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from "react-redux";
import { getCouponByCode } from "../redux/slices/coupon/couponSlice";
import {
  changeItemQuantity,
  removeFromCart,
} from "../redux/slices/products/cartSlice";

export default function Cart() {
  const dispatch = useDispatch();
  const [couponCode, setCouponCode] = useState("");
  const { cartItems } = useSelector((state) => state.cart);

  const [quantityInput, setQuantityInput] = useState(
    cartItems.reduce((acc, item) => {
      acc[item.productId] = item.quantity;
      return acc;
    }, {})
  );

  const applyCouponHandler = () => {
    if (couponCode) {
      dispatch(getCouponByCode(couponCode));
      setCouponCode("");
    }
  };

  const { coupon, loading, error } = useSelector((state) => state?.coupons);

  const handleQuantityChange = (productId, newQuantity) => {
    cartItems.map((item) =>
      item.productId === productId
        ? {
            ...item,
            quantity: newQuantity,
            totalPrice: item.price * newQuantity,
          }
        : item
    );

    setQuantityInput({ ...quantityInput, [productId]: newQuantity });
    dispatch(changeItemQuantity({ productId, quantity: newQuantity }));
  };

  const handleRemoveItem = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const calculateTotalPrice = () => {
    let total = 0;
    for (const item of cartItems) {
      total += item.price * item.quantity;
    }

    if (coupon) {
      total -= (total * coupon.discount) / 100;
    }

    return total;
  };

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 pt-16 pb-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Shopping Cart
        </h1>

        <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
          <section aria-labelledby="cart-heading" className="lg:col-span-7">
            <h2 id="cart-heading" className="sr-only">
              Items in your shopping cart
            </h2>

            {cartItems.length > 0 ? (
              <ul
                role="list"
                className="divide-y divide-gray-200 border-t border-b border-gray-200"
              >
                {cartItems.map((item) => (
                  <li key={item.productId} className="flex py-6 sm:py-10">
                    <div className="flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-24 w-24 rounded-md object-cover object-center "
                      />
                    </div>

                    <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                      <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                        <div>
                          <div className="flex justify-between">
                            <h3 className="text-sm">
                              <p className="font-medium text-gray-700 hover:text-gray-800">
                                {item.name}
                              </p>
                            </h3>
                          </div>
                          <div className="mt-1 flex text-sm">
                            <p className="text-gray-500 capitalize">
                              {item.color}
                            </p>
                            <p className="ml-4 border-l border-gray-200 pl-4 text-gray-500">
                              {item.size}
                            </p>
                          </div>
                          <p className="mt-1 text-sm font-medium text-gray-900">
                            ${item?.price} x {item?.quantity} = $
                            {item?.totalPrice}
                          </p>
                        </div>

                        <div className="mt-4 sm:mt-0 sm:pr-9">
                          <label className="sr-only">
                            Quantity, {item.name}
                          </label>
                          <div className="custom-number-input h-10 w-32">
                            <div className="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1">
                              <button
                                data-action="decrement"
                                className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:bg-gray-200 h-full w-20 rounded-l cursor-pointer outline-none"
                                onClick={() =>
                                  handleQuantityChange(
                                    item.productId,
                                    Math.max(
                                      quantityInput[item.productId] - 1,
                                      1
                                    )
                                  )
                                }
                              >
                                <span className="m-auto text-2xl font-thin">
                                  −
                                </span>
                              </button>
                              <input
                                type="number"
                                className="outline-none focus:outline-none text-center w-full bg-gray-100 font-semibold text-md hover:text-black focus:text-black md:text-base cursor-default flex items-center text-gray-700"
                                name="custom-input-number"
                                value={
                                  quantityInput[item.productId] || item.quantity
                                }
                                readOnly
                              />
                              <button
                                data-action="increment"
                                className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:bg-gray-200 h-full w-20 rounded-r cursor-pointer"
                                onClick={() =>
                                  handleQuantityChange(
                                    item.productId,
                                    quantityInput[item.productId] + 1
                                  )
                                }
                              >
                                <span className="m-auto text-2xl font-thin">
                                  +
                                </span>
                              </button>
                            </div>
                          </div>

                          <div className="absolute top-0 right-0">
                            <button
                              onClick={() => handleRemoveItem(item.productId)}
                              className="-m-2 inline-flex p-2 text-gray-400 hover:text-gray-500"
                            >
                              <span className="sr-only">Remove</span>
                              <XMarkIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p>Your cart is empty.</p>
            )}
          </section>

          <section
            aria-labelledby="summary-heading"
            className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
          >
            <h2
              id="summary-heading"
              className="text-lg font-medium text-gray-900"
            >
              Order summary
            </h2>

            <dl className="mt-6 space-y-4">
              <div className="flex items-center justify-between">
                <dt className="text-sm text-gray-600">Subtotal</dt>
                <dd className="text-sm font-medium text-gray-900">
                  $ {calculateTotalPrice().toFixed(2)}
                </dd>
              </div>

              <dt className="flex items-center text-sm text-gray-600">
                <span>Have a coupon code? </span>
              </dt>
              <div className="my-2">
                <input
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  type="text"
                  className="block w-full rounded-md border p-2 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="Enter Coupon Code"
                />
              </div>
              {error && (
                <p className="text-red-500 text-sm p-2 bg-red-100 rounded-md">
                  {error}
                </p>
              )}
              {coupon && (
                <p className="text-green-500 text-sm p-2 bg-green-100 rounded-md">
                  Coupon Applied: {coupon.code} - {coupon.discount}% off
                </p>
              )}
              <button
                disabled={loading}
                onClick={applyCouponHandler}
                className="inline-flex text-center mt-4 items-center rounded border border-transparent bg-green-600 px-2.5 py-1.5 text-xs font-medium text-white shadow-sm hover-bg-indigo-700 focus:outline-none focus-ring-2 focus-ring-indigo-500 focus-ring-offset-2"
              >
                {loading ? "Loading..." : "Apply Coupon"}
              </button>

              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <dt className="text-base font-medium text-gray-900">
                  Order total
                </dt>
                <dd className="text-xl font-medium text-gray-900">
                  $ {calculateTotalPrice().toFixed(2)}
                </dd>
              </div>
            </dl>

            <div className="mt-6">
              <Link
                to="/order-payment"
                state={{
                  sumTotalPrice: calculateTotalPrice(),
                }}
                className="w-full rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-base font-medium text-white shadow-sm hover-bg-indigo-700 focus:outline-none focus-ring-2 focus-ring-indigo-500 focus-ring-offset-2 focus-ring-offset-gray-50"
              >
                Proceed to Checkout
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
