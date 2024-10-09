import { FaSort, FaSortDown, FaSortUp } from 'react-icons/fa6';
import { ORDER, SORT_TYPE } from '../constants/filterConstants';

type SortButtonPropType = {
  title: string;
  handleSort: (sortBy: keyof typeof SORT_TYPE) => void;
  activeSortType: ActiveSortType;
  sortType: keyof typeof SORT_TYPE;
};

const SortButton = ({
  title,
  handleSort,
  activeSortType,
  sortType,
}: SortButtonPropType) => {
  return (
    <button
      onClick={() => handleSort(sortType)}
      className={`${activeSortType.sortBy === sortType && 'bg-green-500'} flex p-2 rounded-md gap-1 justify-center items-center border border-black`}
    >
      {title}
      {activeSortType.sortBy === sortType ? (
        activeSortType.sortOrder === ORDER.ASC ? (
          <FaSortUp />
        ) : (
          <FaSortDown />
        )
      ) : (
        <FaSort />
      )}
    </button>
  );
};

export default SortButton;
