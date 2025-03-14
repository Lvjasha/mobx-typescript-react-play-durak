import { game } from '.';
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

  defineCardForAction = (battleFieldCards: Card[]) => {
    if (game.isMyAttack) {
      return this.defineCardForDefense(game.attackCard, battleFieldCards);
    }

    return this.defineCardForAttack(battleFieldCards);
  };

  defineCardForDefense(attackCard: Card | null, battleFieldCards: Card[]) {}

  //для каждой карты card из this.cards проверяется, существует ли в battleFieldCards
  // карта с таким же рангом (rank). Если такая карта найдена,
  // то !! преобразует результат в булевое значение true, и эта карта добавляется в existRankCards.
  defineJuniorExistCard(battleFieldCards: Card[]): any {
    const existRankCards = this.cards.filter(
      (card) => !!battleFieldCards.find((c) => c.rank === card.rank)
    );
    return existRankCards.length
      ? this.defineJuniorExistCard(existRankCards)
      : null;
  }

  defineJuniorCard(cards: Card[]): Card {
    const juniorCard = cards.reduce((acc, curCurd) =>
      acc?.rank < curCurd?.rank ? acc : curCurd
    );
    if (juniorCard) {
      this.reduceCard(juniorCard.id);
    }
    return juniorCard;
  }
}

export default new HisCards();
