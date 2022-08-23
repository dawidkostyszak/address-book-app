import { render, screen, fireEvent } from '@testing-library/react';

import { Modal } from './Modal';

describe('Modal', () => {
  it('should render empty component when isOpen is false', () => {
    const { container } = render(
      <Modal isOpen={false} onClose={jest.fn()}>
        Test
      </Modal>
    );

    expect(container.innerHTML).toBe('');
  });

  it('renders content', () => {
    render(
      <Modal isOpen onClose={jest.fn()}>
        Test
      </Modal>
    );

    expect(screen.getByText('Test')).toBeInTheDocument();
  });

  it('renders close button', () => {
    render(
      <Modal isOpen onClose={jest.fn()}>
        Test
      </Modal>
    );

    expect(screen.getByRole('button', { name: 'X' })).toBeInTheDocument();
  });

  it('should call onClose when click on close button', () => {
    const mockOnClose = jest.fn();
    render(
      <Modal isOpen onClose={mockOnClose}>
        Test
      </Modal>
    );

    fireEvent.click(screen.getByRole('button', { name: 'X' }));

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});
