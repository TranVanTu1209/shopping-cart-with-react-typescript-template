import React from "react";
import { Wrapper } from "./Cart.style";
import { CartItemType } from "../App";
import CartItem from "./CartItem";

type Props = {
  cartItems: CartItemType[];
  addToCart: (clickedItem: CartItemType) => void;
  removeFromCart: (id: number) => void;
};

const Cart: React.FC<Props> = ({ cartItems, addToCart, removeFromCart }) => {
  return (
    <Wrapper>
      <h1>Your shopping cart</h1>
      {cartItems.length === 0 && <p>No item in cart</p>}
      {cartItems.map((item) => (
        <CartItem
          key={item.id}
          cartItem={item}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
        />
      ))}
      <h3>
        Total: ${" "}
        {cartItems
          .reduce((acc, cur) => acc + cur.amount * cur.price, 0)
          .toFixed(2)}
      </h3>
    </Wrapper>
  );
};

export default Cart;
