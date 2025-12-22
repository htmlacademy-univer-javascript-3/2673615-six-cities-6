import { render, screen, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import SortingOptions from './sorting-options';
import { SortingOption } from '../../const';

describe('Component: SortingOptions', () => {
  it('should render correctly', () => {
    const activeOption = SortingOption.Popular;
    render(
      <SortingOptions
        activeSortingOption={activeOption}
        onSortingOptionChange={vi.fn()}
      />
    );

    expect(screen.getByText(/Sort by/i)).toBeInTheDocument();
    expect(screen.getByText(activeOption, { selector: '.places__sorting-type' })).toBeInTheDocument();
  });

  it('should open and close options list when clicked', async () => {
    const user = userEvent.setup();
    const activeOption = SortingOption.Popular;

    render(
      <SortingOptions
        activeSortingOption={activeOption}
        onSortingOptionChange={vi.fn()}
      />
    );

    const sortingType = screen.getByText(activeOption, { selector: '.places__sorting-type' });
    const optionsList = screen.getByRole('list');

    expect(optionsList).not.toHaveClass('places__options--opened');

    await act(async () => {
      await user.click(sortingType);
    });
    expect(optionsList).toHaveClass('places__options--opened');

    await act(async () => {
      await user.click(sortingType);
    });
    expect(optionsList).not.toHaveClass('places__options--opened');
  });

  it('should call "onSortingOptionChange" and close list when option is clicked', async () => {
    const user = userEvent.setup();
    const onSortingOptionChange = vi.fn();
    const activeOption = SortingOption.Popular;
    const targetOption = SortingOption.PriceLowToHigh;

    render(
      <SortingOptions
        activeSortingOption={activeOption}
        onSortingOptionChange={onSortingOptionChange}
      />
    );

    const sortingType = screen.getByText(activeOption, { selector: '.places__sorting-type' });

    await act(async () => {
      await user.click(sortingType);
    });

    const targetElement = screen.getByText(targetOption, { selector: 'li' });

    await act(async () => {
      await user.click(targetElement);
    });

    expect(onSortingOptionChange).toHaveBeenCalledWith(targetOption);

    await waitFor(() => {
      expect(screen.getByRole('list')).not.toHaveClass('places__options--opened');
    });
  });

  it('should highlight active sorting option', () => {
    const activeOption = SortingOption.TopRatedFirst;
    render(
      <SortingOptions
        activeSortingOption={activeOption}
        onSortingOptionChange={vi.fn()}
      />
    );

    const activeElement = screen.getByText(activeOption, { selector: 'li' });
    expect(activeElement).toHaveClass('places__option--active');
  });
});
