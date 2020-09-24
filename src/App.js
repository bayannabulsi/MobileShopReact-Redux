import React from "react";
import data from "./Mobilesdata.json";
import Products from "./Components/Products";
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      products: data.products,
      brand: "",
      sort: "",
    };
  }
  render() {
    return (
      <div className="grid-container">
        <header>
          <a href="/">React Shopping Cart</a>
        </header>
        <main>
          <div className="content">
            <div className="main">
              <Products products={this.state.products}></Products>
            </div>
            <div className="sidebar">cart Items</div>
          </div>
        </main>
        <footer>All right Reserved </footer>
      </div>
    );
  }
}

export default App;
