import React, { useContext } from 'react';
import { Route, Routes, BrowserRouter, Link } from 'react-router-dom';
import HomeScreen from './HomeScreen'; // Assuming you have a HomeScreen component
import ProductScreen from './screens/ProductScreen';
import { Store } from './Store'; // Store context for cart
import CartScreen from './screens/CartScreen';
import SignInScreen from './screens/SiginScreen';

function App() {
  const { state } = useContext(Store);
  const { cart } = state;

  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <header className="bg-gray-800 text-white p-4 sticky top-0">
          {/* Home Link */}
          <Link to="/" className="text-2xl font-bold">
            Laitonjam Collection
          </Link>

          {/* Cart Link */}
          <div className="mt-4">
            <Link to="/cart" className="text-lg text-yellow-500 hover:text-yellow-300 transition">
              Cart{' '}
              {cart.cartItems.length > 0 && (
                <span className="font-bold bg-red-700 text-white rounded-full px-3 py-1 text-sm">
                  {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                </span>
              )}
            </Link>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path='/cart' element={<CartScreen/>}/>
            <Route path='/signin' element={<SignInScreen/>}/>
            <Route path="/product/:slug" element={<ProductScreen />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="bg-gray-800 text-white p-4 text-center">
          <div>All rights reserved.</div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
