import { useEffect, useState } from "react";
import FormLayout from "../../../components/Form/FormLayout";
import Input from "../../../components/Form/Input";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  createColor,
  resetColorState,
} from "../../../redux/slices/colors/colorSlice";
import ButtonSecondary from "../../../components/Button/ButtonSecondary";

const AddColor = () => {
  const [formData, setFormData] = useState({
    name: "",
    code: "#FFFFFF", // Default color code
  });
  const [errors, setErrors] = useState({});
  const { loading, isAdded, error } = useSelector((state) => state.colors);
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(resetColorState());
    }
    if (isAdded) {
      toast.success("Color created successfully");
      setFormData({ name: "", code: "#FFFFFF" }); // Reset form data
      dispatch(resetColorState());
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
      dispatch(createColor(formData)).then(() => {
        // No need to reset the form data here as it's handled in the useEffect
        // dispatch(resetColorState());
      });
    } else {
      setErrors(validationErrors);
      toast.error("Please fill all the fields");
    }
  };

  const validateForm = (data) => {
    const errors = {};
    if (!data.name) {
      errors.name = "Please enter the color name";
    }
    if (!data.code) {
      errors.code = "Please enter the color code";
    }
    return errors;
  };

  return (
    <FormLayout title="Add Color">
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          name="name"
          id="color-name"
          autoComplete="color-name"
          placeholder="Color Name"
          label="Color Name"
          value={formData.name}
          onChange={handleInputChange}
          error={errors.name}
        />
        <div className="my-4 w-full ">
          <label className="block text-sm font-medium text-gray-700">
            Color Code
          </label>
          <input
            type="color"
            name="code"
            id="color-code"
            value={formData.code}
            onChange={handleInputChange}
            className=""
          />
        </div>
        <ButtonSecondary
          disabled={loading}
          loading={loading}
          text="Create Color"
        />
      </form>
    </FormLayout>
  );
};

export default AddColor;
