import { MaxRating } from './const';

export const getRatingWidthPercentage = (rating: number): string => {
  if (rating < 0) {
    return '0%';
  }

  const ratingAsPercentage = Math.min(rating, MaxRating) * 20;
  return `${ratingAsPercentage}%`;
};
