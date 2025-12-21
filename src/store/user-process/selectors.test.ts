import { NameSpace, AuthStatus } from '../../const';
import { getAuthStatus, getAppUser } from './selectors';
import { makeFakeAppUser, makeFakeStore } from '../../utils/mocks';

describe('UserProcess Selectors', () => {
  it('should return authorization status from state', () => {
    const mockAuthStatus = AuthStatus.Auth;
    const state = makeFakeStore({
      [NameSpace.User]: {
        authStatus: mockAuthStatus,
        appUser: makeFakeAppUser(),
      }
    });

    const result = getAuthStatus(state);
    expect(result).toBe(mockAuthStatus);
  });

  it('should return user data from state', () => {
    const mockUser = makeFakeAppUser();
    const state = makeFakeStore({
      [NameSpace.User]: {
        authStatus: AuthStatus.Auth,
        appUser: mockUser,
      }
    });

    const result = getAppUser(state);
    expect(result).toEqual(mockUser);
  });
});
