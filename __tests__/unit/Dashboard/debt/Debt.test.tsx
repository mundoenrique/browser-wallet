import { useRouter } from 'next/navigation';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
//Internal app
import Debit from '@/app/(Pages)/dashboard/debt/page';
import {
  emptyField,
  renderInput
} from '../../../tools/unitTestHelper.test';
import { createMockRouter } from '@/utils/mocks';

const routerPushMock = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('jose', () => {
  return {
    compactDecrypt: jest.fn(() => {
      return { plaintext: 'mocked plaintext' };
    }),
  };
});

describe('Debit', () => {
  let submitButton: Node | Window;
  let inputDebit: Node | Window;
  let router = createMockRouter({});

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: routerPushMock });
  });

  //** Renders a title, subtitles.
  it('should render all text, titles, subtitles.', () => {
    render(<Debit />);
    expect(screen.getByText(/pagar deuda con ésika/i)).toBeInTheDocument();
    expect(screen.getByText(/deuda total/i)).toBeInTheDocument();
  });

  //** Renders a inputs, buttons.
  it('should render all inputs, buttons.', () => {
    render(<Debit />);
    submitButton = screen.getByRole('button', { name: /pagar/i });
    inputDebit = screen.getByLabelText(/¿cuánto deseas pagar?/i);
    renderInput(inputDebit);
    renderInput(submitButton);
  });

  //** Display a link to the dashboard page and navigate to dashboard page when link is clicked.
  it('should navigate to dashboard page when link is clicked', () => {
    render(<Debit />);
    expect(screen.getByText(/volver/i)).toBeInTheDocument();
    expect(screen.getByText(/volver/i).getAttribute('href')).toBe('/dashboard');
    fireEvent.click(screen.getByText(/volver/i));
    waitFor(() => {
      expect(router.push).toHaveBeenCalledWith('/dashboard');
    });
  });

  //** Displays an error message when the user submits the form with an empty password field.
  it('should display an error message for empty debit field', async () => {
    render(<Debit />);
    inputDebit = screen.getByLabelText(/¿cuánto deseas pagar?/i);
    emptyField(submitButton, 'ingresa un monto');
  });

  it('should render the form and submit the debit', async () => {
    const onSubmitMock = jest.fn();
    render(<Debit onSubmit={onSubmitMock} />);

    submitButton = screen.getByRole('button', { name: /pagar/i });
    inputDebit = screen.getByLabelText(/¿cuánto deseas pagar?/i);
    fireEvent.change(inputDebit, { target: { value: '350' } });
    fireEvent.click(submitButton);

    expect(onSubmitMock).toHaveBeenCalledTimes(1);
    expect(onSubmitMock).toHaveBeenCalledWith({ amount: '350' });

    const successComponent = await screen.getByText('Comprobante');
    expect(successComponent).toBeInTheDocument();
  });
});