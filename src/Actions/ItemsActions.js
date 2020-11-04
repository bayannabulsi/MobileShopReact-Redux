import { Get_Products } from "../Actiontypes";
import { Filter_Products_By_Brand } from "../Actiontypes";
import { Order_Products_By_Price } from "../Actiontypes";
export const GetProducts = () => async (dispatch) => {
  const res = await fetch("/api/products");
  const data = await res.json();
  dispatch({
    type: Get_Products,
    payload: data,
  });
};

export const filterProducts = (products, brand) => (dispatch) => {
  console.log(brand);
  dispatch({
    type: Filter_Products_By_Brand,
    payload: {
      brand: brand,
      items:
        brand === "" ? products : products.filter((x) => x.brand === brand),
    },
  });
  console.log(brand);
};

export const SortProducts = (filterdProducts, sort) => (dispatch) => {
  const sortedProducts = filterdProducts.slice();
  console.log(sortedProducts);
  if (sort === "") {
    sortedProducts.sort((a, b) => (a._id > b._id ? 1 : -1));
  } else {
    console.log(sort);
    sortedProducts.sort((a, b) =>
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
    );

    console.log(sortedProducts);
  }
  dispatch({
    type: Order_Products_By_Price,
    payload: { sort: sort, items: sortedProducts },
  });
};
