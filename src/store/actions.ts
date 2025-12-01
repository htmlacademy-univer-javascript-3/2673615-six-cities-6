import {createAction} from '@reduxjs/toolkit';
import { City, OfferCards, Reviews } from '../types/offer';
import { SortingOption } from '../const';


export const changeCity = createAction<City>('app/changeCity');
export const loadOffers = createAction<OfferCards>('app/loadOffers');
export const loadReviews = createAction<Reviews>('app/loadReviews');
export const setSortingOption = createAction<SortingOption>('app/setSortingOption');

export const setOffersLoadingStatus = createAction<boolean>('app/setOffersLoadingStatus');
