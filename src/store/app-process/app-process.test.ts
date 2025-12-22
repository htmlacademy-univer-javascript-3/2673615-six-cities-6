import { appProcess, changeCity, setSortingOption, AppProcess } from './app-process';
import { INITIAL_CITY, SortingOption } from '../../const';
import { makeFakeCity } from '../../utils/mocks';

describe('AppProcess Slice', () => {
  const initialState: AppProcess = {
    city: INITIAL_CITY,
    sortingOption: SortingOption.Popular,
  };

  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const result = appProcess.reducer(initialState, emptyAction);
    expect(result).toEqual(initialState);
  });

  it('should return default initial state with undefined state', () => {
    const emptyAction = { type: '' };
    const result = appProcess.reducer(undefined, emptyAction);
    expect(result).toEqual(initialState);
  });

  it('should change city with "changeCity" action', () => {
    const newCity = makeFakeCity();
    const result = appProcess.reducer(initialState, changeCity(newCity));
    expect(result.city).toEqual(newCity);
  });

  it('should change sorting option with "setSortingOption" action', () => {
    const newSortingOption = SortingOption.PriceLowToHigh;
    const result = appProcess.reducer(initialState, setSortingOption(newSortingOption));
    expect(result.sortingOption).toBe(newSortingOption);
  });
});
