import { useEffect, useState } from "react";
import { RadioGroup } from "@headlessui/react";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import {
  addUserShippingAddressAction,
  getUserProfileAction,
  resetUser,
} from "../redux/slices/users/userSlice";
import FormLayout from "../components/Form/FormLayout";
import Input from "../components/Form/Input";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";
import toast from "react-hot-toast";
import { placeOrderAction } from "../redux/slices/orders/oderSlice";

const paymentMethods = [
  { id: "cash", title: "Cash on delivery" },
  { id: "stripe", title: "Stripe" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function OrderPayment() {
  const { profile, loading, isUpdated } = useSelector((state) => state.users);
  const { loading: orderLoading } = useSelector((state) => state.orders);
  const [selectedaddress, setSelectedaddress] = useState("");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("cash");
  const { cartItems } = useSelector((state) => state.cart);
  const location = useLocation();
  const { sumTotalPrice } = location.state;
  const dispatch = useDispatch();
  const [showAddAddressForm, setShowAddAddressForm] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    country: "",
    postalCode: "",
    province: "",
    phone: "",
  });

  useEffect(() => {
    if (
      profile &&
      profile.shippingAddress &&
      profile.shippingAddress.length > 0
    ) {
      setSelectedaddress(profile.shippingAddress[0]);
    }
  }, [profile]);

  useEffect(() => {
    dispatch(getUserProfileAction());
  }, [dispatch, isUpdated]);

  const toggleAddAddressForm = () => {
    setShowAddAddressForm((prev) => !prev);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length === 0) {
      dispatch(addUserShippingAddressAction(formData)).then(() => {
        dispatch(resetUser());
        toggleAddAddressForm();
      });
    } else {
      setErrors(validationErrors);
    }
  };

  const placeOrderHandler = () => {
    // validate data
    if (!selectedaddress) {
      toast.error("Please select a shipping address");
    }
    const data = {
      orderItems: [
        ...cartItems.map((item) => ({
          productId: item.productId,
          name: item.name,
          quantity: item.quantity,
          price: item.price,
        })),
      ],
      shippingAddress: selectedaddress,
      totalPrice: sumTotalPrice,
      paymentMethod: selectedPaymentMethod,
    };
    dispatch(placeOrderAction(data));
  };

  const validateForm = (data) => {
    const errors = {};
    if (!data.firstName) {
      errors.firstName = "Please enter your first name";
    }
    if (!data.lastName) {
      errors.lastName = "Please enter your last name";
    }
    if (!data.address) {
      errors.address = "Please enter your address";
    }
    if (!data.city) {
      errors.city = "Please enter your city";
    }
    if (!data.country) {
      errors.country = "Please enter your country";
    }
    if (!data.postalCode) {
      errors.postalCode = "Please enter your postal code";
    }
    if (!data.province) {
      errors.province = "Please enter your province";
    }
    if (!data.phone) {
      errors.phone = "Please enter your phone number";
    }
    return errors;
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="bg-gray-50">
      <div className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Checkout</h2>

        <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
          <div>
            <div className="  border-gray-200 ">
              <RadioGroup value={selectedaddress} onChange={setSelectedaddress}>
                <RadioGroup.Label className="text-lg font-medium text-gray-900">
                  Shipping Address
                </RadioGroup.Label>

                <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                  {profile.hasShippingAddress && (
                    <>
                      {profile?.shippingAddress?.map((address) => (
                        <RadioGroup.Option
                          key={address._id}
                          value={address}
                          className={({ checked, active }) =>
                            classNames(
                              checked
                                ? "border-transparent"
                                : "border-gray-300",
                              active ? "ring-2 ring-indigo-500" : "",
                              "relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none"
                            )
                          }
                        >
                          {({ checked, active }) => (
                            <>
                              <span className="flex flex-1">
                                <span className="flex flex-col">
                                  <RadioGroup.Label
                                    as="span"
                                    className="block text-sm font-medium text-gray-900"
                                  >
                                    {address.firstName} {address.lastName}
                                  </RadioGroup.Label>
                                  <RadioGroup.Description
                                    as="span"
                                    className="mt-1 flex items-center text-sm text-gray-500"
                                  >
                                    {address.address}, {address.city},{" "}
                                    {address.province}, {address.postalCode}
                                  </RadioGroup.Description>
                                  <RadioGroup.Description
                                    as="span"
                                    className="mt-6 text-sm font-medium text-gray-900"
                                  >
                                    {address.country}
                                  </RadioGroup.Description>
                                  <RadioGroup.Description
                                    as="span"
                                    className="text-sm text-gray-500"
                                  >
                                    Phone: {address.phone}
                                  </RadioGroup.Description>
                                </span>
                              </span>
                              {checked ? (
                                <CheckCircleIcon
                                  className="h-5 w-5 text-indigo-600"
                                  aria-hidden="true"
                                />
                              ) : null}
                              <span
                                className={classNames(
                                  active ? "border" : "border-2",
                                  checked
                                    ? "border-indigo-500"
                                    : "border-transparent",
                                  "pointer-events-none absolute -inset-px rounded-lg"
                                )}
                                aria-hidden="true"
                              />
                            </>
                          )}
                        </RadioGroup.Option>
                      ))}
                    </>
                  )}
                  <button
                    onClick={toggleAddAddressForm}
                    className={classNames(
                      "relative flex cursor-pointer rounded-lg border p-4 shadow-sm focus:outline-none",
                      showAddAddressForm
                        ? "bg-white ring-2 ring-indigo-500"
                        : "border-gray-300"
                    )}
                  >
                    <span className="flex flex-1">
                      <span className="flex flex-col">
                        <p className="block text-sm font-medium text-gray-900">
                          Add new address
                        </p>
                      </span>
                    </span>
                    <span
                      className="border-2 border-transparent pointer-events-none absolute -inset-px rounded-lg"
                      aria-hidden="true"
                    />
                  </button>
                </div>
              </RadioGroup>
            </div>
            {showAddAddressForm && (
              <div>
                <FormLayout>
                  <form onSubmit={handleSubmit}>
                    <div className="space-y-6">
                      <Input
                        type="text"
                        name="firstName"
                        id="firstName"
                        placeholder="Enter your first name"
                        label="First Name"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        error={errors.firstName}
                      />
                      <Input
                        type="text"
                        name="lastName"
                        id="lastName"
                        placeholder="Enter your last name"
                        label="Last Name"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        error={errors.lastName}
                      />
                      <Input
                        type="text"
                        name="address"
                        id="address"
                        placeholder="Enter your address"
                        label="Address"
                        value={formData.address}
                        onChange={handleInputChange}
                        error={errors.address}
                      />
                      <Input
                        type="text"
                        name="city"
                        id="city"
                        placeholder="Enter your city"
                        label="City"
                        value={formData.city}
                        onChange={handleInputChange}
                        error={errors.city}
                      />
                      <Input
                        type="text"
                        name="country"
                        id="country"
                        placeholder="Enter your country"
                        label="Country"
                        value={formData.country}
                        onChange={handleInputChange}
                        error={errors.country}
                      />
                      <Input
                        type="text"
                        name="postalCode"
                        id="postalCode"
                        placeholder="Enter your postal code"
                        label="Postal Code"
                        value={formData.postalCode}
                        onChange={handleInputChange}
                        error={errors.postalCode}
                      />
                      <Input
                        type="text"
                        name="province"
                        id="province"
                        placeholder="Enter your province"
                        label="Province"
                        value={formData.province}
                        onChange={handleInputChange}
                        error={errors.province}
                      />
                      <Input
                        type="text"
                        name="phone"
                        id="phone"
                        placeholder="Enter your phone number"
                        label="Phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        error={errors.phone}
                      />
                      <button
                        type="submit"
                        className="bg-gray-800 text-white px-4 rounded-md p-2"
                      >
                        Add Address
                      </button>
                    </div>
                  </form>
                </FormLayout>
              </div>
            )}
            {/* Payment */}
            <div className="mt-10 border-t border-gray-200 pt-10">
              <h2 className="text-lg font-medium text-gray-900">Payment</h2>

              <fieldset className="mt-4">
                <legend className="sr-only">Payment type</legend>
                <div className="space-y-4 sm:flex sm:items-center sm:space-x-10 sm:space-y-0">
                  {paymentMethods.map((paymentMethod) => (
                    <div key={paymentMethod.id} className="flex items-center">
                      <input
                        id={paymentMethod.id}
                        name="payment-type"
                        type="radio"
                        value={paymentMethod.id} // Set the value attribute
                        checked={selectedPaymentMethod === paymentMethod.id} // Check if the value matches selectedPaymentMethod
                        onChange={() =>
                          setSelectedPaymentMethod(paymentMethod.id)
                        } // Update selectedPaymentMethod
                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />

                      <label
                        htmlFor={paymentMethod.id}
                        className="ml-3 block text-sm font-medium text-gray-700"
                      >
                        {paymentMethod.title}
                      </label>
                    </div>
                  ))}
                </div>
              </fieldset>
            </div>
          </div>

          {/* Order summary */}
          <div className="mt-10 lg:mt-0">
            <h2 className="text-lg font-medium text-gray-900">Order summary</h2>

            <div className="mt-4 rounded-lg border border-gray-200 bg-white shadow-sm">
              <h3 className="sr-only">Items in your cart</h3>
              <ul role="list" className="divide-y divide-gray-200">
                {cartItems.map((product) => (
                  <li
                    key={product.productId}
                    className="flex px-4 py-6 sm:px-6"
                  >
                    <div className="flex-shrink-0">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-20 rounded-md"
                      />
                    </div>

                    <div className="ml-6 flex flex-1 flex-col">
                      <div className="flex">
                        <div className="min-w-0 flex-1">
                          <h4 className="text-sm">
                            <p className="font-medium text-gray-700 hover:text-gray-800">
                              {product.name}
                            </p>
                          </h4>
                          <p className="mt-1 text-sm text-gray-500 capitalize">
                            {product.color} | {product.size}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-1 items-end justify-between pt-2">
                        <p className="mt-1 text-sm font-medium text-gray-900">
                          $ {product?.price} X {product?.qty} =$
                          {product?.totalPrice}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <dl className="space-y-6 border-t border-gray-200 px-4 py-6 sm:px-6">
                <div className="flex items-center justify-between">
                  <dt className="text-sm">Subtotal</dt>
                  <dd className="text-sm font-medium text-gray-900">
                    ${sumTotalPrice}
                  </dd>
                </div>

                <div className="flex items-center justify-between border-t border-gray-200 pt-6">
                  <dt className="text-base font-medium">Total</dt>
                  <dd className="text-base font-medium text-gray-900">
                    ${sumTotalPrice}
                  </dd>
                </div>
              </dl>

              <div className="border-t border-gray-200 px-4 py-4 sm:px-6">
                <button
                  disabled={orderLoading}
                  onClick={placeOrderHandler}
                  className="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                >
                  {orderLoading ? "Loading..." : "Place Order"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
