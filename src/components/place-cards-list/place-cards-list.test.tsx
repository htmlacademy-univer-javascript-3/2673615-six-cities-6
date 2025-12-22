import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import PlaceCardsList from './place-cards-list';
import { makeFakeOffer } from '../../utils/mocks';
import { PlaceCardLocation } from '../../types/place-card';

vi.mock('../place-card/place-card', () => ({
  default: ({ onMouseEnter, onMouseLeave, isActive }: {
    onMouseEnter: () => void;
    onMouseLeave: () => void;
    isActive: boolean;
  }) => (
    <article
      data-testid="place-card-item"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      data-active={isActive ? 'true' : 'false'}
    >
      Mock Place Card
    </article>
  )
}));

describe('Component: PlaceCardsList', () => {
  const mockLocation = PlaceCardLocation.MainPage;
  const mockOffers = [
    makeFakeOffer({ id: 'offer-1' }),
    makeFakeOffer({ id: 'offer-2' }),
    makeFakeOffer({ id: 'offer-3' })
  ];

  it('should render correct number of PlaceCard components', () => {
    render(
      <PlaceCardsList
        offers={mockOffers}
        onCardHover={vi.fn()}
        activeOfferId={null}
        location={mockLocation}
      />
    );

    const cards = screen.getAllByTestId('place-card-item');
    expect(cards).toHaveLength(mockOffers.length);
  });

  it('should set isActive prop correctly', () => {
    const activeOfferId = mockOffers[1].id;

    render(
      <PlaceCardsList
        offers={mockOffers}
        onCardHover={vi.fn()}
        activeOfferId={activeOfferId}
        location={mockLocation}
      />
    );

    const cards = screen.getAllByTestId('place-card-item');

    expect(cards[0]).toHaveAttribute('data-active', 'false');
    expect(cards[1]).toHaveAttribute('data-active', 'true');
    expect(cards[2]).toHaveAttribute('data-active', 'false');
  });

  it('should call onCardHover with offer ID on mouse enter', async () => {
    const onCardHover = vi.fn();
    const targetOffer = mockOffers[0];

    render(
      <PlaceCardsList
        offers={mockOffers}
        onCardHover={onCardHover}
        activeOfferId={null}
        location={mockLocation}
      />
    );

    const cards = screen.getAllByTestId('place-card-item');

    await userEvent.hover(cards[0]);

    expect(onCardHover).toHaveBeenCalledTimes(1);
    expect(onCardHover).toHaveBeenCalledWith(targetOffer.id);
  });

  it('should call onCardHover with null on mouse leave', async () => {
    const onCardHover = vi.fn();

    render(
      <PlaceCardsList
        offers={mockOffers}
        onCardHover={onCardHover}
        activeOfferId={null}
        location={mockLocation}
      />
    );

    const cards = screen.getAllByTestId('place-card-item');

    await userEvent.hover(cards[0]);
    await userEvent.unhover(cards[0]);

    expect(onCardHover).toHaveBeenCalledTimes(2);
    expect(onCardHover).toHaveBeenLastCalledWith(null);
  });
});
