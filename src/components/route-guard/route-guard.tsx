import {Navigate} from 'react-router-dom';
import {AppRoute, AuthStatus} from '../../const';
import { useAppSelector } from '../../hooks/store';
import { getAuthStatus } from '../../store/user-process/selectors';

type RouteGuardProps = {
  children: JSX.Element;
  isPrivateRoute: boolean;
}

function RouteGuard({children, isPrivateRoute}: RouteGuardProps) {
  const authStatus = useAppSelector(getAuthStatus);

  if (!isPrivateRoute && authStatus === AuthStatus.Auth) {
    return <Navigate to={AppRoute.Root} />;
  }

  if (isPrivateRoute && authStatus !== AuthStatus.Auth) {
    return <Navigate to={AppRoute.Login} />;
  }

  return children;
}

export default RouteGuard;
