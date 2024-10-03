import { ORDER } from './constants/filterConstants';
export const sortAndReturnNewList = (sortBy, sortOrder, prevCardList) => {
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
