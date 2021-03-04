import { Drawer, LinearProgress, Badge, Grid } from "@material-ui/core";
import { AddShoppingCart } from "@material-ui/icons";
import { useState } from "react";
import { useQuery } from "react-query";
import Cart from "./components/Cart/Cart";
//styles
import { StyledButton, Wrapper } from "./App.styles";
import Item from "./components/Item/Item";

//Types
export type CartItemType = {
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  title: string;
  amount: number;
};

const getProducts = async (): Promise<CartItemType[]> => {
  const res = await fetch("https://fakestoreapi.com/products");
  const data = await res.json();
  return data;
};

function App() {
  const [cartOpen, setCartOpen] = useState<boolean>(false);
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const { data, isLoading } = useQuery<CartItemType[]>("products", getProducts);
  console.log(data);

  const getTotalItems = (items: CartItemType[]) =>
    items.reduce((acc: number, item: CartItemType) => acc + item.amount, 0);

  const handleAddToCart = (clickedItem: CartItemType) => {
    setCartItems((prevCartItems) => {
      const itemAlreadyInCart = prevCartItems.find(
        (item) => item.id === clickedItem.id
      );
      if (itemAlreadyInCart) {
        return prevCartItems.map((item) =>
          item.id === clickedItem.id
            ? { ...item, amount: item.amount + 1 }
            : item
        );
      } else {
        return [...prevCartItems, { ...clickedItem, amount: 1 }];
      }
    });
  };

  const handleRemoveFromCart = (id: number) => {
    setCartItems((prev) =>
      prev.reduce((acc, item) => {
        if (item.id === id) {
          if (item.amount === 1) return acc;
          return [...acc, { ...item, amount: item.amount - 1 }];
        } else {
          return [...acc, item];
        }
      }, [] as CartItemType[])
    );
  };
  if (isLoading) return <LinearProgress />;

  return (
    <Wrapper className="App">
      <Drawer
        anchor="right"
        open={cartOpen}
        onClose={(e) => setCartOpen(false)}
      >
        <Cart
          addToCart={handleAddToCart}
          cartItems={cartItems}
          removeFromCart={handleRemoveFromCart}
        />
      </Drawer>
      <StyledButton onClick={(e) => setCartOpen(true)}>
        <Badge badgeContent={getTotalItems(cartItems)} color="error">
          <AddShoppingCart />
        </Badge>
      </StyledButton>
      <Grid container spacing={3}>
        {data?.map((item) => (
          <Grid item key={item.id} xs={12} sm={4}>
            <Item item={item} handleAddToCart={handleAddToCart} />
          </Grid>
        ))}
      </Grid>
    </Wrapper>
  );
}

export default App;
