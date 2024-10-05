//these values are maped to the elements of our card so cant Capitals
const SORT_TYPE = {
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  fxRates: 'fxRates',
} as const;

const ORDER = {
  ASC: 'ASC',
  DESC: 'DESC',
} as const;

export { SORT_TYPE, ORDER };
