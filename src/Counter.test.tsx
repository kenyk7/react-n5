import { render, fireEvent, getByTestId } from '@testing-library/react';

import Counter from './Counter';

it('Counter loads with initial state of 0', () => {
  const { container } = render(<Counter />);
  const countValue = getByTestId(container, 'btnCounter');
  expect(countValue.textContent).toBe('count is 0');
});

it('Counter get value when click', () => {
  const { container } = render(<Counter />);
  const countValue = getByTestId(container, 'btnCounter');
  fireEvent.click(countValue);
  expect(countValue.textContent).toBe('count is 1');
});
