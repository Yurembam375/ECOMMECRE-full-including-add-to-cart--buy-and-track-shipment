import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import Rating from './Rating';
import axios from 'axios';
import { useContext } from 'react';
import { Store } from '../Store';

function Product(props) {
  const { product } = props;

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const addToCartHandler = async (item) => {
    const existItem = cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;

    // Fetch product by ID instead of slug
    const { data } = await axios.get(`/api/products/${product._id}`);

    if (data.countInStock < quantity) {
      window.alert('Sorry. Product is out of stock');
      return;
    }

    // Dispatch action to add item to cart
    ctxDispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...item, quantity },
    });
  };

  return (
    <Card className="border border-gray-300 rounded-lg overflow-hidden shadow-md transition-transform duration-300 ease-in-out transform hover:translate-y-1 hover:shadow-lg">
      <Link to={`/product/${product.slug}`}>
        <img
          src={product.image}
          className="w-full h-48 object-cover transition-opacity duration-300 hover:opacity-85"
          alt={product.name}
        />
      </Link>
      <Card.Body className="p-4 text-center">
        <Link to={`/product/${product.slug}`}>
          <Card.Title className="text-xl font-bold text-gray-800 mb-2">{product.name}</Card.Title>
        </Link>
        <Rating rating={product.rating} numReviews={product.numReviews} />
        <Card.Text className="text-lg text-gray-600 mb-4">${product.price}</Card.Text>
        {product.countInStock === 0 ? (
          <Button variant="light" className="bg-gray-300 text-gray-600 cursor-not-allowed hover:bg-gray-300" disabled>
            Out of stock
          </Button>
        ) : (
          <Button onClick={() => addToCartHandler(product)} className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">
            Add to cart
          </Button>
        )}
      </Card.Body>
    </Card>
  );
}

export default Product;
