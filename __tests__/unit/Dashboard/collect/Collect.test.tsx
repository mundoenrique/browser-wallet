import { useRouter } from 'next/navigation';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
//Internal app
import Collect from '@/app/(Pages)/dashboard/collect/page';
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

describe('Collect', () => {
  let numberClient: Node | Window;
  let nameClient: Node | Window;
  let amount: Node | Window;
  let buttonWallets: Node | Window;
  let buttonCard: Node | Window;
  let router = createMockRouter({});

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: routerPushMock });
    render(<Collect />);
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