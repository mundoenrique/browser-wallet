import { act, render, screen, fireEvent, waitFor } from '@testing-library/react';
//Internal app
import Collect from '@/app/(Pages)/dashboard/collect/page';
import { renderInput, mockRouterPush } from '../../../tools/unitTestHelper.test';
import { api } from '@/utils/api';

jest.mock('@/store', () => ({
  ...jest.requireActual('@/store'),
  useUserStore: jest.fn(() => ({
    user: { userId: 'mockedUserId', firstName: 'John' }
  })),
  useCollectStore: jest.fn(() => ({
    setLoad: jest.fn(),
    setLinkData: jest.fn()
  })),
}));

jest.mock('@/utils/api');
const mockApi = api as jest.Mocked<typeof api>;

describe('Collect', () => {
  let form: HTMLFormElement;
  let numberClient: HTMLInputElement;
  let nameClient: HTMLInputElement;
  let amount: HTMLInputElement;
  let buttonWallets: HTMLElement;
  let buttonCard: HTMLElement;
  const routerPushMock = jest.fn();
  const sendGTMEvent = jest.fn();
  const setError = jest.fn();
  const setLoad = jest.fn();
  const e = { preventDefault: jest.fn() };

  beforeEach(async () => {
    mockRouterPush(routerPushMock)
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

  describe('Form actions', () => {
    it('sendGTMEvent button wallets', async () => {
      fireEvent.change(numberClient, { target: { value: '123456' } });
      fireEvent.change(nameClient, { target: { value: '123456' } });
      fireEvent.change(amount, { target: { value: '100.00' } });
      fireEvent.click(buttonWallets);

      waitFor(() => {
        expect(sendGTMEvent).toHaveBeenCalled();
        expect(sendGTMEvent).toHaveBeenCalledWith({
          event: 'ga4.trackEvent',
          eventName: 'select_content',
          eventParams: {
            content_type: 'boton',
            section: 'cobrar :: monto',
            previous_section: 'dashboard',
            selected_content: 'Billetera digital, Banco o agencia',
            destination_page: `http://localhost:3000/dashboard/collect`,
          },
        });
      });
    });

    it('sendGTMEvent button cards', async () => {
      fireEvent.change(numberClient, { target: { value: '123456' } });
      fireEvent.change(nameClient, { target: { value: '123456' } });
      fireEvent.change(amount, { target: { value: '100.00' } });
      fireEvent.click(buttonCard);

      waitFor(() => {
        expect(sendGTMEvent).toHaveBeenCalled();
        expect(sendGTMEvent).toHaveBeenCalledWith({
          event: 'ga4.trackEvent',
          eventName: 'select_content',
          eventParams: {
            content_type: 'boton',
            section: 'cobrar :: monto',
            previous_section: 'dashboard',
            selected_content: 'Tarjeta de crédito o débito',
            destination_page: `http://localhost:3000/dashboard/collect`,
          },
        });
      });
    });

    it('should call handleKeyDown when Enter key is pressed', () => {
      const handleKeyDown = jest.fn();
      fireEvent.keyDown(form, { key: 'Enter', code: 13 });
      waitFor(() => expect(handleKeyDown).toHaveBeenCalled())
    });
  });

  describe('onSubmit function', () => {
    // it('error message when amount is invalid min', async () => {
    //   fireEvent.change(numberClient, { target: { value: '123456' } });
    //   fireEvent.change(nameClient, { target: { value: 'Jhon Doe' } });
    //   fireEvent.change(amount, { target: { value: '0.50' } });
    //   fireEvent.click(buttonCard, buttonWallets);
    //   // fireEvent.submit(form);

    //   e.preventDefault()
    //   const validate = {
    //     min: parseFloat(amount.value) < 1,
    //     max: parseFloat(amount.value) > 4950,
    //   };

    //   await setError('amount', { type: 'customError', message: 'El monto debe ser mayor o igual a S/ 1.00' });

    //   await waitFor(() => {
    //     expect(setError).toHaveBeenCalledTimes(1);
    //     expect(validate.min && setError).toHaveBeenCalledWith('amount', {
    //       type: 'customError',
    //       message: 'El monto debe ser mayor o igual a S/ 1.00',
    //     });
    //   });

    //   await setLoad({ name: nameClient.value, phoneNumber: numberClient.value })

    //   const showActionBtn = 'cards';
    // });

    // it('error message when amount is invalid max', async () => {
    //   const setError = jest.fn();

    //   fireEvent.change(numberClient, { target: { value: '123456' } });
    //   fireEvent.change(nameClient, { target: { value: 'Jhon Doe' } });
    //   fireEvent.change(amount, { target: { value: '5000.00' } });
    //   fireEvent.submit(form);

    //   await setError('amount', { type: 'customError', message: 'El monto debe ser menor o igual a S/ 4950.00' });

    //   await waitFor(() => {
    //     expect(setError).toHaveBeenCalledTimes(1);
    //     expect(setError).toHaveBeenCalledWith('amount', {
    //       type: 'customError',
    //       message: 'El monto debe ser menor o igual a S/ 4950.00',
    //     });
    //   });
    // });
  });

  describe('call api.post generateCharge', () => {
    // it('submit form and call api post', async () => {
    //   fireEvent.change(numberClient, { target: { value: '123456' } });
    //   fireEvent.change(nameClient, { target: { value: '123456' } });
    //   fireEvent.change(amount, { target: { value: '100.00' } });
    //   fireEvent.submit(form);
    //   // fireEvent.click(buttonCard)

    //   const payload = {
    //     fullName: nameClient.value,
    //     phoneNumber: numberClient.value,
    //     operationCode: 'DESTINATION_CHARGE',
    //     providerCode: 'PAGO_EFECTIVO',
    //     currencyCode: 'PEN',
    //     amount: amount.value,
    //   };

    //   await mockApi.post(`/payments/051999541/charge`, payload);

    //   await waitFor(() => {
    //     expect(mockApi.post).toHaveBeenCalledTimes(1);
    //     expect(mockApi.post).toHaveBeenCalledWith('/payments/051999541/charge', payload);
    //   });
    // });
  });
});