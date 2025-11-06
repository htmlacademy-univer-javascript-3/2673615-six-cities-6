import leaflet from 'leaflet';
import { PlaceCardLocation } from './types/place-card';

export enum AppRoute {
  Root = '/',
  Login = '/login',
  Favorites = '/favorites',
  Offer = '/offer',
  NotFound = '*'
}

export enum AuthStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN'
}

export const DefaultCustomIcon = leaflet.icon({
  iconUrl: 'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

export const CurrentCustomIcon = leaflet.icon({
  iconUrl: 'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/main-pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

export const PlaceCardConfigData: Record<PlaceCardLocation, string> = {
  [PlaceCardLocation.MainPage]: 'cities',
  [PlaceCardLocation.OfferPage]: 'near-places'
};

export const MaxNearbyOffers = 3;

export const MaxRating = 5;
