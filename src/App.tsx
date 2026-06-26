import React from "react";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";

// Pages
import { Home } from "./pages/Home";
import { Products } from "./pages/Products";
import { ProductDetails } from "./pages/ProductDetails";
import { Cart } from "./pages/Cart";
import { Checkout } from "./pages/Checkout";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { UserDashboard } from "./pages/UserDashboard";
import { About } from "./pages/About";
import { Recipes } from "./pages/Recipes";
import { Blogs } from "./pages/Blogs";
import { Contact } from "./pages/Contact";
import { FAQ } from "./pages/FAQ";
import { LegalPolicies } from "./pages/LegalPolicies";
import { AdminPanel } from "./pages/AdminPanel";

export default function App() {
  return (
    <AppProvider>
      <HashRouter>
        <div className="flex flex-col min-h-screen bg-ivory font-sans selection:bg-saffron selection:text-charcoal text-charcoal">
          {/* Main Global Header */}
          <Header />

          {/* Core App Viewports wrapper */}
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:id" element={<ProductDetails />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/dashboard" element={<UserDashboard />} />
              <Route path="/about" element={<About />} />
              <Route path="/recipes" element={<Recipes />} />
              <Route path="/blogs" element={<Blogs />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/legal" element={<LegalPolicies />} />
              <Route path="/admin" element={<AdminPanel />} />
              
              {/* Fallback Catch-all redirect to Home */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>

          {/* Main Global Footer */}
          <Footer />
        </div>
      </HashRouter>
    </AppProvider>
  );
}
