import Styles from './not-found-page.module.css';
import {Link} from 'react-router-dom';
import {AppRoute} from '../../const.ts';
import Header from '../../components/header/header.tsx';

function NotFoundPage(): JSX.Element {
  return (
    <div className="page page--gray">
      <Header />

      <main className="page__main">
        <div className={`container ${Styles.container}`}>
          <h1>404. Page not found</h1>
          <Link className={Styles.link} to={AppRoute.Root}>Click to go to the homepage</Link>
        </div>
      </main>
    </div>
  );
}

export default NotFoundPage;
