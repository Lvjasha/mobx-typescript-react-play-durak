import { Card, TypeCard } from './../types';
import { cards as allCards, cards } from './../cards';
import { action, makeObservable, observable } from 'mobx';

class Game {
  trumpCard: TypeCard = TypeCard.bubi;
  isMyStep: boolean = false;
  isGetCard: boolean = false;
  isMyAttack: boolean = false;
  deckCards: Array<Card> = [];
  attackCard: Card = allCards[0];

  constructor() {
    makeObservable(this, {
      isMyStep: observable,
      deckCards: observable,
      isMyAttack: observable,
      attackCard: observable,
      isGetCard: observable,
      reduceCards: action,
    });
  }

  toggleStep() {
    this.isMyStep = !this.isMyStep;
  }

  toggleAttack() {
    this.isMyAttack = !this.isMyAttack;
  }

  setIsGetCard(isGetCard: boolean) {
    this.isGetCard = isGetCard;
  }

  setAttackCard(card: Card) {
    this.attackCard = card;
  }

  //определение кто ходит первым
  defineStep(myCards: Card[], hisCards: Card[]) {
    const myJuniorTrumpRank = this.defineJuniorTrumpCard(myCards);
    const hisJuniorTrumpRank = this.defineJuniorTrumpCard(hisCards);

    if (myJuniorTrumpRank) {
      // у меня козырная карта меньше, чем у кома или у компа нет козырей
      if (myJuniorTrumpRank < hisJuniorTrumpRank || !hisJuniorTrumpRank) {
        this.toggleStep();
        this.toggleAttack();
      }
    }
  }

  // 1 Math.random() возвращает случайное число от 0 до 1.
  // 2 Вычитание 0.5 из этого числа дает значение в диапазоне от -0.5 до 0.5.
  // 3 Если функция возвращает отрицательное значение, элемент будет располагаться перед другим элементом, если положительное — после.
  mixDeck() {
    this.deckCards = this.deckCards.sort(() => Math.random() - 0.5);
    // инициализируем козырную масть
    this.trumpCard = this.deckCards[35].type;
  }

  startGame() {
    this.deckCards = allCards;
    this.mixDeck();

    const firstHisCards = this.reduceCards(6);
    const firstMyCards = this.reduceCards(6);

    this.defineStep(firstMyCards, firstHisCards);

    return { firstMyCards, firstHisCards };
  }

  addPlayersCards(my: any, his: any) {}

  defineJuniorTrumpCard(cards: Card[]) {
    const trumpRanks = cards
      .filter((card) => card.type === this.trumpCard)
      .map((card) => card.rank);

    if (trumpRanks.length) {
      return Math.min(...trumpRanks);
    }
    return 0;
  }

  // взятые карты из колоды
  reduceCards(countCards: number): Array<Card> {
    const removedCard = this.deckCards.splice(0, countCards);
    return removedCard;
  }
}

export default Game;
