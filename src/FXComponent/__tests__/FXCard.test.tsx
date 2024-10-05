import { render, screen, fireEvent } from '@testing-library/react';
import FXCards from '../components/FXCard';
import '@testing-library/jest-dom'; // for additional matchers like toBeInTheDocument

describe('FXCards', () => {
  const mockHandleRefresh = vi.fn();
  const mockHandleDelete = vi.fn();
  const mockHandleSwap = vi.fn();

  const fxRates = 1.2; // Example exchange rate
  const inverseFxRates = 0.833; // Example inverse exchange rate

  beforeEach(() => {
    render(
      <FXCards
        handleRefresh={mockHandleRefresh}
        handleDelete={mockHandleDelete}
        handleSwap={mockHandleSwap}
        from="USD"
        to="EUR"
        createdAt={12314214}
        fxRates={fxRates}
        inverseFxRates={inverseFxRates}
      />,
    );
  });

  it('renders the FXCards component correctly', () => {
    expect(screen.getByText(/usd/i)).toBeInTheDocument(); // Check if 'from' currency is rendered
    expect(screen.getByText(/eur/i)).toBeInTheDocument(); // Check if 'to' currency is rendered
    // expect(screen.getByRole('textbox', { name: /from/i })).toBeInTheDocument(); // Check if 'from' input is rendered
    // expect(screen.getByRole('textbox', { name: /to/i })).toBeInTheDocument(); // Check if 'to' input is rendered
  });

  //   it('calculates and updates the toInput when fromInput is changed', () => {
  //     const fromInput = screen.getByRole('textbox', { name: /from/i });
  //     fireEvent.change(fromInput, { target: { value: '10' } });

  //     expect(screen.getByRole('textbox', { name: /to/i })).toHaveValue('12'); // 10 * 1.2
  //   });

  //   it('calculates and updates the fromInput when toInput is changed', () => {
  //     const toInput = screen.getByRole('textbox', { name: /to/i });
  //     fireEvent.change(toInput, { target: { value: '10' } });

  //     expect(screen.getByRole('textbox', { name: /from/i })).toHaveValue('8.33'); // 10 * 0.833
  //   });

  //   it('calls handleRefresh when refresh button is clicked', () => {
  //     const refreshButton = screen.getByRole('button', { name: /refresh/i });
  //     fireEvent.click(refreshButton);

  //     expect(mockHandleRefresh).toHaveBeenCalledWith('2024-01-01', 'USD', 'EUR');
  //   });

  //   it('calls handleDelete when delete button is clicked', () => {
  //     const deleteButton = screen.getByRole('button', { name: /cross/i }); // You may need to check the icon name
  //     fireEvent.click(deleteButton);

  //     expect(mockHandleDelete).toHaveBeenCalledWith('2024-01-01');
  //   });

  //   it('calls handleSwap when swap button is clicked', () => {
  //     const swapButton = screen.getByRole('button', { name: /arrows exchange/i }); // You may need to check the icon name
  //     fireEvent.click(swapButton);

  //     expect(mockHandleSwap).toHaveBeenCalledWith('2024-01-01');
  //   });

  //   it('prevents invalid input when typing in the from input', () => {
  //     const fromInput = screen.getByRole('textbox', { name: /from/i });
  //     fireEvent.keyDown(fromInput, { key: 'e', code: 'KeyE' }); // Simulate pressing 'e'

  //     expect(fromInput).toHaveValue(1); // Should not change the value
  //   });
});
