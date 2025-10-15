import { Offers } from '../types/offer';

export const offers: Offers = [
  {
    id: 'de848aec-aaf9-4594-b7f0-c2c8945f9898',
    title: 'Beautiful & luxurious studio at great location',
    placeType: 'Apartment',
    location: 'Amsterdam',
    isPremium: false,
    isFavorite: false,
    rating: 4.8,
    price: 120,
    bedrooms: 3,
    maxAdults: 4,
    previewImage: {
      'src': 'img/apartment-01.jpg'
    },
    images: [
      {
        'src': 'img/room.jpg'
      },
      {
        'src': 'img/apartment-01.jpg'
      },
      {
        'src': 'img/apartment-02.jpg'
      },
      {
        'src': 'img/apartment-03.jpg'
      },
      {
        'src': 'img/studio-01.jpg'
      }
    ],
    insideItems: ['Wi-Fi', 'Washing machine', 'Towels', 'Heating', 'Coffee machine', 'Baby seat', 'Kitchen', 'Dishwasher', 'Cable TV', 'Fridge'],
    host: {
      name: 'Angelina',
      avatarSrc: 'img/avatar-angelina.jpg',
      isPro: true
    }
  }
];
