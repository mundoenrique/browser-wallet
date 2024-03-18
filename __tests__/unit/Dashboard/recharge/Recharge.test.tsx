import { useRouter } from 'next/navigation';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
//Internal app
import Recharge from '@/app/(Pages)/dashboard/recharge/page';
import {
  emptyField,
  renderInput
} from '../../../tools/unitTestHelper';
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

describe('Recharge', () => {
  let amountInput: Node | Window;
  let submitButton: Node | Window;
  let router = createMockRouter({});

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: routerPushMock });
    render(<Recharge />);
    expect(render).toBeTruthy();
    amountInput = screen.getByLabelText(/¿cuánto deseas recargar?/i);
    submitButton = screen.getByRole('button', { name: /recargar/i });
  });

  //** Renders a title, subtitles.
  it('should render all text, titles, subtitles.', () => {
    expect(screen.getByText(/generar recarga/i)).toBeInTheDocument();
  });

  //** Renders a inputs, buttons.
  it('should render all inputs, buttons.', () => {
    renderInput(amountInput);
    renderInput(submitButton);
  });

  //** Displays an error message when the user submits the form with an empty password field.
  it('should display an error message for empty recharge field', async () => {
    emptyField(submitButton, 'ingresa un monto');
  });

  it('should render the form and submit the recharge amount', async () => {
    fireEvent.change(amountInput, { target: { value: '100' } });
    fireEvent.click(submitButton);
    await waitFor(() => {
      expect(screen.getByText('Recarga a través de Pago Efectivo por una de estas 2 opciones:')).toBeInTheDocument();
    });
  });
});