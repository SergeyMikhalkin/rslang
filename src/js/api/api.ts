import { SignInUser } from '../interfaces/sign-in-user';
import { User } from '../interfaces/user';

const authData = {
  message: 'Authenticated',
  name: 'Andrey',
  refreshToken:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMDY1NjRmNjUwM2Y4MDAxNmRhZjI0ZiIsInRva2VuSWQiOiJmYjFlMjVhMS04MGUyLTRkNjctYTVhNi1jODI2OGZhZTk3NjEiLCJpYXQiOjE2NjEzNTk5OTAsImV4cCI6MTY2MTM3NjE5MH0.fu1_4Fzfiq7mLMBJrcTBV5Xm2Lrq1O65ECUdOLPpebA',
  token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMDY1NjRmNjUwM2Y4MDAxNmRhZjI0ZiIsImlhdCI6MTY2MTM2OTk1NiwiZXhwIjoxNjYxMzg0MzU2fQ.3B6pJQRCrBMrlUxu_3lSti_71Ne_p0xN1Fycsa-Y4o4',
  userId: '6306564f6503f80016daf24f',
}; // Пример authData c Local-storage

export const getChunkWords = async (page: number, group: number) => {
  const url = `https://rslang-data.herokuapp.com/words?page=${page}&group=${group}`;
  const rawResponse = await fetch(url);
  return rawResponse.json();
};
// console.log(getChunkWords(1, 1)); // Promise arrWords(20)

export const getWordsById = async (wordId: string) => {
  const url = `https://rslang-data.herokuapp.com/words/${wordId}`;
  const rawResponse = await fetch(url);
  return rawResponse.json();
};
// console.log(getWordsById('5e9f5ee35eb9e72bc21af4a2')); // Promis {...}

// user
export const createUser = async (user: User) => {
  const rawResponse = await fetch(`https://rslang-data.herokuapp.com/users`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
  if (rawResponse.status !== 200) throw Error();
  return rawResponse.json();
};
// const user1 = {
//   name: 'Andrey',
//   email: 'mall@okay.com',
//   password: '12345678',
// };
// console.log(createUser(user1)); //Результат Promis {email: "mall@okay.com", id: "63055469340de10016a3b477", name: "Andrey"}

export const getUser = async (userId: string, token: string) => {
  const rawResponse = await fetch(`https://rslang-data.herokuapp.com/users/${userId}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
  });
  if (rawResponse.status !== 200) throw Error();
  return rawResponse.json();
};
// const testId = '63055469340de10016a3b477';
// const testToken =
//   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMDU1NDY5MzQwZGUxMDAxNmEzYjQ3NyIsImlhdCI6MTY2MTI5Mzc0OCwiZXhwIjoxNjYxMzA4MTQ4fQ.-CSfw0GwAcHy8V7YqDg096hcqdABknu_-PDoZeZZH9Y';
// console.log(getUser(testId, testToken));
/*
[[PromiseResult]]: Object
  email: "mall@okay.com"
  id: "63055469340de10016a3b477"
  name: "Andrey"
*/
export const updateUser = async (userId: string, token: string, updateUser: SignInUser) => {
  const rawResponse = await fetch(`https://rslang-data.herokuapp.com/users/${userId}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updateUser),
  });
  if (rawResponse.status !== 200) throw Error();
  return rawResponse.json();
};
// const testId = '63055469340de10016a3b477';
// const testToken =
//   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMDU1NDY5MzQwZGUxMDAxNmEzYjQ3NyIsImlhdCI6MTY2MTI5Mzc0OCwiZXhwIjoxNjYxMzA4MTQ4fQ.-CSfw0GwAcHy8V7YqDg096hcqdABknu_-PDoZeZZH9Y';
// const testUpdateUser = {
//   email: 'mall@okay.com',
//   password: '12345678',
// };
// console.log(updateUser(testId, testToken, testUpdateUser));
/* [[PromiseResult]]: Object
email: "mall@okay.com"
id: "63055469340de10016a3b477"
name: "Andrey" */

