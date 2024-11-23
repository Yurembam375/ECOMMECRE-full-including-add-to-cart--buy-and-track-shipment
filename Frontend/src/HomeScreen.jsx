import React, { useEffect,useState } from "react";
import data from "./Data";
import { Link } from "react-router-dom";
import axios from "axios";
function HomeScreen() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get("/api/products");
      setProducts(result.data);
    };
  }, []);
  return (
    <div>
      <h1>List Product</h1>
      <div className="products">
        {products.map((product) => (
          <div className="product" key={product.slug}>
            <Link to={`/product/${product.slug}`}>
              <img src={product.image} alt={product.name} />
            </Link>

            <div className="product-info">
              <Link to={`/product/${product.slug}`}>
                <p>{product.name}</p>
              </Link>
              <Link className="sa" to={`/product/${product.slug}`}>
                <p>
                  <strong className="price">${product.price}</strong>
                </p>
              </Link>
              <button>Add to Cart</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomeScreen;
