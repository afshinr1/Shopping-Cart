import React, { ReactElement } from "react";
import { Wrapper } from "./Item.styles";
import { CartItemType } from "../../App";
import { Button } from "@material-ui/core";

interface Props {
  item: CartItemType;
  handleAddToCart: (clickedItem: CartItemType) => void;
}

function Item({ item, handleAddToCart }: Props): ReactElement {
  return (
    <Wrapper>
      <img src={item.image} alt={item.title} />
      <div>
        <h3>{item.title}</h3>
        <p>{item.description}</p>
        <h3>${item.price}</h3>
      </div>
      <Button onClick={(e) => handleAddToCart(item)}>Add to cart</Button>
    </Wrapper>
  );
}

export default Item;
