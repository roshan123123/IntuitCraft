import { SORT_TYPE } from './filterConstants';
//going ahead can pass seperate sorting functions if needed
export const SORT_BUTTONS_CONFIGS = [
  {
    key: SORT_TYPE.createdAt,
    title: 'SORT BY CREATED_AT',
    sortType: SORT_TYPE.createdAt,
  },
  { key: SORT_TYPE.fxRates, 
    title: 'SORT BY FX_RATE',
    sortType: SORT_TYPE.fxRates 
  },
  {
    key: SORT_TYPE.updatedAt,
    title: 'SORT BY UPDATED_AT',
    sortType: SORT_TYPE.updatedAt,
  },
];
