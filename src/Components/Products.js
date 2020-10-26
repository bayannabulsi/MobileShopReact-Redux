import React, { Component } from "react";
import FormatCurrency from "../Components/util";
import Slide from "react-reveal/Slide";
import Modal from "react-modal";
import Zoom from "react-reveal/Zoom";
import { connect } from "react-redux";
import { GetProducts } from "../Actions/ItemsActions";
import { AddToCart } from "../Actions/CartActions";
class Products extends Component {
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

  componentDidMount() {
    this.props.GetProducts();
  }
  render() {
    const { Selectedproduct } = this.state;
    return (
      <div>
        <Slide left cascade={true}>
          {!this.props.products ? (
            <div> Loading..</div>
          ) : (
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
                        onClick={() => this.props.AddToCart(product)}
                        className="button primary overlay"
                      >
                        {" "}
                        Add to cart
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </Slide>
        <Modal isOpen={this.state.show} onRequestClose={this.hideModal} className="productsModal">
          <Zoom>
            <button className="close-modal" onClick={this.hideModal}>
              x
            </button>
            <div className="product-details">
              <img
                src={Selectedproduct.image}
                alt={Selectedproduct.title}
              ></img>
              <div className="product-Info">
                <p className="product-Info-text">{Selectedproduct.title}</p>
                <ul>
              {Selectedproduct && Selectedproduct.description? ( <div className="product-details-description"><li>Front Camera  :   {Selectedproduct.description[0]}</li> <li>CPU Speed  :   {Selectedproduct.description[1]}</li> <li>Charging  :   {Selectedproduct.description[1]}</li><li>CPU Speed  :   {Selectedproduct.description[2]}</li> <li>OS :   {Selectedproduct.description[3]}</li></div>):null}
                </ul>
                <div className="product-price-Modal">
                  <div>{FormatCurrency(Selectedproduct.price)}</div>
                  <button
                    className="button primary"
                    onClick={() => {
                      this.props.AddToCart(Selectedproduct);
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
export default connect((state) => ({ products: state.products.filterdItems }), {
  GetProducts,
  AddToCart,
})(Products);
