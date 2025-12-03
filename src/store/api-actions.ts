import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { AppDispatch, State } from '../types/store';
import { addReview, loadNearbyOffers, loadOffer, loadOffers, loadReviews, redirectToRoute, requireAuthorization, setAppUser, setOfferLoadingStatus, setOffersLoadingStatus, setReviewPostingStatus } from './actions';
import { ApiRoute, AppRoute, AuthStatus } from '../const';
import { Offer, OfferCards, Review, ReviewData, Reviews } from '../types/offer';
import { AppUser, AppUserLoginData } from '../types/user';
import { dropToken, saveToken } from '../service/token';

export const fetchOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/getOffers',
  async (_arg, {dispatch, extra: api}) => {
    dispatch(setOffersLoadingStatus(true));
    const {data} = await api.get<OfferCards>(ApiRoute.Offers);
    dispatch(setOffersLoadingStatus(false));
    dispatch(loadOffers(data));
  },
);

export const fetchOfferAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/getOffer',
  async (offerId, {dispatch, extra: api}) => {
    try{
      dispatch(setOfferLoadingStatus(true));

      const [offerResponse, nearbyOffersResponse, reviewsResponse] = await Promise.all([
        api.get<Offer>(`${ApiRoute.Offers}/${offerId}`),
        api.get<OfferCards>(`${ApiRoute.Offers}/${offerId}/nearby`),
        api.get<Reviews>(`${ApiRoute.Reviews}/${offerId}`)
      ]);

      dispatch(loadOffer(offerResponse.data));
      dispatch(loadNearbyOffers(nearbyOffersResponse.data));
      dispatch(loadReviews(reviewsResponse.data));

    } finally{
      dispatch(setOfferLoadingStatus(false));
    }
  },
);

export const addReviewAction = createAsyncThunk<void, ReviewData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/addReview',
  async ({ offerId, ...reviewDataWithoutOfferId }, {dispatch, extra: api}) => {
    dispatch(setReviewPostingStatus(true));

    const {data} = await api.post<Review>(`${ApiRoute.Reviews}/${offerId}`, reviewDataWithoutOfferId);
    dispatch(addReview(data));

    dispatch(setReviewPostingStatus(false));
  },
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'appUser/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get<AppUser>(ApiRoute.Login);
      dispatch(requireAuthorization(AuthStatus.Auth));
      dispatch(setAppUser(data));
    } catch {
      dispatch(requireAuthorization(AuthStatus.NoAuth));
      dispatch(setAppUser(null));
    }
  },
);

export const loginAction = createAsyncThunk<void, AppUserLoginData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'appUser/login',
  async (loginData, {dispatch, extra: api}) => {
    const {data} = await api.post<AppUser>(ApiRoute.Login, loginData);
    saveToken(data.token);

    dispatch(requireAuthorization(AuthStatus.Auth));
    dispatch(setAppUser(data));
    dispatch(redirectToRoute(AppRoute.Root));
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'appUser/logout',
  async (_arg, {dispatch, extra: api}) => {
    await api.delete<AppUser>(ApiRoute.Logout);
    dropToken();

    dispatch(requireAuthorization(AuthStatus.NoAuth));
    dispatch(setAppUser(null));
  },
);

