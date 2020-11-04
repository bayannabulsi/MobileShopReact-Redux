import React from "react";
import Products from "./Components/Products";
import Filter from "./Components/Filter";
import ShoppingCart from "./Components/ShoppingCart";
import store from "./store";
import { Provider } from "react-redux";
class App extends React.Component {
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
                <Products></Products>
              </div>
              <div className="sidebar">
                <ShoppingCart></ShoppingCart>
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
