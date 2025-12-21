import { MockStore, configureMockStore } from '@jedmao/redux-mock-store';
import { AnyAction } from '@reduxjs/toolkit';
import { vi } from 'vitest';
import { redirect } from './redirect';
import browserHistory from '../../browser-history';
import { redirectToRoute } from '../actions';
import { AppRoute } from '../../const';
import { State } from '../../types/store';

vi.mock('../../browser-history', () => ({
  default: {
    push: vi.fn(),
  }
}));

describe('Middleware: redirect', () => {
  let store: MockStore;

  beforeAll(() => {
    const middleware = [redirect];
    const mockStoreCreator = configureMockStore<State, AnyAction>(middleware);
    store = mockStoreCreator();
  });

  beforeEach(() => {
    store.clearActions();
    vi.clearAllMocks();
  });

  it('should redirect to "login" with redirectToRoute action', () => {
    const redirectAction = redirectToRoute(AppRoute.Login);

    store.dispatch(redirectAction);

    expect(browserHistory.push).toHaveBeenCalledWith(AppRoute.Login);
  });

  it('should not redirect with other actions', () => {
    const otherAction = { type: 'TEST_ACTION', payload: '/test' };

    store.dispatch(otherAction);

    expect(browserHistory.push).not.toHaveBeenCalled();
  });
});
