import { Word } from '../interfaces/word';

export class QuizItem {
  private _word: Word;
  private _question: string;
  private _answer: boolean | null;
  private _points: number;

  constructor(word: Word, question: string) {
    this._word = word;
    this._question = question;
    this._answer = null;
    this._points = 20;
  }

  get answer() {
    return this._answer;
  }

  get points() {
    return this._points;
  }

  get img() {
    return this._word.image;
  }

  get word() {
    return this._word.word;
  }

  get question() {
    return this._question;
  }

  getAnswer(answer: boolean, coefficient = 1): void {
    this._answer = answer;
    if ((this._word.wordTranslate === this._question) == this._answer) this._points *= coefficient;
    else this._points = 0;
  }
}
