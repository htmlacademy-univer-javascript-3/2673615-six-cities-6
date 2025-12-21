import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import PlaceCard from './place-card';
import { makeFakeOffer } from '../../utils/mocks';
import { AppRoute } from '../../const';
import { withHistory } from '../../utils/mock-component';
import { PlaceCardLocation } from '../../types/place-card';

vi.mock('../place-card-info/place-card-info', () => ({
  default: () => <div data-testid="place-card-info">PlaceCardInfo Mock</div>
}));

describe('Component: PlaceCard', () => {
  const mockLocation = PlaceCardLocation.MainPage;

  it('should render correctly', () => {
    const mockOffer = makeFakeOffer();
    const expectedLink = `${AppRoute.Offer}/${mockOffer.id}`;

    const preparedComponent = withHistory(
      <PlaceCard
        offer={mockOffer}
        location={mockLocation}
      />
    );

    render(preparedComponent);

    const image = screen.getByAltText('Place image');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', mockOffer.previewImage);

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', expectedLink);

    expect(screen.getByTestId('place-card-info')).toBeInTheDocument();
  });

  it('should render "Premium" label if offer is premium', () => {
    const mockOffer = makeFakeOffer();
    mockOffer.isPremium = true;

    const preparedComponent = withHistory(
      <PlaceCard
        offer={mockOffer}
        location={mockLocation}
      />
    );

    render(preparedComponent);

    expect(screen.getByText('Premium')).toBeInTheDocument();
  });

  it('should not render "Premium" label if offer is not premium', () => {
    const mockOffer = makeFakeOffer();
    mockOffer.isPremium = false;

    const preparedComponent = withHistory(
      <PlaceCard
        offer={mockOffer}
        location={mockLocation}
      />
    );

    render(preparedComponent);

    expect(screen.queryByText('Premium')).not.toBeInTheDocument();
  });

  it('should add active class when "isActive" prop is true', () => {
    const mockOffer = makeFakeOffer();

    const preparedComponent = withHistory(
      <PlaceCard
        offer={mockOffer}
        location={mockLocation}
        isActive
      />
    );

    render(preparedComponent);

    const article = screen.getByRole('article');
    expect(article).toHaveClass('place-card--active');
  });

  it('should handle mouse enter and leave events', async () => {
    const mockOffer = makeFakeOffer();
    const onMouseEnter = vi.fn();
    const onMouseLeave = vi.fn();

    const preparedComponent = withHistory(
      <PlaceCard
        offer={mockOffer}
        location={mockLocation}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      />
    );

    render(preparedComponent);

    const article = screen.getByRole('article');

    await userEvent.hover(article);
    expect(onMouseEnter).toHaveBeenCalledTimes(1);
    expect(onMouseEnter).toHaveBeenCalledWith(mockOffer.id);

    await userEvent.unhover(article);
    expect(onMouseLeave).toHaveBeenCalledTimes(1);
  });
});
