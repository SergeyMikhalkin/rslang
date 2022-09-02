type htmlContentType = {
  menu: string;
  about: string;
  auth: string;
};

const htmlContent: htmlContentType = {
  menu: `
    <h1 class="popup__title">Menu</h1>
    <nav class="popup__list">
    <a href="./" class="popup__list-item">Главная</a>
    <a href="./textbook" class="popup__list-item">Учебник</a>
    <a href="" class="popup__list-item">Аудиовызов</a>
    <a href="" class="popup__list-item">Спринт</a>
    <a href="" class="popup__list-item">Статистика</a>
    </nav>`,
  about: `
    <h1 class="popup__title">Об игре:</h1>
    <p>Перед Вами приложение RS-lang для изучения иностранных слов, включающее электронный учебник с базой слов для изучения, мини-игры для их повторения, страницу статистики для отслеживания индивидуального прогресса.</p>
    <p><strong>Let's jump right in :)</strong></p>
    <img class="popup__about-pic" src="./assets/popup/about.png"/>
    `,
  auth: `
    <h1 class="popup__title">Welcome!</h1>
    
    <div class="tab-container form-tab is-active" data-tab="authorization">
    <form class="auth-form" id="auth-form">
    <input type="email" name="email" required class="auth-form__field" placeholder="Ваш email ...">
    <input type="password" name="password" minlength=8 required class="auth-form__field" placeholder="Ваш пароль ...">
    <button class="auth-form__btn" id="auth-form__btn">Отправить</button>
    <p class="auth-form__error"></p>
    </form>
    </div>
    
    <div class="tab-container form-tab" data-tab="registration">
    <form class="auth-form" id="regist-form">
    <input type="text" name="text" required class="auth-form__field" placeholder="Ваше имя ..." id="regist__name">
    <input type="email" name="email" required class="auth-form__field" placeholder="Ваш email ..." id="regist__email">
    <input type="password" name="password" minlength=8 required class="auth-form__field" placeholder="Ваш пароль ..." id=regist__password">
    <button class="auth-form__btn" id="regist-form__btn">Отправить</button>
    <p class="auth-form__error"></p>
    </form>
    
    </div>
    <div class="form-tab-togglers">
    <span class="form-tab__toggler tab-btn is-active" data-open-tab="authorization">Авторизация</span> | 
    <span class="form-tab__toggler tab-btn" data-open-tab="registration">Регистрирация</span>
    </div>
  `,
};

Object.freeze(htmlContent);

export default htmlContent;
