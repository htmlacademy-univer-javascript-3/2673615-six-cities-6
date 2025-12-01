import {createAction} from '@reduxjs/toolkit';
import { City, OfferCards, Reviews } from '../types/offer';
import { AuthStatus, SortingOption } from '../const';
import { AppUser } from '../types/user';


export const changeCity = createAction<City>('app/changeCity');
export const loadOffers = createAction<OfferCards>('app/loadOffers');
export const loadReviews = createAction<Reviews>('app/loadReviews');
export const setSortingOption = createAction<SortingOption>('app/setSortingOption');
export const setOffersLoadingStatus = createAction<boolean>('app/setOffersLoadingStatus');

export const requireAuthorization = createAction<AuthStatus>('appUser/requireAuthorization');
export const setAppUser = createAction<AppUser | null>('appUser/setr');
