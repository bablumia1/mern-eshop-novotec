import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Input from "../../../components/Form/Input";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { fetchBrands } from "../../../redux/slices/brands/brandSlice";
import { fetchColors } from "../../../redux/slices/colors/colorSlice";
import { fetchCategories } from "../../../redux/slices/categories/categoriesSlice";
import Textarea from "../../../components/Form/Textarea";
import ImageUpload from "../../../components/Form/ImageUpload";
import toast from "react-hot-toast";
import {
  createProduct,
  resetProduct,
} from "../../../redux/slices/products/productSlice";
import ButtonSecondary from "../../../components/Button/ButtonSecondary";

const animatedComponents = makeAnimated();

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    brand: "",
    price: "",
    quantity: "",
    sizes: [],
    colors: [],
    description: "",
  });
  const [errors, setErrors] = useState({});
  const [colorsOption, setColorsOption] = useState([]);
  const [sizeOption, setSizeOption] = useState([]);
  const [files, setFiles] = useState([]);
  const [category, setCategory] = useState({});
  const [brand, setBrand] = useState({});

  const dispatch = useDispatch();
  const { loading, error, isAdded } = useSelector((state) => state?.products);

  const { categories } = useSelector((state) => state?.categories);
  const { brands } = useSelector((state) => state?.brands);
  const { colors } = useSelector((state) => state?.colors);

  // File handle change
  const fileHandleChange = (event) => {
    const newFiles = Array.from(event.target.files);

    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
  };

  const removeImage = (index) => {
    const updatedFiles = [...files];
    updatedFiles.splice(index, 1);
    setFiles(updatedFiles);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Sizes
  const sizes = ["S", "M", "L", "XL", "XXL"];
  const handleSizeChange = (sizes) => {
    setSizeOption(sizes);
  };
  // Converted sizes
  const sizeOptionsCoverted = sizes?.map((size) => {
    return {
      value: size,
      label: size,
    };
  });

  const handleColorChange = (colors) => {
    setColorsOption(colors);
  };
  // Converted colors
  const colorsCoverted = colors?.map((color) => {
    return {
      value: color?.name,
      label: color?.name,
    };
  });

  const categoriesOptions = categories?.map((category) => ({
    value: category._id,
    label: category.name,
  }));

  const brandsOptions = brands?.map((brand) => ({
    value: brand._id,
    label: brand.name,
  }));

  const handleCategoryChange = (category) => {
    setCategory(category);
  };

  const handleBrandChange = (brand) => {
    setBrand(brand);
  };

  const clearForm = () => {
    setFormData({
      name: "",
      category: "",
      brand: "",
      price: "",
      quantity: "",
      sizes: [],
      colors: [],
      description: "",
    });
    setErrors({});
    setColorsOption([]);
    setSizeOption([]);
    setFiles([]);
    setCategory({});
    setBrand({});
  };

  useEffect(() => {
    // Fetch data on component mount
    dispatch(fetchColors());
    dispatch(fetchBrands());
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
    if (!loading && !error && isAdded) {
      toast.success("Product created successfully");
      clearForm();
      setFiles([]); // Clear the selected images
    }
  }, [loading, error, isAdded]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length === 0) {
      const data = {
        ...formData,
        category: category?.value,
        brand: brand?.value,
        colors: colorsOption?.map((color) => color?.label),
        sizes: sizeOption?.map((size) => size?.label),
        files: files,
      };

      dispatch(createProduct(data)).then(() => {
        dispatch(resetProduct());
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
    if (files.length < 1) {
      errors.images = "Please select at least one image";
    }

    if (sizeOption.length === 0) {
      errors.sizes = "Please select at least one size";
    }
    if (colorsOption.length === 0) {
      errors.colors = "Please select at least one color";
    }
    if (!category.value) {
      errors.category = "Please select one category";
    }
    if (!brand.value) {
      errors.brand = "Please select one brand";
    }

    return errors;
  };

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
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">
          Create a New Product
        </h1>
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
                onChange={(item) => handleSizeChange(item)}
                styles={customStyles}
              />
              {errors.sizes && <p className="text-red-600">{errors.sizes}</p>}
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
                onChange={(e) => handleColorChange(e)}
                styles={customStyles}
              />
              {errors.colors && <p className="text-red-600">{errors.colors}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900 mb-2">
                Select Categories
              </label>
              <Select
                onChange={(item) => handleCategoryChange(item)}
                options={categoriesOptions}
                name="category"
                styles={customStyles}
              />
              {errors.category && (
                <p className="text-red-600">{errors.category}</p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900 mb-2">
                Select Brands
              </label>
              <Select
                onChange={(item) => handleBrandChange(item)}
                options={brandsOptions}
                name="brand"
                className="basic-multi-select"
                styles={customStyles}
              />
              {errors.brand && <p className="text-red-600">{errors.brand}</p>}
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
              text="Create Product"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
