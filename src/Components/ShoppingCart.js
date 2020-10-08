import React, { Component } from "react";
import FormatCurrency from "../Components/util";
import Slide from "react-reveal/Slide";
import Fade from "react-reveal/Fade";
import { connect } from "react-redux";
import { RemoveFromCart } from "../Actions/CartActions";
class ShoppingCart extends Component {
  constructor(props) {
    super();
    this.state = {
      Name: "",
      Email: "",
      Address: "",
      ShowCheckout: false,
    };
  }

  handleInput = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  NewOrder = (e) => {
    e.preventDefault();
    const order = {
      Name: this.state.Name,
      Email: this.state.Email,
      Address: this.state.Address,
      CartItems: this.props.cartItems,
    };
    this.props.NewOrder(order);
  };
  render() {
    const { cartItems } = this.props;
    return (
      <div>
        <div>
          {cartItems.length === 0 ? (
            <div className="cart cart-header">Cart is empty</div>
          ) : (
            <div className="cart cart-header">
              You have {cartItems.length} in the cart{""}
            </div>
          )}
        </div>

        <div>
          <div className="cart">
            <ul className="cart-items">
              {cartItems.map((item) => (
                <Slide left cascade={true}>
                  <li key={item._id}>
                    <div>
                      <img src={item.image} alt={item.tiltle}></img>
                    </div>

                    <div>
                      <div>{item.tiltle}</div>
                      <div className="right">
                        {FormatCurrency(item.price)} x{item.count} {""}
                        <button
                          className="button"
                          onClick={() =>
                            this.props.RemoveFromCart(cartItems, item)
                          }
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                </Slide>
              ))}
            </ul>
          </div>
          {cartItems.length !== 0 && (
            <div>
              <div className="cart">
                <div className="Total">
                  <div>
                    Total:{""}
                    {FormatCurrency(
                      cartItems.reduce((a, b) => a + b.price * b.count, 0)
                    )}
                  </div>
                  <button
                    onClick={() => {
                      this.setState({ ShowCheckout: true });
                    }}
                    className="button primary"
                  >
                    {" "}
                    Proceed
                  </button>
                </div>
              </div>
              {this.state.ShowCheckout && (
                <div className="cart">
                  <Fade right cascade>
                    <form onSubmit={this.NewOrder}>
                      <ul className="form-container">
                        <li>
                          <label>Email</label>
                          <input
                            name="Email"
                            type="Email"
                            required
                            onChange={this.handleInput}
                          ></input>
                        </li>

                        <li>
                          <label>Name</label>
                          <input
                            name="Name"
                            type="text"
                            required
                            onChange={this.handleInput}
                          ></input>
                        </li>
                        <li>
                          <label>Address</label>
                          <input
                            type="text"
                            name="Address"
                            required
                            onChange={this.handleInput}
                          ></input>
                        </li>
                        <li>
                          <button className="button primary" type="submit">
                            Proceed
                          </button>
                        </li>
                      </ul>
                    </form>
                  </Fade>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default connect(
  (state) => ({
    cartItems: state.cart.cartItems,
  }),
  { RemoveFromCart }
)(ShoppingCart);
