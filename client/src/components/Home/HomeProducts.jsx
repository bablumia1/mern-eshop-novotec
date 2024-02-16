import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../redux/slices/products/productSlice";
import ProductCard from "./ProductCard";
import { Link } from "react-router-dom";

const HomeProducts = () => {
  const productsToShow = 8;

  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts("/products"));
  }, [dispatch]);

  if (loading) {
    // Display a loading indicator if data is still loading
    return (
      <div className="container mx-auto p-4 mt-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {Array.from({ length: 12 }).map((_, index) => (
            <ProductCard key={`skeleton-${index}`} loading={loading} />
          ))}
        </div>
      </div>
    );
  }

  // Group products by category
  const productsByCategory = products.reduce((acc, product) => {
    const category = product.category ? product.category.name : "Uncategorized";
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(product);
    return acc;
  }, {});

  return (
    <div className="container mx-auto p-4 mt-16">
      {Object.keys(productsByCategory).map((categoryName) => (
        <div key={categoryName}>
          <div className="flex flex-col sm:flex-row justify-between items-center mt-6 sm:mt-10">
            <h2 className="text-lg sm:text-xl font-bold mb-2 capitalize">
              {categoryName} Collections
            </h2>
            <Link
              to={`/category/${productsByCategory[categoryName][0]?.category?._id}/products`}
              className="text-sm font-semibold mb-2 text-indigo-600 hover:text-indigo-500"
            >
              Browse all &rarr;
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {productsByCategory[categoryName]
              .slice(0, productsToShow)
              .map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  loading={loading}
                />
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default HomeProducts;
