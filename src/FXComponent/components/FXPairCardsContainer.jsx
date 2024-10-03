/* eslint-disable react/prop-types */
import FXCards from "./FXCard";
const FXPairCardsContainer=({cardsList,handleDelete,handleSwap,handleRefresh,})=>{
  return( <div className="px-4 flex flex-wrap gap-6 justify-center">
        {cardsList.map((cards) => {
          return (
            <FXCards
              key={cards.key}
              handleRefresh={handleRefresh}
              handleDelete={handleDelete}
              handleSwap={handleSwap}
              from={cards.from}
              to={cards.to}
              createdAt={cards.createdAt}
              fxRates={cards.fxRates}
            />
          );
        })}
      </div>)
}


export default FXPairCardsContainer;