import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { AuthProvider } from "./context/AuthContext"; // New import
import LoginPage from "./pages/LoginPage"; // New import
import RegisterPage from "./pages/RegisterPage"; // New import
import ProtectedRoute from "./components/ProtectedRoute"; // New import
import UserDashboardLayout from "./components/UserDashboardLayout"; // New import
import AdminDashboardLayout from "./components/AdminDashboardLayout"; // New import
import MenuPage from "./pages/User/MenuPage"; // New import
import CartPage from "./pages/User/CartPage"; // New import
import MyOrdersPage from "./pages/User/MyOrdersPage"; // New import
import ProductManagerPage from "./pages/Admin/ProductManagerPage"; // New import
import OrderManagerPage from "./pages/Admin/OrderManagerPage"; // New import
import AdminDashboardPage from "./pages/Admin/DashboardPage"; // New import

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* User Routes */}
            <Route path="/user" element={<ProtectedRoute roles={["User"]}><UserDashboardLayout /></ProtectedRoute>}>
              <Route index element={<MenuPage />} /> {/* Default user page */}
              <Route path="menu" element={<MenuPage />} />
              <Route path="cart" element={<CartPage />} />
              <Route path="orders" element={<MyOrdersPage />} />
            </Route>

            {/* Admin Routes */}
            <Route path="/admin" element={<ProtectedRoute roles={["Admin"]}><AdminDashboardLayout /></ProtectedRoute>}>
              <Route index element={<AdminDashboardPage />} /> {/* Default admin page */}
              <Route path="dashboard" element={<AdminDashboardPage />} />
              <Route path="products" element={<ProductManagerPage />} />
              <Route path="orders" element={<OrderManagerPage />} />
            </Route>

            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;