import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchCategory } from "../redux/slices/categories/categoriesSlice";
import ProductCard from "../components/Home/ProductCard";
import { fetchBrands } from "../redux/slices/brands/brandSlice";

const CategoryProducts = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategory(id));
    dispatch(fetchBrands());
  }, [dispatch, id]);

  const { category, loading } = useSelector((state) => state.categories);

  if (loading) {
    return (
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {Array.from({ length: 12 }).map((_, index) => (
            <ProductCard key={`skeleton-${index}`} loading={loading} />
          ))}
        </div>
      </div>
    );
  }

  if (!category) {
    // Error handling if the category is not found
    return <div className="container mx-auto p-4">Category not found.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold my-5 capitalize">
        {category.name} collections
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {category?.products?.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default CategoryProducts;
