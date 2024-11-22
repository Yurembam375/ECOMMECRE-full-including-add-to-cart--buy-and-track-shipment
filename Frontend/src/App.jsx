import React from "react";
import data from "./Data";

function App() {
  return (
    <div>
      <header>
        <a href="/">Laitonjam Collection</a>
      </header>
      <main>
        <h1>List Product</h1>
        <div className="products">
          {data.products.map((product) => (
            <div className="product" key={product.slug}>
              <a href={`/product/${product.slug}`}>
                <img src={product.image} alt={product.name}></img>
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
  );
}

export default App;
