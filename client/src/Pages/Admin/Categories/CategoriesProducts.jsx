import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchCategory } from "../../../redux/slices/categories/categoriesSlice";
import ProductTable from "../../../components/Products/ProductsTable";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import {
  deleteProduct,
  resetProduct,
} from "../../../redux/slices/products/productSlice";
import { toast } from "react-hot-toast";
import DeleteComfirmDialog from "../../../components/Admin/ConfirmDialog/DeleteConfirmDialog";

const CategoriesProducts = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { category, loading, error, isDeleted } = useSelector(
    (state) => state.categories
  );

  useEffect(() => {
    dispatch(fetchCategory(id));
  }, [id, dispatch]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const products = category?.products || [];
  const total = products?.length;

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (isDeleted) {
      toast.success("Product deleted successfully");
    }
  }, [isDeleted, error]);

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

      {loading ? (
        <LoadingSpinner />
      ) : (
        <ProductTable
          products={products.slice(
            (currentPage - 1) * itemsPerPage,
            currentPage * itemsPerPage
          )}
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

export default CategoriesProducts;
