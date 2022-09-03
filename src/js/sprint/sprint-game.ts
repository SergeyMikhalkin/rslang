import { Word } from '../interfaces/word';
import { QuizItem } from '../sprint/quiz-item';
import { base, getChunkWords } from '../api/api';

export class SprintGame {
  private static _score: number;
  private static _quizItems: Array<QuizItem>;
  private static _currIndex: number;
  private static _currCoefficient: number;
  private static _correctAnswersInRow: number;
  private static _timerId: number;

  static start(group: number, page = -1) {
    this._score = 0;
    this._quizItems = new Array<QuizItem>();
    this._currIndex = 0;
    this._currCoefficient = 1;
    this._correctAnswersInRow = 1;
    this._timerId = -1;

    this.addEventListeners();

    getChunkWords(group, page != -1 ? page : Math.round(Math.random() * 29))
      .then((data) => this.makeQuiz(data as Array<Word>))
      .then(() => this.fillWord())
      .then(() => this.startTimer())
      .catch((err) => console.log(err));
  }

  static addEventListeners(): void {
    const btns = document.querySelectorAll('button');
    btns.forEach((x) => {
      x.addEventListener('click', (e) => {
        const target = e.target as HTMLButtonElement;
        if (target.tagName != 'BUTTON') return;

        this._quizItems[this._currIndex].getAnswer(target.value === 'true', this._currCoefficient);
        this.countCoefficient();
        this.fillScore();

        if (this._currIndex + 1 >= this._quizItems.length) {
          //console.log(this._quizItems);
          this.endGame();
          return;
        }
        this._currIndex++;
        this.fillWord();
      });
    });

    document.addEventListener('keydown', (e) => {
      let answer = null;
      if (e.key === 'ArrowLeft') answer = true;
      else if (e.key === 'ArrowRight') answer = false;
      else return;

      this._quizItems[this._currIndex].getAnswer(answer, this._currCoefficient);
      this.countCoefficient();
      this.fillScore();

      if (this._currIndex + 1 >= this._quizItems.length) {
        this.endGame();
        return;
      }
      this._currIndex++;
      this.fillWord();
    });
  }

  static makeQuiz(arr: Array<Word>): void {
    arr.forEach((x) => this._quizItems.push(new QuizItem(x, this.generateBadAnswer(x, arr))));
  }

  static fillScore(): void {
    const score = document.querySelector('.sprint__score') as HTMLElement;
    if (score) {
      const scoreNum = score.textContent?.split(' ')[1];
      if (scoreNum) {
        score.textContent = `Счет: ${Number(scoreNum) + this._quizItems[this._currIndex].points}`;
      }
    }
  }

  static countCoefficient(): void {
    if (this._quizItems[this._currIndex].points > 0) {
      this._correctAnswersInRow++;
      this._currCoefficient = Math.ceil(this._correctAnswersInRow / 3);
    } else {
      this._correctAnswersInRow = 1;
      this._currCoefficient = 1;
    }
  }

  static fillWord(): void {
    const quizElement = this._quizItems[this._currIndex];

    const img = document.querySelector('.sprint__image') as HTMLImageElement;
    if (img) img.src = `${base}/${quizElement.img}`;

    const word = document.querySelector('.sprint__word') as HTMLElement;
    if (word) word.textContent = quizElement.word;

    const question = document.querySelector('.sprint__question') as HTMLElement;
    if (question) question.textContent = quizElement.question;
  }

  static startTimer(): void {
    this._timerId = window.setInterval(() => {
      const countdown = document.querySelector('.sprint__count-down');
      let currSec = -1;
      if (countdown) {
        currSec = countdown.textContent ? Number(countdown.textContent) : -1;
        if (currSec > 0) {
          currSec--;
          countdown.textContent = currSec.toString();
        } else {
          this.endGame();
        }
      }
    }, 1000);
  }

  static generateBadAnswer(x: Word, arr: Array<Word>): string {
    if (arr.length < 1) return '';
    const index = Math.round(Math.random() * (arr.length - 1));
    const answer1 = arr[index].wordTranslate;
    const answer2 = x.wordTranslate;

    return Math.random() > 0.5 ? answer1 : answer2;
  }

  static countSum(): number {
    const answers = this._quizItems.filter((x) => x.answer != null);
    return answers.reduce((acc, curr) => acc + curr.points, 0);
  }

  static endGame() {
    // отправить стату
    clearInterval(this._timerId);
    const main = document.querySelector('.sprint-content');
    if (main) {
      const event = new CustomEvent('endgame', { detail: this.countSum() });
      main.dispatchEvent(event);
    }
  }
}
