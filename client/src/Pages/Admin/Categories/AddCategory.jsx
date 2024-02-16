import { useEffect, useState } from "react";
import FormLayout from "../../../components/Form/FormLayout";
import Input from "../../../components/Form/Input";
import ImageUpload from "../../../components/Form/ImageUpload";
import ButtonSecondary from "../../../components/Button/ButtonSecondary";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import {
  createCategory,
  resetCategoryState,
} from "../../../redux/slices/categories/categoriesSlice";

const AddCategory = () => {
  const [formData, setFormData] = useState({
    name: "",
  });
  const [errors, setErrors] = useState({});
  const [files, setFiles] = useState([]);
  const { loading, isAdded, error } = useSelector((state) => state.categories);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAdded) {
      toast.success("Category created successfully");
      setFormData({ name: "" });
      setFiles([]);
    }
    if (error) {
      toast.error(error);
    }
  }, [isAdded, error]);

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
      };

      dispatch(createCategory(data)).then(() => {
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
    if (files.length < 1) {
      errors.images = "Please select at least one image";
    }

    return errors;
  };

  return (
    <FormLayout title="Create new category">
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
  );
};

export default AddCategory;
