import React from 'react';
import data from "./data.json";
import Products from "./components/products";
import Filter from './components/Filter';
import Cart from './components/Cart';
import store from "./store";
import { Provider } from "react-redux";

const App = () => {

  const [products, setProducts] = React.useState(data);
  const [size, setSize] = React.useState("");
  const [sort, setSort] = React.useState("");
  const [cartItems, setCartItems] = React.useState(
    JSON.parse(localStorage.getItem('cartItems')) ? JSON.parse(localStorage.getItem('cartItems')) : []
  );

  const createOrder = order => {
    alert('need to save order for ' + order.name)
  }

  const sortProducts = event => {
    const sort = event.target.value;
    setSort(sort);
    setProducts({
      products: products.products.slice().sort((a, b) => (
        sort === "lowest" ? ((a.price > b.price) ? 1 : -1) :
          sort === "highest" ? ((a.price < b.price) ? 1 : -1) :
            ((a._id > b._id) ? 1 : -1)
      ))
    })
  }

  const filterProducts = (event) => {
    if (event.target.value === "") {
      setProducts({ products: data.products })
      setSize(event.target.value)
    }
    else {
      const filteredProducts = (
        data.products.filter(
          product => product.availableSizes.indexOf(event.target.value) >= 0
        ))
      setProducts({ products: filteredProducts })
      setSize(event.target.value)
    }
  }

  // const addToCart = product => {
  //   const cartItemsCopy = cartItems.slice();
  //   let alreadyInCart = false;
  //   cartItemsCopy.forEach(item => {
  //     if (item._id === product._id) {
  //       console.log(item)
  //       let i = item.count++;
  //       cartItemsCopy.push({
  //         ...product, count: i
  //       })
  //       alreadyInCart = true;
  //     }
  //   });
  //   if (!alreadyInCart) {
  //     cartItemsCopy.push({ ...product, count: 1 })
  //   }
  //   setCartItems(cartItemsCopy);
  // }

  const removeFromCart = (item) => {

    const cartItemsCopy = cartItems.slice();

    if (item.count > 1) {
      cartItemsCopy.forEach(product => {
        if (product._id === item._id) {
          product.count--;
        }
      });
      setCartItems(cartItemsCopy);
      // localStorage.setItem('cartItems', JSON.stringify(cartItems)) // working fine
    }

    else {
      setCartItems(cartItemsCopy.filter(x => item._id !== x._id));
      // localStorage.setItem('cartItems', JSON.stringify(cartItems)); // local storage
    }
    localStorage.setItem('cartItems', JSON.stringify(cartItems)) // working fine
  }

  const addToCart = product => {
    const cartItemsCopy = cartItems.slice();
    let alreadyInCart = false;
    cartItemsCopy.forEach(item => {
      if (item._id === product._id) {
        item.count++;
        alreadyInCart = true;
      }
    });
    if (!alreadyInCart) {
      cartItemsCopy.push({ ...product, count: 1 })
    }
    setCartItems(cartItemsCopy);
    localStorage.setItem('cartItems', JSON.stringify(cartItems)); // local storage
  }
  
  return (
    <Provider store={store}>
      <div className="grid-container">
        <header>
          <a href="/">React-Redux shopping cart</a>
        </header>
        <main>
          <div className="content">
            <div className="main">

              <Filter
                count={products.products.length}
                size={products.size}
                sort={products.sort}
                availableSizes={() => (products.map((p) => p.products.availableSizes))}
                filterProducts={filterProducts}
                sortProducts={sortProducts}
              />
              <Products
                prod={products}
                addToCart={addToCart}
              />
            </div>
            <div className="sidebar">
              <Cart
                cartItems={cartItems}
                removeFromCart={removeFromCart}
                createOrder={createOrder}
              />
            </div>
          </div>
        </main>
        <footer>
          All rights are reserved
      </footer>
      </div>
    </Provider>
  );
}

export default App;
