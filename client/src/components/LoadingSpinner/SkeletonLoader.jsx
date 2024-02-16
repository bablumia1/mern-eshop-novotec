import { Tab } from "@headlessui/react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
function SkeletonLoader() {
  return (
    <div className="bg-white">
      <div className="mx-auto mt-8 max-w-2xl lg:max-w-6xl p-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="lg:order-2">
            <div className="text-2xl font-medium text-gray-300 h-6 w-1/2 bg-gray-300 rounded animate-pulse"></div>
            <div className="text-2xl font-medium text-gray-300 h-6 w-1/3 bg-gray-300 rounded animate-pulse"></div>

            <div className="flex items-center mt-4">
              <div className="text-lg text-yellow-400 h-6 w-6 rounded animate-pulse"></div>
              <div className="ml-4 text-sm text-gray-300">·</div>
              <div className="ml-4 flex items-center">
                <div className="text-sm font-medium text-indigo-600 h-6 w-24 bg-gray-300 rounded animate-pulse"></div>
              </div>
            </div>

            <form className="mt-8 space-y-6">
              {/* Color picker */}
              <div>
                <h2 className="text-sm font-medium text-gray-900">Color</h2>
                <div className="flex items-center space-x-3">
                  {[0, 1, 2].map((index) => (
                    <div
                      key={index}
                      className="h-8 w-8 bg-gray-300 rounded-full border border-gray-200 border-opacity-10 animate-pulse"
                    ></div>
                  ))}
                </div>
              </div>

              {/* Size picker */}
              <div>
                <h2 className="text-sm font-medium text-gray-900">Size</h2>
                <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
                  {[0, 1, 2, 3, 4, 5].map((index) => (
                    <div
                      key={index}
                      className="h-12 bg-gray-300 rounded-full border border-gray-200 border-opacity-10 animate-pulse"
                    ></div>
                  ))}
                </div>
              </div>

              <button className="w-2/4  flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover-bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 animate-pulse">
                Add to cart
              </button>
            </form>
          </div>

          <div>
            <div className="hidden sm:block">
              {/* Include Tab.Group here */}
              <Tab.Group as="div">
                <Tab.Panels className="mb-5 border p-2">
                  {[0, 1, 2].map((index) => (
                    <Tab.Panel key={index}>
                      <div className="h-96 w-full flex items-center justify-center sm:rounded-lg bg-gray-300 animate-pulse"></div>
                    </Tab.Panel>
                  ))}
                </Tab.Panels>

                {/* Image selector */}
                <Tab.List className="grid grid-cols-4 gap-6">
                  {[0, 1, 2].map((index) => (
                    <Tab
                      key={index}
                      className="relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-gray-900 hover-bg-gray-50 focus:outline-none focus-ring focus-ring-opacity-50 focus-ring-offset-4 animate-pulse"
                    >
                      {({ selected }) => (
                        <>
                          <span className="sr-only">{`Image ${
                            index + 1
                          }`}</span>
                          <span className="absolute inset-0 overflow-hidden rounded-md">
                            <div className="h-full w-full bg-gray-300 animate-pulse"></div>
                          </span>
                          <span
                            className={classNames(
                              selected ? "ring-indigo-500" : "ring-transparent",
                              "pointer-events-none absolute inset-0 rounded-md ring-2 ring-offset-2 animate-pulse"
                            )}
                            aria-hidden="true"
                          />
                        </>
                      )}
                    </Tab>
                  ))}
                </Tab.List>
              </Tab.Group>
            </div>
          </div>
        </div>
      </div>

      {/* Product Description */}
      <div className="mx-auto mt-8 max-w-2xl lg:max-w-6xl p-4">
        <h2 className="text-xl font-medium text-gray-900 animate-pulse">
          Description
        </h2>
        <div className="prose prose-lg mt-4 bg-gray-300 h-32 w-96 rounded animate-pulse"></div>
      </div>

      {/* Reviews Section */}
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-4 sm:py-24 lg:grid lg:max-w-6xl lg:grid-cols-12 lg:gap-x-8  lg:py-32">
          <div className="lg:col-span-4">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 animate-pulse">
              Customer Reviews
            </h2>
            <div className="mt-10">
              <h3 className="text-lg font-medium text-gray-900 animate-pulse">
                Share your thoughts
              </h3>
              <p className="mt-1 text-sm text-gray-600 animate-pulse">
                If you’ve used this product, share your thoughts with other
                customers
              </p>

              <form className="mt-5">
                <div className="h-20 bg-gray-300 animate-pulse"></div>
                <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
                  {[1, 2, 3, 4, 5].map((size) => (
                    <div
                      key={size}
                      className="h-12 bg-gray-300 animate-pulse"
                    ></div>
                  ))}
                </div>
                <button
                  disabled={true}
                  className="mt-6 inline-flex w-full items-center justify-center rounded-md border border-gray-300 bg-gray-300 px-8 py-2 text-sm font-medium text-gray-900 animate-pulse"
                >
                  Loading...
                </button>
              </form>
            </div>
          </div>

          <div className="mt-16 lg:col-span-7 lg:col-start-6 lg:mt-0">
            <h3 className="sr-only animate-pulse">Recent reviews</h3>

            <div className="flow-root">
              <div className="-my-12 divide-y divide-gray-200">
                {[0, 1, 2, 3, 4].map((index) => (
                  <div key={index} className="py-12">
                    <div className="flex items-center">
                      <div className="h-12 w-12 rounded-full bg-gray-300 animate-pulse"></div>
                      <div className="ml-4">
                        <div className="text-sm font-bold text-gray-900 animate-pulse">
                          Loading...
                        </div>
                        <div className="mt-1 flex items-center">
                          {[0, 1, 2, 3, 4].map((rating) => (
                            <div
                              key={rating}
                              className="h-5 w-5 bg-gray-300 animate-pulse"
                            ></div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 space-y-6 text-base text-gray-600 animate-pulse">
                      <div className="h-16 bg-gray-300 animate-pulse"></div>
                      <div className="h-16 bg-gray-300 animate-pulse"></div>
                      <div className="h-16 bg-gray-300 animate-pulse"></div>
                    </div>
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

export default SkeletonLoader;
