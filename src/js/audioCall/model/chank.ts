import { getChunkWords } from '../../api/api';
import { wordType } from '../type';

class Chank {
  group: number;
  page: number;

  constructor(group: number, page: number) {
    this.group = group;
    this.page = page;
  }

  async getCollection() {
    const collection = (await getChunkWords(this.page, this.group)) as Array<wordType>;
    if (collection instanceof Array) {
      return collection;
    }
  }
}

export default Chank;
