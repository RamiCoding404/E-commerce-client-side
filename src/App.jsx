import { Routes, Route } from "react-router-dom";
import HomePage from "./pages";
import AboutPage from "./pages/About";
import ProductsPage from "./pages/Products";
import ProductPage from "./pages/Product";
import Login from "./pages/Login";
import Applayout from "./layout/Applayout";
import CookieService from "./services/CookieService";
import CartDrawer from "./components/CartDrawer";
import AdminDashboard from "./pages/dashboard";
import DashboardLayout from "./pages/dashboard/DashboardLayout";
import DashboardProducts from "./pages/dashboard/DashboardProducts";

const App = () => {
  const token = CookieService.get("jwt");

  return (
    <>
      <Routes>
        <Route path="/" element={<Applayout />}>
          <Route index element={<HomePage />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="products/:id" element={<ProductPage />} />
          <Route path="about" element={<AboutPage />} />
        </Route>

        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path={"products"} element={<DashboardProducts />} />
          <Route path={"categories"} element={<h1>Categories</h1>} />
        </Route>

        <Route path="/login" element={<Login isAuth={token} />} />
      </Routes>
      <CartDrawer />
    </>
  );
};

export default App;
