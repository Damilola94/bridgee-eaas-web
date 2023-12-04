/* eslint-disable no-undef */
import React from 'react';
import { render, screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';

import SelectInput from '../Select';

describe('Testing SelectInput component', () => {
  test('render the default component', () => {
    render(<SelectInput />);
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });
  test('render a named component with label', () => {
    render(<SelectInput name="select-item" label="Select Item" />);
  });
});
