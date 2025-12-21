import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import CitiesList from './cities-list';
import { CITIES } from '../../const';

describe('Component: CitiesList', () => {
  it('should render all cities from the list', () => {
    const activeCity = CITIES[0];

    render(
      <CitiesList
        activeCity={activeCity}
        onCityChange={vi.fn()}
      />
    );

    CITIES.forEach((city) => {
      expect(screen.getByText(city.name)).toBeInTheDocument();
    });
  });

  it('should set active class for the selected city', () => {
    const activeCity = CITIES[0];
    const inactiveCity = CITIES[1];

    render(
      <CitiesList
        activeCity={activeCity}
        onCityChange={vi.fn()}
      />
    );

    const activeLink = screen.getByText(activeCity.name).closest('a');
    const inactiveLink = screen.getByText(inactiveCity.name).closest('a');

    expect(activeLink).toHaveClass('tabs__item--active');
    expect(inactiveLink).not.toHaveClass('tabs__item--active');
  });

  it('should call "onCityChange" when a city is clicked', async () => {
    const activeCity = CITIES[0];
    const targetCity = CITIES[1];
    const onCityChange = vi.fn();

    render(
      <CitiesList
        activeCity={activeCity}
        onCityChange={onCityChange}
      />
    );

    await userEvent.click(screen.getByText(targetCity.name));

    expect(onCityChange).toHaveBeenCalledTimes(1);
    expect(onCityChange).toHaveBeenCalledWith(targetCity);
  });
});
