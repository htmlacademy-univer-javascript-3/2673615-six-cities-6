import { render, screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import ReviewForm from './review-form';
import { withStore } from '../../utils/mock-component';
import { makeFakeStore } from '../../utils/mocks';
import { addReviewAction } from '../../store/api-actions';
import { NameSpace, MIN_REVIEW_LENGTH } from '../../const';

vi.mock('../../store/api-actions', async () => {
  const actual = await vi.importActual<typeof import('../../store/api-actions')>('../../store/api-actions');

  return {
    ...actual,
    addReviewAction: vi.fn((arg: unknown) => ({
      type: 'data/addReview/pending',
      meta: { arg },
      unwrap: () => Promise.resolve()
    }))
  };
});

describe('Component: ReviewForm', () => {
  const offerId = 'offer-1';

  it('should render correctly', () => {
    const { withStoreComponent } = withStore(<ReviewForm offerId={offerId} />, makeFakeStore());

    render(withStoreComponent);

    expect(screen.getByLabelText(/Your review/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Tell how was your stay/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Submit/i })).toBeInTheDocument();
  });

  it('should have submit button disabled initially', () => {
    const { withStoreComponent } = withStore(<ReviewForm offerId={offerId} />, makeFakeStore());

    render(withStoreComponent);

    expect(screen.getByRole('button', { name: /Submit/i })).toBeDisabled();
  });

  it('should enable submit button when form is valid', async () => {
    const user = userEvent.setup();
    const { withStoreComponent } = withStore(<ReviewForm offerId={offerId} />, makeFakeStore());

    render(withStoreComponent);

    const textArea = screen.getByPlaceholderText(/Tell how was your stay/i);
    const validText = 'a'.repeat(MIN_REVIEW_LENGTH);

    await act(async () => {
      await user.type(textArea, validText);
      await user.click(screen.getByTitle('perfect'));
    });

    expect(screen.getByRole('button', { name: /Submit/i })).toBeEnabled();
  });

  it('should keep submit button disabled if text is too short', async () => {
    const user = userEvent.setup();
    const { withStoreComponent } = withStore(<ReviewForm offerId={offerId} />, makeFakeStore());

    render(withStoreComponent);

    const textArea = screen.getByPlaceholderText(/Tell how was your stay/i);

    await act(async () => {
      await user.type(textArea, 'Short text');
      await user.click(screen.getByTitle('perfect'));
    });

    expect(screen.getByRole('button', { name: /Submit/i })).toBeDisabled();
  });

  it('should keep submit button disabled if rating is not selected', async () => {
    const user = userEvent.setup();
    const { withStoreComponent } = withStore(<ReviewForm offerId={offerId} />, makeFakeStore());

    render(withStoreComponent);

    const textArea = screen.getByPlaceholderText(/Tell how was your stay/i);
    const validText = 'a'.repeat(MIN_REVIEW_LENGTH);

    await act(async () => {
      await user.type(textArea, validText);
    });

    expect(screen.getByRole('button', { name: /Submit/i })).toBeDisabled();
  });

  it('should dispatch "addReviewAction" on submit and clear form', async () => {
    const user = userEvent.setup();
    const { withStoreComponent, mockStore } = withStore(<ReviewForm offerId={offerId} />, makeFakeStore());

    render(withStoreComponent);

    const textArea = screen.getByPlaceholderText(/Tell how was your stay/i);
    const validText = 'a'.repeat(MIN_REVIEW_LENGTH);

    await act(async () => {
      await user.type(textArea, validText);
      await user.click(screen.getByTitle('perfect'));
    });

    const submitButton = screen.getByRole('button', { name: /Submit/i });

    await act(async () => {
      await user.click(submitButton);
    });

    expect(addReviewAction).toHaveBeenCalledWith({
      offerId,
      rating: 5,
      comment: validText
    });

    const actions = mockStore.getActions();
    expect(actions[0].type).toBe('data/addReview/pending');

    await waitFor(() => {
      expect(textArea).toHaveValue('');
    });
  });

  it('should disable submit button when review is posting', () => {
    const { withStoreComponent } = withStore(<ReviewForm offerId={offerId} />, makeFakeStore({
      [NameSpace.Data]: {
        isReviewPosting: true,
        offers: [],
        offer: null,
        nearbyOffers: [],
        reviews: [],
        isOffersLoading: false,
        isOfferLoading: false,
        favoriteOffers: []
      }
    }));

    render(withStoreComponent);

    expect(screen.getByRole('button', { name: /Submit/i })).toBeDisabled();
  });
});
