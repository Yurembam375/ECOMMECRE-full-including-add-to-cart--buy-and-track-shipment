import React, { useContext } from 'react';
import CheckoutSteps from '../components/CheckoutSteps';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Store } from '../Store';

function PlaceOrderScreen() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;

  return (
    <div className="container mx-auto px-4">
      <CheckoutSteps step1 step2 step3 step4 />
      
      <Helmet>
        <title>Place Order</title>
      </Helmet>

      <div className="my-8">
        {/* Shipping Information Section */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Shipping</h2>
          <div className="space-y-4">
            <div className="flex flex-col">
              <strong className="text-lg">Name:</strong>
              <span className="text-gray-700">{cart.shippingAddress.fullname}</span>
            </div>
            <div className="flex flex-col">
              <strong className="text-lg">Address:</strong>
              <span className="text-gray-700">
                {cart.shippingAddress.address}, {cart.shippingAddress.city}, {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
              </span>
            </div>
            <Link to="/shipping">Edit</Link>
          </div>
        </div>
      </div>

      <div className="my-8">
        {/* Payment Method Section */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-4">
          <h2 className="text-2xl font-semibold mb-4">Payment</h2>
          <div className="space-y-4">
            <div>
              <strong>Method:</strong>
              <span className="text-gray-700">{cart.paymentMethod}</span>
            </div>
            <Link to="/payment">Edit</Link>
          </div>
        </div>

        {/* Cart Items Section */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Items</h2>
          <div>
            {cart.cartItems.map((item) => (
              <div key={item._id} className="flex justify-between items-center mb-4">
                <img src={item.image} alt={item.name} className="w-20 h-20 object-cover" />
                <Link to={`/product/${item.slug}`} className="text-blue-600 hover:underline">
                  {item.name}
                </Link>
                <div className="text-gray-700">
                  <span>{item.quantity}</span> x <span>${item.price}</span>
                </div>
              </div>
            ))}
            <Link to="/cart" className="text-blue-600 hover:underline">Edit</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlaceOrderScreen;
