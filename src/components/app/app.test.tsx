import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import App from './app';
import { AuthStatus, AppRoute, NameSpace } from '../../const';
import browserHistory from '../../browser-history';
import { makeFakeStore } from '../../utils/mocks';
import { withStore } from '../../utils/mock-component';

vi.mock('../../pages/main-page/main-page', () => ({ default: () => <div>Main Page</div> }));
vi.mock('../../pages/login-page/login-page', () => ({ default: () => <div>Login Page</div> }));
vi.mock('../../pages/favorites-page/favorites-page', () => ({ default: () => <div>Favorites Page</div> }));
vi.mock('../../pages/offer-page/offer-page', () => ({ default: () => <div>Offer Page</div> }));
vi.mock('../../pages/not-found-page/not-found-page', () => ({ default: () => <div>Not Found Page</div> }));
vi.mock('../loader/loader', () => ({ default: () => <div>Loading Screen</div> }));
vi.mock('react-toastify', () => ({ ToastContainer: () => <div>Toast Container</div> }));

describe('Application Routing', () => {
  beforeEach(() => {
    browserHistory.push(AppRoute.Root);
  });

  it('should render "Loading Screen" when application is loading', () => {
    const { withStoreComponent } = withStore(<App />, makeFakeStore({
      [NameSpace.Data]: {
        isOffersLoading: true,
        offers: [],
        offer: null,
        nearbyOffers: [],
        reviews: [],
        isOfferLoading: false,
        isReviewPosting: false,
        favoriteOffers: []
      },
      [NameSpace.User]: {
        authStatus: AuthStatus.Unknown,
        appUser: null,
      }
    }));

    render(withStoreComponent);

    expect(screen.getByText(/Loading Screen/i)).toBeInTheDocument();
  });

  it('should render "Main Page" when user navigates to "/"', () => {
    browserHistory.push(AppRoute.Root);

    const { withStoreComponent } = withStore(<App />, makeFakeStore({
      [NameSpace.User]: { authStatus: AuthStatus.NoAuth, appUser: null },
      [NameSpace.Data]: { isOffersLoading: false, offers: [], offer: null, nearbyOffers: [], reviews: [], isOfferLoading: false, isReviewPosting: false, favoriteOffers: [] }
    }));

    render(withStoreComponent);

    expect(screen.getByText(/Main Page/i)).toBeInTheDocument();
  });

  it('should render "Login Page" when user navigates to "/login"', () => {
    browserHistory.push(AppRoute.Login);

    const { withStoreComponent } = withStore(<App />, makeFakeStore({
      [NameSpace.User]: { authStatus: AuthStatus.NoAuth, appUser: null },
      [NameSpace.Data]: { isOffersLoading: false, offers: [], offer: null, nearbyOffers: [], reviews: [], isOfferLoading: false, isReviewPosting: false, favoriteOffers: [] }
    }));

    render(withStoreComponent);

    expect(screen.getByText(/Login Page/i)).toBeInTheDocument();
  });

  it('should render "Favorites Page" when authorized user navigates to "/favorites"', () => {
    browserHistory.push(AppRoute.Favorites);

    const { withStoreComponent } = withStore(<App />, makeFakeStore({
      [NameSpace.User]: { authStatus: AuthStatus.Auth, appUser: null },
      [NameSpace.Data]: { isOffersLoading: false, offers: [], offer: null, nearbyOffers: [], reviews: [], isOfferLoading: false, isReviewPosting: false, favoriteOffers: [] }
    }));

    render(withStoreComponent);

    expect(screen.getByText(/Favorites Page/i)).toBeInTheDocument();
  });

  it('should redirect to "Login Page" when unauthorized user navigates to "/favorites"', () => {
    browserHistory.push(AppRoute.Favorites);

    const { withStoreComponent } = withStore(<App />, makeFakeStore({
      [NameSpace.User]: { authStatus: AuthStatus.NoAuth, appUser: null },
      [NameSpace.Data]: { isOffersLoading: false, offers: [], offer: null, nearbyOffers: [], reviews: [], isOfferLoading: false, isReviewPosting: false, favoriteOffers: [] }
    }));

    render(withStoreComponent);

    expect(screen.getByText(/Login Page/i)).toBeInTheDocument();
  });

  it('should render "Offer Page" when user navigates to "/offer/:id"', () => {
    browserHistory.push(`${AppRoute.Offer}/1`);

    const { withStoreComponent } = withStore(<App />, makeFakeStore({
      [NameSpace.User]: { authStatus: AuthStatus.NoAuth, appUser: null },
      [NameSpace.Data]: { isOffersLoading: false, offers: [], offer: null, nearbyOffers: [], reviews: [], isOfferLoading: false, isReviewPosting: false, favoriteOffers: [] }
    }));

    render(withStoreComponent);

    expect(screen.getByText(/Offer Page/i)).toBeInTheDocument();
  });

  it('should render "Not Found Page" when user navigates to non-existent route', () => {
    browserHistory.push('/non-existent-route');

    const { withStoreComponent } = withStore(<App />, makeFakeStore({
      [NameSpace.User]: { authStatus: AuthStatus.NoAuth, appUser: null },
      [NameSpace.Data]: { isOffersLoading: false, offers: [], offer: null, nearbyOffers: [], reviews: [], isOfferLoading: false, isReviewPosting: false, favoriteOffers: [] }
    }));

    render(withStoreComponent);

    expect(screen.getByText(/Not Found Page/i)).toBeInTheDocument();
  });
});
