import React from 'react';
import Card from './Card.js';

const CardList = (props) => (
  <div id="container" className="mt-10">
    {props.cards.map((card, index) => (
      <Card key={index} removeCard={props.removeCard} {...card} />
    ))}
  </div>
);

export default CardList;
