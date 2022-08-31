import { wordType } from '../type';
import Render from './render';

class Step {
  lastIndex: number;
  currentIndex: number;
  range: number;

  constructor() {
    this.currentIndex = 0;
    this.lastIndex = 0;
    this.range = 5;
  }

  makeTargetWord(words: Array<wordType>): wordType {
    const findTarget = (): wordType => {
      const randomIndex = Math.floor(Math.random() * words.length + 1);
      const targetWord = words[randomIndex];
      return targetWord ? targetWord : findTarget();
    };
    return findTarget();
  }

  getStepWords(collection: Array<wordType>): Array<wordType> | null {
    this.lastIndex = collection.length - 1;
    if (this.hasNext()) {
      const words = collection.slice(this.currentIndex, this.currentIndex + this.range);
      this.currentIndex += this.range;
      console.log(words);
      return words;
    } else {
      return null;
    }
  }

  hasNext() {
    return this.currentIndex < this.lastIndex;
  }

  showStep(stepWords: Array<wordType>, targetWord: wordType) {
    const render = new Render(targetWord, stepWords);
    render.renderStep();
  }
}

export default Step;
