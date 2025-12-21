import { render, screen } from '@testing-library/react';
import ReviewItem from './review-item';
import { makeFakeReview } from '../../utils/mocks';

describe('Component: ReviewItem', () => {
  it('should render correctly', () => {
    const mockReview = makeFakeReview();

    render(<ReviewItem review={mockReview} />);

    expect(screen.getByText(mockReview.user.name)).toBeInTheDocument();
    expect(screen.getByText(mockReview.comment)).toBeInTheDocument();

    const avatar = screen.getByAltText('Reviews avatar');
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveAttribute('src', mockReview.user.avatarUrl);

    const dateElement = screen.getByText(/2023/i);
    expect(dateElement).toBeInTheDocument();
    expect(dateElement).toHaveAttribute('dateTime', mockReview.date.substring(0, 10));
  });

  it('should render rating stars correctly', () => {
    const mockReview = makeFakeReview();
    mockReview.rating = 4;

    render(<ReviewItem review={mockReview} />);

    const ratingStars = screen.getByText('Rating').previousElementSibling;
    expect(ratingStars).toHaveStyle('width: 80%');
  });
});
