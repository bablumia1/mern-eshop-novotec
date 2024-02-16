import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Dashboard from "./Pages/Admin/dashboard";
import { Toaster } from "react-hot-toast";
import Profile from "./Pages/Profile";
import AuthRoute from "./components/AuthRoute/AuthRoute";
import AdminRoute from "./components/AuthRoute/AdminRoute";
import DashboardMain from "./components/Admin/Dashboard/DashboardMain";
import Products from "./Pages/Admin/Products/Products";
import AddProduct from "./Pages/Admin/Products/AddProduct";
import EditProduct from "./Pages/Admin/Products/EditProduct";
import Categories from "./Pages/Admin/Categories/Categories";
import AddCategory from "./Pages/Admin/Categories/AddCategory";
import EditCategory from "./Pages/Admin/Categories/EditCategory";
import CategoriesProducts from "./Pages/Admin/Categories/CategoriesProducts";
import Brands from "./Pages/Admin/Brand/Brands";
import BrandsProducts from "./Pages/Admin/Brand/BrandsProducts";
import AddBrand from "./Pages/Admin/Brand/AddBrand";
import EditBrand from "./Pages/Admin/Brand/EditBrand";
import Colors from "./Pages/Admin/Colors/Colors";
import AddColor from "./Pages/Admin/Colors/AddColor";
import Coupons from "./Pages/Admin/Coupon/Coupons";
import AddCoupon from "./Pages/Admin/Coupon/AddCoupon";
import "react-loading-skeleton/dist/skeleton.css";
import NotFound from "./components/NotFound/NotFound";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import CategoryProducts from "./Pages/CategoryProducts";
import ProductsPage from "./Pages/ProductsPage";
import Layout from "./Pages/Layout";
import ProductDetails from "./Pages/ProductDetails";
import Cart from "./Pages/Cart";
import OrderPayment from "./Pages/OrderPayment";
import OrderSuccess from "./Pages/OrderSuccess";
import TrackOrder from "./Pages/TrackOrder";
import Orders from "./Pages/Admin/Orders/Orders";
import OrderDetails from "./Pages/Admin/Orders/OrderDetails";
import ManageUsers from "./Pages/Admin/Users/ManageUsers";

function App() {
  return (
    <div className="">
      <BrowserRouter>
        <ScrollToTop />
        <Toaster />
        <Routes>
          <Route
            path="/dashboard"
            element={
              <AuthRoute>
                <AdminRoute>
                  <Dashboard />
                </AdminRoute>
              </AuthRoute>
            }
          >
            <Route index path="" element={<DashboardMain />} />

            <Route path="all-products" element={<Products />} />
            <Route path="add-product" element={<AddProduct />} />
            <Route path="edit-product/:id" element={<EditProduct />} />

            <Route path="all-categories" element={<Categories />} />
            <Route path="add-category" element={<AddCategory />} />
            <Route path="edit-category/:id" element={<EditCategory />} />
            <Route
              path="categories/:id/products"
              element={<CategoriesProducts />}
            />

            <Route path="all-brands" element={<Brands />} />
            <Route path="add-brand" element={<AddBrand />} />
            <Route path="edit-brand/:id" element={<EditBrand />} />
            <Route path="brands/:id/products" element={<BrandsProducts />} />

            <Route path="all-colors" element={<Colors />} />
            <Route path="add-color" element={<AddColor />} />

            <Route path="all-coupons" element={<Coupons />} />
            <Route path="add-coupon" element={<AddCoupon />} />
            <Route path="orders" element={<Orders />} />
            <Route path="order/:id" element={<OrderDetails />} />
            <Route path="users" element={<ManageUsers />} />

            <Route path="*" element={<NotFound />} />
          </Route>
          <Route path="/" element={<Layout />}>
            <Route index path="" element={<Home />} />
            <Route
              path="login"
              element={
                <AuthRoute>
                  <Login />
                </AuthRoute>
              }
            />
            <Route path="register" element={<Register />} />
            <Route
              path="category/:id/products"
              element={<CategoryProducts />}
            />
            <Route path="products" element={<ProductsPage />} />
            <Route path="product/:id" element={<ProductDetails />} />
            <Route path="shopping-cart" element={<Cart />} />
            <Route path="*" element={<NotFound />} />
            <Route
              path="profile"
              element={
                <AuthRoute>
                  <Profile />
                </AuthRoute>
              }
            />
            <Route
              path="order-payment"
              element={
                <AuthRoute>
                  <OrderPayment />
                </AuthRoute>
              }
            />
            <Route
              path="order/success/:id"
              element={
                <AuthRoute>
                  <OrderSuccess />
                </AuthRoute>
              }
            />
            <Route
              path="order/track/:id"
              element={
                <AuthRoute>
                  <TrackOrder />
                </AuthRoute>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
