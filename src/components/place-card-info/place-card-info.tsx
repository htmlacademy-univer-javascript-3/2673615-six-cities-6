import { Link, useNavigate } from 'react-router-dom';
import { getRatingWidthPercentage } from '../../utils';
import { OfferCard } from '../../types/offer';
import { getAuthStatus } from '../../store/user-process/selectors';
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import { AppRoute, AuthStatus } from '../../const';
import { changeFavoriteStatusAction } from '../../store/api-actions';

type PlaceCardInfoProps = {
    offer: OfferCard;
    url: string;
}

function PlaceCardInfo({offer, url}: PlaceCardInfoProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const authStatus = useAppSelector(getAuthStatus);

  const handleFavoriteButtonClick = () => {
    if (authStatus !== AuthStatus.Auth) {
      navigate(AppRoute.Login);
      return;
    }

    dispatch(changeFavoriteStatusAction({
      offerId: offer.id,
      status: offer.isFavorite ? 0 : 1
    }));
  };

  return(
    <div className="place-card__info">
      <div className="place-card__price-wrapper">
        <div className="place-card__price">
          <b className="place-card__price-value">&euro;{offer.price}</b>
          <span className="place-card__price-text">&#47;&nbsp;night</span>
        </div>
        <button
          onClick={handleFavoriteButtonClick}
          className={`place-card__bookmark-button ${offer.isFavorite ? 'place-card__bookmark-button--active' : ''} button`}
          type="button"
        >
          <svg className="place-card__bookmark-icon" width="18" height="19">
            <use xlinkHref="#icon-bookmark"></use>
          </svg>
          <span className="visually-hidden">In bookmarks</span>
        </button>
      </div>
      <div className="place-card__rating rating">
        <div className="place-card__stars rating__stars">
          <span style={{width: getRatingWidthPercentage(offer.rating)}}></span>
          <span className="visually-hidden">Rating</span>
        </div>
      </div>
      <h2 className="place-card__name">
        <Link to={url}>{offer.title}</Link>
      </h2>
      <p className="place-card__type">{offer.type}</p>
    </div>
  );
}


export default PlaceCardInfo;
