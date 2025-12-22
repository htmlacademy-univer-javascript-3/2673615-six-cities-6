import { NameSpace, SortingOption } from '../../const';
import { getCity, getSortingOption } from './selectors';
import { makeFakeCity, makeFakeStore } from '../../utils/mocks';

describe('AppProcess Selectors', () => {
  const mockCity = makeFakeCity();
  const mockSorting = SortingOption.TopRatedFirst;

  const state = makeFakeStore({
    [NameSpace.App]: {
      city: mockCity,
      sortingOption: mockSorting,
    }
  });

  it('should return city from state', () => {
    const result = getCity(state);
    expect(result).toEqual(mockCity);
  });

  it('should return sorting option from state', () => {
    const result = getSortingOption(state);
    expect(result).toBe(mockSorting);
  });
});
