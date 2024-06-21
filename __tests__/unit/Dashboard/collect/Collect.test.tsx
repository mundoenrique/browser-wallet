import { act, render, screen } from '@testing-library/react';
//Internal app
import Collect from '@/app/(Pages)/dashboard/collect/page';
import { emptyField, renderInput, mockRouterPush } from '../../../tools/unitTestHelper.test';

describe('Collect', () => {
  let numberClient: HTMLInputElement;
  let nameClient: HTMLInputElement;
  let amount: HTMLInputElement;
  let buttonWallets: HTMLElement;
  let buttonCard: HTMLElement;
  const routerPushMock = jest.fn();

  beforeEach(async () => {
    mockRouterPush(routerPushMock)
    await act(async () => {
      render(<Collect />);
    });
    expect(render).toBeTruthy();
    numberClient = screen.getByLabelText(/¿a quién le quieres cobrar?/i);
    nameClient = screen.getByLabelText(/nombre de la persona/i);
    amount = screen.getByLabelText(/¿cuánto dinero quieres cobrar?/i);
    buttonWallets = screen.getByRole('button', { name: /billetera digital, banco o agencia/i });
    buttonCard = screen.getByRole('button', { name: /tarjeta de crédito o débito/i });
  });

  //** Renders a title, subtitles.
  it('should render all text, titles, subtitles.', () => {
    expect(screen.getByText('Crear solicitud de cobro')).toBeInTheDocument();
    expect(screen.getByText('¿Cómo te va a pagar el cliente?')).toBeInTheDocument();
  });

  //** Renders a inputs, buttons.
  it('should render all inputs, buttons.', () => {
    renderInput(numberClient);
    renderInput(nameClient);
    renderInput(amount);
    renderInput(buttonWallets);
    renderInput(buttonCard);
  });

  //** Displays an error message when the user submits the form with an empty password field.
  it('should display an error message for empty field', async () => {
    emptyField(buttonWallets, 'Campo obligatorio');
    emptyField(buttonCard, 'Campo obligatorio');
  });
});