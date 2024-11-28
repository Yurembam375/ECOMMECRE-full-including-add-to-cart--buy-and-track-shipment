import React, { useContext } from 'react';
import { Store } from '../Store';
import { Helmet } from 'react-helmet-async';
import Message from '../components/Message';
import { Link } from 'react-router-dom';

function CartScreen() {
    const { state, dispatch, ctxDispatch } = useContext(Store);
    const {
        cart: { cartItems },
    } = state;

    // Function to handle quantity change and other cart actions could be added here

    return (
        <>
            <div>
                <Helmet>
                    <title>Shopping Cart</title>
                </Helmet>
            </div>
            <h1 className="text-xl font-semibold mb-3">Shopping Cart</h1>

            {cartItems.length === 0 ? (
                <Message>
                    Cart is Empty. <Link to="/" className="text-blue-500 text-sm">Go to homepage</Link>
                </Message>
            ) : (
                <div className="space-y-3">
                    {cartItems.map((item) => (
                        <div key={item._id} className="flex items-center space-x-3 p-3 border-b">
                            <div className="">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className=" h-24 object-cover"
                                />
                            </div>
                            <div className="flex-1">
                                <Link to={`/product/${item.slug}`} className="text-sm font-medium text-blue-600 hover:underline">
                                    {item.name}
                                </Link>
                            </div>
                            <div className="flex items-center space-x-1">
                                <button
                                    disabled={item.quantity === 1}
                                    className="disabled:opacity-50 p-1 bg-gray-200 rounded-full text-sm"
                                >
                                    <i className="fas fa-minus-circle"></i>
                                </button>
                                <span className="text-sm">{item.quantity}</span>
                                <button
                                    disabled={item.quantity === item.countInStock}
                                    className="disabled:opacity-50 p-1 bg-gray-200 rounded-full text-sm"
                                >
                                    <i className="fas fa-plus-circle"></i>
                                </button>
                            </div>
                            <div className="w-24 text-right text-sm">
                                ${item.price}
                            </div>
                            <button className="text-red-500 p-1 hover:bg-gray-200 rounded-full text-sm">
                                <i className="fas fa-trash"></i>
                            </button>
                        </div>
                    ))}
                    <div></div>
                </div>
            )}
        </>
    );
}

export default CartScreen;
