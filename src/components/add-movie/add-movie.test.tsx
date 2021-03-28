import React from 'react';
import { render, screen } from '@testing-library/react';
import { AddMovie } from './add-movie';

test('Content contains correct heading', () => {
  render(<AddMovie />);
  const text = screen.getByText('What did you watch?');
  expect(text).toBeInTheDocument();
});
