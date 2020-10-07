import React from "react";
import data from "./Mobilesdata.json";
import Products from "./Components/Products";
import Filter from "./Components/Filter";
import ShoppingCart from "./Components/ShoppingCart";
import store from "./store";
import { Provider } from "react-redux";
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      products: data.products,
      size: "",
      sort: "",
      cartItems: localStorage.getItem("cartItems")
        ? JSON.parse(localStorage.getItem("cartItems"))
        : [],
    };
  }

   /* sortProducts = (event) => {
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
  };  */

  /*  filterProducts = (event) => {
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
 */
  NewOrder = (order) => {
    console.log(order);
    alert("Need to save order for" + order.Name);
  };
  DeleteItem = (product) => {
    const cartItems = this.state.cartItems.slice();
    cartItems.forEach((item) => {
      if (item._id === product._id) {
        item.count--;
        if (item.count === 0) {
          this.setState({
            cartItems: cartItems.filter((x) => x._id !== product._id),
          });
        } else {
          this.setState({ cartItems });
        }
      }
    });
    localStorage.setItem(
      "cartItems",
      JSON.stringify(cartItems.filter((x) => x._id !== product._id))
    );
  };

  AddItem = (product) => {
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
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  };
  render() {
    return (
      <Provider store={store}>
        <div className="grid-container">
          <header>
            <a href="/">React Shopping Cart</a>
          </header>
          <main>
            <div className="content">
              <div className="main">
                <Filter></Filter>
                <Products
                  AddItem={this.AddItem}
                ></Products>
              </div>
              <div className="sidebar">
                <ShoppingCart
                  cartItems={this.state.cartItems}
                  DeleteItem={this.DeleteItem}
                  NewOrder={this.NewOrder}
                ></ShoppingCart>
              </div>
            </div>
          </main>
          <footer>All right Reserved </footer>
        </div>
      </Provider>
    );
  }
}

export default App;
