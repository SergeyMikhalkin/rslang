import { wordType, wordsChankType, answerData } from '../type';
import { base } from '../../api/api';

class Render {
  wrapper: HTMLElement;
  targetWord: wordType;
  stepWords: Array<wordType>;

  constructor(targetWord: wordType, stepWords: Array<wordType>) {
    this.wrapper = document.querySelector('.audioCall') as HTMLElement;
    this.targetWord = targetWord;
    this.stepWords = stepWords;
  }

  renderResults(wrapper: HTMLElement, resultsArr: Array<answerData>, collection: Array<wordType>) {
    const itemsHtml = resultsArr.reduce((html, statItem) => {
      const word = collection.find((word) => word.id === statItem.wordId) as wordType;
      const itemHtml = `<div class="audioCall__result-item">
      <div class="audioCall__result-audio-wrapper" data-audio>
        <audio src="${base}/${word.audio}" controls class="audioCall__result-audio"></audio>
      </div>
      <div class="audioCall__result-word">
        <span class="audioCall__result-word">${word.word}</span>
        <span class="audioCall__result-word-translate">${word.wordTranslate}</span>
      </div>
      <div class="audioCall__result-stat audioCall__result-corrects">${statItem.correctAnswers}</div>
      <div class="audioCall__result-stat audioCall__result-wrongs">${statItem.wrongAnswers}</div>
    </div>`;
      return html + itemHtml;
    }, '');

    console.log(this.wrapper);
    wrapper.innerHTML = `
    <div class="audioCall__result">
      <h3 class="audioCall__result-title">Результат:</h3>
      <div class="audioCall__result-list">
      ${itemsHtml}
      </div>
    </div>
    `;
  }

  renderStep() {
    this.wrapper.innerHTML = '';
    this.renderImg();
    this.renderAudio();
    this.renderTargetWord();
    this.renderWords();
  }

  renderImg() {
    const img = new Image();
    img.className = 'is-hidden audioCall__wordImg';
    img.src = `${base}/${this.targetWord.image}`;

    const imgContainer = document.createElement('div');
    imgContainer.className = 'audioCall__img-container';
    imgContainer.append(img);
    this.wrapper.append(imgContainer);
  }

  renderAudio() {
    const audio = new Audio(`${base}/${this.targetWord.audio}`);
    audio.controls = true;
    audio.autoplay = true;
    audio.className = 'audioCall__player';
    this.wrapper.append(audio);
  }
  renderTargetWord() {
    const wordTranslate = document.createElement('p');
    wordTranslate.textContent = this.targetWord.word;
    wordTranslate.className = 'is-hidden audioCall__wordTranslate';
    this.wrapper.append(wordTranslate);
  }

  renderWords() {
    const wordsWrapper = document.createElement('form');
    wordsWrapper.dataset.targetWordId = this.targetWord.id;
    wordsWrapper.className = 'audioCall__words';
    const html = this.stepWords.reduce((acc, word) => {
      const radioHtml = `<label class="audioCall__label">
        <input class="audioCall__radio" type="radio" value=${word.id} name="choiceOption">
        <span class="audioCall__word-spelling"> ${word.wordTranslate} </span>
        </label>`;
      return (acc += radioHtml);
    }, '');
    wordsWrapper.innerHTML = html;
    this.wrapper.append(wordsWrapper);
  }
}

export default Render;
