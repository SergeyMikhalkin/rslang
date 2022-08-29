import { createUser, sigIn } from '../api/api';

export const auth = async (wrapper: HTMLFormElement) => {
  const email = wrapper.email as HTMLInputElement;
  const password = wrapper.password as HTMLInputElement;
  const values = {
    email: email.value,
    password: password.value,
  };
  await sigIn(values);
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
  // даные для регистрации создания User
  const values = {
    name: name.value,
    email: email.value,
    password: password.value,
  };
  // даные для регистрации
  const valuesSigIn = {
    email: email.value,
    password: password.value,
  };
  await createUser(values); // создали user
  void sigIn(valuesSigIn); // залогиниться сразу
  // закрыть окно регистрации
  // добавить иконке какой нибудь стиль для отображения что User залогинился
};

document.addEventListener('submit', (event) => {
  event.preventDefault();
  const el = event.target as HTMLElement;
  const registForm = el.closest('#regist-form') as HTMLFormElement;
  if (!registForm) return;
  void regist(registForm);
});
