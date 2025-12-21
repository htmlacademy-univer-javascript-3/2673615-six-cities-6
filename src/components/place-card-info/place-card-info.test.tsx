import { render, screen, act } from '@testing-library/react'; // Добавлен import act
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import PlaceCardInfo from './place-card-info';
import { makeFakeOffer, makeFakeStore } from '../../utils/mocks';
import { withHistory, withStore } from '../../utils/mock-component';
import { AuthStatus, AppRoute, NameSpace } from '../../const';
import { changeFavoriteStatusAction } from '../../store/api-actions';
import { ChangeFavoriteStatusData } from '../../types/offer';

describe('Component: PlaceCardInfo', () => {
  it('should render correctly', () => {
    const mockOffer = makeFakeOffer();
    const mockUrl = `/offer/${mockOffer.id}`;

    const { withStoreComponent } = withStore(
      <PlaceCardInfo offer={mockOffer} url={mockUrl} />,
      makeFakeStore({
        [NameSpace.User]: { authStatus: AuthStatus.NoAuth, appUser: null }
      })
    );
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByText(new RegExp(`€${mockOffer.price}`, 'i'))).toBeInTheDocument();
    expect(screen.getByText(mockOffer.title)).toBeInTheDocument();
    expect(screen.getByText(mockOffer.type)).toBeInTheDocument();

    const link = screen.getByRole('link', { name: mockOffer.title });
    expect(link).toHaveAttribute('href', mockUrl);
  });

  it('should render active bookmark button if offer is favorite', () => {
    const mockOffer = makeFakeOffer();
    mockOffer.isFavorite = true;

    const { withStoreComponent } = withStore(
      <PlaceCardInfo offer={mockOffer} url="#" />,
      makeFakeStore()
    );
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    const button = screen.getByRole('button');
    expect(button).toHaveClass('place-card__bookmark-button--active');
  });

  it('should dispatch "changeFavoriteStatusAction" when authorized user clicks bookmark button', async () => {
    const mockOffer = makeFakeOffer();
    mockOffer.isFavorite = false;

    const { withStoreComponent, mockStore } = withStore(
      <PlaceCardInfo offer={mockOffer} url="#" />,
      makeFakeStore({
        [NameSpace.User]: { authStatus: AuthStatus.Auth, appUser: null }
      })
    );
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    const button = screen.getByRole('button');
    await userEvent.click(button);

    const actions = mockStore.getActions();

    expect(actions[0].type).toBe(changeFavoriteStatusAction.pending.type);

    const pendingAction = actions[0] as { type: string; meta: { arg: ChangeFavoriteStatusData } };

    expect(pendingAction.meta.arg).toEqual({
      offerId: mockOffer.id,
      status: 1
    });
  });

  it('should redirect to login page when unauthorized user clicks bookmark button', async () => {
    const mockOffer = makeFakeOffer();
    const history = createMemoryHistory();

    const { withStoreComponent } = withStore(
      <PlaceCardInfo offer={mockOffer} url="#" />,
      makeFakeStore({
        [NameSpace.User]: { authStatus: AuthStatus.NoAuth, appUser: null }
      })
    );

    const preparedComponent = withHistory(withStoreComponent, history);

    render(preparedComponent);

    const button = screen.getByRole('button');

    await act(async () => {
      await userEvent.click(button);
    });

    expect(history.location.pathname).toBe(AppRoute.Login);
  });
});
