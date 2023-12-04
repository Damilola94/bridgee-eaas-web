import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import TextInput from '../Text';

describe('Testing TextInput component', () => {
  test('render the default component', () => {
    render(<TextInput readOnly />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.queryByTestId('error-msg')).toBe(null);
  });
  test('render the component with input value and label', () => {
    render(<TextInput value="Testing text input" name="test-input" label="Testing" readOnly />);
    expect(screen.getByDisplayValue(/Testing text input/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Testing/)).toBeInTheDocument();
  });
  test('calls the onChange event handler', async () => {
    const onChange = jest.fn();

    render(<TextInput value="Sample text" onChange={onChange} name="test-input" />);
    expect(screen.getByDisplayValue(/Sample/)).toBeInTheDocument();
    await userEvent.type(screen.getByRole('textbox'), 'We are changing things');
    screen.debug();
    expect(onChange).toHaveBeenCalledTimes(22);
  });
  test('render a password input', () => {
    render(<TextInput placeholder="password-input" type="password" readOnly />);
    expect(screen.getByPlaceholderText('password-input')).toHaveAttribute('type', 'password');
    expect(screen.getByTestId('toggle-password')).toBeInTheDocument();
    expect(screen.getByTestId('eye-closed')).toBeInTheDocument();
  });
  test('toggle masking in password input', async () => {
    render(<TextInput type="password" readOnly />);
    expect(screen.getByTestId('eye-closed')).toBeInTheDocument();
    await userEvent.click(screen.getByTestId('eye-closed'));
    expect(screen.queryByTestId('eye-closed')).toBe(null);
    expect(screen.getByTestId('eye-open')).toBeInTheDocument();
    await userEvent.click(screen.getByTestId('eye-open'));
    expect(screen.queryByTestId('eye-open')).toBe(null);
  });
  test('render disabled text input', async () => {
    const onChange = jest.fn();

    render(<TextInput value="Sample text" onChange={onChange} name="test-input" disabled />);
    const input = screen.getByRole('textbox');

    expect(input).toBeDisabled();
    await userEvent.type(input, 'typing something');
    expect(onChange).toHaveBeenCalledTimes(0);
  });
  test('render read-only text input', async () => {
    const onChange = jest.fn();

    render(<TextInput value="Sample text" onChange={onChange} readOnly />);

    await userEvent.type(screen.getByRole('textbox'), 'typing something');
    expect(onChange).toHaveBeenCalledTimes(0);
  });
  test('render error message for a text input', () => {
    render(<TextInput value="Sample text" error="There is an error" readOnly />);
    expect(screen.getByTestId('error-msg')).toHaveTextContent('There is an error');
  });
});
