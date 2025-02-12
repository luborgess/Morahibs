import { Suspense } from "react";
import ProductDetails from "./components/marketplace/ProductDetails";
import { useRoutes, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/home";
import LoginPage from "./components/auth/LoginPage";
import StorePage from "./components/store/StorePage";
import routes from "tempo-routes";
import Navbar from "./components/layout/Navbar";
import { AuthProvider } from "./lib/auth";

function App() {
  return (
    <AuthProvider>
      <Suspense fallback={<p>Loading...</p>}>
        <>
          <Navbar />
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/store/:slug" element={<StorePage />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
          {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
        </>
      </Suspense>
    </AuthProvider>
  );
}

export default App;
