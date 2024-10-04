/* eslint-disable no-undef */
import { render, screen, fireEvent } from '@testing-library/react';
import CurrencyDropdown from '../components/CurrencyDropdown';
import '@testing-library/jest-dom'; // for additional matchers like toBeInTheDocument

describe('CurrencyDropdown', () => {
  const mockSetCurrency = vi.fn(); // Mock function for setCurrency
  const currencyOptions = ['USD', 'EUR', 'GBP'];

  beforeEach(() => {
    render(
      <CurrencyDropdown
        currencyOPtions={currencyOptions}
        currency="USD"
        setCurrency={mockSetCurrency}
        title="Currency"
      />
    );
  });

  it('renders the title correctly', () => {
    expect(screen.getByLabelText(/currency/i)).toBeInTheDocument(); // Check if the label is rendered
  });

  it('renders the select element with the correct options', () => {
    const selectElement = screen.getByRole('combobox', { name: /currency/i });
    expect(selectElement).toBeInTheDocument();
    
    // Check if options are rendered correctly
    currencyOptions.forEach((currency) => {
      expect(screen.getByRole('option', { name: currency })).toBeInTheDocument();
    });
  });

  it('calls setCurrency with the correct value when an option is selected', () => {
    const selectElement = screen.getByRole('combobox', { name: /currency/i });
    fireEvent.change(selectElement, { target: { value: 'EUR' } }); // Simulate selecting 'EUR'
    
    expect(mockSetCurrency).toHaveBeenCalledWith('EUR'); // Check if the mock function is called with 'EUR'
  });

  it('selects the current currency correctly', () => {
    const selectElement = screen.getByRole('combobox', { name: /currency/i });
    expect(selectElement.value).toBe('USD'); // Check that the current currency is selected
  });
});
