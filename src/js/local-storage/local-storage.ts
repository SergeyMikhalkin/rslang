import { Auth } from '../interfaces/auth';
import { PageAndGroup } from '../interfaces/page-and-group';

export const getLocalStorage = (key: string) /*  | PageAndGroup  */ => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key) || '') : undefined;
};
export const setLocalStorage = (
  key: string,
  data: Auth | PageAndGroup /* | если др. дата нужно тут добавить интерфейс */
) => {
  localStorage.setItem(key, JSON.stringify(data));
};
export const removeLocalStorage = (key: string) => {
  localStorage.removeItem(key);
};
