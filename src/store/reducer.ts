import { AuthStatus, INITIAL_CITY, SortingOption } from '../const';
import {createReducer} from '@reduxjs/toolkit';
import { City, Offer, OfferCards, Reviews } from '../types/offer';
import { changeCity, loadOffer, loadOffers, loadReviews, requireAuthorization, setAppUser, setOfferLoadingStatus, setOffersLoadingStatus, setSortingOption } from './actions';
import { AppUser } from '../types/user';

type InitialState = {
  city: City;
  offers: OfferCards;
  offer: Offer | null;
  reviews: Reviews;
  sortingOption: SortingOption;
  isOffersLoading: boolean;
  authStatus: AuthStatus;
  appUser: AppUser | null;
  isOfferLoading: boolean;
}

const initialState : InitialState = {
  city: INITIAL_CITY,
  offers: [],
  offer: null,
  reviews: [],
  sortingOption: SortingOption.Popular,
  isOffersLoading: false,
  authStatus: AuthStatus.Unknown,
  appUser: null,
  isOfferLoading: false
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
    })
    .addCase(setAppUser, (state, action) => {
      state.appUser = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authStatus = action.payload;
    })
    .addCase(loadOffer, (state, action) => {
      state.offer = action.payload;
    })
    .addCase(setOfferLoadingStatus, (state, action) => {
      state.isOfferLoading = action.payload;
    });
});
