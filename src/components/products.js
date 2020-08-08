import React from 'react'
import formatCurrency from './../util';

export default function Products({prod}) {
    return (
        <div>
            <ul className="products">
              {prod.products.map((product) => (
                <li key={product._id}>
                  <div className="product">
                    <a href={`# ${product._id}`}>
                      <img src={product.images} alt={product.title}></img>
                      <p>{product.title}</p>
                    </a>
                    <div className="product-price">
                      <div>{formatCurrency(product.price)}</div>
                      <button className="button primary">Add To Cart</button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
        </div>
    )
}
