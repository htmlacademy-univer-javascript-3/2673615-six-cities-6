import { CITIES } from '../const';
import { Offers } from '../types/offer';


export const offers: Offers = [
  {
    id: 'de848aec-aaf9-4594-b7f0-c2c8945f9898',
    title: 'Beautiful & luxurious studio at great location',
    type: 'Apartment',
    price: 120,
    city: CITIES[3],
    location: {
      latitude: 52.3909553943508,
      longitude: 4.85309666406198,
      zoom: 16
    },
    isFavorite: true,
    isPremium: true,
    rating: 4.8,
    previewImage: 'img/apartment-01.jpg',
    description: 'Very very good place',
    bedrooms: 3,
    goods: ['Wi-Fi', 'Washing machine', 'Towels', 'Heating', 'Coffee machine', 'Baby seat', 'Kitchen', 'Dishwasher', 'Cable TV', 'Fridge'],
    host: {
      name: 'Angelina',
      avatarUrl: 'img/avatar-angelina.jpg',
      isPro: true
    },
    images: ['img/room.jpg', 'img/apartment-01.jpg', 'img/apartment-02.jpg', 'img/apartment-03.jpg', 'img/studio-01.jpg'],
    maxAdults: 4,
  },
  {
    id: '82dae9d9-ed35-44e5-ab1d-d88f667d841a',
    title: 'Wood and stone place',
    type: 'Apartment',
    price: 80,
    city: CITIES[3],
    location: {
      latitude: 52.3609553943508,
      longitude: 4.85309666406198,
      zoom: 16
    },
    isFavorite: true,
    isPremium: false,
    rating: 4,
    previewImage: 'img/room.jpg',
    description: 'Very very good place',
    bedrooms: 1,
    goods: ['Wi-Fi', 'Washing machine', 'Towels', 'Heating', 'Coffee machine', 'Baby seat', 'Kitchen', 'Dishwasher', 'Cable TV', 'Fridge'],
    host: {
      name: 'Eva',
      avatarUrl: 'img/avatar-angelina.jpg',
      isPro: false
    },
    images: ['img/room.jpg', 'img/apartment-01.jpg', 'img/apartment-02.jpg', 'img/apartment-03.jpg', 'img/studio-01.jpg'],
    maxAdults: 2,
  },
  {
    id: 'ac183d04-fd29-4e21-9d79-f271497d0369',
    title: 'Nice, cozy, warm big bed',
    type: 'Room',
    price: 150,
    city: CITIES[3],
    location: {
      latitude: 52.3909553943508,
      longitude: 4.929309666406198,
      zoom: 16
    },
    isFavorite: false,
    isPremium: false,
    rating: 3.5,
    previewImage: 'img/apartment-03.jpg',
    description: 'Very very good place',
    bedrooms: 2,
    goods: ['Wi-Fi', 'Washing machine', 'Towels', 'Heating', 'Coffee machine', 'Baby seat', 'Kitchen', 'Dishwasher', 'Cable TV', 'Fridge'],
    host: {
      name: 'Eva',
      avatarUrl: 'img/avatar-angelina.jpg',
      isPro: false
    },
    images: ['img/room.jpg', 'img/apartment-01.jpg', 'img/apartment-02.jpg', 'img/apartment-03.jpg', 'img/studio-01.jpg'],
    maxAdults: 4,
  },
  {
    id: '2df10e4b-4743-47e7-9739-38d30c3b6158',
    title: 'Nice!',
    type: 'Apartment',
    price: 30,
    city: CITIES[3],
    location: {
      latitude: 52.3809553943508,
      longitude: 4.939309666406198,
      zoom: 16
    },
    isFavorite: false,
    isPremium: true,
    rating: 3.2,
    previewImage: 'img/apartment-01.jpg',
    description: 'Very very good place',
    bedrooms: 1,
    goods: ['Wi-Fi', 'Washing machine', 'Towels', 'Heating', 'Coffee machine', 'Baby seat', 'Kitchen', 'Dishwasher', 'Cable TV', 'Fridge'],
    host: {
      name: 'Eva',
      avatarUrl: 'img/avatar-angelina.jpg',
      isPro: false
    },
    images: ['img/room.jpg', 'img/apartment-01.jpg', 'img/apartment-02.jpg', 'img/apartment-03.jpg', 'img/studio-01.jpg'],
    maxAdults: 2,
  }
];
