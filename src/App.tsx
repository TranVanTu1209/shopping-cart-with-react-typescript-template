import React, { useState } from "react";
import { useQuery } from "react-query";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import LinearProgress from "@material-ui/core/LinearProgress";
import Grid from "@material-ui/core/Grid";
import Badge from "@material-ui/core/Badge";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import { Wrapper } from "./styles";
import ProductItem from "./components/ProductItem";
import Cart from "./components/Cart";

// Types
export type CartItemType = {
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  title: string;
  amount: number;
};

const getProducts = async (): Promise<CartItemType[]> =>
  await (await fetch("https://fakestoreapi.com/products")).json();

const saveCartItemsToStorage = (cartItems: CartItemType[]): void => {
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
};

const initialCartItems =
  localStorage.getItem("cartItems") !== null
    ? JSON.parse(localStorage.getItem("cartItems") || "")
    : [];

const App = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState(initialCartItems as CartItemType[]);
  const { data, error, isLoading } = useQuery<CartItemType[]>(
    "products",
    getProducts
  );
  const getTotalItems = (items: CartItemType[]) =>
    items.reduce((acc, item) => acc + item.amount, 0);
  const handleAddToCart = (clickedItem: CartItemType) => {
    setCartItems((prevState) => {
      const findedItem = prevState.find((item) => item.id === clickedItem.id);
      if (findedItem) {
        const newItems = prevState.map((item) =>
          item.id === clickedItem.id
            ? { ...item, amount: item.amount + 1 }
            : item
        );
        saveCartItemsToStorage(newItems);
        return newItems;
      } else {
        const newItems = [...prevState, { ...clickedItem, amount: 1 }];
        saveCartItemsToStorage(newItems);
        return [...prevState, { ...clickedItem, amount: 1 }];
      }
    });
  };
  const handleRemoveFromCart = (id: number) => {
    setCartItems((prevState) => {
      const findedItem = prevState.find((item) => item.id === id);
      if (findedItem) {
        let newItems;
        if(findedItem.amount === 1) {
          newItems = prevState.filter((item) => item.id !== id);
        } else {
          newItems = prevState.map((item) =>
          item.id === id ? { ...item, amount: item.amount - 1 } : item
        );
        }
        saveCartItemsToStorage(newItems);
        return newItems;
      } else {
        return prevState;
      }
    });
  };

  return (
    <div className='App'>
      {isLoading && <LinearProgress />}
      {data && (
        <Wrapper>
          <IconButton className='cart-btn' onClick={() => setCartOpen(true)}>
            <AddShoppingCartIcon color='primary' />
            <Badge
              badgeContent={getTotalItems(cartItems)}
              color='error'
              className='fix-top'
            />
          </IconButton>
          <Drawer
            open={cartOpen}
            anchor='right'
            onClose={() => setCartOpen(false)}
          >
            <Cart
              addToCart={handleAddToCart}
              cartItems={cartItems}
              removeFromCart={handleRemoveFromCart}
            />
          </Drawer>
          <Grid container spacing={3}>
            {data?.map((product) => (
              <Grid key={product.id} item md={4} sm={6} xs={12}>
                <ProductItem item={product} handleAddToCart={handleAddToCart} />
              </Grid>
            ))}
          </Grid>
        </Wrapper>
      )}
      {error && <h3>Some thing went wrong</h3>}
    </div>
  );
};

export default App;
