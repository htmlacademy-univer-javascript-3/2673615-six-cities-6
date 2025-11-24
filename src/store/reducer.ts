import { INITIAL_CITY } from '../const';
import {createReducer} from '@reduxjs/toolkit';
import { Offers, Reviews } from '../types/offer';
import { changeCity, loadOffers, loadReviews } from './action';

const initialState = {
  city: INITIAL_CITY,
  offers: [] as Offers,
  reviews: [] as Reviews
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(loadReviews, (state, action) => {
      state.reviews = action.payload;
    });
});
