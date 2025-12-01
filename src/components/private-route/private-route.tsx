import {Navigate} from 'react-router-dom';
import {AppRoute, AuthStatus} from '../../const';
import { useAppSelector } from '../../hooks/store';
import Loader from '../loader/loader';

type PrivateRouteProps = {
  children: JSX.Element;
}

function PrivateRoute(props: PrivateRouteProps) {
  const {children} = props;
  const authStatus = useAppSelector((state) => state.authStatus);

  if (authStatus === AuthStatus.Unknown) {
    return <Loader />;
  }

  return (
    authStatus === AuthStatus.Auth
      ? children
      : <Navigate to={AppRoute.Login}/>
  );
}

export default PrivateRoute;
