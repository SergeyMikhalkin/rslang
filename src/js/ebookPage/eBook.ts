import { getChunkWords } from '../api/api';

interface ResponseWord {
  id: string;
  group: number;
  page: number;
  word: string;
  image: string;
  audio: string;
  audioMeaning: string;
  audioExample: string;
  textMeaning: string;
  textExample: string;
  transcription: string;
  textExampleTranslate: string;
  textMeaningTranslate: string;
  wordTranslate: string;
}

let allAudioTags: NodeListOf<HTMLAudioElement>;

const stopAudio = (allAudioTags: NodeListOf<HTMLAudioElement>) => {
  allAudioTags.forEach((audioNode) => {
    audioNode.pause();
  });
};

const playAudio = (audio1: HTMLAudioElement, audio2: HTMLAudioElement, audio3: HTMLAudioElement) => {
  void audio1.play();
  audio1.onended = function () {
    void audio2.play();
    audio2.onended = () => audio3.play();
  };
};

const htmlBookContent = (objWord: ResponseWord) => {
  const url = `https://rslang-data.herokuapp.com/`;
  const eBookPage = `
    <div class="text-book__wrapper">
    <div class="word-card" id="${objWord.id}">
      <div class="card__img">
        <img class="card__image" src="${url}${objWord.image}" alt="${objWord.word}">
      </div>
      <div class="card-word__title-content">
        <h2 class="card-word__title">${objWord.word} - ${objWord.transcription} - ${objWord.wordTranslate}</h2>
        <div class="card-word__sentence">
          <p>${objWord.textMeaning} - ${objWord.textMeaningTranslate}</p>
        </div>
        <div class="card-word__example">
          <p>${objWord.textExample} - ${objWord.textExampleTranslate}</p>
        </div>
        <div class="card-word__sound">
          <button type="button" class="card-word__btn-sound" aria-label="Listen audio">
            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" aria-hidden="true"
              focusable="false" height="24px" width="24px" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M12 1c-4.97 0-9 4.03-9 9v7c0 1.66 1.34 3 3 3h3v-8H5v-2c0-3.87 3.13-7 7-7s7 3.13 7 7v2h-4v8h3c1.66 0 3-1.34 3-3v-7c0-4.97-4.03-9-9-9z">
              </path>
            </svg>
          </button>
        </div>
        <button type="button" class="" data-word="" data-name="complex">Сложное слово</button>
        <button type="button" class="" data-word="" data-name="deleted">Удалить слово</button>
      </div>
    </div>
    </div>`;

  const wordCar = document.createElement('div');
  wordCar.innerHTML = eBookPage;

  const audio1 = new Audio(`${url}${objWord.audio}`);
  const audio2 = new Audio(`${url}${objWord.audioMeaning}`);
  const audio3 = new Audio(`${url}${objWord.audioExample}`);

  wordCar.append(audio1);
  wordCar.append(audio2);
  wordCar.append(audio3);

  const eBookContent = document.querySelector('.e-book__content');
  if (eBookContent) eBookContent.insertAdjacentElement('beforeend', wordCar);
  const audioBtn = wordCar.querySelector('.card-word__btn-sound');
  audioBtn &&
    audioBtn.addEventListener('click', () => {
      void stopAudio(allAudioTags);
      void playAudio(audio1, audio2, audio3);
    });
};

const renderWordsPage = async (page = 0, group = 0) => {
  const wordArr = (await getChunkWords(page, group)) as [ResponseWord];
  wordArr.forEach((word) => {
    htmlBookContent(word);
  });
  allAudioTags = document.querySelectorAll('audio');
};
void renderWordsPage();
