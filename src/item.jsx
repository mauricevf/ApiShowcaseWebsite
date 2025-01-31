import React from "react";

function Item({ item }) {
  return (
    <li>
      <h3>{item.song}</h3>
      <p>Artist: {item.artist}</p>
      <p>Album: {item.album}</p>
      <p>Genre: {item.genre}</p>
    </li>
  );
}

export default Item;
