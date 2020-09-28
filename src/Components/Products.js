import React, { Component } from "react";
import FormatCurrency from "../Components/util";
import Slide from "react-reveal/Slide";
import Modal from "react-modal";
import Zoom from "react-reveal/Zoom";
export default class Products extends Component {
  constructor(props) {
    super();
    this.state = {
      show: false,
      Selectedproduct: {},
    };
  }
  showModal = (product) => {
    console.log(product);
    this.setState({ show: true, Selectedproduct: product });
  };

  hideModal = () => {
    this.setState({ show: false });
  };

  render() {
    const { Selectedproduct } = this.state;
    return (
      <div>
        <Slide left cascade={true}>
          <ul className="products">
            {this.props.products.map((product) => (
              <li key={product._id}>
                <div className="product">
                  <a href={"#" + product._id}>
                    <img
                      src={product.image}
                      alt={product.title}
                      onClick={() => this.showModal(product)}
                    ></img>
                    <p>{product.title}</p>
                  </a>
                  <div className="product-price">
                    <div> {FormatCurrency(product.price)}</div>

                    <button
                      onClick={() => this.props.AddItem(product)}
                      className="button primary"
                    >
                      {" "}
                      Add to cart
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </Slide>
        <Modal isOpen={this.state.show} onRequestClose={this.hideModal}>
          <Zoom>
            <button className="close-modal" onClick={this.hideModal}>
              x
            </button>
            <div className="product-details">
              <img
                src={Selectedproduct.image}
                alt={Selectedproduct.title}
              ></img>
              <div className="product-details-description">
                <p>{Selectedproduct.title}</p>
                <p>{Selectedproduct.description}</p>

                <div className="product-price">
                  <div>{FormatCurrency(Selectedproduct.price)}</div>
                  <button
                    className="button primary"
                    onClick={() => {
                      this.props.AddItem(Selectedproduct);
                      this.hideModal();
                    }}
                  >
                    {" "}
                    Add to cart
                  </button>
                </div>
              </div>
            </div>
          </Zoom>
        </Modal>
      </div>
    );
  }
}
