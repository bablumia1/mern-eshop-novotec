import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../redux/slices/categories/categoriesSlice";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CategoryItem from "./CategoryItem";
import { Link } from "react-router-dom";

const CategoriesSlider = () => {
  const dispatch = useDispatch();
  const { categories, loading } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
    swipeToSlide: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  return (
    <section
      aria-labelledby="category-heading"
      className="px-4 sm:px-6 lg:px-8 xl:px-5 mt-10"
    >
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <h2
            id="category-heading"
            className="text-2xl font-bold tracking-tight text-gray-900"
          >
            Shop by Category
          </h2>
          <Link
            to="/all-categories"
            className="text-sm font-semibold text-indigo-600 hover:text-indigo-500"
          >
            Browse all categories &rarr;
          </Link>
        </div>

        <Slider {...settings} className="mt-6">
          {(loading ? Array.from({ length: 7 }) : categories).map(
            (item, index) => (
              <div key={item?._id || index}>
                <CategoryItem category={item} loading={loading} />
              </div>
            )
          )}
        </Slider>
      </div>
    </section>
  );
};

export default CategoriesSlider;
