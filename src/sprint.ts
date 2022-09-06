import './style.sass';
import './js/home/home';
import './js/api/api';
import { SprintGame } from './js/sprint/sprint-game';
import htmlContnent from './js/sprint/htmlContent';

const queryString = window.location.search;
if (queryString.length === 0) {
  showStartPage();
} else {
  const urlParams = new URLSearchParams(queryString);
  const page = urlParams.get('page');

  const group = urlParams.get('group');
  const pageNum = Number(page);
  const groupNum = Number(group);

  if (!isNaN(pageNum) && !isNaN(groupNum)) {
    const main = document.querySelector('.sprint-content');
    if (main) {
      main.innerHTML = htmlContnent.game;
      SprintGame.start(groupNum, pageNum);
    }
  } else showStartPage();
}

const main = document.querySelector('.sprint-content');
if (main) {
  main.addEventListener('endgame', (e) => {
    const customEvent = e as CustomEvent;
    if (!customEvent || customEvent.detail === undefined) return;
    const res = !isNaN(Number(customEvent.detail)) ? Number(customEvent.detail) : 0;
    if (main) {
      main.innerHTML = htmlContnent.result;
      const result = document.querySelector('.sprint__result');
      if (result) result.textContent = `Ваш результат: ${res}`;

      const btn = document.querySelector('.sprint__btn');
      if (btn) {
        btn.addEventListener('click', showStartPage);
      }
    }
  });
}

function showStartPage(): void {
  const main = document.querySelector('.sprint-content');
  if (main) {
    main.innerHTML = htmlContnent.startPage;
    const btn = document.querySelector('.sprint__btn');
    if (btn) {
      btn.addEventListener('click', () => {
        const select = document.querySelector('.sprint__select') as HTMLSelectElement;
        main.innerHTML = htmlContnent.game;
        if (select) SprintGame.start(Number(select.value));
      });
    }
  }
}
