/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { getFXRate, getCountries } from '../../mock/api';
import CurrencyDropdown from './CurrencyDropdown';
import { sortAndReturnNewList } from '../helper';
const AddNewCards = ({ setCardsList, activeSortType }) => {
  const [currencies, setCurrencies] = useState([]);
  const [fromCurrency, setFromCurrency] = useState(null);
  const [toCurrency, setToCurrency] = useState(null);

  const handleAddCardCLick = async () => {
    try {
      const fxRate = await getFXRate(fromCurrency, toCurrency);
      setCardsList((prevCardList) => {
        const newCard = {
          from: fromCurrency,
          to: toCurrency,
          key: Date.now(),
          createdAt: Date.now(),
          updatedAt: Date.now(),
          fxRates: fxRate,
        };
        //TODO: sort the array on the basis of type of sort Config can be otimised
        const updatedList = [newCard, ...prevCardList];
        return sortAndReturnNewList(
          activeSortType.sortBy,
          activeSortType.sortOrder,
          updatedList
        );
      });
    } catch (error) {
      console.error('some error occured while fetching conversion', error);
    } finally {
      setFromCurrency(null);
      setToCurrency(null);
    }
  };

  const fetchCurrencies = async () => {
    try {
      const data = await getCountries();
      console.log('daa', data);

      setCurrencies(Object.keys(data));
    } catch (error) {
      console.error('Error Fetching', error);
    }
  };

  useEffect(() => {
    fetchCurrencies();
  }, []);

  return (
    <div className="flex p-4 bg-gray-300 justify-between sticky top-0">
      <div className="flex gap-4 justify-center items-center">
        <CurrencyDropdown
          currencyOPtions={currencies}
          currency={fromCurrency}
          setCurrency={setFromCurrency}
          title={'From'}
        />

        <CurrencyDropdown
          currencyOPtions={currencies}
          currency={toCurrency}
          setCurrency={setToCurrency}
          title={'To'}
        />

        <button
          className="text-white bg-blue-600 p-2 rounded-md disabled:cursor-not-allowed"
          onClick={handleAddCardCLick}
          disabled={!fromCurrency || !toCurrency}
        >
          Add Card
        </button>
      </div>
      <button
        className="text-white bg-red-600 p-2 rounded-md"
        onClick={() => {
          setCardsList([]);
        }}
      >
        Delete All Cards
      </button>
    </div>
  );
};

export default AddNewCards;
