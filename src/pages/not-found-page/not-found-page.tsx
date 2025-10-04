import Logo from "../../components/logo/logo.tsx";
import {Link} from "react-router-dom";
import {AppRoute} from "../../const.ts";

function NotFoundPage(): JSX.Element {
  return (
    <div className="page page--gray">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <Logo/>
          </div>
        </div>
      </header>

      <main className="page__main">
        <div className="container" style={{textAlign: "center"}}>
          <h1>404. Page not found</h1>
          <Link to={AppRoute.Root}>Main page</Link>
        </div>
      </main>
    </div>
  );
}

export default NotFoundPage;
