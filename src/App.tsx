import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Pages
import Welcome from "@/pages/Welcome";
import ForCustomer from "@/pages/ForCustomer";
import ForVendor from "@/pages/ForVendor";
import ForDelivery from "@/pages/ForDelivery";
import Products from "@/pages/Products";
import Categories from "@/pages/Categories";
import ProductDetail from "@/pages/ProductDetail";
import Checkout from "@/pages/Checkout";
import Wishlist from "@/pages/Wishlist";

// Footer Pages
import AboutUs from "@/pages/AboutUs";
import HowItWorks from "@/pages/HowItWorks";
import FAQ from "@/pages/FAQ";
import ContactUs from "@/pages/ContactUs";
import Terms from "@/pages/Terms";
import Privacy from "@/pages/Privacy";

// Auth Pages
import LoginCustomer from "@/pages/auth/LoginCustomer";
import SignupCustomer from "@/pages/auth/SignupCustomer";

// Dashboard Pages
import CustomerDashboard from "@/pages/dashboard/CustomerDashboard";
import VendorDashboard from "@/pages/dashboard/VendorDashboard";
import DeliveryDashboard from "@/pages/dashboard/DeliveryDashboard";

// Admin Pages
import AdminLayout from "@/components/admin/AdminLayout";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import VendorManagement from "@/pages/admin/VendorManagement";
import CustomerManagement from "@/pages/admin/CustomerManagement";
import ProductManagement from "@/pages/admin/ProductManagement";

// Other
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* Admin Routes */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="vendors" element={<VendorManagement />} />
              <Route path="customers" element={<CustomerManagement />} />
              <Route path="products" element={<ProductManagement />} />
              {/* Add more admin routes as they are implemented */}
            </Route>
            
            {/* Main Routes with Header and Footer */}
            <Route path="/" element={
              <>
                <Header />
                <main>
                  <Toaster />
                  <Sonner />
                  <Routes>
                    {/* Main Pages */}
                    <Route index element={<Welcome />} />
                    <Route path="/for-customer" element={<ForCustomer />} />
                    <Route path="/for-vendor" element={<ForVendor />} />
                    <Route path="/for-delivery" element={<ForDelivery />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/categories" element={<Categories />} />
                    <Route path="/product/:id" element={<ProductDetail />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/wishlist" element={<Wishlist />} />
                    
                    {/* Footer Pages */}
                    <Route path="/about" element={<AboutUs />} />
                    <Route path="/how-it-works" element={<HowItWorks />} />
                    <Route path="/faq" element={<FAQ />} />
                    <Route path="/contact" element={<ContactUs />} />
                    <Route path="/terms" element={<Terms />} />
                    <Route path="/privacy" element={<Privacy />} />
                    
                    {/* Authentication */}
                    <Route path="/login/customer" element={<LoginCustomer />} />
                    <Route path="/signup/customer" element={<SignupCustomer />} />
                    
                    {/* Currently using the same login component for all user types */}
                    <Route path="/login/vendor" element={<LoginCustomer />} />
                    <Route path="/signup/vendor" element={<SignupCustomer />} />
                    <Route path="/login/delivery" element={<LoginCustomer />} />
                    <Route path="/signup/delivery" element={<SignupCustomer />} />

                    {/* Dashboards */}
                    <Route path="/dashboard/customer" element={<CustomerDashboard />} />
                    <Route path="/dashboard/vendor" element={<VendorDashboard />} />
                    <Route path="/dashboard/delivery" element={<DeliveryDashboard />} />

                    {/* 404 Page */}
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </main>
                <Footer />
              </>
            } />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
