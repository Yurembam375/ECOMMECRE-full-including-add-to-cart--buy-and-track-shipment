import React from 'react';
import { useParams } from 'react-router-dom';

function ProductScreen() {
  const { slug } = useParams(); // Destructure slug from params

  return (
    <div>
      <h1>{slug}</h1>
    </div>
  );
}

export default ProductScreen;
