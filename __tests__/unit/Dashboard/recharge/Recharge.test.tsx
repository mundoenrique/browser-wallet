import { act, render, screen, fireEvent, waitFor } from '@testing-library/react';
//Internal app
import Recharge from '@/app/(Pages)/dashboard/recharge/page';
import { emptyField, renderInput, mockRouterPush } from '../../../tools/unitTestHelper.test';
import { api } from '@/utils/api';

jest.mock('@/store', () => ({
  ...jest.requireActual('@/store'),
  useUserStore: jest.fn(() => ({
    getUserPhone: jest.fn(() => jest.fn()),
    user: { userId: 'mockedUserId', firstName: 'John' },
  })),
  useCollectStore: jest.fn(() => ({ setLinkData: jest.fn() })),
}));

jest.mock('@/utils/api');
const mockApi = api as jest.Mocked<typeof api>;

describe('Recharge', () => {
  let amountInput: HTMLInputElement;
  let submitButton: HTMLElement;
  const routerPushMock = jest.fn();

  beforeEach(async () => {
    mockRouterPush(routerPushMock)
    await act(async () => {
      render(<Recharge />);
    });
    amountInput = screen.getByLabelText(/¿cuánto deseas recargar?/i);
    submitButton = screen.getByRole('button', { name: /recargar/i });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Render forms function', () => {
    //** Renders a title, subtitles.
    it('should render all text, titles, subtitles.', () => {
      expect(screen.getByText(/generar recarga/i)).toBeInTheDocument();
    });

    //** Renders a inputs, buttons.
    it('should render all inputs, buttons.', () => {
      renderInput(amountInput);
      renderInput(submitButton);
    });
  });

  describe('Form actions', () => {
    //** Displays an error message when the user submits the form with an empty password field.
    it('should display an error message for empty recharge field', async () => {
      emptyField(submitButton, 'Campo obligatorio');
    });
  });

  describe('onSubmit function and call apis', () => {
    it('submit form and call api post', async () => {
      fireEvent.change(amountInput, { target: { value: '100.00' } });
      fireEvent.click(submitButton);

      // const payload = {
      //   fullName: 'Jhon Doe',
      //   phoneNumber: jest.fn(() => { return { plaintext: '123456789' }}),
      //   operationCode: 'DESTINATION_CHARGE',
      //   providerCode: 'PAGO_EFECTIVO',
      //   currencyCode: 'PEN',
      //   amount: amountInput.value,
      // };

      const payload = jest.fn (() => {
        return {
          fullName: 'Jhon Doe',
          phoneNumber: jest.fn(() => { return '123456789' }),
          operationCode: 'DESTINATION_CHARGE',
          providerCode: 'PAGO_EFECTIVO',
          currencyCode: 'PEN',
          amount: amountInput.value,
        }
      })

      await mockApi.post(`/payments/051999541/charge`, payload);

      await waitFor(() => {
        expect(mockApi.post).toHaveBeenCalledTimes(1);
        expect(mockApi.post).toHaveBeenCalledWith('/payments/051999541/charge', payload);
      });

    });
  });

  it('error message when amount is invalid min', async () => {
    fireEvent.change(amountInput, { target: { value: '0.00' } });
    fireEvent.click(submitButton);
    waitFor(() => expect(screen.getByText('El monto debe ser mayor o igual a S/ 1.00')).toBeInTheDocument());
  });

  it('error message when amount is invalid max', async () => {
    fireEvent.change(amountInput, { target: { value: '5000.00' } });
    fireEvent.click(submitButton);
    waitFor(() => expect(screen.getByText('El monto debe ser menor o igual a S/ 4950.00')).toBeInTheDocument());
  });
});