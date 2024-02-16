import { useDispatch, useSelector } from "react-redux";
import FormLayout from "../../../components/Form/FormLayout";
import Input from "../../../components/Form/Input";
import { useEffect, useState } from "react";
import {
  clearCouponState,
  createCoupon,
} from "../../../redux/slices/coupon/couponSlice";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ButtonSecondary from "../../../components/Button/ButtonSecondary";
import toast from "react-hot-toast";

const AddCoupon = () => {
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [errors, setErrors] = useState({});

  const { isAdded, error } = useSelector((state) => state.coupons);

  useEffect(() => {
    if (error) {
      toast.error(error.message);
      dispatch(clearCouponState());
    }
    if (isAdded) {
      toast.success("Coupon created successfully");
      dispatch(clearCouponState());
    }
  }, [error, isAdded, dispatch]);

  const [formData, setFormData] = useState({
    code: "",
    discount: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Validate the form data
  const validateForm = () => {
    const newErrors = {};

    if (!formData.code) {
      newErrors.code = "Please enter the coupon code";
    }

    if (!formData.discount) {
      newErrors.discount = "Please enter the discount percentage";
    } else if (isNaN(formData.discount) || parseFloat(formData.discount) <= 0) {
      newErrors.discount = "Invalid discount value";
    }

    if (startDate <= new Date()) {
      newErrors.startDate = "Start date must be in the future";
    }

    if (endDate <= startDate) {
      newErrors.endDate = "End date must be after the start date";
    }

    return newErrors;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length === 0) {
      const couponData = {
        discount: parseFloat(formData.discount),
        code: formData.code,
        startDate,
        endDate,
      };
      dispatch(createCoupon(couponData)).then(() => {
        dispatch(clearCouponState());
      });
      // Reset the form and clear errors
      setFormData({
        code: "",
        discount: "",
      });
      setErrors({});
    } else {
      // Update errors
      setErrors(newErrors);
    }
  };

  return (
    <FormLayout title="Create new coupon">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Input
              type="text"
              name="code"
              id="code"
              autoComplete="code"
              placeholder="Code"
              label="Code"
              value={formData.code}
              onChange={handleInputChange}
              error={errors.code}
            />
          </div>
          <div>
            <Input
              type="text"
              name="discount"
              id="discount"
              autoComplete="discount"
              placeholder="10"
              label="Discount in (%)"
              value={formData.discount}
              onChange={handleInputChange}
              error={errors.discount}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Start Date
            </label>
            <div className="">
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                className="block w-full rounded-md border px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
            {errors.startDate && (
              <div className="text-red-500">{errors.startDate}</div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              End Date
            </label>
            <div className="block w-full">
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                className="w-full rounded-md border px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
            {errors.endDate && (
              <div className="text-red-500">{errors.endDate}</div>
            )}
          </div>
        </div>
        <ButtonSecondary text="Create coupon" />
      </form>
    </FormLayout>
  );
};

export default AddCoupon;
