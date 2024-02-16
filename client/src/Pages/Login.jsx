import { useState, useEffect } from "react";
import Input from "../components/Form/Input";
import { useDispatch, useSelector } from "react-redux";
import { loginUserAction } from "../redux/slices/users/userSlice";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const { error, loading, userInfo } = useSelector(
    (state) => state?.users?.userAuth
  );
  if (error) {
    errors.email = error.message;
    errors.password = "";
  }

  useEffect(() => {
    if (userInfo?.user) {
      window.location.href = "/";
    }
  }, [userInfo]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length === 0) {
      dispatch(
        loginUserAction({ email: formData.email, password: formData.password })
      );
    } else {
      setErrors(validationErrors);
    }
  };

  const validateForm = (data) => {
    const errors = {};
    if (!data.email || !isValidEmail(data.email)) {
      errors.email = "Please enter a valid email address";
    }
    if (!data.password) {
      errors.password = "Please enter a password";
    }
    return errors;
  };

  const isValidEmail = (email) => {
    const emailRegex = /\S+@\S+\.\S+/;
    return emailRegex.test(email);
  };

  const handleDemoAdminLogin = () => {
    dispatch(
      loginUserAction({
        email: "manager@gmail.com",
        password: "password",
      })
    );
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
        <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
          <p className="my-2 text-center text-xl text-gray-600">
            Sign in to your account
          </p>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <Input
              type="email"
              name="email"
              id="email"
              autoComplete="email"
              placeholder="Enter your email address"
              label="Email"
              value={formData.email}
              onChange={handleInputChange}
              error={errors.email}
            />
            <Input
              type="password"
              name="password"
              id="password"
              autoComplete="current-password"
              placeholder="Enter your password"
              label="Password"
              value={formData.password}
              onChange={handleInputChange}
              error={errors.password}
            />

            <div>
              <button
                disabled={loading}
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {loading ? "Loading..." : "Sign in"}
              </button>
            </div>
          </form>

          <div>
            <div className="relative mt-10">
              <div
                className="absolute inset-0 flex items-center"
                aria-hidden="true"
              >
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm font-medium leading-6">
                <span className="bg-white px-6 text-gray-900">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-6 ">
              <button
                disabled={loading}
                onClick={handleDemoAdminLogin}
                className="flex w-full items-center justify-center gap-3 rounded-md bg-[#2a323d] px-3 py-1.5 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#24292F]"
              >
                <span className="text-sm font-semibold leading-6">
                  Dashboard Login
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
