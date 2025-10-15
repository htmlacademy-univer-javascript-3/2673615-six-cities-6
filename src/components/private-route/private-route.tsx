import {Navigate} from 'react-router-dom';
import {AppRoute, AutStatus} from '../../const';

type PrivateRouteProps = {
  authorizationStatus: AutStatus;
  children: JSX.Element;
}

function PrivateRoute(props: PrivateRouteProps): JSX.Element {
  const {authorizationStatus, children} = props;

  return (
    authorizationStatus === AutStatus.Auth
      ? children
      : <Navigate to={AppRoute.Login}/>
  );
}

export default PrivateRoute;
