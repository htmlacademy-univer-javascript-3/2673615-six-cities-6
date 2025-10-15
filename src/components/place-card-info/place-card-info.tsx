import { Link } from 'react-router-dom';

type PlaceCardInfoProps = {
    price: number;
    isFavorite: boolean;
    rating: number;
    title: string;
    url: string;
    placeType: string;
}


function PlaceCardInfo({price, isFavorite, rating, title, url, placeType}: PlaceCardInfoProps){
  return(
    <div className="place-card__info">
      <div className="place-card__price-wrapper">
        <div className="place-card__price">
          <b className="place-card__price-value">&euro;{price}</b>
          <span className="place-card__price-text">&#47;&nbsp;night</span>
        </div>
        <button className={`place-card__bookmark-button ${isFavorite ? 'place-card__bookmark-button--active' : ''} button`}
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
          <span style={{width: `${rating * 20}%`}}></span>
          <span className="visually-hidden">Rating</span>
        </div>
      </div>
      <h2 className="place-card__name">
        <Link to={url}>{title}</Link>
      </h2>
      <p className="place-card__type">{placeType}</p>
    </div>
  );
}


export default PlaceCardInfo;
