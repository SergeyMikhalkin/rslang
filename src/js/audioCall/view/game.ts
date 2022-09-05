import { wordType, answerData } from '../type';
import Step from './step';
import Chank from '../model/chank';
import LocalStat from './localStat';
import Render from './render';

class Game extends Step {
  collection: Array<wordType> | undefined;
  wrapper: HTMLElement;
  startButton: HTMLElement;
  startScreen: HTMLElement;
  localStat: LocalStat;

  constructor() {
    super();
    this.localStat = new LocalStat();
    this.wrapper = document.querySelector('.audioCall') as HTMLElement;
    this.startButton = document.querySelector('.audioCall__start-btn') as HTMLElement;
    this.startScreen = document.querySelector('.audioCall__start-container') as HTMLElement;

    this.listen();
  }

  async startGame(group: number, page: number) {
    try {
      this.hideStartScreen();
      this.collection = await new Chank(page, group).getCollection();
      this.next();
    } catch (err) {
      console.warn(err);
    }
  }

  hideStartScreen() {
    if (this.startScreen) {
      this.startScreen.classList.add('is-hidden');
    }
  }

  next() {
    console.log('next');
    const collection = this.collection as Array<wordType>;
    const stepWords = this.getStepWords(collection);
    if (stepWords === null) console.warn('end of word collection');

    if (stepWords instanceof Array) {
      const targetWord = this.makeTargetWord(stepWords);
      this.showStep(stepWords, targetWord);
    }
  }

  showResults() {
    const gameStatistic = this.localStat.answersStorage as Array<answerData>;
    if (this.collection instanceof Array) {
      const collection = this.collection;
      Render.prototype.renderResults(this.wrapper, gameStatistic, collection);
    }
  }

  showTips() {
    const imgEl = this.wrapper.querySelector('.audioCall__wordImg') as HTMLImageElement;
    const wordEl = this.wrapper.querySelector('.audioCall__wordTranslate') as HTMLElement;
    if (imgEl && wordEl) {
      imgEl.classList.remove('is-hidden');
      wordEl.classList.remove('is-hidden');
    }
  }

  disableChoice() {
    const inputs = this.wrapper.querySelectorAll('input[type="radio"]');
    inputs.forEach((elem) => {
      (elem as HTMLInputElement).disabled = true;
    });
  }

  listen() {
    this.wrapper.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      const audioWrapper = target.closest('[data-audio]') as HTMLElement;
      if (audioWrapper) {
        const audioEl = audioWrapper.querySelector('audio') as HTMLAudioElement;
        console.log(target);
        void audioEl.play();
      }
    });

    this.startButton.addEventListener('click', () => {
      const selectorEl = this.startScreen.querySelector('select') as HTMLSelectElement;
      const wordsGroup = Number(selectorEl.value);
      const randomWordsPage = () => Math.floor(Math.random() * 29 + 1);
      this.startGame(wordsGroup, randomWordsPage()).catch((err) => console.warn(err));
    });

    this.wrapper.addEventListener('change', (e) => {
      this.showTips();
      this.disableChoice();
      this.localStat.registerAnswer(e);
      setTimeout(() => {
        if (this.hasNext()) {
          this.next();
        } else {
          this.showResults();
        }
      }, 1000);
    });
  }
}

export const game = new Game();
