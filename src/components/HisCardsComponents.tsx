import * as React from 'react';
import { Card } from '../types';
import CardComponent from './CardComponent';

interface IHisCardComponentsProps {
  cards: Card[];
}

const HisCardsComponents: React.FC<IHisCardComponentsProps> = ({ cards }) => {
  return (
    <div className="playerCards">
      {cards.map((card) => (
        <CardComponent card={card} key={card.id} />
      ))}
    </div>
  );
};

export default HisCardsComponents;