export const deleteUser = async (userId: string, token: string) => {
  const rawResponse = await fetch(`https://rslang-data.herokuapp.com/users/${userId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (rawResponse.status !== 204) throw Error();
  if (rawResponse.status == 204) console.log('Удалено');
};
// const testId = '63055469340de10016a3b477';
// const testToken =
//   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMDU1NDY5MzQwZGUxMDAxNmEzYjQ3NyIsImlhdCI6MTY2MTI5Mzc0OCwiZXhwIjoxNjYxMzA4MTQ4fQ.-CSfw0GwAcHy8V7YqDg096hcqdABknu_-PDoZeZZH9Y'
// console.log(deleteUser(testId, testToken));

export const getNewToken = async (userId: string, refreshToken: string) => {
  // завязать с localStorag - взять аргументы с localStorage
  const url = `https://rslang-data.herokuapp.com/users/${userId}/tokens`;
  const rawResponse = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${refreshToken}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  if (rawResponse.status !== 200) throw Error();
  return rawResponse.json();
};
// const testId = '63055469340de10016a3b477';
// const testRefreshToken =
//   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMDY1NjRmNjUwM2Y4MDAxNmRhZjI0ZiIsImlhdCI6MTY2MTM2OTk1NiwiZXhwIjoxNjYxMzg0MzU2fQ.3B6pJQRCrBMrlUxu_3lSti_71Ne_p0xN1Fycsa-Y4o4';
// console.log(getNewToken(testId, testRefreshToken));

// Users/Words
export const getAllUserWords = async (userId: string) => {
  // const authData = getLocalStorage(key);
  const url = `https://rslang-data.herokuapp.com/users/${userId}/words`;
  const rawResponse = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${authData.token}`,
      Accept: 'application/json',
    },
  });
  if (rawResponse.status !== 200) throw Error();
  return rawResponse.json();
};

export const createUserWord = async ({ userId, wordId, word }: { userId: string; wordId: string; word: string }) => {
  // const authData = getLocalStorage(key) // authData.token // взять перемую с localStorage
  const rawResponse = await fetch(`rslang-data.herokuapp.com/users/${userId}/words/${wordId}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${authData.token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(word),
  });
  return rawResponse.json();
};

export const getUserWordById = async ({ userId, wordId }: { userId: string; wordId: string }) => {
  // const authData = getLocalStorage(key) // authData.token // взять переменную с localStorage
  const rawResponse = await fetch(`rslang-data.herokuapp.com/users/${userId}/words/${wordId}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${authData.token}`, //
      Accept: 'application/json',
    },
  });
  return rawResponse.json();
};

export const updateUserWord = async ({ userId, wordId }: { userId: string; wordId: string }) => {
  // const authData = getLocalStorage(key) // authData.token // взять переменную с localStorage
  const rawResponse = await fetch(`rslang-data.herokuapp.com/users/${userId}/words/${wordId}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${authData.token}`, //
      Accept: 'application/json',
    },
  });
  return rawResponse.json();
};

export const deleteUserWord = async ({ userId, wordId }: { userId: string; wordId: string }) => {
  const rawResponse = await fetch(`rslang-data.herokuapp.com/users/${userId}/words/${wordId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${authData.token}`,
    },
  });
  if (rawResponse.status !== 204) throw Error();
  if (rawResponse.status == 204) console.log('Word removed');
};

//Users/AggregatedWords
export const getAllAggregatedWords = async () => {
  // const authData = getLocalStorage(key) // authData.token // взять переменную с localStorage
  const currentFilter = '{"userWord": {"$ne": null}}';
  const url = `https://rslang-data.herokuapp.com/users/${authData.userId}/aggregatedWords?wordsPerPage=3600&filter=${currentFilter}`;
  const rawResponse = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${authData.token}`,
      Accept: 'application/json',
    },
  });
  if (rawResponse.status !== 200) throw Error();
  return rawResponse.json();
};

export const getAggregatedWordsById = async (wordId: string) => {
  // const authData = getLocalStorage(key) // authData.token // взять переменную с localStorage
  const url = `https://rslang-data.herokuapp.com/users/${authData.userId}/aggregatedWords/${wordId}`;
  const rawResponse = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${authData.token}`,
      Accept: 'application/json',
    },
  });
  if (rawResponse.status !== 200) throw Error();
  return rawResponse.json();
};
