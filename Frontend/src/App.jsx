import React, { useContext } from "react";
import { Route, Routes, BrowserRouter, Link } from "react-router-dom";
import HomeScreen from "./HomeScreen";
import ProductScreen from "./screens/ProductScreen.jsx";
import { Store } from "./Store.jsx";

function App() {
  const { state } = useContext(Store);
  const { cart } = state;

  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <header className="bg-gray-800 text-white p-4">
          {/* Link for Home */}
          <Link to="/" className="text-2xl font-bold">
            Laitonjam Collection
          </Link>

          <div className="mt-4">
            {/* Cart Link */}
            <Link
              to="/cart"
              className="text-lg text-yellow-500 hover:text-yellow-300 transition"
            >
              Cart{" "}
              {cart.cartItems.length > 0 && (
                <span className="font-bold">({cart.cartItems.length})</span>
              )}
            </Link>
          </div>
        </header>

        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/product/:slug" element={<ProductScreen />} />
          </Routes>
        </main>

        <footer className="bg-gray-800 text-white p-4 text-center">
          <div>All rights reserved.</div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
