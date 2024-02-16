import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/slices/products/productSlice";
import ProductCard from "../components/Home/ProductCard";
import debounce from "lodash/debounce";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";

const ProductsPage = () => {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.products);

  const [searchName, setSearchName] = useState("");

  const debouncedSearch = useMemo(
    () =>
      debounce((value) => {
        const queryParams = new URLSearchParams();
        queryParams.append("name", value);

        const url = `/products?${queryParams.toString()}`;

        dispatch(fetchProducts(url));
      }, 300),
    [dispatch]
  );

  useEffect(() => {
    if (searchName.trim() === "") {
      // Handle empty search query or reset the search
      dispatch(fetchProducts("/products"));
    } else {
      debouncedSearch(searchName);
    }

    return debouncedSearch.cancel;
  }, [searchName, debouncedSearch, dispatch]);

  return (
    <div className="container mx-auto p-4">
      <div className="mb-5">
        <input
          type="text"
          placeholder="Search by name"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-800"
        />
      </div>
      {loading ? <LoadingSpinner /> : renderContent(products)}
    </div>
  );
};

const renderContent = (products) => {
  if (products.length === 0) {
    return <div className="text-center text-gray-500">No products found</div>;
  }

  return <ProductGrid products={products} />;
};

const ProductGrid = ({ products }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
    {products.map((product) => (
      <ProductCard key={product._id} product={product} />
    ))}
  </div>
);

export default ProductsPage;
