import Popup from './components/popup';
import Tabs from './components/tabs';

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

const authPopup = new Popup({
  btnOpen: document.querySelector('[data-popup="open-auth-form"]'),
  htmlContent: `
    <h1 class="popup__title">Welcome!</h1>

    <div class="tab-container form-tab is-active" data-tab="authorization">
    <form class="auth-form">
    <input type="email" required class="auth-form__field" placeholder="Ваш email ...">
    <input type="password" required class="auth-form__field" placeholder="Ваш пароль ...">
    <button class="auth-form__btn">Отправить</button>
    </form>
    </div>
    
    <div class="tab-container form-tab" data-tab="registration">
    <form class="auth-form">
    <input type="text" required class="auth-form__field" placeholder="Ваше имя ...">
    <input type="email" required class="auth-form__field" placeholder="Ваш email ...">
    <input type="password" minlength=8 required class="auth-form__field" placeholder="Ваш пароль ...">
    <button class="auth-form__btn">Отправить</button>
    </form>

    </div>
    <div class="form-tab-togglers">
    <span class="form-tab__toggler tab-btn is-active" data-open-tab="authorization">Авторизация</span> | 
    <span class="form-tab__toggler tab-btn" data-open-tab="registration">Регистрирация</span>
    </div>
  `,
});

authPopup.listen();

Tabs.listen();
