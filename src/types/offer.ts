import { Image, Images } from './common';


export type Offer = {
    id: string;
    title: string;
    placeType: string;
    isPremium: boolean;
    rating: number;
    price: number;
    bedrooms: number;
    maxAdults: number;
    previewImage: Image;
    images: Images;
    insideItems: string[];
    host: Host;
};

export type Host = {
    name: string;
    isPro: boolean;
    avatarSrc: string;
};

export type Offers = Offer[];
