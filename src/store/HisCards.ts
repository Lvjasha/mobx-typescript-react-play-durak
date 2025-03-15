import { battleField, game } from '.';
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

  defineCardForAttack = (battleFieldCards: Card[]) => {
    // есть ли карты в колоде соперника
    if (this.cards.length) {
      let cardForAttack = null;
      if (!battleFieldCards.length) {
        // список козырных карт
        const trumpCards = this.cards.filter(
          (card) => card.type === game.trumpCard
        );
        // список некозырных карт
        const notTrumpCards = this.cards.filter(
          (card) => card.type !== game.trumpCard
        );

        if (notTrumpCards.length) {
          // определение младшей некозырной карты
          cardForAttack = this.defineJuniorCard(notTrumpCards);
        } else {
          // определение младшей козырной карты
          cardForAttack = this.defineJuniorCard(trumpCards);
        }

        // атакуем картой
        game.setAttackCard(cardForAttack);
        return cardForAttack;
      }
    }
  };

  defineCardForDefense(attackCard: Card | null, battleFieldCards: Card[]) {
    if (attackCard) {
      const higherCards = this.cards.filter(
        (card) => card.type === attackCard?.type && card.rank > attackCard?.rank
      );
      const trumpCards = this.cards.filter(
        (card) => card.type === game.trumpCard
      );

      if (higherCards.length) {
        return this.defineJuniorCard(higherCards);
      }

      if (attackCard.type !== game.trumpCard && trumpCards.length) {
        return this.defineJuniorCard(trumpCards);
      }
      // если не нашли ни одной карты, добавляем в карты соперника (соперник не смог отбиться)

      // добавим карту на поле боя
      this.addCards(battleFieldCards);
      // переключим ход
      game.toggleStep();
      // кто-то взял карты
      game.setIsGetCard(true);
    }
  }

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
