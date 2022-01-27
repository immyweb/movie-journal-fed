import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { DeleteMovie } from './delete-movie';

describe('Delete Movie component', () => {
  it('should contain correct elements', () => {
    const { getByText, getByTestId } = render(
      <DeleteMovie id={'2112121'} onCloseModal={() => {}} />,
    );
    expect(
      getByText('Are you sure you want to delete this movie entry?'),
    ).toBeInTheDocument();
    expect(getByTestId('delete-yes')).toBeInTheDocument();
    expect(getByTestId('delete-no')).toBeInTheDocument();
  });

  it('clicking on No button should call onCloseModal', () => {
    const mockFn = jest.fn();
    const { getByTestId } = render(
      <DeleteMovie id={'2112121'} onCloseModal={mockFn} />,
    );
    userEvent.click(getByTestId('delete-no'));
    expect(mockFn).toHaveBeenCalledTimes(1);
  });
});
