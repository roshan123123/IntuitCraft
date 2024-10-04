/* eslint-disable no-undef */
import { sortAndReturnNewList } from '../helper';

const ORDER = {
  ASC: 'asc',
  DESC: 'desc',
};

describe('sortAndReturnNewList', () => {
  let cardList;

  beforeEach(() => {
    // Setting up an initial card list
    cardList = [
      { name: 'Card A', value: 2, age: 30 },
      { name: 'Card B', value: 1, age: 25 },
      { name: 'Card C', value: 3, age: 40 },
    ];
  });

  it('should sort by value in ascending order', () => {
    const sortedList = sortAndReturnNewList('value', ORDER.ASC, cardList);

    expect(sortedList).toEqual([
      { name: 'Card B', value: 1, age: 25 },
      { name: 'Card A', value: 2, age: 30 },
      { name: 'Card C', value: 3, age: 40 },
    ]);
  });

  it('should sort by value in descending order', () => {
    const sortedList = sortAndReturnNewList('value', ORDER.DESC, cardList);

    expect(sortedList).toEqual([
      { name: 'Card C', value: 3, age: 40 },
      { name: 'Card A', value: 2, age: 30 },
      { name: 'Card B', value: 1, age: 25 },
    ]);
  });

  it('should sort by age in ascending order', () => {
    const sortedList = sortAndReturnNewList('age', ORDER.ASC, cardList);

    expect(sortedList).toEqual([
      { name: 'Card B', age: 25, value: 1 },
      { name: 'Card A', age: 30, value: 2 },
      { name: 'Card C', age: 40, value: 3 },
    ]);
  });

  it('should return a new list (deep copy) instead of modifying the original one', () => {
    const sortedList = sortAndReturnNewList('value', ORDER.ASC, cardList);
    // Sorted list should be a new array
    expect(sortedList).not.toBe(cardList); // Ensure it's a new array, not the same reference
  });
});
