import { Card } from '../types';

abstract class PlayerCards {
  abstract cards: Array<Card>;

  reduceCard(id: number): void {
    this.cards = this.cards.filter((card) => card.id !== id);
  }

  // Метод addCards принимает массив карт и добавляет их
  // в существующий массив cards,
  // создавая новый массив с помощью оператора расширения
  addCards(cards: Array<Card>): void {
    this.cards = [...this.cards, ...cards];
  }

  clearCards(): void {
    this.cards = [];
  }
}

export default PlayerCards;
