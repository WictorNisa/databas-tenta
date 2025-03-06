import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav/Nav.tsx";
import Home from "./routes/Home/Home.tsx";
import Products from "./routes/Products/Products.tsx";
import Customers from "./routes/Customers/Customers.tsx";
import AuthPage from "./routes/AuthPage/AuthPage.tsx";
import { AuthProvider } from "./Context/AuthContext.tsx";
import CustomerProfile from "./routes/CustomerProfile/CustomerProfile.tsx";

createRoot(document.getElementById("root")!).render(
  <Router>
    <AuthProvider>
      <Nav /> {/* Nav will now have access to user data */}
      <Routes>
        <Route path="/" element={<App />} />
        <Route index element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/profile" element={<CustomerProfile />} />
      </Routes>
    </AuthProvider>
  </Router>
);
