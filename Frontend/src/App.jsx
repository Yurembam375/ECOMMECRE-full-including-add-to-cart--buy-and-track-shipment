import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import HomeScreen from "./HomeScreen";
import data from "./Data"; // Assuming this contains the products array

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
            {/* You can add more routes here for other screens like product details, etc. */}
          </Routes>
          <h1>List Product</h1>
          <div className="products">
            {data.products.map((product) => (
              <div className="product" key={product.slug}>
                <a href={`/product/${product.slug}`}>
                  <img src={product.image} alt={product.name} />
                </a>
                <div className="product-info">
                  <a href={`/product/${product.slug}`}>
                    <p>{product.name}</p>
                  </a>
                  <a className="sa" href={`/product/${product.slug}`}>
                    <p>
                      <strong className="price">${product.price}</strong>
                    </p>
                  </a>
                  <button>Add to Cart</button>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
