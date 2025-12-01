import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { AppDispatch, State } from '../types/store';
import { loadOffers, requireAuthorization, setAppUser, setOffersLoadingStatus } from './actions';
import { ApiRoute, AuthStatus } from '../const';
import { OfferCards } from '../types/offer';
import { AppUser } from '../types/user';

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
