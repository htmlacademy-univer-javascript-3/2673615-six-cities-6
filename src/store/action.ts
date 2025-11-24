import {createAction} from '@reduxjs/toolkit';
import { City, Offers } from '../types/offer';


export const changeCity = createAction<City>('app/changeCity');
export const loadOffers = createAction<Offers>('app/loadOffers');
