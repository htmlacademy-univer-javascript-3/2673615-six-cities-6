import { configureMockStore } from '@jedmao/redux-mock-store';
import { Action } from 'redux';
import { PayloadAction } from '@reduxjs/toolkit';
import thunk, { ThunkDispatch } from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import { createAPI } from '../service/api';
import { State } from '../types/store';
import {
  fetchOffersAction,
  fetchOfferAction,
  addReviewAction,
  fetchFavoriteOffersAction,
  changeFavoriteStatusAction,
  checkAuthAction,
  loginAction,
  logoutAction
} from './api-actions';
import { ApiRoute } from '../const';
import { redirectToRoute } from './actions';
import {
  makeFakeOffer,
  makeFakeReview,
  makeFakeAppUser,
  makeFakeStore
} from '../utils/mocks';
import { AppUser } from '../types/user';
import { Offer, OfferCards, Review } from '../types/offer';

describe('Async Actions', () => {
  const api = createAPI();
  const mockAxiosAdapter = new MockAdapter(api);
  const middleware = [thunk.withExtraArgument(api)];
  const mockStoreCreator = configureMockStore<State, Action<string>, ThunkDispatch<State, typeof api, Action>>(middleware);
  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator(makeFakeStore());
  });

  describe('fetchOffersAction', () => {
    it('should dispatch "fetchOffersAction.pending" and "fetchOffersAction.fulfilled" when server response 200', async () => {
      const mockOffers = [makeFakeOffer()];
      mockAxiosAdapter.onGet(ApiRoute.Offers).reply(200, mockOffers);

      await store.dispatch(fetchOffersAction());

      const actions = store.getActions();
      const extractedActionsTypes = actions.map((action) => action.type);
      const fulfilledAction = actions.find((action) => action.type === fetchOffersAction.fulfilled.type) as PayloadAction<OfferCards>;

      expect(extractedActionsTypes).toEqual([
        fetchOffersAction.pending.type,
        fetchOffersAction.fulfilled.type,
      ]);
      expect(fulfilledAction.payload).toEqual(mockOffers);
    });

    it('should dispatch "fetchOffersAction.pending" and "fetchOffersAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onGet(ApiRoute.Offers).reply(400, []);

      await store.dispatch(fetchOffersAction());

      const actions = store.getActions();
      const extractedActionsTypes = actions.map((action) => action.type);

      expect(extractedActionsTypes).toEqual([
        fetchOffersAction.pending.type,
        fetchOffersAction.rejected.type,
      ]);
    });
  });

  describe('fetchOfferAction', () => {
    const offerId = '1';

    it('should dispatch "fetchOfferAction.pending" and "fetchOfferAction.fulfilled" with all data', async () => {
      const mockOffer = makeFakeOffer();
      const mockNearby = [makeFakeOffer()];
      const mockReviews = [makeFakeReview()];

      mockAxiosAdapter.onGet(`${ApiRoute.Offers}/${offerId}`).reply(200, mockOffer);
      mockAxiosAdapter.onGet(`${ApiRoute.Offers}/${offerId}/nearby`).reply(200, mockNearby);
      mockAxiosAdapter.onGet(`${ApiRoute.Reviews}/${offerId}`).reply(200, mockReviews);

      await store.dispatch(fetchOfferAction(offerId));

      const actions = store.getActions();
      const extractedActionsTypes = actions.map((action) => action.type);

      const fulfilledAction = actions.find((action) => action.type === fetchOfferAction.fulfilled.type) as PayloadAction<{
        offer: Offer;
        nearbyOffers: OfferCards;
        reviews: Review[];
      }>;

      expect(extractedActionsTypes).toEqual([
        fetchOfferAction.pending.type,
        fetchOfferAction.fulfilled.type,
      ]);

      expect(fulfilledAction.payload).toEqual({
        offer: mockOffer,
        nearbyOffers: mockNearby,
        reviews: mockReviews,
      });
    });
  });

  describe('addReviewAction', () => {
    it('should dispatch pending and fulfilled when post is successful', async () => {
      const mockReview = makeFakeReview();
      const reviewData = { offerId: '1', comment: 'test', rating: 5 };

      mockAxiosAdapter.onPost(`${ApiRoute.Reviews}/${reviewData.offerId}`).reply(200, mockReview);

      await store.dispatch(addReviewAction(reviewData));

      const actions = store.getActions();
      const extractedActionsTypes = actions.map((action) => action.type);
      const fulfilledAction = actions.find((action) => action.type === addReviewAction.fulfilled.type) as PayloadAction<Review>;

      expect(extractedActionsTypes).toEqual([
        addReviewAction.pending.type,
        addReviewAction.fulfilled.type,
      ]);
      expect(fulfilledAction.payload).toEqual(mockReview);
    });
  });

  describe('fetchFavoriteOffersAction', () => {
    it('should dispatch pending and fulfilled with favorites list', async () => {
      const mockFavorites = [makeFakeOffer()];
      mockAxiosAdapter.onGet(ApiRoute.Favorite).reply(200, mockFavorites);

      await store.dispatch(fetchFavoriteOffersAction());

      const actions = store.getActions();
      const extractedActionsTypes = actions.map((action) => action.type);
      const fulfilledAction = actions.find((action) => action.type === fetchFavoriteOffersAction.fulfilled.type) as PayloadAction<OfferCards>;

      expect(extractedActionsTypes).toEqual([
        fetchFavoriteOffersAction.pending.type,
        fetchFavoriteOffersAction.fulfilled.type,
      ]);
      expect(fulfilledAction.payload).toEqual(mockFavorites);
    });
  });

  describe('changeFavoriteStatusAction', () => {
    it('should dispatch pending and fulfilled when status changed', async () => {
      const mockOffer = makeFakeOffer();
      const changeData = { offerId: '1', status: 1 };

      mockAxiosAdapter.onPost(`${ApiRoute.Favorite}/${changeData.offerId}/${changeData.status}`).reply(200, mockOffer);

      await store.dispatch(changeFavoriteStatusAction(changeData));

      const actions = store.getActions();
      const extractedActionsTypes = actions.map((action) => action.type);
      const fulfilledAction = actions.find((action) => action.type === changeFavoriteStatusAction.fulfilled.type) as PayloadAction<Offer>;

      expect(extractedActionsTypes).toEqual([
        changeFavoriteStatusAction.pending.type,
        changeFavoriteStatusAction.fulfilled.type,
      ]);
      expect(fulfilledAction.payload).toEqual(mockOffer);
    });
  });

  describe('checkAuthAction', () => {
    it('should dispatch "checkAuthAction.pending", "fetchFavoriteOffersAction.pending" and "checkAuthAction.fulfilled" when user is authorized', async () => {
      const mockUser = makeFakeAppUser();
      mockAxiosAdapter.onGet(ApiRoute.Login).reply(200, mockUser);

      await store.dispatch(checkAuthAction());

      const actions = store.getActions();
      const extractedActionsTypes = actions.map((action) => action.type);
      const fulfilledAction = actions.find((action) => action.type === checkAuthAction.fulfilled.type) as PayloadAction<AppUser>;

      expect(extractedActionsTypes).toEqual([
        checkAuthAction.pending.type,
        fetchFavoriteOffersAction.pending.type,
        checkAuthAction.fulfilled.type,
      ]);
      expect(fulfilledAction.payload).toEqual(mockUser);
    });

    it('should dispatch "checkAuthAction.pending" and "checkAuthAction.rejected" when user is not authorized', async () => {
      mockAxiosAdapter.onGet(ApiRoute.Login).reply(401);

      await store.dispatch(checkAuthAction());

      const actions = store.getActions();
      const extractedActionsTypes = actions.map((action) => action.type);

      expect(extractedActionsTypes).toEqual([
        checkAuthAction.pending.type,
        checkAuthAction.rejected.type,
      ]);
    });
  });

  describe('loginAction', () => {
    it('should dispatch login pending, data fetching pending actions, redirect and login fulfilled', async () => {
      const mockUser = makeFakeAppUser();
      const loginData = { email: 'test@test.ru', password: '123' };

      mockAxiosAdapter.onPost(ApiRoute.Login).reply(200, mockUser);

      await store.dispatch(loginAction(loginData));

      const actions = store.getActions();
      const extractedActionsTypes = actions.map((action) => action.type);
      const fulfilledAction = actions.find((action) => action.type === loginAction.fulfilled.type) as PayloadAction<AppUser>;

      expect(extractedActionsTypes).toEqual([
        loginAction.pending.type,
        fetchOffersAction.pending.type,
        fetchFavoriteOffersAction.pending.type,
        redirectToRoute.type,
        loginAction.fulfilled.type,
      ]);
      expect(fulfilledAction.payload).toEqual(mockUser);
    });
  });

  describe('logoutAction', () => {
    it('should dispatch "logoutAction.pending" and "logoutAction.fulfilled" when logout is successful', async () => {
      mockAxiosAdapter.onDelete(ApiRoute.Logout).reply(204);

      await store.dispatch(logoutAction());

      const actions = store.getActions();
      const extractedActionsTypes = actions.map((action) => action.type);

      expect(extractedActionsTypes).toEqual([
        logoutAction.pending.type,
        logoutAction.fulfilled.type,
      ]);
    });
  });
});
