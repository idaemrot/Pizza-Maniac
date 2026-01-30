import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { AuthProvider } from "./context/AuthContext";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProtectedRoute from "./components/ProtectedRoute";
import UserDashboardLayout from "./components/UserDashboardLayout";
import AdminDashboardLayout from "./components/AdminDashboardLayout";
import MenuPage from "./pages/User/MenuPage";
import CartPage from "./pages/User/CartPage";
import MyOrdersPage from "./pages/User/MyOrdersPage";
import ProductManagerPage from "./pages/Admin/ProductManagerPage";
import OrderManagerPage from "./pages/Admin/OrderManagerPage";
import AdminDashboardPage from "./pages/Admin/DashboardPage";

import Snowfall from "react-snowfall";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <AuthProvider>
          {/* Global snow layer (does NOT affect layout) */}
          <Snowfall
          snowflakeCount={200}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            pointerEvents: "none",
            zIndex: 9999,
          }}
        />

          {/* App content above snow */}
          <div style={{ position: "relative", zIndex: 1 }}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />

              {/* User Routes */}
              <Route
                path="/user"
                element={
                  <ProtectedRoute roles={["User"]}>
                    <UserDashboardLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<MenuPage />} />
                <Route path="menu" element={<MenuPage />} />
                <Route path="cart" element={<CartPage />} />
                <Route path="orders" element={<MyOrdersPage />} />
              </Route>

              {/* Admin Routes */}
              <Route
                path="/admin"
                element={
                  <ProtectedRoute roles={["Admin"]}>
                    <AdminDashboardLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<AdminDashboardPage />} />
                <Route path="dashboard" element={<AdminDashboardPage />} />
                <Route path="products" element={<ProductManagerPage />} />
                <Route path="orders" element={<OrderManagerPage />} />
              </Route>

              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
