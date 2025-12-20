import { createSlice } from '@reduxjs/toolkit';
import { Offer, OfferCards, Reviews } from '../../types/offer';
import {
  fetchOffersAction,
  fetchOfferAction,
  addReviewAction,
  fetchFavoriteOffersAction,
  changeFavoriteStatusAction,
  logoutAction
} from '../api-actions';
import { NameSpace } from '../../const';

export type AppData = {
  offers: OfferCards;
  offer: Offer | null;
  nearbyOffers: OfferCards;
  reviews: Reviews;
  isOffersLoading: boolean;
  isOfferLoading: boolean;
  isReviewPosting: boolean;
  favoriteOffers: OfferCards;
};

const initialState: AppData = {
  offers: [],
  offer: null,
  nearbyOffers: [],
  reviews: [],
  isOffersLoading: false,
  isOfferLoading: false,
  isReviewPosting: false,
  favoriteOffers: []
};

export const appData = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOffersAction.pending, (state) => {
        state.isOffersLoading = true;
      })
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.isOffersLoading = false;
      })
      .addCase(fetchOffersAction.rejected, (state) => {
        state.isOffersLoading = false;
      })
      .addCase(fetchOfferAction.pending, (state) => {
        state.isOfferLoading = true;
      })
      .addCase(fetchOfferAction.fulfilled, (state, action) => {
        state.offer = action.payload.offer;
        state.nearbyOffers = action.payload.nearbyOffers;
        state.reviews = action.payload.reviews;
        state.isOfferLoading = false;
      })
      .addCase(fetchOfferAction.rejected, (state) => {
        state.isOfferLoading = false;
      })
      .addCase(addReviewAction.pending, (state) => {
        state.isReviewPosting = true;
      })
      .addCase(addReviewAction.fulfilled, (state, action) => {
        state.reviews.push(action.payload);
        state.isReviewPosting = false;
      })
      .addCase(addReviewAction.rejected, (state) => {
        state.isReviewPosting = false;
      })
      .addCase(fetchFavoriteOffersAction.fulfilled, (state, action) => {
        state.favoriteOffers = action.payload;
      })
      .addCase(changeFavoriteStatusAction.fulfilled, (state, action) => {
        const updatedOffer = action.payload;

        state.offers = state.offers.map((offer) =>
          offer.id === updatedOffer.id ? {...offer, isFavorite: updatedOffer.isFavorite} : offer
        );
        state.nearbyOffers = state.nearbyOffers.map((offer) =>
          offer.id === updatedOffer.id ? {...offer, isFavorite: updatedOffer.isFavorite} : offer
        );

        if (state.offer && state.offer.id === updatedOffer.id) {
          state.offer.isFavorite = updatedOffer.isFavorite;
        }

        if (updatedOffer.isFavorite) {
          state.favoriteOffers.push(updatedOffer);
        } else {
          state.favoriteOffers = state.favoriteOffers.filter((offer) => offer.id !== updatedOffer.id);
        }
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.favoriteOffers = [];
        if (state.offer) {
          state.offer.isFavorite = false;
        }

        state.offers.forEach((offer) => {
          offer.isFavorite = false;
        });
        state.nearbyOffers.forEach((offer) => {
          offer.isFavorite = false;
        });
      });
  },
});
