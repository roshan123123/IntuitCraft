import { render, screen, fireEvent } from '@testing-library/react';
import CurrencyDropdown from '../components/CurrencyDropdown';
import '@testing-library/jest-dom';

describe('CurrencyDropdown', () => {
  const mockSetCurrency = vi.fn();
  const currencyOptions = ['USD', 'EUR', 'GBP'];

  beforeEach(() => {
    render(
      <CurrencyDropdown
        currencyOPtions={currencyOptions}
        currency="USD"
        setCurrency={mockSetCurrency}
        title="From"
      />,
    );
  });

  it('renders the title correctly', () => {
    expect(screen.getByLabelText(/From/i)).toBeInTheDocument();
  });

  it('renders the select element with the correct options', () => {
    const selectElement = screen.getByRole('combobox', { name: /From/i });
    expect(selectElement).toBeInTheDocument();

    currencyOptions.forEach((currency) => {
      expect(screen.getByRole('option', { name: currency })).toBeInTheDocument();
    });
  });

  it('calls setCurrency with the correct value when an option is selected', () => {
    const selectElement = screen.getByRole('combobox', { name: /From/i });
    fireEvent.change(selectElement, { target: { value: 'EUR' } });

    expect(mockSetCurrency).toHaveBeenCalledWith('EUR');
  });

  it('selects the current currency correctly', () => {
    const selectElement = screen.getByRole('combobox', { name: /From/i });
    expect(selectElement.value).toBe('USD'); 
  });
});
