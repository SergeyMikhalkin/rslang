export type wordType = {
  id: string;
  group: number;
  page: number;
  word: string;
  image: string;
  audio: string;
  audioMeaning: string;
  audioExample: string;
  textMeaning: string;
  textExample: string;
  transcription: string;
  wordTranslate: string;
  textMeaningTranslate: string;
  textExampleTranslate: string;
};

export type wordsChankType = {
  group: number;
  page: number;
};

export type answerData = {
  wordId: string;
  correctAnswers: number;
  wrongAnswers: number;
};
