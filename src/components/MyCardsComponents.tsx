import * as React from 'react';
import CardComponent from './CardComponent';
import { Card } from '../types';

interface IMyCardsComponentsProps {
  cards: Card[];
  onStep: (card: Card) => void;
}

const MyCardsComponents: React.FC<IMyCardsComponentsProps> = ({
  cards,
  onStep,
}) => {
  return (
    <div className="playerCards">
      {cards.map((card) => (
        <CardComponent card={card} key={card.id} onClick={() => onStep(card)} />
      ))}
    </div>
  );
};

export default MyCardsComponents;
