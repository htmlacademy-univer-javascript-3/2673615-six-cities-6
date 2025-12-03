import {createAction} from '@reduxjs/toolkit';
import { City, Offer, OfferCards, Review, Reviews } from '../types/offer';
import { AppRoute, AuthStatus, SortingOption } from '../const';
import { AppUser } from '../types/user';


export const changeCity = createAction<City>('app/changeCity');
export const loadOffers = createAction<OfferCards>('app/loadOffers');
export const loadReviews = createAction<Reviews>('app/loadReviews');
export const setSortingOption = createAction<SortingOption>('app/setSortingOption');
export const setOffersLoadingStatus = createAction<boolean>('app/setOffersLoadingStatus');
export const redirectToRoute = createAction<AppRoute>('app/redirectToRoute');
export const setOfferLoadingStatus = createAction<boolean>('app/setOfferLoadingStatus');
export const loadOffer = createAction<Offer>('app/loadOffer');
export const loadNearbyOffers = createAction<OfferCards>('app/loadNearbyOffers');
export const addReview = createAction<Review>('app/addReview');
export const setReviewPostingStatus = createAction<boolean>('app/setReviewPostingStatus');

export const requireAuthorization = createAction<AuthStatus>('appUser/requireAuthorization');
export const setAppUser = createAction<AppUser | null>('appUser/set');
