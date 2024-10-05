import FXCards from './FXCard';

type FXPairCardsContainerPropType = {
  cardsList: FxCardType[];
  handleRefresh: (key: number, from: string, to: string) => void;
  handleDelete: (key: number) => void;
  handleSwap: (key: number) => void;
};

const FXPairCardsContainer = ({
  cardsList,
  handleDelete,
  handleSwap,
  handleRefresh,
}: FXPairCardsContainerPropType) => {
  return (
    <div className="px-4 flex flex-wrap gap-6 justify-center">
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
            inverseFxRates={cards.inverseFxRates}
          />
        );
      })}
    </div>
  );
};

export default FXPairCardsContainer;
