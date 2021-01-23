import React from "react";
import Button from "@material-ui/core/Button";
import { CartItemType } from "../App";
import { Wrapper } from "./ProductItem.style";

type Props = {
  item: CartItemType;
  handleAddToCart: (clickedItem: CartItemType) => void;
};

const ProductItem: React.FC<Props> = ({ item, handleAddToCart }) => (
  <Wrapper>
    <img src={item.image} alt={item.title} />
    <div>
      <h3> {item.title} </h3>
      <p> {item.description.substr(0, 100)}... </p>
      <h3>$ {item.price}</h3>
    </div>
    <Button
      onClick={() => handleAddToCart(item)}
      variant='contained'
      color='primary'
    >
      Add To Cart
    </Button>
  </Wrapper>
);

export default ProductItem;
