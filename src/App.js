import React from 'react';
import data from "./data.json";
import Products from "./components/products";
function App() {

  const [products, setProducts] = React.useState(data);
  const [size, setSize] = React.useState("");
  const [sort, setSort] = React.useState("");


  return (
    <div className="grid-container">
      <header>
        <a href="/">React-Redux shopping cart</a>
      </header>
      <main>
        <div className="content">
          <div className="main">
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
