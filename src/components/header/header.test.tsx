import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Header from './header';
import { AuthStatus, NameSpace } from '../../const';
import { makeFakeStore, makeFakeAppUser, makeFakeOffer } from '../../utils/mocks';
import { logoutAction } from '../../store/api-actions';
import { withHistory, withStore } from '../../utils/mock-component';

describe('Component: Header', () => {
  it('should render "Sign in" when user is not authorized', () => {
    const { withStoreComponent } = withStore(<Header />, makeFakeStore({
      [NameSpace.User]: {
        authStatus: AuthStatus.NoAuth,
        appUser: null,
      },
      [NameSpace.Data]: {
        favoriteOffers: [],
        offers: [],
        offer: null,
        nearbyOffers: [],
        reviews: [],
        isOffersLoading: false,
        isOfferLoading: false,
        isReviewPosting: false,
      }
    }));

    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByText(/Sign in/i)).toBeInTheDocument();
    expect(screen.queryByText(/Sign out/i)).not.toBeInTheDocument();
  });

  it('should render user info and "Sign out" when user is authorized', () => {
    const mockUser = makeFakeAppUser();
    const mockFavorites = [makeFakeOffer(), makeFakeOffer()];

    const { withStoreComponent } = withStore(<Header />, makeFakeStore({
      [NameSpace.User]: {
        authStatus: AuthStatus.Auth,
        appUser: mockUser,
      },
      [NameSpace.Data]: {
        favoriteOffers: mockFavorites,
        offers: [],
        offer: null,
        nearbyOffers: [],
        reviews: [],
        isOffersLoading: false,
        isOfferLoading: false,
        isReviewPosting: false,
      }
    }));

    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByText(mockUser.email)).toBeInTheDocument();
    expect(screen.getByText(mockFavorites.length.toString())).toBeInTheDocument();
    expect(screen.getByText(/Sign out/i)).toBeInTheDocument();
  });

  it('should dispatch "logoutAction" when clicking "Sign out"', async () => {
    const mockUser = makeFakeAppUser();

    const { withStoreComponent, mockStore } = withStore(<Header />, makeFakeStore({
      [NameSpace.User]: {
        authStatus: AuthStatus.Auth,
        appUser: mockUser,
      }
    }));

    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    await userEvent.click(screen.getByText(/Sign out/i));

    const actions = mockStore.getActions();
    expect(actions[0].type).toBe(logoutAction.pending.type);
  });
});
