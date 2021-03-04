import { Button } from "@material-ui/core";
import React, { ReactElement } from "react";
import { CartItemType } from "../../App";
import { Wrapper } from "./CartItem.styles";

interface Props {
  item: CartItemType;
  addToCart: (clickedItem: CartItemType) => void;
  removeFromCart: (id: number) => void;
}

function CartItem({ item, addToCart, removeFromCart }: Props): ReactElement {
  return (
    <Wrapper>
      <div>
        <h3>{item.title}</h3>
        <div className="information">
          <p>Price : ${item.price}</p>
          <p>Total : ${(item.amount * item.price).toFixed(3)}</p>
        </div>
        <div className="buttons">
          <Button
            size="small"
            disableElevation
            color='secondary'
            variant="contained"
            onClick={() => removeFromCart(item.id)}
          >
            -
          </Button>
          <p>{item.amount}</p>
          <Button
            size="small"
            color='primary'
            disableElevation
            variant="contained"
            onClick={() => addToCart(item)}
          >
            +
          </Button>
        </div>
      </div>
      <img src={item.image} alt={item.title} />
    </Wrapper>
  );
}

export default CartItem;
