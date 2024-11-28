import React, { useContext } from "react";
import { Store } from "../Store";
import { Helmet } from "react-helmet-async";
import Message from "../components/Message";
import { Link } from "react-router-dom";

function CartScreen() {
  const { state, dispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  return (
    <>
      <div>
        <Helmet>
          <title>Shopping Cart</title>
        </Helmet>
      </div>
      <h1 className="text-xl font-semibold mb-3 flex">Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <Message>
          Cart is Empty.{" "}
          <Link to="/" className="text-blue-500 text-sm">
            Go to homepage
          </Link>
        </Message>
      ) : (
        <div className="flex flex-col space-y-4">
          {" "}
          {/* flex-col for column layout */}
          {cartItems.map((item) => (
            <div
              key={item._id}
              className="flex flex-col md:flex-row items-center space-y-3 md:space-x-3 md:space-y-0 p-3 border-b"
            >
              <div>
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-24 object-cover"
                />
              </div>
              <div className="flex-1">
                <Link
                  to={`/product/${item.slug}`}
                  className="text-sm font-medium text-blue-600 hover:underline"
                >
                  {item.name}
                </Link>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  disabled={item.quantity === 1}
                  className="disabled:opacity-50 p-2 bg-gray-200 rounded-full text-sm"
                >
                  <i className="fas fa-minus-circle"></i>
                </button>
                <span className="text-sm">{item.quantity}</span>
                <button
                  disabled={item.quantity === item.countInStock}
                  className="disabled:opacity-50 p-2 bg-gray-200 rounded-full text-sm"
                >
                  <i className="fas fa-plus-circle"></i>
                </button>
              </div>
              <div className="w-24 text-right text-sm">${item.price}</div>
              <button className="text-red-500 p-2 hover:bg-gray-200 rounded-full text-sm">
                <i className="fas fa-trash"></i>
              </button>
            </div>
          ))}
          <div className="mt-4 text-right font-semibold">
            <h3>
              Total ({cartItems.reduce((a,c)=>a+c.quantity,0)} {''}
              items) : ${cartItems.reduce((a,c)=>a+c.price *c.quantity,0)}
            </h3>
            <div>
            
                <button
                  type="button"
                  disabled={cartItems.length === 0}
                  className="mt-2 py-2 px-4 bg-blue-500 text-white rounded-md disabled:bg-gray-300"
                >
                  Proceed to Checkout
                </button>
              
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default CartScreen;
