import React from 'react';
import data from "./data.json";
import Products from "./components/products";
import Filter from './components/Filter';

function App() {

  const [products, setProducts] = React.useState(data);
  const [size, setSize] = React.useState("");
  const [sort, setSort] = React.useState("");

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

  return (
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
            <Products prod={products} />
          </div>
          <div className="sidebar">
            cartItems
          </div>
        </div>
      </main>
      <footer>
        All rights are reserved
      </footer>
    </div>
  );
}

export default App;
