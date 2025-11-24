import { MAX_RATING } from './const';

export const getRatingWidthPercentage = (rating: number): string => {
  if (rating < 0) {
    return '0%';
  }

  const ratingAsPercentage = Math.min(rating, MAX_RATING) * 20;
  return `${ratingAsPercentage}%`;
};
