import React from "react";
import Button from "@material-ui/core/Button";
import { CartItemType } from "../App";
import { Wrapper } from "./CartItem.style";

type Props = {
  cartItem: CartItemType;
  addToCart: (clickedItem: CartItemType) => void;
  removeFromCart: (id: number) => void;
};

const CartItem: React.FC<Props> = ({ cartItem, addToCart, removeFromCart }) => {
  return (
    <Wrapper>
      <div>
        <h4> {cartItem.title} </h4>
        <div className='infor'>
          <img src={cartItem.image} alt={cartItem.title} />
          <div>
            <p>Price: $ {cartItem.price}</p>
            <p>Total: $ {(cartItem.amount * cartItem.price).toFixed(2)}</p>
          </div>
        </div>
        <div className='actions'>
          <Button
            size='small'
            variant='contained'
            color='default'
            disableElevation
            onClick={() => removeFromCart(cartItem.id)}
          >
            {cartItem.amount === 1 ? "x" : "-"}
          </Button>
          <span> {cartItem.amount} </span>
          <Button
            size='small'
            variant='contained'
            color='default'
            disableElevation
            onClick={() => addToCart(cartItem)}
          >
            +
          </Button>
        </div>
      </div>
    </Wrapper>
  );
};

export default CartItem;
