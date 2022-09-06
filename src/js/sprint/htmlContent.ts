type htmlContentType = {
  startPage: string;
  game: string;
  result: string;
};

const htmlContent: htmlContentType = {
  startPage: `
  <div class="sprint__field">
    <p>Выберите, пожалуйста, нужный уровень</p>
    <select class="sprint__select">
      <option value="0">1</option>
      <option value="1">2</option>
      <option value="2">3</option>
      <option value="3">4</option>
      <option value="4">5</option>
      <option value="5">6</option>
    </select>
    <button class="sprint__btn" value="false">Вперед!</button>
  </div>`,
  game: `
  <!-- SPRINT -->
  <div class="sprint__field">
    <h3 class="sprint__count-down">59</h3>
    <div class="sprint__score">Счет: 0</div>
    <img class="sprint__image" src="./assets/sprint/plug.png" alt="image">
    <h2 class="sprint__word">Word</h2>
    <h3 class="sprint__question">Слово</h3>
    <div class="sprint__btns">
      <button class="sprint__btn" value="true">Верно</button>
      <button class="sprint__btn" value="false">Heверно</button>
    </div>
  </div>`,
  result: `
  <div class="sprint__field">
    <h3 class="sprint__result">Ваш результат: 0</h3>
    <button class="sprint__btn">Повторить</button>
  </div>`,
};

Object.freeze(htmlContent);

export default htmlContent;
