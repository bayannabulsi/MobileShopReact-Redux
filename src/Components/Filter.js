import React, { Component } from "react";
import { connect } from "react-redux";
import { filterProducts, SortProducts } from "../Actions/ItemsActions";
class Filter extends Component {
  render() {
    return !this.props.filteredProducts ? (
      <div>Loading...</div>
    ) : (
      <div>
        {" "}
        <div className="filter">
          <div className="filter-result">
            {this.props.filteredProducts.length} products
          </div>
          <div className="filter-sort">
            Order
            <select
              value={this.props.sort}
              onChange={(e) =>
                this.props.SortProducts(
                  this.props.filteredProducts,
                  e.target.value
                )
              }
            >
              <option value="latest">Latest</option>
              <option value="lowest">Lowest</option>
              <option value="highest">Highest</option>
            </select>
          </div>
          <div className="filter-size">
            Filter{""}
            <select
              value={this.props.brand}
              onChange={(e) =>
                this.props.filterProducts(
                  this.props.products,
                  e.target.value
                )
              }
            >
              <option value="">All</option>
              <option value="Iphone">Iphone</option>
              <option value="Huawei">Huawei</option>
              <option value="Samsung">Samsung</option>
            </select>
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
