import React from 'react'

function HomeScreen() {
  return (
    <div>
       <h1>List Product</h1>
          <div className="products">
            {data.products.map((product) => (
              <div className="product" key={product.slug}>
                <a href={`/product/${product.slug}`}>
                  <img src={product.image} alt={product.name} />
                </a>
                <div className="product-info">
                  <a href={`/product/${product.slug}`}>
                    <p>{product.name}</p>
                  </a>
                  <a className="sa" href={`/product/${product.slug}`}>
                    <p>
                      <strong className="price">${product.price}</strong>
                    </p>
                  </a>
                  <button>Add to Cart</button>
                </div>
              </div>
            ))}
          </div>
    </div>
  )
}

export default HomeScreen
