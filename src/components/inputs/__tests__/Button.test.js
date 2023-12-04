import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Button from '../Button';

describe('Testing Button component', () => {
  test('render the default component', () => {
    render(<Button />);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Button');
  });
  test('render a custom component', () => {
    render(<Button type="submit" className="btn-test">Testing Btn</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('type', 'submit');
    expect(button).toHaveTextContent('Testing Btn');
    expect(button).toHaveClass('btn-test');
  });
  test('render a disabled button', async () => {
    const onClick = jest.fn();

    render(<Button disabled onClick={onClick}>I am disabled</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('disabled');
    await userEvent.click(button);
    expect(onClick).toHaveBeenCalledTimes(0);
  });
  test('render with an onClick event', async () => {
    const onClick = jest.fn();

    render(<Button onClick={onClick}>Click me</Button>);
    await userEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
  test('render button with custom font size and color', () => {
    render(<Button fontSize="text-lg" textColor="text-red">Styled Font</Button>);
    expect(screen.getByRole('button')).toHaveClass('text-lg');
    expect(screen.getByRole('button')).toHaveClass('text-red');
  });
});
