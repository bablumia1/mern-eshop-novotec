import { useEffect, useState } from "react";
import FormLayout from "../../../components/Form/FormLayout";
import Input from "../../../components/Form/Input";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchBrandById,
  resetBrandState,
  updateBrand,
} from "../../../redux/slices/brands/brandSlice";
import ButtonSecondary from "../../../components/Button/ButtonSecondary";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";

const EditBrand = () => {
  const [errors, setErrors] = useState({});
  const { loading, isUpdated, error, brand } = useSelector(
    (state) => state.brands
  );
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchBrandById(id));
  }, [id, dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(resetBrandState());
    }
    if (isUpdated) {
      toast.success("Brand updated successfully");
      setErrors({});
      dispatch(resetBrandState());
    }
  }, [isUpdated, error, dispatch]);

  const [formData, setFormData] = useState({
    name: brand.name || "", // Provide a default value here
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    setFormData({ name: brand.name || "" });
  }, [brand]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length === 0) {
      const data = {
        ...formData,
        id,
      };
      dispatch(updateBrand(data)).then(() => {
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
    <>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <FormLayout title="Edit Brand">
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
              text="Update Brand"
            />
          </form>
        </FormLayout>
      )}
    </>
  );
};

export default EditBrand;
