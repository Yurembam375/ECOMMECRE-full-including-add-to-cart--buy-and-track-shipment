import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { Store } from '../Store';
import Rating from './Rating';
import axios from 'axios';

function Product(props) {
  const { product } = props;

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const addToCartHandler = async (item) => {
    const existItem = cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;

    // If the product is already in the cart, we don't need to fetch the data again
    const stockCount = product.countInStock;

    if (stockCount < quantity) {
      window.alert('Sorry. Product is out of stock');
      return;
    }

    ctxDispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...item, quantity },
    });
  };

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
      <Link to={`/product/${product.slug}`}>
        <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
      </Link>
      <div className="p-4">
        <Link to={`/product/${product.slug}`} className="text-xl font-semibold text-gray-900 hover:text-blue-500">
          {product.name}
        </Link>
        <Rating rating={product.rating} numReviews={product.numReviews} />
        <p className="text-xl font-bold text-gray-800">${product.price}</p>
        {product.countInStock === 0 ? (
          <button className="w-full py-2 mt-4 bg-gray-300 text-gray-700 cursor-not-allowed rounded" disabled>
            Out of stock
          </button>
        ) : (
          <button
            onClick={() => addToCartHandler(product)}
            className="w-full py-2 mt-4 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
          >
            Add to cart
          </button>
        )}
      </div>
    </div>
  );
}

export default Product;
