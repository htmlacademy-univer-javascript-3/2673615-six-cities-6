import { render, screen } from '@testing-library/react';
import OfferGallery from './offer-gallery';

describe('Component: OfferGallery', () => {
  it('should render correct number of images with correct attributes', () => {
    const mockImages = ['img/1.jpg', 'img/2.jpg', 'img/3.jpg'];

    render(<OfferGallery images={mockImages} />);

    const images = screen.getAllByAltText('Photo studio');

    expect(images).toHaveLength(mockImages.length);
    mockImages.forEach((src, index) => {
      expect(images[index]).toHaveAttribute('src', src);
    });
  });

  it('should render empty gallery if no images provided', () => {
    render(<OfferGallery images={[]} />);

    const images = screen.queryAllByAltText('Photo studio');
    expect(images).toHaveLength(0);
  });
});
