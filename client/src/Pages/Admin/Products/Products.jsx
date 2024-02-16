import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProduct,
  fetchProducts,
  resetProduct,
} from "../../../redux/slices/products/productSlice";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import { fetchCategories } from "../../../redux/slices/categories/categoriesSlice";
import toast from "react-hot-toast";
import ProductTable from "../../../components/Products/ProductsTable";
import DeleteComfirmDialog from "../../../components/Admin/ConfirmDialog/DeleteConfirmDialog";

const Products = () => {
  const dispatch = useDispatch();
  const { products, loading, total, isDeleted, error, isAdded } = useSelector(
    (state) => state.products
  );
  const { categories } = useSelector((state) => state.categories);

  const [categoryFilter, setCategoryFilter] = useState("");
  const [searchName, setSearchName] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;

  useEffect(() => {
    dispatch(fetchCategories()).then(() => {
      setCurrentPage(1);
    });
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (isDeleted) {
      toast.success("Product deleted successfully");
    }
  }, [isDeleted, error]);

  useEffect(() => {
    const queryParams = new URLSearchParams();
    queryParams.append("page", currentPage.toString());
    queryParams.append("limit", itemsPerPage.toString());
    if (categoryFilter) {
      queryParams.append("category", categoryFilter);
    }
    if (searchName) {
      queryParams.append("name", searchName);
    }
    const url = `/products?${queryParams.toString()}`;
    dispatch(fetchProducts(url));
  }, [dispatch, currentPage, categoryFilter, searchName, isDeleted, isAdded]);

  const totalPages = Math.ceil(total / itemsPerPage);

  // Function to handle next page
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Function to handle previous page
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Function to handle delete product

  const handleDelete = DeleteComfirmDialog(
    "product",
    deleteProduct,
    resetProduct,
    dispatch
  );

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Products</h1>

      {/* Category filter dropdown */}
      <div className="mb-4 flex items-center justify-between">
        <div className="mb-4 flex items-center">
          <label
            className="block text-gray-700 text-sm font-bold mr-2"
            htmlFor="categoryFilter"
          >
            Filter by Category:
          </label>
          <div className="relative">
            <select
              id="categoryFilter"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-800"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category._id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mb-4 flex items-center">
          <input
            type="text"
            placeholder="Search by Name"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-800"
          />
        </div>
      </div>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <ProductTable
          products={products}
          currentPage={currentPage}
          totalPages={totalPages}
          handleDelete={handleDelete}
          prevPage={prevPage}
          nextPage={nextPage}
          total={total}
          itemsPerPage={itemsPerPage}
        />
      )}
    </div>
  );
};

export default Products;
