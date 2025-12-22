import { render, screen, act } from '@testing-library/react';
import { createMemoryHistory, BrowserHistory } from 'history';
import { Routes, Route } from 'react-router-dom';
import HistoryRouter from './history-router';

describe('Component: HistoryRouter', () => {
  it('should render component correctly', () => {
    const history = createMemoryHistory();
    const testId = 'test-child';

    render(
      <HistoryRouter history={history as unknown as BrowserHistory}>
        <div data-testid={testId}>Test Child</div>
      </HistoryRouter>
    );

    expect(screen.getByTestId(testId)).toBeInTheDocument();
  });

  it('should redirect correctly', () => {
    const history = createMemoryHistory();
    const initialPath = '/';
    const nextPath = '/next';
    const initialText = 'Initial Page';
    const nextText = 'Next Page';

    render(
      <HistoryRouter history={history as unknown as BrowserHistory}>
        <Routes>
          <Route path={initialPath} element={<h1>{initialText}</h1>} />
          <Route path={nextPath} element={<h1>{nextText}</h1>} />
        </Routes>
      </HistoryRouter>
    );

    expect(screen.getByText(initialText)).toBeInTheDocument();

    act(() => {
      history.push(nextPath);
    });

    expect(screen.getByText(nextText)).toBeInTheDocument();
    expect(history.location.pathname).toBe(nextPath);
  });
});
