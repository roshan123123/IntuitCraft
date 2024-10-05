// @ts-nocheck
import { render, screen, fireEvent } from '@testing-library/react';
import SortButton from '../components/SortButton';
import { ORDER } from '../constants/filterConstants';

describe('SortButton', () => {
  const mockHandleSort = vi.fn(); 

  it('renders with the correct title', () => {
    render(
      <SortButton
        title="Sort by Name"
        handleSort={mockHandleSort}
        activeSortType={{ sortBy: 'name', sortOrder: ORDER.ASC }}
        sortType="name"
      />,
    );

    expect(screen.getByText('Sort by Name')).toBeInTheDocument();
  });

  it('calls handleSort with the correct argument when clicked', () => {
    render(
      <SortButton
        title="Sort by Name"
        handleSort={mockHandleSort}
        activeSortType={{ sortBy: 'name', sortOrder: ORDER.ASC }}
        sortType="name"
      />,
    );

    fireEvent.click(screen.getByText('Sort by Name'));
    expect(mockHandleSort).toHaveBeenCalledWith('name');
  });

  it('applies the active style when activeSortType matches sortType', () => {
    render(
      <SortButton
        title="Sort by Name"
        handleSort={mockHandleSort}
        activeSortType={{ sortBy: 'name', sortOrder: ORDER.ASC }}
        sortType="name"
      />,
    );

    const button = screen.getByRole('button', { name: /sort by name/i });
    expect(button).toHaveClass('bg-green-500');
  });

  it('does not apply the active style when activeSortType does not match sortType', () => {
    render(
      <SortButton
        title="Sort by Age"
        handleSort={mockHandleSort}
        activeSortType={{ sortBy: 'name', sortOrder: ORDER.ASC }}
        sortType="age"
      />,
    );

    const button = screen.getByRole('button', { name: /sort by age/i });
    expect(button).not.toHaveClass('bg-green-500'); 
  });
});
