import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { AppDispatch, State } from '../types/store';
import { loadOffers, redirectToRoute, requireAuthorization, setAppUser, setOffersLoadingStatus } from './actions';
import { ApiRoute, AppRoute, AuthStatus } from '../const';
import { OfferCards } from '../types/offer';
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
  async ({email, password}, {dispatch, extra: api}) => {
    const {data} = await api.post<AppUser>(ApiRoute.Login, {email, password});
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

