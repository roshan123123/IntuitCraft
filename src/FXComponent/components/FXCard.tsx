// @ts-nocheck
import { useEffect, useState } from 'react';
import { CgArrowsExchangeAltV } from 'react-icons/cg';
import { IoIosRefresh } from 'react-icons/io';
import { RxCross2 } from 'react-icons/rx';
import { roundToDecimalPlace } from '../../utility/numericalManipulation';

const INPUT_CONSTANT = {
  FROM: 'from',
  TO: 'to',
};

type FxCardsPropType = {
  handleRefresh: (
    key: number,
    from: string,
    to: string,
    errorCalback: (errorMsg: string) => void,
    loaderCallback: (loading: boolean) => void,
  ) => void;
  handleDelete: (key: number) => void;
  handleSwap: (key: number) => void;
  from: string;
  to: string;
  createdAt: number;
  fxRates: number;
  inverseFxRates: number;
};

const FXCards = ({
  handleRefresh,
  handleDelete,
  handleSwap,
  from,
  to,
  createdAt,
  fxRates,
  inverseFxRates,
}: FxCardsPropType) => {
  const [fromInput, setFromInput] = useState(1);
  const [toInput, setToInput] = useState(1 * fxRates);
  const [userTouched, setUserTouched] = useState(INPUT_CONSTANT.FROM);
  const [error, setError] = useState('');
  const [refreshLoading, setRefreshLoading] = useState(false);
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Prevent keys like 'e', 'E', '+', '-', etc.
    if (['e', 'E', '+', '-'].includes(e.key)) {
      e.preventDefault();
    }
  };
  const handleFromInputChange = (e) => {
    setUserTouched(INPUT_CONSTANT.FROM);
    const val = e.target.value;
    setFromInput(val);
    setToInput(val * fxRates);
  };

  // //for making specific throttoling
  // const throtelledRefresh = useThrottle(handleRefresh, 20000, createdAt);

  //TODO:if get the inverseFXrate change it accordingly
  const handleToInputChange = (e) => {
    setUserTouched(INPUT_CONSTANT.TO);
    const val = e.target.value;
    setToInput(val);
    setFromInput(val * inverseFxRates);
  };
  useEffect(() => {
    if (userTouched == INPUT_CONSTANT.FROM) {
      setToInput(fromInput * fxRates);
    } else {
      setFromInput(toInput * inverseFxRates);
    }
  }, [fxRates]);

  return (
    <div className="flex flex-col border-gray-300 border rounded-xl py-4  px-5 w-[340px]">
      <div className="flex   gap-4    justify-between">
        <div className="flex flex-col justify-between h-[140px]">
          <span className="text-green-700 font-bold">{from}</span>
          <div className="flex justify-center items-center gap-2">
            <button
              data-testid="swap"
              onClick={() => handleSwap(createdAt)}
              className=" bg-gray-200 rounded-3xl text-4xl hover:bg-gray-400 "
            >
              <CgArrowsExchangeAltV />
            </button>
            <span>{roundToDecimalPlace(fxRates, 5)}</span>
          </div>
          <span className=" text-green-700 font-bold">{to}</span>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex justify-end gap-2">
            <button
              disabled={refreshLoading}
              data-testid="refresh"
              onClick={() =>
                handleRefresh(
                  createdAt,
                  from,
                  to,
                  (msg) => setError(msg),
                  (loading) => setRefreshLoading(loading),
                )
              }
              className={`bg-green-200 flex items-center justify-center rounded-full w-8 h-8 hover:bg-green-400 ${refreshLoading && 'rotate-button bg-gray-400 hover:!bg-gray-400 cursor-wait'}`}
            >
              <IoIosRefresh />
            </button>
            <button
              data-testid="delete"
              onClick={() => handleDelete(createdAt)}
              className="border border-gray-300 rounded-full p-2 hover:bg-gray-400"
            >
              <RxCross2 />
            </button>
          </div>
          <input
            type="number"
            value={fromInput}
            className=" border-gray-400 border rounded-md p-1 "
            onChange={handleFromInputChange}
            onKeyDown={handleKeyDown} //to make sure use does not enter e
          />
          <input
            type="number"
            className=" border-gray-400 border rounded-md p-1"
            value={toInput}
            onChange={handleToInputChange}
          />
        </div>
      </div>
      {error && <div className="text-red-700 text-center text-xs">{error}</div>}
    </div>
  );
};

export default FXCards;
