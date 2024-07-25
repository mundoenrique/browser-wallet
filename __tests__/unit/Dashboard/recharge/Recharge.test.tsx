import { act, render, screen, fireEvent, waitFor } from '@testing-library/react';
//Internal app
import Recharge from '@/app/(Pages)/dashboard/recharge/page';
import { renderInput, mockRouterPush } from '../../../tools/unitTestHelper.test';
import { api } from '@/utils/api';

jest.mock('@/store', () => ({
  ...jest.requireActual('@/store'),
  useUserStore: jest.fn(() => ({
    getUserPhone: jest.fn(() => '123456789'),
    user: { userId: 'mockedUserId', firstName: 'John' },
  })),
}));

jest.mock('@/utils/api');
const mockApi = api as jest.Mocked<typeof api>;

describe('Recharge', () => {
  let amountInput: HTMLInputElement;
  let submitButton: HTMLElement;
  const routerPushMock = jest.fn();

  beforeEach(async () => {
    mockRouterPush(routerPushMock);
    await act(async () => {
      render(<Recharge />);
    });
    amountInput = screen.getByLabelText(/¿cuánto deseas recargar?/i);
    submitButton = screen.getByRole('button', { name: /recargar/i });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Render forms', () => {
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

  describe('Show errors and call api.post', () => {
    it('error message when amount is invalid min', async () => {
      fireEvent.change(amountInput, { target: { value: '0.50' } });
      fireEvent.click(submitButton);
      waitFor(() => expect(screen.getByText('El monto debe ser mayor o igual a S/ 1.00')).toBeInTheDocument());
    });

    it('error message when amount is invalid max', async () => {
      fireEvent.change(amountInput, { target: { value: '5000.00' } });
      fireEvent.click(submitButton);
      waitFor(() => expect(screen.getByText('El monto debe ser menor o igual a S/ 4950.00')).toBeInTheDocument());
    });
  })
});
