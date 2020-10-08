import React from "react";
import Products from "./Components/Products";
import Filter from "./Components/Filter";
import ShoppingCart from "./Components/ShoppingCart";
import store from "./store";
import { Provider } from "react-redux";
class App extends React.Component {
 


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
                
                ></Products>
              </div>
              <div className="sidebar">
                <ShoppingCart
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
