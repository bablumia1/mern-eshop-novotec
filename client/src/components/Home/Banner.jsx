const Banner = () => {
  return (
    <section className="bg-gray-900">
      <div className="grid max-w-screen-xl px-4 py-12 mx-auto gap-6 lg:gap-8 xl:gap-0 lg:py-36 lg:grid-cols-12">
        <div className="lg:col-span-12 flex flex-col justify-center items-center text-center">
          <h1 className="max-w-3xl mb-3 text-3xl font-extrabold leading-none md:text-4xl xl:text-5xl text-white">
            Discover the Latest Fashion Trends
          </h1>
          <p className="max-w-2xl mb-4 font-light text-lg lg:mb-6 md:text-base lg:text-lg text-gray-400">
            Explore our collection of stylish clothing and accessories to stay
            in vogue.
          </p>
          <div className="flex space-x-3">
            <a
              href="#"
              className="inline-flex items-center justify-center px-4 py-2 text-base font-medium text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300"
            >
              Shop Now
              <svg
                className="w-4 h-4 ml-2 -mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </a>
            <a
              href="#"
              className="inline-flex items-center justify-center px-4 py-2 text-base font-medium border border-gray-300 rounded-lg focus:ring-4 focus:ring-gray-100 text-gray-300 hover:bg-gray-700"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
