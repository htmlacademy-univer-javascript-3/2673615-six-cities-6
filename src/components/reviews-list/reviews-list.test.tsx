import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import ReviewList from './review-list';
import { makeFakeReview } from '../../utils/mocks';

vi.mock('../review-item/review-item', () => ({
  default: () => <li data-testid="review-item">Mock Review Item</li>
}));

describe('Component: ReviewList', () => {
  it('should render correctly with reviews', () => {
    const mockReviews = [
      makeFakeReview(),
      { ...makeFakeReview(), id: '2' }
    ];

    render(<ReviewList reviews={mockReviews} />);

    expect(screen.getByText(/Reviews/i)).toBeInTheDocument();
    expect(screen.getByText(mockReviews.length.toString())).toBeInTheDocument();
    expect(screen.getAllByTestId('review-item')).toHaveLength(mockReviews.length);
  });

  it('should render correct count when reviews array is empty', () => {
    render(<ReviewList reviews={[]} />);

    expect(screen.getByText('0')).toBeInTheDocument();
    expect(screen.queryAllByTestId('review-item')).toHaveLength(0);
  });
});
