const countries = {
  AUD: 'Australian Dollar',
  BGN: 'Bulgarian Lev',
  BRL: 'Brazilian Real',
  CAD: 'Canadian Dollar',
  CHF: 'Swiss Franc',
  CNY: 'Chinese Renminbi Yuan',
  CZK: 'Czech Koruna',
  DKK: 'Danish Krone',
  EUR: 'Euro',
  GBP: 'British Pound',
};

// `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`

const conversionRates = {
  AUD: {
    AUD: 1,
    BGN: 1.19,
    BRL: 3.28,
    CAD: 0.88,
    CHF: 0.62,
    CNY: 4.68,
    CZK: 15.22,
    DKK: 4.33,
    EUR: 0.63,
    GBP: 0.55,
  },
  BGN: {
    AUD: 0.84,
    BGN: 1,
    BRL: 2.75,
    CAD: 0.74,
    CHF: 0.52,
    CNY: 3.95,
    CZK: 12.8,
    DKK: 3.64,
    EUR: 0.53,
    GBP: 0.46,
  },
  BRL: {
    AUD: 0.3,
    BGN: 0.36,
    BRL: 1,
    CAD: 0.27,
    CHF: 0.19,
    CNY: 1.43,
    CZK: 4.66,
    DKK: 1.33,
    EUR: 0.19,
    GBP: 0.16,
  },
  CAD: {
    AUD: 1.14,
    BGN: 1.35,
    BRL: 3.76,
    CAD: 1,
    CHF: 0.7,
    CNY: 5.21,
    CZK: 17.03,
    DKK: 4.86,
    EUR: 0.71,
    GBP: 0.61,
  },
  CHF: {
    AUD: 1.61,
    BGN: 1.92,
    BRL: 5.19,
    CAD: 1.43,
    CHF: 1,
    CNY: 7.48,
    CZK: 24.44,
    DKK: 6.98,
    EUR: 1.02,
    GBP: 0.88,
  },
  CNY: {
    AUD: 0.21,
    BGN: 0.25,
    BRL: 0.7,
    CAD: 0.19,
    CHF: 0.13,
    CNY: 1,
    CZK: 3.27,
    DKK: 0.93,
    EUR: 0.14,
    GBP: 0.12,
  },
  CZK: {
    AUD: 0.066,
    BGN: 0.078,
    BRL: 0.21,
    CAD: 0.059,
    CHF: 0.041,
    CNY: 0.31,
    CZK: 1,
    DKK: 0.28,
    EUR: 0.042,
    GBP: 0.036,
  },
  DKK: {
    AUD: 0.23,
    BGN: 0.27,
    BRL: 0.75,
    CAD: 0.21,
    CHF: 0.14,
    CNY: 1.07,
    CZK: 3.52,
    DKK: 1,
    EUR: 0.15,
    GBP: 0.13,
  },
  EUR: {
    AUD: 1.59,
    BGN: 1.88,
    BRL: 5.08,
    CAD: 1.41,
    CHF: 0.98,
    CNY: 7.35,
    CZK: 24.17,
    DKK: 6.91,
    EUR: 1,
    GBP: 0.86,
  },
  GBP: {
    AUD: 1.81,
    BGN: 2.14,
    BRL: 5.77,
    CAD: 1.6,
    CHF: 1.12,
    CNY: 8.41,
    CZK: 27.65,
    DKK: 7.91,
    EUR: 1.16,
    GBP: 1,
  },
};
export const getCountries = async () => {
  // return (Promise.reject("rejected"))
  const res = await fetch('https://api.frankfurter.app/currencies');
  const data = await res.json();
  return data;
};

export const getFXRate = (fromCurrency: string, toCurrency: string) => {
  return Promise.resolve(conversionRates[fromCurrency][toCurrency]);
};

export const getFXRateApi = async (
  fromCurrency: string,
  toCurrency: string,
  amount = 1,
) => {
  // return Promise.reject("skdf")
  const fxAPi = await fetch(
    `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`,
  );
  const fxRate = await fxAPi.json();

  // const fxInverseApi = await fetch(
  //   `https://api.frankfurter.app/latest?amount=${amount}&from=${toCurrency}&to=${fromCurrency}`,
  // );
  // const fxInverseRate = await fxInverseApi.json();

  return {
    fxRate: fxRate.rates[toCurrency],
    inverseFxRate: undefined, // wil change if needed
  };
};
