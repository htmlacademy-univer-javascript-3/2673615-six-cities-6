import { User } from './user';

export type OfferCard = {
    id: string;
    title: string;
    type: string;
    price: number;
    city: City;
    location: Location;
    isFavorite: boolean;
    isPremium: boolean;
    rating: number;
    previewImage: string;
}

export type Offer = OfferCard & {
    description: string;
    bedrooms: number;
    goods: string[];
    host: User;
    images: string[];
    maxAdults: number;
};

export type Review = {
    id: string;
    offerId: string;
    date: string;
    user: User;
    comment: string;
    rating: number;
}

export type Location = {
    latitude: number;
    longitude: number;
    zoom: number;
}

export type City = {
    name: string;
    location: Location;
}

export type Offers = Offer[];
export type OfferCards = OfferCard[];
export type Reviews = Review[];
