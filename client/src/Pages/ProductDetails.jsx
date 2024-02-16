import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StarIcon } from "@heroicons/react/20/solid";
import { RadioGroup, Tab } from "@headlessui/react";
import { useParams } from "react-router-dom";
import { fetchProduct } from "../redux/slices/products/productSlice";
import SkeletonLoader from "../components/LoadingSpinner/SkeletonLoader";
import Textarea from "../components/Form/Textarea";
import { createReview } from "../redux/slices/reviews/reviewSlice";
import toast from "react-hot-toast";
import { addToCart } from "../redux/slices/products/cartSlice";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function ProductDetail() {
  const { product, loading } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const { id } = useParams();
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedRating, setSelectedRating] = useState(0);

  useEffect(() => {
    setSelectedColor(product?.colors?.[0] || "");
    setSelectedSize(product?.sizes?.[0] || "");
  }, [product]);

  const { isAdded, loading: reviewsLoading } = useSelector(
    (state) => state.reviews
  );

  const [formData, setFormData] = useState({
    rating: 0,
    message: "",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // add review function
  const handleReview = (e) => {
    e.preventDefault();
    if (selectedRating === 0) toast.error("Please select a rating");
    if (formData.message === "") toast.error("Please write a review");
    const data = { ...formData, rating: selectedRating, id: product._id };
    dispatch(createReview(data));
    // reset the form
    setFormData({ rating: 0, message: "" });
    setSelectedRating(0);
  };

  useEffect(() => {
    dispatch(fetchProduct(id));
  }, [dispatch, id, isAdded]);

  // Function to handle submission to the cart
  const handleAddToCart = (product) => {
    const cartItem = {
      name: product.name,
      price: product.price,
      color: selectedColor,
      size: selectedSize,
      image: product?.images[0] || "",
      productId: product._id,
      quantity: 1,
      totalPrice: product.price,
    };

    dispatch(addToCart(cartItem));
  };

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const user = userInfo?.user;

  // retuen true if the user already reviewed the product
  const isReviewed = product?.reviews?.some(
    (review) => review.user._id === user?._id
  );

  return (
    <div className="bg-white">
      {loading ? (
        // Skeleton loading while the data is loading
        <SkeletonLoader />
      ) : (
        <div className="mx-auto mt-8 max-w-2xl lg:max-w-6xl p-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="lg:order-2">
              <h1 className="text-2xl font-medium text-gray-900 mb-2">
                {product.name}
              </h1>
              <p className="text-2xl font-medium text-gray-900">
                ${product.price}
              </p>

              <div className="flex items-center mt-4">
                <p className="text-lg text-yellow-400">
                  {product?.rating?.toFixed(1)}
                </p>
                <div className="ml-2 flex items-center">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <StarIcon
                      key={rating}
                      className={classNames(
                        product.rating > rating
                          ? "text-yellow-400"
                          : "text-gray-200",
                        "h-6 w-6 flex-shrink-0"
                      )}
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <div className="ml-4 text-sm text-gray-300">·</div>
                <div className="ml-4 flex items-center">
                  <a
                    href="#"
                    className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    See all {product?.reviews?.length} reviews
                  </a>
                </div>
              </div>

              <form className="mt-8 space-y-6">
                {/* Color picker */}
                <div>
                  <h2 className="text-sm font-medium text-gray-900">Color</h2>
                  <RadioGroup
                    value={selectedColor}
                    onChange={setSelectedColor}
                    className="mt-2"
                  >
                    <div className="flex items-center space-x-3">
                      {product?.colors?.map((color) => (
                        <RadioGroup.Option
                          key={color}
                          value={color}
                          className={({ active, checked }) =>
                            classNames(
                              active && checked ? "ring ring-offset-1" : "",
                              !active && checked ? "ring-2" : "",
                              "relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none"
                            )
                          }
                        >
                          <RadioGroup.Label as="span" className="sr-only">
                            {color}
                          </RadioGroup.Label>
                          <span
                            aria-hidden="true"
                            style={{ backgroundColor: `${color}` }}
                            className={classNames(
                              "h-8 w-8 rounded-full border border-black border-opacity-10"
                            )}
                          />
                        </RadioGroup.Option>
                      ))}
                    </div>
                  </RadioGroup>
                </div>

                {/* Size picker */}
                <div>
                  <h2 className="text-sm font-medium text-gray-900">Size</h2>
                  <RadioGroup
                    value={selectedSize}
                    onChange={(value) => setSelectedSize(value)}
                    className="mt-2"
                  >
                    <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
                      {product?.sizes?.map((size) => (
                        <RadioGroup.Option
                          key={size}
                          value={size}
                          className={({ active, checked }) =>
                            classNames(
                              size
                                ? "cursor-pointer focus:outline-none"
                                : "cursor-not-allowed opacity-25",
                              active
                                ? "ring-2 ring-indigo-500 ring-offset-2"
                                : "",
                              checked
                                ? "border-transparent bg-indigo-600 text-white hover:bg-indigo-700"
                                : "border-gray-200 bg-white text-gray-900 hover:bg-gray-50",
                              "flex items-center justify-center rounded-md border py-3 px-3 text-sm font-medium uppercase sm:flex-1"
                            )
                          }
                        >
                          <RadioGroup.Label as="span">{size}</RadioGroup.Label>
                        </RadioGroup.Option>
                      ))}
                    </div>
                  </RadioGroup>
                </div>

                {product.inStock ? (
                  <button
                    type="button"
                    onClick={() => handleAddToCart(product)}
                    className="w-2/4  flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Add to cart
                  </button>
                ) : (
                  <h2 className="text-2xl font-medium text-red-900">
                    {" "}
                    Out of stock
                  </h2>
                )}
              </form>
            </div>

            <div>
              <Tab.Group as="div">
                <Tab.Panels className="mb-5 border p-2">
                  {product?.images?.map((image, index) => (
                    <Tab.Panel key={index}>
                      <div
                        className="h-96 w-full flex items-center justify-center sm:rounded-lg"
                        style={{
                          backgroundImage: `url(${image})`,
                          backgroundSize: "cover",
                        }}
                      >
                        {/* You can add an optional overlay or loading spinner here */}
                      </div>
                    </Tab.Panel>
                  ))}
                </Tab.Panels>

                {/* Image selector */}
                <div className="hidden sm:block">
                  <Tab.List className="grid grid-cols-4 gap-6">
                    {product?.images?.map((image, index) => (
                      <Tab
                        key={index}
                        className="relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4"
                      >
                        {({ selected }) => (
                          <>
                            <span className="sr-only">{`Image ${
                              index + 1
                            }`}</span>
                            <span className="absolute inset-0 overflow-hidden rounded-md">
                              <img
                                src={image}
                                alt={`Image ${index + 1}`}
                                className="h-full w-full object-cover object-center"
                              />
                            </span>
                            <span
                              className={classNames(
                                selected
                                  ? "ring-indigo-500"
                                  : "ring-transparent",
                                "pointer-events-none absolute inset-0 rounded-md ring-2 ring-offset-2"
                              )}
                              aria-hidden="true"
                            />
                          </>
                        )}
                      </Tab>
                    ))}
                  </Tab.List>
                </div>
              </Tab.Group>
            </div>
          </div>
        </div>
      )}

      {/* Product Description */}
      <div className="mx-auto mt-8 max-w-2xl lg:max-w-6xl p-4">
        <h2 className="text-xl font-medium text-gray-900">Description</h2>
        <div
          className="prose prose-lg mt-4 text-gray-500 text-justify"
          dangerouslySetInnerHTML={{ __html: product.description }}
        />
      </div>

      {/* Reviews Section */}
      <div className="bg-white ">
        <div className="mx-auto max-w-2xl px-4 py-10 sm:px-4  lg:grid lg:max-w-6xl lg:grid-cols-12 lg:gap-x-8  ">
          <div className="lg:col-span-4">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">
              Customer Reviews
            </h2>
            <div className="mt-10">
              <h3 className="text-lg font-medium text-gray-900">
                Share your thoughts
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                If you’ve used this product, share your thoughts with other
                customers
              </p>

              <form onSubmit={handleReview} className="mt-5">
                <Textarea
                  name="message"
                  id="message"
                  placeholder="Write your review here"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  label=""
                  required
                />
                <RadioGroup
                  value={selectedRating}
                  onChange={(value) => setSelectedRating(value)}
                  className="mt-5"
                  required
                >
                  <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
                    {[1, 2, 3, 4, 5].map((size) => (
                      <RadioGroup.Option
                        key={size}
                        value={size}
                        className={({ active, checked }) =>
                          classNames(
                            size
                              ? "cursor-pointer focus:outline-none "
                              : "cursor-not-allowed opacity-25",
                            active
                              ? "ring-2 ring-indigo-500 ring-offset-2"
                              : "",
                            checked
                              ? "border-transparent bg-gray-900 text-white hover:bg-gray-700"
                              : "border-gray-200 bg-white text-gray-900 hover:bg-gray-50",
                            "flex items-center justify-center  rounded-md border border-gray-500 py-3 px-3  text-sm font-medium uppercase sm:flex-1"
                          )
                        }
                      >
                        <RadioGroup.Label as="span">{size}</RadioGroup.Label>
                      </RadioGroup.Option>
                    ))}
                  </div>
                </RadioGroup>
                <button
                  disabled={isReviewed || !user}
                  type="submit"
                  className={`
                           mt-6 inline-flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-8 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50 sm:w-auto lg:w-full
                               ${isReviewed ? "cursor-not-allowed" : ""}
                               `}
                >
                  {isReviewed
                    ? "You already reviewed this product"
                    : !user
                    ? "Please login to review this product"
                    : reviewsLoading
                    ? "Loading..."
                    : "Submit"}
                </button>
              </form>
            </div>
          </div>

          <div className="mt-16 lg:col-span-7 lg:col-start-6 lg:mt-0 h-5/6 overflow-scroll scrollbar-hide ">
            <h3 className="sr-only">Recent reviews</h3>

            <div className="flow-root border p-5">
              <div className="-my-12 divide-y divide-gray-200">
                {product?.reviews?.map((review) => (
                  <div key={review._id} className="py-12">
                    <div className="flex items-center">
                      <img
                        src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80"
                        alt={`${review?.user?.name}.`}
                        className="h-12 w-12 rounded-full"
                      />
                      <div className="ml-4">
                        <h4 className="text-sm font-bold text-gray-900">
                          {review?.user?.name}
                        </h4>
                        <div className="mt-1 flex items-center">
                          {[0, 1, 2, 3, 4].map((rating) => (
                            <StarIcon
                              key={rating}
                              className={classNames(
                                review.rating > rating
                                  ? "text-yellow-400"
                                  : "text-gray-300",
                                "h-5 w-5 flex-shrink-0"
                              )}
                              aria-hidden="true"
                            />
                          ))}
                        </div>
                        <p className="sr-only">
                          {review.rating} out of 5 stars
                        </p>
                      </div>
                    </div>

                    <div
                      className="mt-4 space-y-6 text-base  text-gray-600"
                      dangerouslySetInnerHTML={{ __html: review?.message }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
