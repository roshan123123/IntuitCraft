/* eslint-disable react/prop-types */

const INPUT_CONSTANT={
  FROM:"from",
  TO:"to"
}

import {  useState ,useEffect} from "react";
import { CgArrowsExchangeAltV } from "react-icons/cg";
import { RxCross2 } from "react-icons/rx";
import { IoIosRefresh } from "react-icons/io";
const FXCards = ({
  handleRefresh,
  handleDelete,
  handleSwap,
  from,
  to,
  createdAt,
  fxRates,
  inverseFxRates          
  
}) => {
  // const [exRate] = useState(0);
  const [fromInput, setFromInput] = useState(1);
  const [toInput, setToInput] = useState(1*fxRates);
  const [userTouched,setUserTouched]=useState(INPUT_CONSTANT.FROM)
    const handleKeyDown = (e) => {
    // Prevent keys like 'e', 'E', '+', '-', etc.
    if (['e', 'E', '+', '-'].includes(e.key)) {
      e.preventDefault();
    }
    
  };
  const handleFromInputChange =(e)=>{
    setUserTouched(INPUT_CONSTANT.FROM)
    const val=e.target.value;
    setFromInput(val);
    setToInput(val*fxRates);

  }

  //TODO:if get the inverseFXrate change it accordingly
    const handleToInputChange =(e)=>{
       setUserTouched(INPUT_CONSTANT.TO)
     const val=e.target.value;
    setToInput(val);
    setFromInput(val*inverseFxRates);
  }
  useEffect(()=>{
    if(userTouched==INPUT_CONSTANT.FROM){
       setToInput(fromInput*fxRates);
    } else{
      setFromInput(toInput*inverseFxRates);
    }
  },[fxRates])

  return (
    <>
      <div className="flex border-gray-300 border py-4  px-5 rounded-xl gap-4 w-[340px]  justify-between">
        <div className="flex flex-col justify-between h-[140px]">
          <span className="text-green-700 font-bold">{from}</span>
          <div className="flex justify-center items-center gap-2">
            <button
              onClick={() => handleSwap(createdAt)}
              className=" bg-gray-200 rounded-3xl text-4xl hover:bg-gray-400"
            >
              <CgArrowsExchangeAltV />
            </button>
            <span>{fxRates}</span>
          </div>
          <span className=" text-green-700 font-bold">{to}</span>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex justify-end gap-2">
            <button
              onClick={() => handleRefresh(createdAt,from,to)}
              className=" bg-green-200 rounded-full p-2 hover:bg-green-400"
            >
              <IoIosRefresh/>
            </button>
            <button
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
    </>
  );
};

export default FXCards;