import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { AuthStatus, INITIAL_CITY, NameSpace, SortingOption } from '../const';
import { City, Offer, Review } from '../types/offer';
import { State } from '../types/store';
import { createAPI } from '../service/api';
import { AppUser } from '../types/user';

export type AppThunkDispatch = ThunkDispatch<State, ReturnType<typeof createAPI>, Action>;

export const makeFakeOffer = (overrides?: Partial<Offer>): Offer => ({
  id: '1',
  title: 'Beautiful apartment',
  type: 'apartment',
  price: 120,
  city: {
    name: 'Paris',
    location: { latitude: 48.8566, longitude: 2.3522, zoom: 10 }
  },
  location: { latitude: 48.8566, longitude: 2.3522, zoom: 10 },
  isFavorite: false,
  isPremium: false,
  rating: 4.8,
  description: 'A quiet place.',
  bedrooms: 3,
  goods: ['Heating'],
  host: {
    name: 'Angelina',
    avatarUrl: 'img/avatar.jpg',
    isPro: true
  },
  images: ['img/1.jpg'],
  maxAdults: 4,
  previewImage: 'img/preview.jpg',
  ...overrides
});

export const makeFakeReview = (): Review => ({
  id: '1',
  offerId: '2',
  date: '2023-05-05T12:00:00.000Z',
  user: {
    name: 'Max',
    avatarUrl: 'img/avatar.jpg',
    isPro: false
  },
  comment: 'Great place!',
  rating: 4
});

export const makeFakeStore = (initialState?: Partial<State>): State => ({
  [NameSpace.User]: {
    authStatus: AuthStatus.Unknown,
    appUser: null,
  },
  [NameSpace.Data]: {
    offers: [],
    offer: null,
    nearbyOffers: [],
    reviews: [],
    isOffersLoading: false,
    isOfferLoading: false,
    isReviewPosting: false,
    favoriteOffers: [],
  },
  [NameSpace.App]: {
    city: INITIAL_CITY,
    sortingOption: SortingOption.Popular,
  },
  ...initialState ?? {},
} as State);

export const makeFakeCity = (): City => ({
  name: 'Amsterdam',
  location: {
    latitude: 52.3740300,
    longitude: 4.8896900,
    zoom: 12
  }
});

export const makeFakeAppUser = (): AppUser => ({
  name: 'Oliver.conner',
  avatarUrl: 'https://url-to-image/image.jpg',
  isPro: false,
  email: 'oliver.conner@gmail.com',
  token: 'secret-token'
});
