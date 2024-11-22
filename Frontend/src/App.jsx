import React from 'react'
import data from './Data'

function App() {
  return (
    <div>
      <header>
        <a href='/'>Amazon</a>
      </header>
      <main><h1>List Product</h1>
      {data.products.map=(product =>(
        <div>
          <img src={product.image}></img>
          <p>{product.name}</p>
          <p>{product.price}</p>
        </div>
      ))}</main>

    </div>
  )
}

export default App
