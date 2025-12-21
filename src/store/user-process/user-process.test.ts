import { userProcess, UserProcess } from './user-process';
import { checkAuthAction, loginAction, logoutAction } from '../api-actions';
import { AuthStatus } from '../../const';
import { makeFakeAppUser } from '../../utils/mocks';

describe('UserProcess Slice', () => {
  const initialState: UserProcess = {
    authStatus: AuthStatus.Unknown,
    appUser: null,
  };

  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const result = userProcess.reducer(initialState, emptyAction);
    expect(result).toEqual(initialState);
  });

  it('should return default initial state with undefined state', () => {
    const emptyAction = { type: '' };
    const result = userProcess.reducer(undefined, emptyAction);
    expect(result).toEqual(initialState);
  });

  describe('checkAuthAction', () => {
    it('should set "Auth" status and user data on fulfilled', () => {
      const mockUser = makeFakeAppUser();
      const expectedState = {
        authStatus: AuthStatus.Auth,
        appUser: mockUser,
      };

      const result = userProcess.reducer(undefined, checkAuthAction.fulfilled(mockUser, '', undefined));
      expect(result).toEqual(expectedState);
    });

    it('should set "NoAuth" status and null user on rejected', () => {
      const expectedState = {
        authStatus: AuthStatus.NoAuth,
        appUser: null,
      };

      const result = userProcess.reducer(undefined, checkAuthAction.rejected(null, '', undefined));
      expect(result).toEqual(expectedState);
    });
  });

  describe('loginAction', () => {
    const loginData = { email: 'test@test.ru', password: '123' };

    it('should set "Auth" status and user data on fulfilled', () => {
      const mockUser = makeFakeAppUser();
      const expectedState = {
        authStatus: AuthStatus.Auth,
        appUser: mockUser,
      };

      const result = userProcess.reducer(undefined, loginAction.fulfilled(mockUser, '', loginData));
      expect(result).toEqual(expectedState);
    });

    it('should set "NoAuth" status and null user on rejected', () => {
      const expectedState = {
        authStatus: AuthStatus.NoAuth,
        appUser: null,
      };

      const result = userProcess.reducer(undefined, loginAction.rejected(null, '', loginData));
      expect(result).toEqual(expectedState);
    });
  });

  describe('logoutAction', () => {
    it('should set "NoAuth" status and null user on fulfilled', () => {
      const startState = {
        authStatus: AuthStatus.Auth,
        appUser: makeFakeAppUser(),
      };

      const expectedState = {
        authStatus: AuthStatus.NoAuth,
        appUser: null,
      };

      const result = userProcess.reducer(startState, logoutAction.fulfilled(undefined, '', undefined));
      expect(result).toEqual(expectedState);
    });
  });
});
