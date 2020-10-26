import React, { Component } from "react";
import { connect } from "react-redux";
import { filterProducts, SortProducts } from "../Actions/ItemsActions";
import "bootstrap/dist/css/bootstrap.css";

const BrandFilter = [
  { value: "", label: "All" },
  { value: "Iphone", label: "Iphone" },
  { value: "Huawei", label: "Huawei" },
  { value: "Samsung", label: "Samsung" },
];

const OdrerFilter=[{ value: "latest", label: "Latest" },
{ value: "lowest", label: "Lowest" },
{ value: "highest", label: "Highest" }]

class Filter extends Component {

  constructor(props) {
    super()

    this.state = {
      BrandIsOpen: false,
      OrderIsOpen:false,
      BrandHaveText: "",
      OrdetHaveText:"",
    }
  }

  HandleBrandClick = () => {
    this.setState({ BrandIsOpen: !this.state.BrandIsOpen });
  };

  HandleOrderClick = () => {
    this.setState({ OrderIsOpen: !this.state.OrderIsOpen });
  };
  OrderChange = (item) => {
    this.setState({
      OrdetHaveText: item.label
    })
    this.props.SortProducts(this.props.filteredProducts, item.value)
  }

  BrandChange = (item) => {
    this.setState({
      BrandHaveText: item.label
    })
    this.props.filterProducts(this.props.products, item.value)
    console.log(this.state.OrdetHaveText);
    console.log(this.state.BrandHaveText);
  }
  

  ListItems = (action,props) => {
    let list;
    if(action==="Order")
    {
      list = props.map((obj) => (
        <div
          onClick={()=>this.OrderChange(obj)}
          className="dropdown__item"
          key={obj.label.toString()}>
          {obj.label}
        </div>
      ));
      
    }
    else if(action==="Brand")
    {
      list = props.map((item) => (
        <div
          onClick={()=>this.BrandChange(item)}
          className="dropdown__item"
          key={item.label.toString()}>
          {item.label}
        </div>
      ));
      
    }
   
    return (
      <div className="dropdown__items"> { list } </div>
    )
  }
 

  render() {
    const {BrandIsOpen, BrandHaveText,OrdetHaveText,OrderIsOpen} = this.state;
    return !this.props.filteredProducts ? (
      <div>Loading...</div>
    ) : (
        <div className="filter">
          <div>{this.props.filteredProducts.length} products</div>
          <div className="OrderFilter">
            Order
            <div
              className={OrderIsOpen ?"dropdown active":"dropdown"  }
              onClick={this.HandleOrderClick}
            >
              <div className="dropdown__text">
          {!OrdetHaveText ? "Select Order" : OrdetHaveText}
              </div>
              {this.ListItems("Order",OdrerFilter)}
            </div>
          </div>
          <div className="BrandFilter">
            Filter{""}
            <div
              className={BrandIsOpen ?"dropdown active":"dropdown"  }
              onClick={this.HandleBrandClick}
            >
              <div className="dropdown__text">
          {!BrandHaveText ? BrandFilter[0].label : BrandHaveText}
              </div>
              {this.ListItems("Brand",BrandFilter)}
            </div>
          </div>
        </div>
  
    );
  }
}

export default connect(
  (state) => ({
    brand: state.products.brand,
    sort: state.products.sort,
    products: state.products.items,
    filteredProducts: state.products.filterdItems,
  }),
  {
    filterProducts,
    SortProducts,
  }
)(Filter);
