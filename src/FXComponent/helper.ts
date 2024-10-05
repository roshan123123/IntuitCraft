import { ORDER, SORT_TYPE } from './constants/filterConstants';
export const sortAndReturnNewList = (
  sortBy: keyof typeof SORT_TYPE ,
  sortOrder: keyof typeof ORDER ,
  prevCardList: FxCardType[] | [],
) => {
  prevCardList.sort((card1, card2) => {
    if (sortOrder == ORDER.ASC) {
      return card1[sortBy] - card2[sortBy];
    } else {
      return card2[sortBy] - card1[sortBy];
    }
  });
  //making the deep copy
  return prevCardList.map((card) => {
    return { ...card };
  });
};
