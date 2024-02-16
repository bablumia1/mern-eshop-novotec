import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import toast from "react-hot-toast";
import {
  fetchProduct,
  resetProduct,
  updateProduct,
} from "../../../redux/slices/products/productSlice";
import { fetchBrands } from "../../../redux/slices/brands/brandSlice";
import { fetchCategories } from "../../../redux/slices/categories/categoriesSlice";
import Input from "../../../components/Form/Input";
import Textarea from "../../../components/Form/Textarea";
import ImageUpload from "../../../components/Form/ImageUpload";
import { fetchColors } from "../../../redux/slices/colors/colorSlice";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import ButtonSecondary from "../../../components/Button/ButtonSecondary";

const animatedComponents = makeAnimated();

const EditProduct = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [colorsOption, setColorsOption] = useState([]);

  const { product, loading, isUpdated, error } = useSelector(
    (state) => state.products
  );
  useEffect(() => {
    dispatch(fetchProduct(id));
    dispatch(fetchCategories());
    dispatch(fetchBrands());
    dispatch(fetchColors());
  }, [dispatch, id, isUpdated]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);
  const [sizeOption, setSizeOption] = useState([]);
  const { colors } = useSelector((state) => state.colors);
  const [formData, setFormData] = useState({
    name: product?.name || "",
    category: product?.category?._id || "",
    brand: product?.brand?._id || "",
    price: product?.price || "",
    quantity: product?.quantity || "",
    sizes: product?.sizes || [],
    colors: product?.colors || [],
    description: product?.description || "",
  });

  const [errors, setErrors] = useState({});

  const [files, setFiles] = useState([]);
  const [category, setCategory] = useState({
    value: "",
    label: "",
  });

  const [brand, setBrand] = useState({
    value: "",
    label: "",
  });

  useEffect(() => {
    setCategory({
      value: product?.category?._id,
      label: product?.category?.name,
    });
    setBrand({
      value: product?.brand?._id || "",
      label: product?.brand?.name || "",
    });
    setFormData({
      name: product?.name || "",
      price: product?.price || "",
      quantity: product?.quantity || "",
      description: product?.description || "",
    });
    setSizeOption(product?.sizes || []);
    setColorsOption(product?.colors || []);
  }, [product]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const sizes = ["S", "M", "L", "XL", "XXL"];
  const handleSizeChange = (sizes) => {
    const sizeLabels = sizes?.map((size) => size.label);
    setSizeOption(sizeLabels);
  };
  // Converted sizes
  const sizeOptionsCoverted = sizes?.map((size) => {
    return {
      value: size,
      label: size,
    };
  });

  const handleColorChange = (colors) => {
    const colorLabels = colors?.map((color) => color.label);
    setColorsOption(colorLabels);
  };
  // Converted colors
  const colorsCoverted = colors?.map((color) => {
    return {
      value: color?.name,
      label: color?.name,
    };
  });

  const handleCategoryChange = (selectedCategory) => {
    setCategory(selectedCategory);
    setFormData({ ...formData, category: selectedCategory.value });
  };

  const handleBrandChange = (selectedBrand) => {
    setBrand(selectedBrand);
    setFormData({ ...formData, brand: selectedBrand.value });
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
        id: product?._id,
        category: category.value,
        brand: brand.value,
        files: files,
        sizes: sizeOption,
        colors: colorsOption,
      };

      dispatch(updateProduct(data)).then(() => {
        dispatch(resetProduct());
        toast.success("Product updated successfully");
      });
    } else {
      setErrors(validationErrors);
      toast.error("Please fill all the fields");
    }
  };

  const validateForm = (data) => {
    const errors = {};
    if (!data.name) {
      errors.name = "Please enter the product name";
    }
    if (!data.price) {
      errors.price = "Please enter the product price";
    }
    if (!data.quantity) {
      errors.quantity = "Please enter the product quantity";
    }
    if (!data.description) {
      errors.description = "Please enter the product description";
    }

    return errors;
  };

  const categoriesOptions = useSelector(
    (state) => state.categories.categories
  ).map((category) => ({
    value: category._id,
    label: category.name,
  }));

  const brandsOptions = useSelector((state) => state.brands.brands).map(
    (brand) => ({
      value: brand._id,
      label: brand.name,
    })
  );

  const customStyles = {
    control: (base) => ({
      ...base,
      ...(errors.sizes || errors.colors || errors.category || errors.brand
        ? { borderColor: "red" }
        : {}),
    }),
  };

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white rounded-lg p-8 max-w-5xl mx-auto">
        <h1 className="text-2xl font-semibold capitalize text-gray-800 mb-6">
          Edit Product: {product?.name}
        </h1>
        {loading ? (
          <LoadingSpinner />
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Input
                  type="text"
                  name="name"
                  id="product-name"
                  autoComplete="product-name"
                  placeholder="Product Name"
                  label="Product Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  error={errors.name}
                />
              </div>
              <div>
                <Input
                  type="text"
                  name="price"
                  id="price"
                  autoComplete="price"
                  placeholder="Price"
                  label="Product Price"
                  value={formData.price}
                  onChange={handleInputChange}
                  error={errors.price}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Input
                  type="text"
                  name="quantity"
                  id="quantity"
                  autoComplete="quantity"
                  placeholder="Quantity"
                  label="Product Quantity"
                  value={formData.quantity}
                  onChange={handleInputChange}
                  error={errors.quantity}
                />
              </div>
              <div>
                <label className="block text-sm font-medium leading-6 text-gray-900 mb-2">
                  Select Sizes
                </label>
                <Select
                  components={animatedComponents}
                  isMulti
                  name="sizes"
                  options={sizeOptionsCoverted}
                  className="basic-multi-select"
                  classNamePrefix="select"
                  isClearable={true}
                  isLoading={false}
                  isSearchable={true}
                  closeMenuOnSelect={false}
                  onChange={handleSizeChange}
                  styles={customStyles}
                  value={
                    sizeOption.map((size) => {
                      return { value: size, label: size };
                    }) || []
                  }
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium leading-6 text-gray-900 mb-2">
                  Select Colors
                </label>
                <Select
                  components={animatedComponents}
                  isMulti
                  name="colors"
                  options={colorsCoverted}
                  className="basic-multi-select"
                  classNamePrefix="select"
                  isClearable={true}
                  isLoading={false}
                  isSearchable={true}
                  closeMenuOnSelect={false}
                  onChange={handleColorChange}
                  styles={customStyles}
                  value={
                    colorsOption.map((color) => {
                      return { value: color, label: color };
                    }) || []
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium leading-6 text-gray-900 mb-2">
                  Select Categories
                </label>
                <Select
                  options={categoriesOptions}
                  value={category}
                  onChange={handleCategoryChange}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium leading-6 text-gray-900 mb-2">
                  Select Brands
                </label>
                <Select
                  options={brandsOptions}
                  value={brand}
                  onChange={handleBrandChange}
                  className="basic-multi-select"
                />
              </div>
            </div>
            <div>
              <ImageUpload
                fileHandleChange={fileHandleChange}
                multiple={true}
                error={errors.images}
                files={files}
                removeImage={removeImage}
              />
            </div>
            <Textarea
              name="description"
              id="product-description"
              placeholder="Product Description"
              value={formData.description}
              onChange={handleInputChange}
              rows={4}
              label="Product Description"
              error={errors.description}
            />
            <div className="text-center">
              <ButtonSecondary
                disabled={loading}
                loading={loading}
                text="Update Product"
              />
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default EditProduct;
