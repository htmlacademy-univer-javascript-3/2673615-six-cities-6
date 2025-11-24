import {createAction} from '@reduxjs/toolkit';
import { City, Offers, Reviews } from '../types/offer';


export const changeCity = createAction<City>('app/changeCity');
export const loadOffers = createAction<Offers>('app/loadOffers');
export const loadReviews = createAction<Reviews>('app/loadReviews');
