/* eslint-disable react/prop-types */
import { FaSort, FaSortDown, FaSortUp } from 'react-icons/fa6';
import { ORDER } from '../constants/filterConstants';

const SortButton = ({ title, handleSort, activeSortType, sortType }) => {
  return (
    <button
      onClick={() => handleSort(sortType)}
      className={`${activeSortType.sortBy === sortType && 'bg-green-500'} flex p-2 rounded-md gap-1 justify-center items-center border border-black`}
    >
      {title}
      {activeSortType.sortBy === sortType ? (
        activeSortType.sortOrder === ORDER.ASC ? (
          <FaSortDown />
        ) : (
          <FaSortUp />
        )
      ) : (
        <FaSort />
      )}
    </button>
  );
};

export default SortButton;
