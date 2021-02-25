import React from 'react';
import { render, screen } from '@testing-library/react';
import { AddMovie } from './add-movie';

test('Content contains var image', () => {
  render(<AddMovie />);
  const baby = screen.getByAltText('baby');
  expect(baby).toBeInTheDocument();
});
