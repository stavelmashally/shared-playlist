import { fireEvent, render } from '@testing-library/react';
import { vi } from 'vitest';
import AddVideoForm from './AddVideoForm';

describe('AddVideoForm', () => {
  it('renders', () => {
    const { getByRole } = render(<AddVideoForm onSubmit={() => {}} />);

    expect(getByRole('textbox')).toBeInTheDocument();
    expect(getByRole('button')).toBeInTheDocument();
  });

  it('calls onSubmit when form is submitted', () => {
    const onSubmit = vi.fn();
    const url = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';

    const { getByRole } = render(<AddVideoForm onSubmit={onSubmit} />);

    const input = getByRole('textbox');
    const button = getByRole('button');

    fireEvent.change(input, { target: { value: url } });
    fireEvent.click(button);

    expect(onSubmit).toHaveBeenCalledWith(url);
  });
});
