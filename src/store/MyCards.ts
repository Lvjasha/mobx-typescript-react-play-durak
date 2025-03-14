import { makeObservable, observable } from 'mobx';
import { game } from '.';
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
}

export default MyCards;
