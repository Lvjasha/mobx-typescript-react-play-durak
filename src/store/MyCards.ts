import { makeObservable, observable } from 'mobx';
import { game, battleField } from '.';
import { Card } from '../types';
import PlayerCards from './PlayerCards';

class MyCards extends PlayerCards {
  cards: Array<Card> = [];

  constructor() {
    super();

    makeObservable(this, {
      cards: observable,
    });
  }
  checkMyStep(card: Card, battleFieldCards: Card[]) {
    if (game.isMyAttack) {
      return this.myAttack(card, battleFieldCards);
    }
    return this.myDefense(card, game.attackCard);
  }

  myAttack(card: Card, battleFieldCards: Card[]) {
    if (
      // если на поле нет карт или есть карта,
      // ранг которой совпадает с той, по которой мы кликнули
      !battleFieldCards.length ||
      battleFieldCards.some((c) => c.rank === card.rank)
    ) {
      // кладем эту карту на поле как атакующую
      game.setAttackCard(card);
      // у себя уменьшаем на эту карту
      this.reduceCard(card.id);
      // возвращаем эту карту
      return card;
    }

    alert('У него карта сильнее');
  }
}

export default new MyCards();
