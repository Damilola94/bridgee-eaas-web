/* eslint-disable no-undef */
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Textarea from '../Textarea';

describe('Testing Textarea component', () => {
  test('render the default component', () => {
    render(<Textarea readOnly />);
    const textarea = screen.getByRole('textbox');

    expect(textarea).toBeInTheDocument();
    expect(textarea).toHaveAttribute('rows', '5');
  });
  test('render the component with input value and label', () => {
    render(<Textarea value="Testing text input" name="test-input" label="Testing" readOnly />);
    const textarea = screen.getByRole('textbox');

    expect(textarea).toHaveAttribute('name', 'test-input');
    expect(textarea).toHaveAttribute('id', 'test-input');
    expect(screen.getByDisplayValue(/Testing text input/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Testing/)).toBeInTheDocument();
  });
  test('calls the onChange event handler', async () => {
    const onChange = jest.fn();

    render(<Textarea value="Sample text" onChange={onChange} name="test-input" />);
    expect(screen.getByDisplayValue(/Sample/)).toBeInTheDocument();
    await userEvent.type(screen.getByRole('textbox'), 'We are changing things');
    expect(onChange).toHaveBeenCalledTimes(22); // the length of the input text
  });
  test('render disabled textarea', async () => {
    const onChange = jest.fn();

    render(<Textarea value="Sample text" onChange={onChange} name="test-input" disabled />);
    const textarea = screen.getByRole('textbox');

    expect(textarea).toBeDisabled();
    await userEvent.type(textarea, 'typing something');
    expect(onChange).toHaveBeenCalledTimes(0);
  });
  test('render error message for a text input', () => {
    render(<Textarea value="Sample text" error="There is an error" readOnly />);
    expect(screen.getByTestId('error-msg')).toHaveTextContent('There is an error');
  });
});
