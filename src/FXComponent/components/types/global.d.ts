import { SORT_TYPE, ORDER } from '../../constants/filterConstants';

declare global {
  export type FxCardType = {
    from: string;
    to: string;
    key: number;
    createdAt: number;
    updatedAt: number;
    fxRate: number;
    inverseFxRate: number;
  };

  export type ActiveSortType = {
    sortBy: keyof typeof SORT_TYPE;
    sortOrder: keyof typeof ORDER;
  };
}
export {};
