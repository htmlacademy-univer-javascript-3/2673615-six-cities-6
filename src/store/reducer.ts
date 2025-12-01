import { INITIAL_CITY, SortingOption } from '../const';
import {createReducer} from '@reduxjs/toolkit';
import { OfferCards, Reviews } from '../types/offer';
import { changeCity, loadOffers, loadReviews, setOffersLoadingStatus, setSortingOption } from './actions';

const initialState = {
  city: INITIAL_CITY,
  offers: [] as OfferCards,
  reviews: [] as Reviews,
  sortingOption: SortingOption.Popular,
  isOffersLoading: false
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
    })
    .addCase(setSortingOption, (state, action) => {
      state.sortingOption = action.payload;
    })
    .addCase(setOffersLoadingStatus, (state, action) => {
      state.isOffersLoading = action.payload;
    });
});
