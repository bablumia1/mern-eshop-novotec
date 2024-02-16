import { useEffect, useState } from "react";
import FormLayout from "../../../components/Form/FormLayout";
import Input from "../../../components/Form/Input";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  addBrand,
  resetBrandState,
} from "../../../redux/slices/brands/brandSlice";
import ButtonSecondary from "../../../components/Button/ButtonSecondary";

const AddBrand = () => {
  const [formData, setFormData] = useState({
    name: "",
  });
  const [errors, setErrors] = useState({});
  const { loading, isAdded, error } = useSelector((state) => state.brands);
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(resetBrandState());
    }
    if (isAdded) {
      toast.success("Brand create successfully");
      setFormData({ name: "" });
      dispatch(resetBrandState());
    }
  }, [isAdded, error, dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length === 0) {
      const data = {
        ...formData,
      };
      dispatch(addBrand(data)).then(() => {
        dispatch(resetBrandState());
      });
    } else {
      setErrors(validationErrors);
      toast.error("Please fill all the fields");
    }
  };

  const validateForm = (data) => {
    const errors = {};
    if (!data.name) {
      errors.name = "Please enter the brand name";
    }
    return errors;
  };
  return (
    <FormLayout title="Add Brand">
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          name="name"
          id="brand-name"
          autoComplete="brand-name"
          placeholder="Brand Name"
          label="Brand Name"
          value={formData.name}
          onChange={handleInputChange}
          error={errors.name}
        />
        <ButtonSecondary
          disabled={loading}
          loading={loading}
          text="Create Brand"
        />
      </form>
    </FormLayout>
  );
};

export default AddBrand;
