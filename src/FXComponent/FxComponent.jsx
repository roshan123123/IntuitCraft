/* eslint-disable react/prop-types */
import { useState, useEffect, useCallback } from 'react';
import SortButton from './components/SortButton';
import { ORDER, SORT_TYPE } from './constants/filterConstants';
import FXPairCardsContainer from './components/FXPairCardsContainer';
import AddNewCards from './components/AddNewCards';
import { sortAndReturnNewList } from './helper';
import { getFXRate, getFXRateApi } from '../mock/api';

function FxComponent() {
   const [cardsList, setCardsList] = useState(() => {
    const savedCardsList = localStorage.getItem('cardsList');
    return savedCardsList ? JSON.parse(savedCardsList) : [];
  });

  const [activeSortType, setActiveSortType] = useState(() => {
    const savedSortType = localStorage.getItem('activeSortType');
    return savedSortType
      ? JSON.parse(savedSortType)
      : { sortBy: SORT_TYPE.CREATED_AT, sortOrder: ORDER.ASC };
  });

  //not calling the api to get updated exchange rate
  const handleSwap = useCallback((key) => {
    setCardsList((prevCardList) => {
      const updatedCardList = prevCardList.map((card) => {
        if (card.key === key) {
          return {
            ...card,
            updatedAt: Date.now(),
            from: card.to,
            to: card.from,
            // TODO: call api if needed
            fxRates: 1 / card.fxRates,
          };
        }
        return card; // return the unchanged card if key doesn't match
      });

      return sortAndReturnNewList(
        activeSortType.sortBy,
        activeSortType.sortOrder,
        updatedCardList
      );
    });
  },[activeSortType,setCardsList])

  const handleSort =useCallback((sortBy) => {
    let updatedSortType;
    // If the same button is clicked again, toggle the order
    if (activeSortType.sortBy === sortBy) {
      updatedSortType = {
        sortBy,
        sortOrder:
          activeSortType.sortOrder === ORDER.ASC ? ORDER.DESC : ORDER.ASC,
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
        prevCardList
      );
      return val;
    });
  },[activeSortType,setCardsList])

  const handleDelete =useCallback( (key) => {
    setCardsList((prevCardList) => {
      return prevCardList.filter((card) => card.key !== key);
    });
  },[setCardsList])

  const handleRefresh = useCallback( async (key, from, to) => {
    try {
      const fxRate = await getFXRate(from, to);
      setCardsList((prevCardList) => {
        const updatedCardList = prevCardList.map((card) => {
          if (card.key === key) {
            return {
              ...card,
              updatedAt: Date.now(),
              fxRates: fxRate,
            };
          }
          return card; // return the unchanged card if key doesn't match
        });

        return sortAndReturnNewList(
          activeSortType.sortBy,
          activeSortType.sortOrder,
          updatedCardList
        );
      });
    } catch (error) {
      console.log('errror while fetching the exchange rate', error);
    }
  },[activeSortType,setCardsList])


  useEffect(() => {
    //this if is for the first cardList
    localStorage.setItem('cardsList', JSON.stringify(cardsList));
  }, [cardsList]);

  useEffect(()=>{
    localStorage.setItem('activeSortType', JSON.stringify(activeSortType));

  },[activeSortType])

 

  return (
    <div className="min-h-screen bg-white">
      <AddNewCards
        setCardsList={setCardsList}
        activeSortType={activeSortType}
      />
      <div className="p-4 flex gap-2 sticky top-[73px] bg-white border mb-5">
        <SortButton
          title={'SORT BY CREATED_AT'}
          handleSort={handleSort}
          activeSortType={activeSortType}
          sortType={SORT_TYPE.CREATED_AT}
        />
        <SortButton
          title={'SORT BY FX_RATE'}
          handleSort={handleSort}
          activeSortType={activeSortType}
          sortType={SORT_TYPE.FX_RATE}
        />
        <SortButton
          title={'SORT BY UPDATED_AT'}
          handleSort={handleSort}
          activeSortType={activeSortType}
          sortType={SORT_TYPE.UPDATED_AT}
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
