import { useCallback, useEffect, useState } from 'react';
import useThrottle from '../hooks/useThrottle';
import { getFXRateApi } from '../mock/api';
import AddNewCards from './components/AddNewCards';
import FXPairCardsContainer from './components/FXPairCardsContainer';
import SortButton from './components/SortButton';
import { ORDER, SORT_TYPE } from './constants/filterConstants';
import { LocalstorageKey } from './constants/localStorage';
import { placeAtCorrectPosition, sortAndReturnNewList } from './helper';
import './index.css';

function FxComponent() {
  const [cardsList, setCardsList] = useState<FxCardType[] | []>(() => {
    const savedCardsList = localStorage.getItem(LocalstorageKey.CARD_LIST);
    return savedCardsList ? JSON.parse(savedCardsList) : [];
  });

  const [activeSortType, setActiveSortType] = useState<ActiveSortType>(() => {
    const savedSortType = localStorage.getItem(LocalstorageKey.ACTIVE_SORT_TYPE);
    return savedSortType
      ? JSON.parse(savedSortType)
      : { sortBy: SORT_TYPE.createdAt, sortOrder: ORDER.ASC };
  });
  const [errorState, setErrorState] = useState<string[] | []>([]);

  //not calling the api to get updated exchange rate
  const handleSwap = useCallback(
    (key: number) => {
      setCardsList((prevCardList) => {
        const modifiedElement = prevCardList.find((ele) => ele.key == key) as FxCardType;

        return placeAtCorrectPosition(
          prevCardList.filter((ele) => ele.key != key),
          activeSortType.sortBy,
          activeSortType.sortOrder,
          {
            ...modifiedElement,
            updatedAt: Date.now(),
            from: modifiedElement.to,
            to: modifiedElement.from,
            fxRates: modifiedElement.inverseFxRates,
            inverseFxRates: modifiedElement.fxRates,
          },
        );
      });
    },
    [activeSortType, setCardsList],
  );

  const handleSort = useCallback(
    (sortBy: keyof typeof SORT_TYPE) => {
      let updatedSortType;
      // If the same button is clicked again, toggle the order
      if (activeSortType.sortBy === sortBy) {
        updatedSortType = {
          sortBy,
          sortOrder: activeSortType.sortOrder === ORDER.ASC ? ORDER.DESC : ORDER.ASC,
        };
      } else {
        // If a different button is clicked, set to ascending order by default

        updatedSortType = {
          sortBy,
          sortOrder: ORDER.ASC,
        };
      }
      setActiveSortType(updatedSortType);

      setCardsList((prevCardList) => {
        const val = sortAndReturnNewList(
          updatedSortType.sortBy,
          updatedSortType.sortOrder,
          prevCardList,
        );
        return val;
      });
    },
    [activeSortType, setCardsList],
  );

  const handleDelete = useCallback(
    (key: number) => {
      setCardsList((prevCardList) => {
        return prevCardList.filter((card) => card.key !== key);
      });
    },
    [setCardsList],
  );

  const handleRefresh = useThrottle(
    useCallback(
      async (key: number, from: string, to: string) => {
        try {
          const rates = await getFXRateApi(from, to);
          setCardsList((prevCardList) => {
            const modifiedElement = {
              ...prevCardList.find((ele) => ele.key == key),
              updatedAt: Date.now(),
              fxRates: rates.fxRate,
              inverseFxRates: 1 / rates.fxRate,
            };

            return placeAtCorrectPosition(
              prevCardList.filter((ele) => ele.key != key),
              activeSortType.sortBy,
              activeSortType.sortOrder,
              modifiedElement as FxCardType,
            );
          });
          setErrorState([]);
        } catch (error) {
          setErrorState(['Error while Refetching the fx rate.']);
          console.log('errror while fetching the exchange rate', error);
        }
      },
      [activeSortType, setCardsList],
    ),
    1000,
  );

  useEffect(() => {
    //this if is for the first cardList
    console.log('cardList', cardsList);
    localStorage.setItem(LocalstorageKey.CARD_LIST, JSON.stringify(cardsList));
  }, [cardsList]);

  useEffect(() => {
    localStorage.setItem(
      LocalstorageKey.ACTIVE_SORT_TYPE,
      JSON.stringify(activeSortType),
    );
  }, [activeSortType]);

  return (
    <div className="min-h-screen bg-white">
      <AddNewCards
        errorState={errorState}
        setErrorState={setErrorState}
        setCardsList={setCardsList}
        activeSortType={activeSortType}
      />
      <div className="p-4 flex gap-2 sticky top-[73px] bg-white border mb-5">
        <SortButton
          title={'SORT BY CREATED_AT'}
          handleSort={handleSort}
          activeSortType={activeSortType}
          sortType={SORT_TYPE.createdAt}
        />
        <SortButton
          title={'SORT BY FX_RATE'}
          handleSort={handleSort}
          activeSortType={activeSortType}
          sortType={SORT_TYPE.fxRates}
        />
        <SortButton
          title={'SORT BY UPDATED_AT'}
          handleSort={handleSort}
          activeSortType={activeSortType}
          sortType={SORT_TYPE.updatedAt}
        />
      </div>
      <FXPairCardsContainer
        cardsList={cardsList}
        handleDelete={handleDelete}
        handleSwap={handleSwap}
        handleRefresh={handleRefresh}
      />
    </div>
  );
}

export default FxComponent;
