import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import FavoritePlaceCard from './favorite-place-card';
import { makeFakeOffer } from '../../utils/mocks';
import { AppRoute } from '../../const';
import { withHistory } from '../../utils/mock-component';

vi.mock('../place-card-info/place-card-info', () => ({
  default: () => <div data-testid="place-card-info">PlaceCardInfo Mock</div>
}));

describe('Component: FavoritePlaceCard', () => {
  it('should render correctly', () => {
    const mockOffer = makeFakeOffer();
    const expectedLink = `${AppRoute.Offer}/${mockOffer.id}`;

    const preparedComponent = withHistory(<FavoritePlaceCard offer={mockOffer} />);

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

    const preparedComponent = withHistory(<FavoritePlaceCard offer={mockOffer} />);
    render(preparedComponent);

    expect(screen.getByText('Premium')).toBeInTheDocument();
  });

  it('should not render "Premium" label if offer is not premium', () => {
    const mockOffer = makeFakeOffer();
    mockOffer.isPremium = false;

    const preparedComponent = withHistory(<FavoritePlaceCard offer={mockOffer} />);
    render(preparedComponent);

    expect(screen.queryByText('Premium')).not.toBeInTheDocument();
  });
});
