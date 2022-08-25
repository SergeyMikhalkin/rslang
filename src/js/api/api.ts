import { Auth } from '../interfaces/auth';
import { SignInUser } from '../interfaces/sign-in-user';
import { User } from '../interfaces/user';
import { getLocalStorage, setLocalStorage } from '../local-storage/local-storage';

const base = `https://rslang-data.herokuapp.com`;

export const getChunkWords = async (page: number, group: number) => {
  const url = `${base}/words?page=${page}&group=${group}`;
  const rawResponse = await fetch(url);
  if (!rawResponse.ok) throw Error(`Error${rawResponse.status}`);
  return rawResponse.json();
};

export const getWordsById = async (wordId: string) => {
  const url = `${base}/words/${wordId}`;
  const rawResponse = await fetch(url);
  if (!rawResponse.ok) throw Error(`Error${rawResponse.status}`);
  return rawResponse.json();
};

// user
export const createUser = async (user: User) => {
  const rawResponse = await fetch(`${base}/users`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
  if (!rawResponse.ok) throw Error(`Error${rawResponse.status}`);
  return rawResponse.json();
};

export const getUser = async () => {
  const authData = getLocalStorage('auth');
  const rawResponse = await fetch(`${base}/users/${authData.userId}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${authData.token}`,
      Accept: 'application/json',
    },
  });
  if (!rawResponse.ok) throw Error(`Error${rawResponse.status}`);
  return rawResponse.json();
};

export const updateUser = async (updateUser: SignInUser) => {
  const authData = getLocalStorage('auth');
  const rawResponse = await fetch(`${base}/users/${authData.userId}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${authData.token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updateUser),
  });
  if (!rawResponse.ok) throw Error(`Error${rawResponse.status}`);
  return rawResponse.json();
};

export const deleteUser = async () => {
  const authData = getLocalStorage('auth');
  const rawResponse = await fetch(`${base}/users/${authData.userId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${authData.token}`,
    },
  });
  if (!rawResponse.ok) throw Error(`Error${rawResponse.status}`);
  if (rawResponse.status == 204) console.log('Удалено');
};

export const getNewToken = async () => {
  const authData = getLocalStorage('auth');
  const url = `${base}/users/${authData.userId}/tokens`;
  const rawResponse = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${authData.refreshToken}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  if (!rawResponse.ok) throw Error(`Error${rawResponse.status}`);
  return rawResponse.json();
};

// Users/Words
export const getAllUserWords = async () => {
  const authData = getLocalStorage('auth');
  const url = `${base}/users/${authData.userId}/words`;
  const rawResponse = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${authData.token}`,
      Accept: 'application/json',
    },
  });
  if (!rawResponse.ok) throw Error(`Error${rawResponse.status}`);
  return rawResponse.json();
};
//!
export const createUserWord = async ({ wordId, word }: { wordId: string; word: string }) => {
  const authData = getLocalStorage('auth');
  const rawResponse = await fetch(`${base}/users/${authData.userId}/words/${wordId}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${authData.token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(word),
  });
  if (!rawResponse.ok) throw Error(`Error${rawResponse.status}`);
  return rawResponse.json();
};

export const getUserWordById = async (wordId: string) => {
  const authData = getLocalStorage('auth');
  const rawResponse = await fetch(`${base}/users/${authData.userId}/words/${wordId}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${authData.token}`,
      Accept: 'application/json',
    },
  });
  if (!rawResponse.ok) throw Error(`Error${rawResponse.status}`);
  return rawResponse.json();
};

export const updateUserWord = async (wordId: string) => {
  const authData = getLocalStorage('auth');
  const rawResponse = await fetch(`${base}/users/${authData.userId}/words/${wordId}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${authData.token}`, //
      Accept: 'application/json',
    },
  });
  if (!rawResponse.ok) throw Error(`Error${rawResponse.status}`);
  return rawResponse.json();
};

export const deleteUserWord = async (wordId: string) => {
  const authData = getLocalStorage('auth');
  const rawResponse = await fetch(`${base}/users/${authData.userId}/words/${wordId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${authData.token}`,
    },
  });
  if (!rawResponse.ok) throw Error(`Error${rawResponse.status}`);
  if (rawResponse.status == 204) console.log('Word removed');
};

//Users/AggregatedWords
export const getAllAggregatedWords = async () => {
  const authData = getLocalStorage('auth');
  const currentFilter = '{"userWord": {"$ne": null}}';
  const url = `${base}/users/${authData.userId}/aggregatedWords?wordsPerPage=3600&filter=${currentFilter}`;
  const rawResponse = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${authData.token}`,
      Accept: 'application/json',
    },
  });
  if (!rawResponse.ok) throw Error(`Error${rawResponse.status}`);
  return rawResponse.json();
};

export const getAggregatedWordsById = async (wordId: string) => {
  const authData = getLocalStorage('auth');
  const url = `${base}/users/${authData.userId}/aggregatedWords/${wordId}`;
  const rawResponse = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${authData.token}`,
      Accept: 'application/json',
    },
  });
  if (!rawResponse.ok) throw Error(`Error${rawResponse.status}`);
  return rawResponse.json();
};

//Users/Statistic
export const getStatistics = async () => {
  const authData = getLocalStorage('auth');
  const url = `${base}/users/${authData.userId}/statistics`;
  const rawResponse = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${authData.token}`,
      Accept: 'application/json',
    },
  });
  if (!rawResponse.ok) throw Error(`Error${rawResponse.status}`);
  return rawResponse.json();
};
//!
export const setStatistics = async (statistics: { statistics: string }) => {
  const authData = getLocalStorage('auth');
  const url = `${base}/users/${authData.userId}/statistics`;
  const rawResponse = await fetch(url, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${authData.token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(statistics),
  });
  if (!rawResponse.ok) throw Error(`Error${rawResponse.status}`);
  return rawResponse.json();
};

//Users/Setting
export const getSettings = async () => {
  const authData = getLocalStorage('auth');
  const rawResponse = await fetch(`${base}/users/${authData.userId}/settings`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${authData.token}`,
      Accept: 'application/json',
    },
  });
  if (!rawResponse.ok) throw Error(`Error${rawResponse.status}`);
  return rawResponse.json();
};

export const setSettings = async (data: { wordsPerDay: number; optional: /* ! */ { optional: string } }) => {
  const authData = getLocalStorage('auth');
  /* ! Создать интерфейс для optional */
  const rawResponse = await fetch(`${base}/users/${authData.userId}/settings`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${authData.token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!rawResponse.ok) throw Error(`Error${rawResponse.status}`);
  return rawResponse.json();
};

// Sign In
export const sigIn = async (user: SignInUser) => {
  const rawResponse = await fetch(`${base}/signin`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
  if (!rawResponse.ok) throw Error(`Error${rawResponse.status}`);

  const authData = (await rawResponse.json()) as Auth;
  setLocalStorage('auth', authData);

  return rawResponse.json();
};
