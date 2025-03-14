import { CoupleCard, Card } from '../types';
import { game } from '.';
import { action, makeObservable, observable } from 'mobx';

class BattleField {
  cards: CoupleCard = {
    my: [],
    his: [],
  };
  constructor() {
    makeObservable(this, {
      cards: observable,
      addMyCard: action,
      addHisCard: action,
    });
  }

  addMyCard = (card: Card) => {
    this.cards.my.push(card);
    game.toggleStep();
  };

  addHisCard = (card: Card) => {
    this.cards.his.push(card);
    game.toggleStep();
  };

  clearBattleField<T, K>(myCards: T, hisCards: K) {
    this.cards.my = [];
    this.cards.his = [];
    game.addPlayersCards(myCards, hisCards);

    // если следующий ход противника (game.isGetCard = false)
    if (!game.isGetCard) {
      game.toggleStep();
      game.toggleAttack();
    } else {
      // продолжение хода, если противник не отбился (без переключения хода на противника)
      game.setIsGetCard(false);
    }
  }
}

export default new BattleField();
