import { INITIAL_CITY } from '../const';
import {createReducer} from '@reduxjs/toolkit';
import { Offers } from '../types/offer';
import { changeCity, loadOffers } from './action';

const initialState = {
  city: INITIAL_CITY,
  offers: [] as Offers
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
    });
});
