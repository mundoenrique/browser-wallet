import { act, render, screen, fireEvent, waitFor } from '@testing-library/react';
//Internal app
import Collect from '@/app/(Pages)/dashboard/collect/page';
import { renderInput, mockRouterPush } from '../../../tools/unitTestHelper.test';

jest.mock('@/store', () => ({
  ...jest.requireActual('@/store'),
  useUserStore: jest.fn(() => ({
    user: { userId: 'mockedUserId', firstName: 'John' },
  })),
}));

describe('Collect', () => {
  let form: HTMLFormElement;
  let numberClient: HTMLInputElement;
  let nameClient: HTMLInputElement;
  let amount: HTMLInputElement;
  let buttonWallets: HTMLElement;
  let buttonCard: HTMLElement;
  const routerPushMock = jest.fn();
  const sendGTMEvent = jest.fn();

  beforeEach(async () => {
    mockRouterPush(routerPushMock);
    await act(async () => {
      render(<Collect />);
    });
    form = screen.getByRole('form');
    numberClient = screen.getByLabelText(/¿a quién le quieres cobrar?/i);
    nameClient = screen.getByLabelText(/nombre de la persona/i);
    amount = screen.getByLabelText(/¿cuánto dinero quieres cobrar?/i);
    buttonWallets = screen.getByRole('button', { name: /billetera digital, banco o agencia/i });
    buttonCard = screen.getByRole('button', { name: /tarjeta de crédito o débito/i });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Render forms function', () => {
    it('should render all text, titles, subtitles.', () => {
      expect(screen.getByText('Crear solicitud de cobro')).toBeInTheDocument();
      expect(screen.getByText('¿Cómo te va a pagar el cliente?')).toBeInTheDocument();
    });

    it('should render all inputs, buttons.', () => {
      renderInput(numberClient);
      renderInput(nameClient);
      renderInput(amount);
      renderInput(buttonWallets);
      renderInput(buttonCard);
    });
  });

  describe('Show errors and call api.post', () => {
    it('error message when amount is invalid min', async () => {
      const setError = jest.fn();
      const e = { preventDefault: jest.fn() };
      fireEvent.change(numberClient, { target: { value: '123456789' } });
      fireEvent.change(nameClient, { target: { value: 'Jhon Doe' } });
      fireEvent.change(amount, { target: { value: '0.50' } });
      fireEvent.submit(form);

      e.preventDefault();
      const validate = {
        min: parseFloat(amount.value) < 1,
      };

      await act(async () => {
        setError('amount', { type: 'customError', message: 'El monto debe ser mayor o igual a S/ 1.00' });
      });

      expect(setError).toHaveBeenCalledTimes(1);
      expect(validate.min && setError).toHaveBeenCalledWith('amount', {
        type: 'customError',
        message: 'El monto debe ser mayor o igual a S/ 1.00',
      });
    });

    it('error message when amount is invalid max', async () => {
      const setError = jest.fn();
      const e = { preventDefault: jest.fn() };
      fireEvent.change(numberClient, { target: { value: '123456789' } });
      fireEvent.change(nameClient, { target: { value: 'Jhon Doe' } });
      fireEvent.change(amount, { target: { value: '5000.00' } });
      fireEvent.submit(form);

      e.preventDefault();
      const validate = {
        max: parseFloat(amount.value) < 4950,
      };

      await act(async () => {
        await setError('amount', { type: 'customError', message: 'El monto debe ser menor o igual a S/ 4950.00' });
      });

      expect(setError).toHaveBeenCalledTimes(1);
      expect(validate.max && setError).toHaveBeenCalledWith('amount', {
        type: 'customError',
        message: 'El monto debe ser menor o igual a S/ 4950.00',
      });
    });
  });

  describe('Form actions', () => {
    it('sendGTMEvent button wallets', async () => {
      fireEvent.change(numberClient, { target: { value: '123456' } });
      fireEvent.change(nameClient, { target: { value: 'Jhon Doe' } });
      fireEvent.change(amount, { target: { value: '100.00' } });
      fireEvent.click(buttonWallets);

      waitFor(() => {
        expect(sendGTMEvent).toHaveBeenCalled();
        expect(sendGTMEvent).toHaveBeenCalledWith({
          event: 'ga4.trackEvent',
          eventName: 'select_content',
          eventParams: {
            content_type: 'boton',
            section: 'cobrar',
            previous_section: 'dashboard',
            selected_content: 'Billetera digital, Banco o agencia',
            destination_page: `http://localhost:3000/dashboard/collect`,
          },
        });
      });
    });

    it('sendGTMEvent button cards', async () => {
      fireEvent.change(numberClient, { target: { value: '123456' } });
      fireEvent.change(nameClient, { target: { value: 'Jhon Doe' } });
      fireEvent.change(amount, { target: { value: '100.00' } });
      fireEvent.click(buttonCard);

      waitFor(() => {
        expect(sendGTMEvent).toHaveBeenCalled();
        expect(sendGTMEvent).toHaveBeenCalledWith({
          event: 'ga4.trackEvent',
          eventName: 'select_content',
          eventParams: {
            content_type: 'boton',
            section: 'cobrar',
            previous_section: 'dashboard',
            selected_content: 'Tarjeta de crédito o débito',
            destination_page: `http://localhost:3000/dashboard/collect`,
          },
        });
      });
    });
  });
});
