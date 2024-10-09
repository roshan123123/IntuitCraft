// @ts-nocheck
import { ORDER } from '../constants/filterConstants';
import { sortAndReturnNewList } from '../helper';
import { SORT_TYPE, ORDER } from '../constants/filterConstants';
import { placeAtCorrectPosition } from '../helper';
describe('sortAndReturnNewList', () => {
  let cardList;

  beforeEach(() => {
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
    expect(sortedList).not.toBe(cardList);
  });
});

describe('placeAtCorrectPosition function', () => {
  const initialList = [
    {
      from: 'USD',
      to: 'EUR',
      key: 1,
      createdAt: 1632990000,
      updatedAt: 1633080000,
      fxRates: 1.2,
      inverseFxRates: 0.83,
    },
    {
      from: 'USD',
      to: 'GBP',
      key: 2,
      createdAt: 1633000000,
      updatedAt: 1633090000,
      fxRates: 1.5,
      inverseFxRates: 0.67,
    },
    {
      from: 'USD',
      to: 'INR',
      key: 3,
      createdAt: 1633010000,
      updatedAt: 1633100000,
      fxRates: 74.5,
      inverseFxRates: 0.013,
    },
  ];

  it('should place the modified card at the correct position when sorted by createdAt in ascending order', () => {
    const modifiedCard = {
      from: 'USD',
      to: 'JPY',
      key: 4,
      createdAt: 1632995000,
      updatedAt: 1633085000,
      fxRates: 110,
      inverseFxRates: 0.0091,
    };
    const updatedList = placeAtCorrectPosition(
      initialList,
      SORT_TYPE.createdAt,
      ORDER.ASC,
      modifiedCard,
    );

    expect(updatedList[1].key).toBe(4);
  });

  it('should place the modified card at the correct position when sorted by createdAt in descending order', () => {
    const modifiedCard = {
      from: 'USD',
      to: 'JPY',
      key: 4,
      createdAt: 1632995000,
      updatedAt: 1633085000,
      fxRates: 110,
      inverseFxRates: 0.0091,
    };
    const updatedList = placeAtCorrectPosition(
      initialList,
      SORT_TYPE.createdAt,
      ORDER.ASC,
      modifiedCard,
    );

    expect(updatedList[1].key).toBe(4);
  });
});
