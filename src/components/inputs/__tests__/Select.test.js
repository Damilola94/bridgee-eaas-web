import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import SelectInput from '../Select';

describe('Testing SelectInput component', () => {
  test('render the default component', () => {
    render(<SelectInput />);
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });
  test('render a named component with label and value', () => {
    render(
      <SelectInput
        name="select-item"
        label="Select Item"
        value={{ label: 'No', value: 'no' }}
      />
    );
    expect(screen.getByText('Select Item')).toBeInTheDocument();
    expect(screen.getByText('No')).toBeInTheDocument();
    expect(screen.getByDisplayValue('no')).toBeInTheDocument();
  });
  test('render a Select input with options and select an option', async () => {
    const options = [{ label: 'Yes', value: 'yes' }, { label: 'No', value: 'no' }];
    render(<SelectInput name="select-item" label="Select Item" options={options} />);
    expect(screen.queryByText('Yes')).toBeNull();
    await userEvent.click(screen.getByRole('combobox'));

    expect(screen.getByText('Yes')).toBeInTheDocument();
    expect(screen.getByText('No')).toBeInTheDocument();

    await userEvent.click(screen.getByText('No'));
    expect(screen.getByDisplayValue('no')).toBeInTheDocument();
  });
  test('render a disabled Select input with options', async () => {
    const options = [{ label: 'Yes', value: 'yes' }, { label: 'No', value: 'no' }];
    render(<SelectInput name="select-item" label="Select Item" options={options} disabled />);
    expect(screen.queryByText('Yes')).toBeNull();
    await userEvent.click(screen.queryByRole('combobox'));

    expect(screen.queryByText('Yes')).toBeNull();
    expect(screen.queryByText('No')).toBeNull();
  });
  test('render a component with other props', () => {
    render(
      <SelectInput
        name="select-item"
        className="testing-select"
        height="h-[40px]"
        placeholder="Testing placeholder"
      />
    );
    expect(screen.getByText('Testing placeholder')).toBeInTheDocument();
  });
});
