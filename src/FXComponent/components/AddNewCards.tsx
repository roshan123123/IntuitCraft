import { useEffect, useState } from 'react';
import { getCountries, getFXRateApi } from '../../mock/api';
import { placeAtCorrectPosition, sortAndReturnNewList } from '../helper';
import CurrencyDropdown from './CurrencyDropdown';
import useThrottle from '../../hooks/useThrottle';

type AddNewCardsPropType = {
  setCardsList: React.Dispatch<React.SetStateAction<FxCardType[]>>;
  activeSortType: ActiveSortType;
};
const AddNewCards = ({ setCardsList, activeSortType }: AddNewCardsPropType) => {
  const [currencies, setCurrencies] = useState<[] | string[]>([]);
  const [fromCurrency, setFromCurrency] = useState<string | undefined>(undefined);
  const [errorState, setErrorState] = useState<string[]>([]);
  const [toCurrency, setToCurrency] = useState<string | undefined>(undefined);
  const [addLoader, setAddLoader] = useState(false);
  const handleAddCardCLick = useThrottle(async () => {
    try {
      setAddLoader(true);
      const rates = await getFXRateApi(fromCurrency as string, toCurrency as string);
      setCardsList((prevCardList) => {
        const newCard = {
          from: fromCurrency,
          to: toCurrency,
          key: Date.now(),
          createdAt: Date.now(),
          updatedAt: Date.now(),
          fxRate: rates.fxRate,
          inverseFxRate: 1 / rates.fxRate,
        };

        return placeAtCorrectPosition(
          prevCardList,
          activeSortType.sortBy,
          activeSortType.sortOrder,
          newCard as FxCardType,
        );
      });
      setErrorState([]); //removing the previous error state
      setFromCurrency(undefined);
      setToCurrency(undefined);
    } catch (error) {
      setErrorState(['Error while fetching the fx rate.']);
      console.error('some error occured while fetching conversion Data', error);
    } finally {
      setAddLoader(false);
    }
  }, 1000);

  const handleDelete = () => {
    const confirmation = confirm('Do you want to delete all the cards');
    if (confirmation) {
      setCardsList([]);
    }
  };

  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const data = await getCountries();
        setCurrencies(Object.keys(data));
      } catch (error) {
        setErrorState(['Error while fetching the Country data.']);
        console.error('Error Fetching the List for countries', error);
      }
    };
    fetchCurrencies();
  }, []);

  return (
    <div className="flex p-4 bg-gray-300 justify-between sticky top-0">
      <div className="flex gap-4 justify-center items-center">
        <CurrencyDropdown
          currencyOPtions={currencies.filter((currency) => currency != toCurrency)}
          currency={fromCurrency}
          setCurrency={setFromCurrency}
          title={'From'}
        />

        <CurrencyDropdown
          currencyOPtions={currencies.filter((currency) => currency != fromCurrency)}
          currency={toCurrency}
          setCurrency={setToCurrency}
          title={'To'}
        />

        <button
          className={`text-white w-[84px] bg-blue-600 p-2 rounded-md disabled:cursor-not-allowed ${addLoader && 'cursor-wait'}`}
          onClick={handleAddCardCLick}
          disabled={!fromCurrency || !toCurrency || addLoader}
        >
          {addLoader ? 'Adding...' : 'Add Card'}
        </button>
        {errorState?.length > 0 && (
          <div className=" text-xs text-red-500 p-2 bg-red-300 border-2 border-red-500 rounded-md">
            {errorState.map((error) => (
              <span>{error}</span>
            ))}
          </div>
        )}
        <div></div>
      </div>
      <button className="text-white bg-red-600 p-2 rounded-md" onClick={handleDelete}>
        Delete All Cards
      </button>
    </div>
  );
};

export default AddNewCards;
