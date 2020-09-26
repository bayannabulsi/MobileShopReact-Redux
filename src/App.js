import React from "react";
import data from "./Mobilesdata.json";
import Products from "./Components/Products";
import Filter from "./Components/Filter";
import ShoppingCart from "./Components/ShoppingCart";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      products: data.products,
      size: "",
      sort: "",
      cartItems: [],
    };
  }

  sortProducts = (event) => {
    const sort = event.target.value;
    console.log(event.target.value);
    this.setState((state) => ({
      sort: sort,
      products: this.state.products
        .slice()
        .sort((a, b) =>
          sort === "lowest"
            ? a.price > b.price
              ? 1
              : -1
            : sort === "highest"
            ? a.price < b.price
              ? 1
              : -1
            : a._id > b._id
            ? 1
            : -1
        ),
    }));
    console.log(this.state.products);
  };

  filterProducts = (event) => {
    console.log(event.target.value);
    if (event.target.value === "") {
      this.setState({ size: event.target.value, products: data.products });
    } else {
      this.setState({
        size: event.target.value,
        products: data.products.filter(
          (product) => product.brand.indexOf(event.target.value) >= 0
        ),
      });
    }
  };

  DeleteItem = (product) => {
    const cartItems = this.state.cartItems.slice();
    this.setState({
      cartItems: cartItems.filter((x) => x._id !== product._id),
    });
  };
  AddToCart = (product) => {
    const cartItems = this.state.cartItems.slice();
    let alreadyInCart = false;
    cartItems.forEach((item) => {
      if (item._id === product._id) {
        item.count++;
        alreadyInCart = true;
      }
    });
    if (!alreadyInCart) {
      cartItems.push({ ...product, count: 1 });
    }

    this.setState({ cartItems });
  };
  render() {
    return (
      <div className="grid-container">
        <header>
          <a href="/">React Shopping Cart</a>
        </header>
        <main>
          <div className="content">
            <div className="main">
              <Filter
                count={this.state.products.length}
                size={this.state.size}
                sort={this.state.sort}
                sortProducts={this.sortProducts}
                filterProducts={this.filterProducts}
              ></Filter>
              <Products
                products={this.state.products}
                addToCart={this.AddToCart}
              ></Products>
            </div>
            <div className="sidebar">
              <ShoppingCart cartItems={this.state.cartItems} DeleteItem={this.DeleteItem}></ShoppingCart>
            </div>
          </div>
        </main>
        <footer>All right Reserved </footer>
      </div>
    );
  }
}

export default App;
