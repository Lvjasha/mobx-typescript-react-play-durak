import { Card } from '../types';
import PlayerCards from './PlayerCards';
import { makeObservable, observable } from 'mobx';

class HisCards extends PlayerCards {
  cards: Array<Card> = [];

  constructor() {
    super();

    makeObservable(this, {
      cards: observable,
    });
  }

  //для каждой карты card из this.cards проверяется, существует ли в battleFieldCards
  // карта с таким же рангом (rank). Если такая карта найдена,
  // то !! преобразует результат в булевое значение true, и эта карта добавляется в existRankCards.
  defineJuniorExistCard(battleFieldCards: Card[]) {
    const existRankCards = this.cards.filter(
      (card) => !!battleFieldCards.find((c) => c.rank === card.rank)
    );
    return existRankCards.length
      ? this.defineJuniorExistCard(existRankCards)
      : null;
  }

  defineJuniorCard(cards: Card[]) {
    const juniorCard = cards.reduce((acc, curCurd) =>
      acc?.rank < curCurd?.rank ? acc : curCurd
    );
    if (juniorCard) {
      this.reduceCard(juniorCard.id);
    }
    return juniorCard;
  }
}

export default HisCards;
