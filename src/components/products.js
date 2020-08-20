import React from 'react'
import formatCurrency from '../util';
import Fade from 'react-reveal/Fade';
import ProductDialog from './Products/ProductDialog';

export default function Products(props) {
  const { prod, addToCart } = props;
  const [product, setProduct] = React.useState(null);
  const [OpenProductDialog, setOpenProductDialog] = React.useState(false)

  const handleOpenProductDialog = product => {
    setProduct(product);
    setOpenProductDialog(true);
  }
  const handleCloseProductDialog = () => {
    setOpenProductDialog(false);
  }

  return (
    <div>
      <Fade bottom cascade={true}>
        <ul className="products">
          {prod.products.map((product) => (
            <li key={product._id}>
              <div className="product">
                <a
                  href={`# ${product._id}`}
                  onClick={() => handleOpenProductDialog(product)}
                >
                  <img
                    src={product.images}
                    alt={product.title}
                  ></img>
                  <p>{product.title}</p>
                </a>
                <div className="product-price">
                  <div>{formatCurrency(product.price)}</div>
                  <button
                    onClick={() => addToCart(product)}
                    className="button primary"
                  >Add To Cart</button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </Fade>
      {
        product && (
          <ProductDialog
            open={OpenProductDialog}
            close={handleCloseProductDialog}
            product={product}
            addToCart={addToCart}
          />
        )
      }
    </div>
  )
}
