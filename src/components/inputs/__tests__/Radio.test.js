/* eslint-disable no-undef */
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import RadioInput from '../Radio';

describe('Testing RadioInput component', () => {
  test('render the default component', () => {
    render(<RadioInput />);
    expect(screen.getByRole('radio')).toBeInTheDocument();
  });
  test('render the component with input value and label', () => {
    render(<RadioInput value="Testing text input" name="test-input" label="Testing" />);
    expect(screen.getByDisplayValue(/Testing text input/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Testing/)).toBeInTheDocument();
  });
  test('calls the onChange event handler', async () => {
    const onChange = jest.fn();

    render(<RadioInput value="Sample text" onChange={onChange} name="test-input" />);
    expect(screen.getByDisplayValue(/Sample/)).toBeInTheDocument();
    await userEvent.click(screen.getByRole('radio'));
    expect(onChange).toHaveBeenCalledTimes(1);
  });
});
