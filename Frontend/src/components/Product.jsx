import React from 'react';
import { Link } from 'react-router-dom';
import Rating from './Rating';

function Product({ product }) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4 transition-all hover:shadow-xl">
      <Link to={`/product/${product.slug}`}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-72 object-cover rounded-md mb-4"
        />
      </Link>
      <Rating rating={product.rating} numReviews={product.numReviews}/>

      <div className="product-info">
        <Link to={`/product/${product.slug}`} className="text-xl font-semibold text-gray-800 hover:text-gray-600">
          <p>{product.name}</p>
        </Link>
        <div className="mt-2 flex items-center justify-between">
          <p className="text-lg text-green-600 font-bold">${product.price}</p>
          <button className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-yellow-800 focus:outline-none transition">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default Product;
