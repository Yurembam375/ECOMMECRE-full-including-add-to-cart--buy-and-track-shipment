import { useContext } from 'react';
import { Store } from '../Store.jsx';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Message from '../components/Message.jsx';

export default function CartScreen() {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const updateCartHandler = async (item, quantity) => {
    const { data } = await axios.get(`/api/products/${item._id}`);
    if (data.countInStock < quantity) {
      window.alert('Sorry. Product is out of stock');
      return;
    }
    ctxDispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...item, quantity },
    });
  };
  const removeItemHandler = (item) => {
    ctxDispatch({ type: 'CART_REMOVE_ITEM', payload: item });
  };

  const checkoutHandler = () => {
    navigate('/signin?redirect=/shipping');
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <Helmet>
        <title>Shopping Cart</title>
      </Helmet>
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
      <div className="flex">
        <div className="w-full md:w-2/3 pr-4">
          {cartItems.length === 0 ? (
            <Message>
              Cart is empty. <Link to="/" className="text-blue-600">Go Shopping</Link>
            </Message>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item._id} className="flex items-center p-4 border-b border-gray-300">
                  <div className="w-1/4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-auto rounded-md border border-gray-200"
                    />
                    <Link to={`/product/${item.slug}`} className="text-blue-600">{item.name}</Link>
                  </div>
                  <div className="w-1/4 flex items-center space-x-2">
                    <button
                      onClick={() => updateCartHandler(item, item.quantity - 1)}
                      className="text-gray-500 hover:text-gray-700 disabled:opacity-50"
                      disabled={item.quantity === 1}
                    >
                      <i className="fas fa-minus-circle"></i>
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => updateCartHandler(item, item.quantity + 1)}
                      className="text-gray-500 hover:text-gray-700 disabled:opacity-50"
                      disabled={item.quantity === item.countInStock}
                    >
                      <i className="fas fa-plus-circle"></i>
                    </button>
                  </div>
                  <div className="w-1/4 text-center">${item.price}</div>
                  <div className="w-1/4 text-center">
                    <button
                      onClick={() => removeItemHandler(item)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="w-full md:w-1/3 pl-4">
          <div className="border border-gray-300 rounded-lg p-4">
            <div className="mb-4">
              <h3 className="text-xl font-semibold">
                Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)} items): $
                {cartItems.reduce((a, c) => a + c.price * c.quantity, 0)}
              </h3>
            </div>
            <div className="text-center">
              <button
                onClick={checkoutHandler}
                className={`w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:opacity-50`}
                disabled={cartItems.length === 0}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
