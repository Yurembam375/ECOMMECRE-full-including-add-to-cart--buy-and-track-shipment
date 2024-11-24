import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import HomeScreen from "./HomeScreen";
import ProductScreen from "./screens/ProductScreen";


function App() {
  return (
    <BrowserRouter>
      <div>
        <header>
          <a href="/">Laitonjam Collection</a>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/product/:slug" element={<ProductScreen />} />
          </Routes>
        
        </main>
        <footer>
          <div className="text-center">
            All rights reserved.
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
