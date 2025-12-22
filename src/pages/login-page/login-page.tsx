import { useRef, FormEvent } from 'react';
import Logo from '../../components/logo/logo.tsx';
import { useAppDispatch } from '../../hooks/store.ts';
import { loginAction } from '../../store/api-actions.ts';
import { getRandomCityName } from '../../utils.ts';
import { Link } from 'react-router-dom';
import { changeCity } from '../../store/app-process/app-process.ts';
import { AppRoute } from '../../const.ts';

function LoginPage() {
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const dispatch = useAppDispatch();

  const randomCity = getRandomCityName();

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (emailRef.current !== null && passwordRef.current !== null) {
      dispatch(loginAction({
        email: emailRef.current.value,
        password: passwordRef.current.value
      }));
    }
  };

  return (
    <div className="page page--gray page--login">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <Logo/>
          </div>
        </div>
      </header>

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form className="login__form form" action="#" method="post" onSubmit={handleSubmit}>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input ref={emailRef} className="login__input form__input" type="email" name="email" placeholder="Email" required/>
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input ref={passwordRef} className="login__input form__input" type="password" name="password" placeholder="Password"
                  required
                />
              </div>
              <button className="login__submit form__submit button" type="submit">Sign in</button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link
                to={AppRoute.Root}
                className="locations__item-link"
                onClick={() => dispatch(changeCity(randomCity))}
              >
                <span>{randomCity.name}</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default LoginPage;
