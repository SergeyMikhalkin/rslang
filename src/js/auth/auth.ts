import { createUser, sigIn } from '../api/api';
import { authPopup } from '../header/header';
// import { getLocalStorage } from '../local-storage/local-storage';

export const auth = async (wrapper: HTMLFormElement) => {
  const email = wrapper.email as HTMLInputElement;
  const password = wrapper.password as HTMLInputElement;
  const values = {
    email: email.value,
    password: password.value,
  };
  await sigIn(values);
  authPopup.close();
  // добавить иконке какой нибудь стиль для отображения что User залогинился
  // при нажатии на иконку логина при непустом LocalStorage('auth') не открывать popap регистрации
  // добавить кнопку выхода из аккаунта
};

document.addEventListener('submit', (event) => {
  event.preventDefault();
  const el = event.target as HTMLElement;
  const authForm = el.closest('#auth-form') as HTMLFormElement;
  if (!authForm) return;
  void auth(authForm);
});

export const regist = async (wrapper: HTMLFormElement) => {
  const name = wrapper.text as HTMLInputElement;
  const email = wrapper.email as HTMLInputElement;
  const password = wrapper.password as HTMLInputElement;

  const values = {
    name: name.value,
    email: email.value,
    password: password.value,
  };
  const valuesSigIn = {
    email: email.value,
    password: password.value,
  };
  await createUser(values);
  void (await sigIn(valuesSigIn));
  authPopup.close();

  // const user = getLocalStorage('auth');
  // console.log(user);
  // console.log(user.name);
  // console.log(user.massage);

  // добавить иконке какой нибудь стиль для отображения что User залогинился
};

document.addEventListener('submit', (event) => {
  event.preventDefault();
  const el = event.target as HTMLElement;
  const registForm = el.closest('#regist-form') as HTMLFormElement;
  if (!registForm) return;
  void regist(registForm);
});
