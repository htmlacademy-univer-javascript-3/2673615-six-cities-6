import { useState } from 'react';
import { SortingOption } from '../../const';

type SortingOptionsProps = {
  activeSortingOption: SortingOption;
  onSortingOptionChange: (sortingOption: SortingOption) => void;
};

function SortingOptions({ activeSortingOption, onSortingOptionChange }: SortingOptionsProps) {
  const [isOpened, setIsOpened] = useState(false);

  const handleSortTypeClick = (sortingOption: SortingOption) => {
    onSortingOptionChange(sortingOption);
    setIsOpened(false);
  };

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by </span>
      <span className="places__sorting-type" tabIndex={0} onClick={() => setIsOpened(!isOpened)}>
        {activeSortingOption}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={`places__options places__options--custom ${isOpened ? 'places__options--opened' : ''}`}>
        {Object.values(SortingOption).map((option) => (
          <li
            key={option}
            className={`places__option ${activeSortingOption === option ? 'places__option--active' : ''}`}
            tabIndex={0}
            onClick={() => handleSortTypeClick(option)}
          >
            {option}
          </li>
        ))}
      </ul>
    </form>
  );
}


export default SortingOptions;
