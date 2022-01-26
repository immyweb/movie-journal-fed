import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import Header from './header';

describe('Header component', () => {
  it('renders correct heading', () => {
    window.history.pushState({}, 'Test page', '/');
    const { getByRole } = render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>,
    );
    expect(getByRole('heading')).toHaveTextContent(/Movie Journal/i);
  });
});
