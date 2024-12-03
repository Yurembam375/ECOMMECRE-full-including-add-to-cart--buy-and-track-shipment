import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';

function ShippingAddressScreen() {
  const [fullname, setFullname] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalcode, setPostalcode] = useState('');
  const [country, setCountry] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    ctxDispatch({
        type:'SAVE_SHIPPING_ADDRESS',
        payload: { fullname, address, city, postalcode, country },

    });
    localStorage.setItem(
        'shppingAddress',JSON.stringify({
            fullname, address, city, postalcode, country
        })
    )
  }

  return (
    <>
      <Helmet>
        <title>Shipping Address</title>
      </Helmet>

      <div className="max-w-2xl mx-auto p-4 bg-white shadow-md rounded-lg mt-8">
        <h1 className="text-3xl font-semibold text-center mb-6">Shipping Address</h1>
        <form onSubmit={submitHandler}>
          <div className="mb-4">
            <label htmlFor="fullname" className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              id="fullname"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              required
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
            <input
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
            <input
              type="text"
              id="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="postalcode" className="block text-sm font-medium text-gray-700">Postal Code</label>
            <input
              type="text"
              id="postalcode"
              value={postalcode}
              onChange={(e) => setPostalcode(e.target.value)}
              required
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country</label>
            <input
              type="text"
              id="country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Continue
          </button>
        </form>
      </div>
    </>
  );
}

export default ShippingAddressScreen;
