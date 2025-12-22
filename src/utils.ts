import { CITIES, MAX_RATING } from './const';

export const getRatingWidthPercentage = (rating: number): string => {
  if (rating < 0) {
    return '0%';
  }

  const ratingAsPercentage = Math.min(Math.round(rating), MAX_RATING) * 20;
  return `${ratingAsPercentage}%`;
};

export const getPluralizedText = (word: string, count: number) => {
  const suffix = count > 1 ? 's' : '';

  return `${count} ${word}${suffix}`;
};

export const getRandomCityName = () => {
  const randomIndex = Math.floor(Math.random() * CITIES.length);
  return CITIES[randomIndex];
};
