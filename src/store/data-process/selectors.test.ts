import { NameSpace } from '../../const';
import {
  getOffers,
  getOffer,
  getNearbyOffers,
  getReviews,
  getIsOffersLoading,
  getIsOfferLoading,
  getIsReviewPosting,
  getFavoriteOffers
} from './selectors';
import { makeFakeOffer, makeFakeReview, makeFakeStore } from '../../utils/mocks';

describe('AppData Selectors', () => {
  const mockOffer = makeFakeOffer();
  const mockReviews = [makeFakeReview()];

  const state = makeFakeStore({
    [NameSpace.Data]: {
      offers: [mockOffer],
      offer: mockOffer,
      nearbyOffers: [mockOffer],
      reviews: mockReviews,
      isOffersLoading: true,
      isOfferLoading: true,
      isReviewPosting: true,
      favoriteOffers: [mockOffer]
    }
  });

  it('should return offers from state', () => {
    const { offers } = state[NameSpace.Data];
    const result = getOffers(state);
    expect(result).toEqual(offers);
  });

  it('should return offer from state', () => {
    const { offer } = state[NameSpace.Data];
    const result = getOffer(state);
    expect(result).toEqual(offer);
  });

  it('should return nearbyOffers from state', () => {
    const { nearbyOffers } = state[NameSpace.Data];
    const result = getNearbyOffers(state);
    expect(result).toEqual(nearbyOffers);
  });

  it('should return reviews from state', () => {
    const { reviews } = state[NameSpace.Data];
    const result = getReviews(state);
    expect(result).toEqual(reviews);
  });

  it('should return isOffersLoading status', () => {
    const { isOffersLoading } = state[NameSpace.Data];
    const result = getIsOffersLoading(state);
    expect(result).toBe(isOffersLoading);
  });

  it('should return isOfferLoading status', () => {
    const { isOfferLoading } = state[NameSpace.Data];
    const result = getIsOfferLoading(state);
    expect(result).toBe(isOfferLoading);
  });

  it('should return isReviewPosting status', () => {
    const { isReviewPosting } = state[NameSpace.Data];
    const result = getIsReviewPosting(state);
    expect(result).toBe(isReviewPosting);
  });

  it('should return favoriteOffers from state', () => {
    const { favoriteOffers } = state[NameSpace.Data];
    const result = getFavoriteOffers(state);
    expect(result).toEqual(favoriteOffers);
  });
});
