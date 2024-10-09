import { ORDER, SORT_TYPE } from './constants/filterConstants';
export const sortAndReturnNewList = (
  sortBy: keyof typeof SORT_TYPE,
  sortOrder: keyof typeof ORDER,
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

//sortby being passed is the same as the name of the key in object
export let placeAtCorrectPosition = (
  prevList: FxCardType[],
  sortBy: keyof typeof SORT_TYPE,
  sortType: keyof typeof ORDER,
  modifiedCard: FxCardType,
) => {
  const newList = structuredClone(prevList);
  let comparisonValue = modifiedCard[sortBy];
  let toPlaceAtIndex = newList.length;

  for (let i = 0; i < newList.length; i++) {
    if (sortType === ORDER.ASC) {
      if (newList[i][sortBy] > comparisonValue) {
        toPlaceAtIndex = i;
        break;
      }
    } else if (sortType === ORDER.DESC) {
      if (newList[i][sortBy] < comparisonValue) {
        toPlaceAtIndex = i;
        break;
      }
    }
  }

  return [
    ...newList.slice(0, toPlaceAtIndex),
    { ...modifiedCard },
    ...newList.slice(toPlaceAtIndex),
  ];
};
