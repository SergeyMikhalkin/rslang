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

const authPopup = new Popup({
  btnOpen: document.querySelector('[data-popup="open-auth-form"]'),
  htmlContent: `
    <h1 class="popup__title">Вход:</h1>
    <div class="form-tab is-visible" data-form-tab="authorization">
    <form class="auth-form">
    <input type="email" class="auth-form__field" placeholder="Ваш email ...">
    <input type="password" class="auth-form__field" placeholder="Ваш пароль ...">
    <button class="auth-form__btn">Отправить</button>
    </form>
    </div>
    
    <div class="form-tab" data-form-tab="registration">
    <form class="auth-form">
    <input type="text" class="auth-form__field" placeholder="Ваше имя ...">
    <input type="email" class="auth-form__field" placeholder="Ваш email ...">
    <input type="password" class="auth-form__field" placeholder="Ваш пароль ...">
    <button class="auth-form__btn">Отправить</button>
    </form>

    </div>
    <div class="form-tab-togglers">
    <span class="form-tab__toggler is-active" data-form-tab="open-auth-form">Авторизация</span> | 
    <span class="form-tab__toggler" data-form-tab="open-registr-form">Регистрирация</span>
    </div>
  `,
});

authPopup.listen();
