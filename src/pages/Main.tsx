import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';

// import {game, hisCards, myCard}
import HisCardsComponents from '../components/HisCardsComponents';
import BattleFieldComponent from '../components/BattleFieldComponent';
import MyCardsComponents from '../components/MyCardsComponents';
import { battleField, game, hisCards, myCards } from '../store';
import { Card } from '../types';
import DeckComponent from '../components/DeckComponent';

const Main: React.FC = observer(() => {
  const startGame = () => {
    const { firstHisCards, firstMyCards } = game.startGame();
    hisCards.addCards(firstHisCards);
    myCards.addCards(firstMyCards);
  };

  const hisAction = () => {
    if (!game.isMyStep) {
      const battleFieldCards = [
        ...battleField.cards.his,
        ...battleField.cards.my,
      ];
      const hisJuniorCard = hisCards.defineCardForAction(battleFieldCards);

      if (hisJuniorCard) {
        battleField.addHisCard(hisJuniorCard);
      } else {
        battleField.clearBattleField(myCards, hisCards);
      }
    }
  };

  const clickMyCard = (card: Card) => {
    if (game.isMyStep) {
      const myStepCard = myCards.checkMyStep(card, [
        ...battleField.cards.his,
        ...battleField.cards.my,
      ]);
      if (myStepCard) {
        battleField.addMyCard(myStepCard);
      }
    }
  };

  useEffect(startGame, []);

  useEffect(hisAction, [game.isMyStep]);

  return (
    <>
      <HisCardsComponents cards={hisCards.cards} />
      <BattleFieldComponent cards={battleField.cards} />
      <MyCardsComponents cards={myCards.cards} onStep={() => {}} />
      <DeckComponent
        cardBallance={game.deckCards.length}
        trump={game.trumpCard}
      />
    </>
  );
});

export default Main;
