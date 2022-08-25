// import { Auth } from '../interfaces/auth';
export interface Auth {
  massage: string;
  token: string;
  refreshToken: string;
  userId: string;
  name: string;
}

export const getLocalStorage = (key: string) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key) || '') : undefined;
};
export const setLocalStorage = (key: string, data: Auth /* | если др. дата нужно тут добавить интерфейс */) => {
  localStorage.setItem(key, JSON.stringify(data));
};
export const removeLocalStorage = (key: string) => {
  localStorage.removeItem(key);
};
