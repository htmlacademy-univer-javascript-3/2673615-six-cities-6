import { appData, AppData } from './data-process';
import {
  fetchOffersAction,
  fetchOfferAction,
  addReviewAction,
  changeFavoriteStatusAction,
  logoutAction,
  fetchFavoriteOffersAction
} from '../api-actions';
import { makeFakeOffer, makeFakeReview } from '../../utils/mocks';

describe('AppData Slice', () => {
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

  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const result = appData.reducer(initialState, emptyAction);
    expect(result).toEqual(initialState);
  });

  it('should return default initial state with undefined state', () => {
    const emptyAction = { type: '' };
    const result = appData.reducer(undefined, emptyAction);
    expect(result).toEqual(initialState);
  });

  describe('fetchOffersAction', () => {
    it('should set isOffersLoading to true on pending', () => {
      const result = appData.reducer(undefined, fetchOffersAction.pending('', undefined));
      expect(result.isOffersLoading).toBe(true);
    });

    it('should set offers and isOffersLoading to false on fulfilled', () => {
      const mockOffers = [makeFakeOffer()];
      const result = appData.reducer(undefined, fetchOffersAction.fulfilled(mockOffers, '', undefined));

      expect(result.offers).toEqual(mockOffers);
      expect(result.isOffersLoading).toBe(false);
    });

    it('should set isOffersLoading to false on rejected', () => {
      const result = appData.reducer(undefined, fetchOffersAction.rejected(null, '', undefined));
      expect(result.isOffersLoading).toBe(false);
    });
  });

  describe('fetchOfferAction', () => {
    const offerId = '1';

    it('should set isOfferLoading to true on pending', () => {
      const result = appData.reducer(undefined, fetchOfferAction.pending('', offerId));
      expect(result.isOfferLoading).toBe(true);
    });

    it('should set offer details and isOfferLoading to false on fulfilled', () => {
      const mockOffer = makeFakeOffer();
      const mockNearby = [makeFakeOffer()];
      const mockReviews = [makeFakeReview()];

      const payload = {
        offer: mockOffer,
        nearbyOffers: mockNearby,
        reviews: mockReviews
      };

      const result = appData.reducer(undefined, fetchOfferAction.fulfilled(payload, '', offerId));

      expect(result.offer).toEqual(mockOffer);
      expect(result.nearbyOffers).toEqual(mockNearby);
      expect(result.reviews).toEqual(mockReviews);
      expect(result.isOfferLoading).toBe(false);
    });

    it('should set isOfferLoading to false on rejected', () => {
      const result = appData.reducer(undefined, fetchOfferAction.rejected(null, '', offerId));
      expect(result.isOfferLoading).toBe(false);
    });
  });

  describe('addReviewAction', () => {
    const reviewData = { offerId: '1', comment: 'Test', rating: 5 };

    it('should set isReviewPosting to true on pending', () => {
      const result = appData.reducer(undefined, addReviewAction.pending('', reviewData));
      expect(result.isReviewPosting).toBe(true);
    });

    it('should add review and set isReviewPosting to false on fulfilled', () => {
      const newReview = makeFakeReview();
      const stateWithReviews = { ...initialState, reviews: [] };

      const result = appData.reducer(stateWithReviews, addReviewAction.fulfilled(newReview, '', reviewData));

      expect(result.reviews).toHaveLength(1);
      expect(result.reviews[0]).toEqual(newReview);
      expect(result.isReviewPosting).toBe(false);
    });

    it('should set isReviewPosting to false on rejected', () => {
      const result = appData.reducer(undefined, addReviewAction.rejected(null, '', reviewData));
      expect(result.isReviewPosting).toBe(false);
    });
  });

  describe('changeFavoriteStatusAction', () => {
    const statusData = { offerId: '1', status: 1 };

    it('should update offer favorite status and favorite list on fulfilled', () => {
      const offer = makeFakeOffer();
      offer.isFavorite = false;
      const updatedOffer = { ...offer, isFavorite: true };

      const state = {
        ...initialState,
        offers: [offer],
        offer: offer,
        favoriteOffers: []
      };

      const result = appData.reducer(state, changeFavoriteStatusAction.fulfilled(updatedOffer, '', statusData));

      expect(result.offers[0].isFavorite).toBe(true);
      expect(result.offer?.isFavorite).toBe(true);
      expect(result.favoriteOffers).toHaveLength(1);
      expect(result.favoriteOffers[0]).toEqual(updatedOffer);
    });

    it('should remove offer from favorite list if status is 0', () => {
      const favOffer = { ...makeFakeOffer(), isFavorite: true };
      const updatedOffer = { ...favOffer, isFavorite: false };
      const removeStatusData = { offerId: '1', status: 0 };

      const state = {
        ...initialState,
        favoriteOffers: [favOffer]
      };

      const result = appData.reducer(state, changeFavoriteStatusAction.fulfilled(updatedOffer, '', removeStatusData));

      expect(result.favoriteOffers).toHaveLength(0);
    });
  });

  describe('logoutAction', () => {
    it('should clear favorites and reset flags on fulfilled', () => {
      const favOffer = { ...makeFakeOffer(), isFavorite: true };
      const state = {
        ...initialState,
        favoriteOffers: [favOffer],
        offers: [favOffer]
      };

      const result = appData.reducer(state, logoutAction.fulfilled(undefined, '', undefined));

      expect(result.favoriteOffers).toEqual([]);
      expect(result.offers[0].isFavorite).toBe(false);
    });
  });

  describe('fetchFavoriteOffersAction', () => {
    it('should update favoriteOffers on fulfilled', () => {
      const mockFavorites = [makeFakeOffer()];
      const result = appData.reducer(undefined, fetchFavoriteOffersAction.fulfilled(mockFavorites, '', undefined));

      expect(result.favoriteOffers).toEqual(mockFavorites);
    });
  });
});
