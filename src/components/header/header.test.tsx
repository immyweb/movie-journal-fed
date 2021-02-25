import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from './header';

test('Header contains correct text', () => {
  render(<Header />);
  const text = screen.getByText('My React and TypeScript App');
  expect(text).toBeInTheDocument();
});
