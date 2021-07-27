import { makeAutoObservable } from "mobx";
import axios from 'axios';

class Character {
  characters = [];
  name = '';
  millisecondsPassed = 0;

  constructor() {
    makeAutoObservable(this);
    this.getCharacters();
    setInterval(() => {
      this.increaseTimer()
    }, 500);
  }

  filterCharacters() {
    if (this.name.length === 0 || (this.name.length > 1 && this.millisecondsPassed >= 500)) {
      this.resetTimer();
      this.getCharacters();
    }
  }

  getCharacters() {
    const name = this.name.toLowerCase();

    axios.get(`https://rickandmortyapi.com/api/character?name=${name}`)
      .then(res => {
        this.setCharacters(res.data.results);
      })
      .catch((e) => {
        this.setCharacters([]);
      })
  }

  setCharacters(results) {
    this.characters = results;
  }

  setName(value) {
    this.name = value;
  }

  increaseTimer() {
    this.millisecondsPassed += 500;
  }

  resetTimer() {
    this.millisecondsPassed = 0;
  }
}

export default new Character();