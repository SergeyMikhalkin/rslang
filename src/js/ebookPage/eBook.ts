import { getChunkWords } from '../api/api';
import { PageAndGroup } from '../interfaces/pageAndGroup';
import { getLocalStorage, setLocalStorage } from '../local-storage/local-storage';

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
  const cardTemplate = `
    <div class="word-card__wrapper">
    <div class="word-card" id="${objWord.id}">
      <div class="card__img">
        <img class="card__image" src="${url}${objWord.image}" alt="${objWord.word}">
      </div>
      <div class="card-word__title-content">
        <h2 class="card-word__title">${objWord.word} - ${objWord.transcription} - ${objWord.wordTranslate}</h2>
        <div class="card-word__sentence">
          <p class="card-word__sub-title">${objWord.textMeaning} - ${objWord.textMeaningTranslate}</p>
        </div>
        <div class="card-word__example">
          <p class="card-word__sub-title">${objWord.textExample} - ${objWord.textExampleTranslate}</p>
        </div>
        <div class="card-word__sound">
          <button type="button" class="card-word__btn-sound paly_sound" aria-label="Listen audio">
          <span class="">
            <svg class="" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z"></path>
            </svg>
          </span>
          </button>
          <button type="button" class="card-word__btn-sound stop_sound" aria-label="Listen audio">
            <span class="">
              <svg class="" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6h12v12H6z"></path>
              </svg>
            </span>
          </button>
        </div>
        <button type="button" class="" data-word="" data-name="complex">Сложное слово</button>
        <button type="button" class="" data-word="" data-name="deleted">Удалить слово</button>
      </div>
    </div>
    </div>`;

  const wordCard = document.createElement('div');
  wordCard.innerHTML = cardTemplate;

  const wordsCard = document.getElementById('words__container');
  wordsCard && wordsCard.append(wordCard);

  const audio1 = new Audio(`${url}${objWord.audio}`);
  const audio2 = new Audio(`${url}${objWord.audioMeaning}`);
  const audio3 = new Audio(`${url}${objWord.audioExample}`);
  const playAudioBtn = wordCard.querySelector('.paly_sound');
  wordCard.append(audio1);
  wordCard.append(audio2);
  wordCard.append(audio3);

  playAudioBtn &&
    playAudioBtn.addEventListener('click', () => {
      void stopAudio(allAudioTags);
      void playAudio(audio1, audio2, audio3);
    });
  const stopAudioBtn = wordCard.querySelector('.stop_sound');
  stopAudioBtn &&
    stopAudioBtn.addEventListener('click', () => {
      void stopAudio(allAudioTags);
    });
};

const renderWordsPage = async (page = 0, group = 0) => {
  const wordArr = (await getChunkWords(page, group)) as [ResponseWord];
  const wordsCard = document.getElementById('words__container');
  if (wordsCard) wordsCard.innerHTML = '';
  wordArr.forEach((word) => {
    htmlBookContent(word);
  });
  allAudioTags = document.querySelectorAll('audio');
};

const createPageNamber = () => {
  const select = document.querySelector('.nav__page-select') as HTMLSelectElement;
  for (let index = 0; index < 30; index++) {
    const option = document.createElement('option');
    option.value = String(index);
    option.textContent = `Страница ${String(index + 1)}`;
    select?.append(option);
  }
};

const createGroupNamber = () => {
  const select = document.querySelector('.nav__group-select') as HTMLSelectElement;
  for (let index = 0; index < 7; index++) {
    const option = document.createElement('option');
    option.value = String(index);
    if (index == 6) {
      option.textContent = `Группа ${String(index + 1)} Сложные слова`;
    } else {
      option.textContent = `Группа ${String(index + 1)}`;
    }
    select?.append(option);
  }
};

const selectGroupAndPage = () => {
  const data = getLocalStorage('selectGroupAndPage') as PageAndGroup;

  const selectPage = document.querySelector('.nav__page-select') as HTMLSelectElement;
  if (data) selectPage.selectedIndex = +data.page;
  selectPage.addEventListener('change', () => {
    void renderWordsPage(Number(selectPage.value), Number(selectGroup.value));
    setLocalStorage('selectGroupAndPage', {
      page: selectPage.value,
      group: selectGroup.value,
    });
  });

  const selectGroup = document.querySelector('.nav__group-select') as HTMLSelectElement;
  if (data) selectGroup.selectedIndex = +data.group;
  selectGroup.addEventListener('change', () => {
    void renderWordsPage(Number(selectPage.value), Number(selectGroup.value));
    setLocalStorage('selectGroupAndPage', {
      page: selectPage.value,
      group: selectGroup.value,
    });
  });
};

const initEbookPage = () => {
  const data = getLocalStorage('selectGroupAndPage') as PageAndGroup;
  createGroupNamber();
  createPageNamber();
  selectGroupAndPage();
  data ? void renderWordsPage(+data.page, +data.group) : void renderWordsPage();
};

initEbookPage();
