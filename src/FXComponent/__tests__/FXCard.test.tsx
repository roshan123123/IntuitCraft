// @ts-nocheck
import { render, fireEvent, screen } from '@testing-library/react';
import FXCards from '../components/FXCard';
import '@testing-library/jest-dom'; // for additional matchers like toBeInTheDocument
import { render, fireEvent } from '@testing-library/react';

describe('FXCards Component', () => {
  const mockHandleRefresh = vi.fn();
  const mockHandleDelete = vi.fn();
  const mockHandleSwap = vi.fn();

  const mockProps = {
    handleRefresh: mockHandleRefresh,
    handleDelete: mockHandleDelete,
    handleSwap: mockHandleSwap,
    from: 'USD',
    to: 'EUR',
    createdAt: 123456789,
    fxRates: 2,
    inverseFxRates: 0.5,
  };

  it('renders without crashing', () => {
    render(<FXCards {...mockProps} />);
  });

  it('handles input changes correctly', () => {
    const { getByDisplayValue } = render(<FXCards {...mockProps} />);
    const fromInput = getByDisplayValue('1');
    fireEvent.change(fromInput, { target: { value: '2' } });
    expect(fromInput.value).toBe('2');

    const toInput = getByDisplayValue('4');
    expect(toInput.value).toBe('4');
  });

  it('prevents invalid keys in input', () => {
    const { getByDisplayValue } = render(<FXCards {...mockProps} />);
    const fromInput = getByDisplayValue('1');
    fireEvent.keyDown(fromInput, { key: 'e' });
    expect(fromInput.value).toBe('1');
  });

  it('handles button clicks correctly', () => {
    const { getByTestId } = render(<FXCards {...mockProps} />);

    const swapButton = getByTestId('swap');
    fireEvent.click(swapButton);
    expect(mockHandleSwap).toHaveBeenCalledWith(mockProps.createdAt);

    const refreshButton = getByTestId('refresh');
    fireEvent.click(refreshButton);
    expect(mockHandleRefresh).toHaveBeenCalledWith(
      mockProps.createdAt,
      mockProps.from,
      mockProps.to,
      expect.any(Function),
    );

    const deleteButton = getByTestId('delete');
    fireEvent.click(deleteButton);
    expect(mockHandleDelete).toHaveBeenCalled();
  });
});
