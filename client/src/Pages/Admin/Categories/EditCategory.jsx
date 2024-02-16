import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  fetchCategory,
  resetCategoryState,
  updateCategory,
} from "../../../redux/slices/categories/categoriesSlice";
import ButtonSecondary from "../../../components/Button/ButtonSecondary";
import ImageUpload from "../../../components/Form/ImageUpload";
import Input from "../../../components/Form/Input";
import FormLayout from "../../../components/Form/FormLayout";
import toast from "react-hot-toast";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";

const EditCategory = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { category, loading, error, isUpdated } = useSelector(
    (state) => state.categories
  );
  useEffect(() => {
    dispatch(fetchCategory(id));
  }, [id, dispatch]);

  const [formData, setFormData] = useState({
    name: "",
  });
  const [errors, setErrors] = useState({});
  const [files, setFiles] = useState([]);

  useEffect(() => {
    setFormData({ name: category.name });
  }, [category]);

  useEffect(() => {
    if (isUpdated) {
      toast.success("Category updated successfully");
    }
    if (error) {
      toast.error(error);
      dispatch(resetCategoryState());
    }
  }, [isUpdated, error, dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const fileHandleChange = (event) => {
    const newFiles = Array.from(event.target.files);
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
  };

  const removeImage = (index) => {
    const updatedFiles = [...files];
    updatedFiles.splice(index, 1);
    setFiles(updatedFiles);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length === 0) {
      const data = {
        ...formData,
        files: files,
        id: id,
      };

      dispatch(updateCategory(data)).then(() => {
        dispatch(resetCategoryState());
      });
    } else {
      setErrors(validationErrors);
      toast.error("Please fill all the fields");
    }
  };

  const validateForm = (data) => {
    const errors = {};
    if (!data.name) {
      errors.name = "Please enter the category name";
    }

    return errors;
  };

  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <FormLayout title={`Update category: ${category.name}`}>
          <form onSubmit={handleSubmit}>
            <Input
              type="text"
              name="name"
              id="category-name"
              autoComplete="category-name"
              placeholder="Category Name"
              label="Category Name"
              value={formData.name}
              onChange={handleInputChange}
              error={errors.name}
            />
            <div className="mt-5">
              <ImageUpload
                fileHandleChange={fileHandleChange}
                error={errors.images}
                files={files}
                removeImage={removeImage}
              />
            </div>
            <ButtonSecondary
              disabled={loading}
              loading={loading}
              text="Create Category"
            />
          </form>
        </FormLayout>
      )}
    </>
  );
};

export default EditCategory;
