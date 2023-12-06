/* eslint-disable no-undef */
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import AmountInput from '../Amount';

describe('Testing AmountInput component', () => {
  test('render the default component', () => {
    render(<AmountInput readOnly />);
    expect(screen.getByRole('spinbutton')).toBeInTheDocument();
  });
  test('render the component with input value and label', () => {
    render(<AmountInput value="1200" name="test-input" label="Testing" readOnly />);
    const textarea = screen.getByRole('spinbutton');

    expect(textarea).toHaveAttribute('name', 'test-input');
    expect(textarea).toHaveAttribute('id', 'test-input');
    expect(screen.getByDisplayValue('1200')).toBeInTheDocument();
    expect(screen.getByLabelText(/Testing/)).toBeInTheDocument();
  });
  test('calls the onChange event handler', async () => {
    const onChange = jest.fn();

    render(<AmountInput value="2500" onChange={onChange} name="test-input" />);
    expect(screen.getByDisplayValue(2500)).toBeInTheDocument();
    await userEvent.type(screen.getByRole('spinbutton'), '1000034');
    expect(onChange).toHaveBeenCalledTimes(7);
  });
  test('render disabled textarea', async () => {
    const onChange = jest.fn();

    render(<AmountInput value="Sample text" onChange={onChange} name="test-input" disabled />);
    const textarea = screen.getByRole('spinbutton');

    expect(textarea).toBeDisabled();
    await userEvent.type(textarea, 'typing something');
    expect(onChange).toHaveBeenCalledTimes(0);
  });
  test('render error message for a text input', () => {
    render(<AmountInput value="Sample text" error="There is an error" readOnly />);
    expect(screen.getByTestId('error-msg')).toHaveTextContent('There is an error');
  });
});
