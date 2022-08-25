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
