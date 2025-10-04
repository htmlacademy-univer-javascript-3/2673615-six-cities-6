import Logo from '../../components/logo/logo.tsx';

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
        <div className="container" style={{textAlign: 'center'}}>
          <h1 style={{fontSize: 'xxx-large'}}>404</h1>
          <h2>Page not found</h2>
        </div>
      </main>
    </div>
  );
}

export default NotFoundPage;
