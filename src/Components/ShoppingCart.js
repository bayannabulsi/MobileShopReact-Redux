import React, { Component } from "react";
import FormatCurrency from "../Components/util";
export default class ShoppingCart extends Component {
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
                        onClick={() => this.props.DeleteItem(item)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          {cartItems.length !== 0 && (
            <div className="cart">
              <div className="Total">
                <div>
                  Total:{""}
                  {FormatCurrency(
                    cartItems.reduce((a, b) => a + b.price * b.count, 0)
                  )}
                </div>
                <button className="button primary"> Proceed</button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}
