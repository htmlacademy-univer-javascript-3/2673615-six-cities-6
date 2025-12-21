import { render, screen } from '@testing-library/react';
import GoodsList from './goods-list';

describe('Component: GoodsList', () => {
  it('should render correctly with goods', () => {
    const mockGoods = ['Wi-Fi', 'Heating', 'Kitchen', 'Cable TV'];

    render(<GoodsList goods={mockGoods} />);

    expect(screen.getByText(/What's inside/i)).toBeInTheDocument();

    mockGoods.forEach((good) => {
      expect(screen.getByText(good)).toBeInTheDocument();
    });

    const listItems = screen.getAllByRole('listitem');
    expect(listItems).toHaveLength(mockGoods.length);

    expect(listItems[0]).toHaveClass('offer__inside-item');
  });

  it('should render empty list if goods array is empty', () => {
    render(<GoodsList goods={[]} />);

    expect(screen.getByText(/What's inside/i)).toBeInTheDocument();

    const listItems = screen.queryAllByRole('listitem');
    expect(listItems).toHaveLength(0);
  });
});
