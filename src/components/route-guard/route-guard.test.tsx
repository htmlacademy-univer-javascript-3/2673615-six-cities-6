import { render, screen } from '@testing-library/react';
import { Route, Routes } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import RouteGuard from './route-guard';
import { withHistory, withStore } from '../../utils/mock-component';
import { makeFakeStore } from '../../utils/mocks';
import { AppRoute, AuthStatus, NameSpace } from '../../const';

describe('Component: RouteGuard', () => {
  it('should render children when isPrivateRoute is true and user is authorized', () => {
    const expectedText = 'private route content';
    const { withStoreComponent } = withStore(
      <RouteGuard isPrivateRoute>
        <span>{expectedText}</span>
      </RouteGuard>,
      makeFakeStore({
        [NameSpace.User]: { authStatus: AuthStatus.Auth, appUser: null }
      })
    );

    render(withHistory(withStoreComponent));

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });

  it('should redirect to login when isPrivateRoute is true and user is not authorized', () => {
    const history = createMemoryHistory();
    history.push(AppRoute.Favorites);

    const { withStoreComponent } = withStore(
      <Routes>
        <Route path={AppRoute.Login} element={<span>Login Page</span>} />
        <Route
          path={AppRoute.Favorites}
          element={
            <RouteGuard isPrivateRoute>
              <span>Private Page</span>
            </RouteGuard>
          }
        />
      </Routes>,
      makeFakeStore({
        [NameSpace.User]: { authStatus: AuthStatus.NoAuth, appUser: null }
      })
    );

    render(withHistory(withStoreComponent, history));

    expect(screen.getByText(/Login Page/i)).toBeInTheDocument();
    expect(screen.queryByText(/Private Page/i)).not.toBeInTheDocument();
  });

  it('should render children when isPrivateRoute is false and user is not authorized', () => {
    const expectedText = 'public route content';
    const { withStoreComponent } = withStore(
      <RouteGuard isPrivateRoute={false}>
        <span>{expectedText}</span>
      </RouteGuard>,
      makeFakeStore({
        [NameSpace.User]: { authStatus: AuthStatus.NoAuth, appUser: null }
      })
    );

    render(withHistory(withStoreComponent));

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });

  it('should redirect to root when isPrivateRoute is false and user is authorized', () => {
    const history = createMemoryHistory();
    history.push(AppRoute.Login);

    const { withStoreComponent } = withStore(
      <Routes>
        <Route path={AppRoute.Root} element={<span>Main Page</span>} />
        <Route
          path={AppRoute.Login}
          element={
            <RouteGuard isPrivateRoute={false}>
              <span>Login Page</span>
            </RouteGuard>
          }
        />
      </Routes>,
      makeFakeStore({
        [NameSpace.User]: { authStatus: AuthStatus.Auth, appUser: null }
      })
    );

    render(withHistory(withStoreComponent, history));

    expect(screen.getByText(/Main Page/i)).toBeInTheDocument();
    expect(screen.queryByText(/Login Page/i)).not.toBeInTheDocument();
  });
});
