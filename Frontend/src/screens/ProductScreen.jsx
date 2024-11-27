import React from "react";
import { useParams } from "react-router-dom";
import { useReducer, useEffect } from "react";
import axios from "axios";
import Rating from "../components/Rating";
import { Helmet } from "react-helmet-async";
import Loading from "../components/Loading";
import Message from "../components/Message";
import { getError } from "./util";

// Reducer function to handle loading, success, and error states
const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, product: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function ProductScreen() {
  const { slug } = useParams(); // Destructure slug from params
  const [{ loading, error, product }, dispatch] = useReducer(reducer, {
    product: [],
    loading: true,
    error: "",
  });

  // Fetch product data based on slug
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const result = await axios.get(
          `http://localhost:4000/api/products/slug/${slug}`
        );
        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
      } catch (error) {
        dispatch({ type: "FETCH_FAIL", payload: getError(error) });
      }
    };
    fetchData();
  }, [slug]);

  return loading ? (
    <Loading />
  ) : error ? (
    <Message variant="error">{error}</Message>
  ) : (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Helmet>
        <title>{product.name}</title>
        <meta name="description" content={product.description} />
      </Helmet>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="flex justify-center">
          <img
            className="h-[500px] object-contain"
            src={product.image}
            alt={product.name}
          />
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <ul>
            <li>
              <h1 className="text-3xl font-bold text-gray-900 border-b-2 border-gray-500 mb-4 mr-3">
                {product.name}
              </h1>
            </li>

            <li>
              <div className="flex items-center space-x-4 border-b-2 border-gray-500 mb-4">
                <Rating
                  rating={product.rating}
                  numReviews={product.numReviews}
                />
              </div>
            </li>
            <li>
              <div className="flex items-center space-x-4 border-b-2 border-gray-500 mb-4">
                <p className="text-center text-green-500 font-bold">
                  Price: ${product.price}
                </p>
              </div>
            </li>
            <li>
              <p className="text-lg text-gray-700 border-b-2 border-gray-500 mb-4">
                <strong>Description: </strong>
                {product.description}
              </p>
            </li>
          </ul>
        </div>

        {/* Product Status */}
        <div className="border-2 border-gray-400 rounded-lg p-4 w-[200px]">
          <ul>
            <li>
              <p className="text-green-600 font-bold mb-2">
                Price: <span>${product.price}</span>
              </p>
            </li>
            <li>
              <p>
                <strong>Status: </strong>
                {product.countInStock > 0 ? (
                  <span className="text-white bg-green-700 rounded-md p-1 mt-6">In Stock</span>
                ) : (
                  <span className="text-white bg-red-700 rounded-md p-1 mt-6">Unavailable</span>
                )}
              </p>
            </li>
          </ul>
          {product.countInStock > 0 && (
            <div className="mt-4">
              <button className="w-full bg-yellow-500 text-white py-2 rounded-md hover:bg-yellow-600 transition duration-200">
                Add to Cart
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductScreen;
