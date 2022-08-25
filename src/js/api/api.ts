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
};

export const getChunkWords = async (page: number, group: number) => {
  const url = `https://rslang-data.herokuapp.com/words?page=${page}&group=${group}`;
  const rawResponse = await fetch(url);
  if (!rawResponse.ok) throw Error();
  return rawResponse.json();
};

export const getWordsById = async (wordId: string) => {
  const url = `https://rslang-data.herokuapp.com/words/${wordId}`;
  const rawResponse = await fetch(url);
  if (!rawResponse.ok) throw Error();
  return rawResponse.json();
};

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
  if (!rawResponse.ok) throw Error();
  return rawResponse.json();
};

export const getUser = async (userId: string, token: string) => {
  const rawResponse = await fetch(`https://rslang-data.herokuapp.com/users/${userId}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
  });
  if (!rawResponse.ok) throw Error();
  return rawResponse.json();
};

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
  if (!rawResponse.ok) throw Error();
  return rawResponse.json();
};

export const deleteUser = async (userId: string, token: string) => {
  const rawResponse = await fetch(`https://rslang-data.herokuapp.com/users/${userId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!rawResponse.ok) throw Error();
  if (rawResponse.status == 204) console.log('Удалено');
};

export const getNewToken = async (userId: string, refreshToken: string) => {
  // завязать authData.refreshToken с localStorag - взять аргументы с localStorage
  const url = `https://rslang-data.herokuapp.com/users/${userId}/tokens`;
  const rawResponse = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${refreshToken}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  if (!rawResponse.ok) throw Error();
  return rawResponse.json();
};

// Users/Words
export const getAllUserWords = async (userId: string) => {
  // завязать authData с localStorag - взять аргументы с localStorage
  const url = `https://rslang-data.herokuapp.com/users/${userId}/words`;
  const rawResponse = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${authData.token}`,
      Accept: 'application/json',
    },
  });
  if (!rawResponse.ok) throw Error();
  return rawResponse.json();
};

export const createUserWord = async ({ userId, wordId, word }: { userId: string; wordId: string; word: string }) => {
  // завязать authData с localStorag - взять аргументы с localStorage
  const rawResponse = await fetch(`rslang-data.herokuapp.com/users/${userId}/words/${wordId}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${authData.token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(word),
  });
  if (!rawResponse.ok) throw Error();
  return rawResponse.json();
};

export const getUserWordById = async ({ userId, wordId }: { userId: string; wordId: string }) => {
  // завязать authData с localStorag - взять аргументы с localStorage
  const rawResponse = await fetch(`rslang-data.herokuapp.com/users/${userId}/words/${wordId}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${authData.token}`, //
      Accept: 'application/json',
    },
  });
  if (!rawResponse.ok) throw Error();
  return rawResponse.json();
};

export const updateUserWord = async ({ userId, wordId }: { userId: string; wordId: string }) => {
  // завязать authData с localStorag - взять аргументы с localStorage
  const rawResponse = await fetch(`rslang-data.herokuapp.com/users/${userId}/words/${wordId}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${authData.token}`, //
      Accept: 'application/json',
    },
  });
  if (!rawResponse.ok) throw Error();
  return rawResponse.json();
};

export const deleteUserWord = async ({ userId, wordId }: { userId: string; wordId: string }) => {
  const rawResponse = await fetch(`rslang-data.herokuapp.com/users/${userId}/words/${wordId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${authData.token}`,
    },
  });
  if (!rawResponse.ok) throw Error();
  if (rawResponse.status == 204) console.log('Word removed');
};

//Users/AggregatedWords
export const getAllAggregatedWords = async () => {
  // завязать authData с localStorag - взять аргументы с localStorage
  const currentFilter = '{"userWord": {"$ne": null}}';
  const url = `https://rslang-data.herokuapp.com/users/${authData.userId}/aggregatedWords?wordsPerPage=3600&filter=${currentFilter}`;
  const rawResponse = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${authData.token}`,
      Accept: 'application/json',
    },
  });
  if (!rawResponse.ok) throw Error();
  return rawResponse.json();
};

export const getAggregatedWordsById = async (wordId: string) => {
  // завязать authData с localStorag - взять аргументы с localStorage
  const url = `https://rslang-data.herokuapp.com/users/${authData.userId}/aggregatedWords/${wordId}`;
  const rawResponse = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${authData.token}`,
      Accept: 'application/json',
    },
  });
  if (!rawResponse.ok) throw Error();
  return rawResponse.json();
};

//Users/Statistic
export const getStatistics = async () => {
  // завязать authData с localStorag - взять аргументы с localStorage
  const url = `https://rslang-data.herokuapp.com/users/${authData.userId}/statistics`;
  const rawResponse = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${authData.token}`,
      Accept: 'application/json',
    },
  });
  if (!rawResponse.ok) throw Error();
  return rawResponse.json();
};

export const setStatistics = async (statistics: { statistics: string }) => {
  // завязать authData с localStorag - взять аргументы с localStorage
  const url = `https://rslang-data.herokuapp.com/users/${authData.userId}/statistics`;
  const rawResponse = await fetch(url, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${authData.token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(statistics),
  });
  if (!rawResponse.ok) throw Error();
  return rawResponse.json();
};

//Users/Setting
export const getSettings = async () => {
  //завязать authData с localStorag - взять аргументы с localStorage
  const rawResponse = await fetch(`https://https://rslang-data.herokuapp.com/users/${authData.userId}/settings`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${authData.token}`,
      Accept: 'application/json',
    },
  });
  if (!rawResponse.ok) throw Error();
  return rawResponse.json();
};

export const setSettings = async (data: { wordsPerDay: number; optional: /* ! */ { optional: string } }) => {
  /* ! Создать интерфейс для optional */
  //завязать authData с localStorag - взять аргументы с localStorage
  const rawResponse = await fetch(`https://rslang-data.herokuapp.com/users/${authData.userId}/settings`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${authData.token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!rawResponse.ok) throw Error();
  return rawResponse.json();
};

// Sign In
export const sigIn = async (user: SignInUser) => {
  const rawResponse = await fetch('https://rslang-data.herokuapp.com/signin', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
  if (!rawResponse.ok) throw Error();
  return rawResponse.json();
};
