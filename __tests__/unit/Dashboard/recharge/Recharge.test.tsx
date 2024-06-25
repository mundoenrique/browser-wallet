import { act, render, screen, fireEvent, waitFor } from '@testing-library/react';
//Internal app
import Recharge from '@/app/(Pages)/dashboard/recharge/page';
import { emptyField, renderInput, mockRouterPush } from '../../../tools/unitTestHelper.test';

describe('Recharge', () => {
  let amountInput: HTMLInputElement;
  let submitButton: HTMLElement;
  const routerPushMock = jest.fn();

  beforeEach(async () => {
    mockRouterPush(routerPushMock)
    await act(async () => {
      render(<Recharge />);
    });
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
    waitFor(() => {
      expect(screen.getByText('Recarga a través de Pago Efectivo por una de estas 2 opciones:')).toBeInTheDocument();
    });
  });
});