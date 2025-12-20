import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { AppDispatch, State } from '../types/store';
import { ApiRoute, AppRoute } from '../const';
import { ChangeFavoriteStatusData, Offer, OfferCards, Review, ReviewData } from '../types/offer';
import { AppUser, AppUserLoginData } from '../types/user';
import { saveToken, dropToken } from '../service/token';
import { redirectToRoute } from './actions';

export const fetchOffersAction = createAsyncThunk<OfferCards, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOffers',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<OfferCards>(ApiRoute.Offers);
    return data;
  },
);

export const fetchOfferAction = createAsyncThunk<{
  offer: Offer;
  nearbyOffers: OfferCards;
  reviews: Review[];
}, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOffer',
  async (offerId, { extra: api }) => {
    const [offerResponse, nearbyOffersResponse, reviewsResponse] = await Promise.all([
      api.get<Offer>(`${ApiRoute.Offers}/${offerId}`),
      api.get<OfferCards>(`${ApiRoute.Offers}/${offerId}/nearby`),
      api.get<Review[]>(`${ApiRoute.Reviews}/${offerId}`)
    ]);

    return {
      offer: offerResponse.data,
      nearbyOffers: nearbyOffersResponse.data,
      reviews: reviewsResponse.data,
    };
  },
);

export const addReviewAction = createAsyncThunk<Review, ReviewData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/addReview',
  async ({ offerId, ...reviewDataWithoutOfferId }, { extra: api }) => {
    const { data } = await api.post<Review>(
      `${ApiRoute.Reviews}/${offerId}`,
      reviewDataWithoutOfferId
    );
    return data;
  },
);

export const fetchFavoriteOffersAction = createAsyncThunk<OfferCards, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchFavoriteOffers',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<OfferCards>(ApiRoute.Favorite);
    return data;
  },
);

export const changeFavoriteStatusAction = createAsyncThunk<Offer, ChangeFavoriteStatusData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/changeFavoriteStatus',
  async ({offerId, status}, {extra: api}) => {
    const {data} = await api.post<Offer>(`${ApiRoute.Favorite}/${offerId}/${status}`);
    return data;
  },
);

export const checkAuthAction = createAsyncThunk<AppUser, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, { dispatch, extra: api }) => {
    const { data } = await api.get<AppUser>(ApiRoute.Login);

    dispatch(fetchFavoriteOffersAction());
    return data;
  },
);

export const loginAction = createAsyncThunk<AppUser, AppUserLoginData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/login',
  async (loginData, { dispatch, extra: api }) => {
    const { data } = await api.post<AppUser>(ApiRoute.Login, loginData);
    saveToken(data.token);

    dispatch(fetchOffersAction());
    dispatch(fetchFavoriteOffersAction());

    dispatch(redirectToRoute(AppRoute.Root));
    return data;
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_arg, { extra: api }) => {
    await api.delete(ApiRoute.Logout);
    dropToken();
  },
);
