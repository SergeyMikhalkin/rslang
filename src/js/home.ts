import Popup from './components/popup';

const menuPopup = new Popup({
  btnOpen: document.querySelector('[data-popup="menu-open-button"]'),
  htmlContent: `
    <h1 class="popup__title">Menu</h1>
    <nav class="popup__list">
    <a href="" class="popup__list-item">Главная</a>
    <a href="" class="popup__list-item">Учебник</a>
    <a href="" class="popup__list-item">Аудиовызов</a>
    <a href="" class="popup__list-item">Спринт</a>
    <a href="" class="popup__list-item">Статистика</a>
    </nam>
    `,
});

menuPopup.listen();

const aboutPopup = new Popup({
  btnOpen: document.querySelector('[data-popup="open-about"]'),
  htmlContent: `
    <h1 class="popup__title">Об игре:</h1>
    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consectetur debitis facilis omnis ea aspernatur sit assumenda in, iste illum eveniet!</p>
    `,
});

aboutPopup.listen();
