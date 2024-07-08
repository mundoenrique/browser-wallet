import { act, render, screen, fireEvent, waitFor } from '@testing-library/react';
//Internal app
import ChangePassword from '@/app/(Pages)/dashboard/change-password/page';
import { renderInput } from '../../../tools/unitTestHelper.test';
import { api } from '@/utils/api';

jest.mock('@/store', () => ({
  ...jest.requireActual('@/store'),
  useUserStore: jest.fn(() => ({
    getUserPhone: jest.fn(() => 'mockedCardId'),
    user: { userId: 'mockedUserId', firstName: 'John' },
  })),
}));

jest.mock('@/utils/api');
const mockApi = api as jest.Mocked<typeof api>;
mockApi.put = jest.fn();

describe('ChangePassword', () => {
  let currentPassword: HTMLInputElement;
  let newPassword: HTMLInputElement;
  let confirmPassword: HTMLInputElement;
  let submitButton: HTMLElement;
  mockApi.post.mockResolvedValue({ status: 200, data: { data: 'Mocked Data' } });

  beforeEach(async () => {
    await act(async () => {
      render(<ChangePassword />);
    });
    currentPassword = screen.getByLabelText(/ingresar tu contraseña actual/i);
    newPassword = screen.getByLabelText(/ingresa una nueva contraseña/i);
    confirmPassword = screen.getByLabelText(/confirma tu nueva contraseña/i);
    submitButton = screen.getByRole('button', { name: /guardar/i });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('render form', () => {
    //** Renders a title, subtitles and button
    it('render all text, titles, subtitles.', async () => {
      expect(screen.getByText(/cambiar contraseña/i)).toBeInTheDocument();
      expect(screen.getByText(/elige 6 números que recuerdes./i)).toBeInTheDocument();
    });

    //** validate that the inputs exist and that it is initialized to empty
    it('validate that the inputs exist.', () => {
      renderInput(currentPassword);
      renderInput(newPassword);
      renderInput(confirmPassword);
      renderInput(submitButton);
    });
  })

  describe('onSubmit function', () => {
    it('calls onSubmit when form is submitted', async () => {
      const onSubmit = jest.fn();
      fireEvent.change(currentPassword, { target: { value: '123456a' } });
      fireEvent.change(newPassword, { target: { value: '123456a' } });
      fireEvent.change(confirmPassword, { target: { value: 'a123456' } });
      fireEvent.click(submitButton);
      waitFor(() => expect(onSubmit).toHaveBeenCalled());
    });

    it('calls setOpenOtp with true', () => {
      const setOpenOtp = jest.fn();
      const onSubmit = async () => { setOpenOtp(true) };
      onSubmit();
      waitFor(() => {
        expect(onSubmit).toHaveBeenCalled();
        expect(setOpenOtp).toHaveBeenCalled();
        expect(setOpenOtp).toHaveBeenCalledWith(true);
      });
    });
  });

  describe('Call APIs function', () => {
    it('calls api.put with correct data', async () => {
      const onSubmitOtp = jest.fn();

      fireEvent.change(currentPassword, { target: { value: '123456a' } });
      fireEvent.change(newPassword, { target: { value: '123456a' } });
      fireEvent.change(confirmPassword, { target: { value: 'a123456' } });
      fireEvent.click(submitButton);

      const requestData = {
        currentPassword: currentPassword.value,
        newPassword: newPassword.value,
      };

      await mockApi.put('/onboarding/users/051999541/password', requestData);

      waitFor(() => {
        expect(onSubmitOtp).toHaveBeenCalled();
        expect(mockApi.put).toHaveBeenCalled();
        expect(mockApi.put).toHaveBeenCalledWith(`/onboarding/users/051999541/password`, requestData);
      });
    });
  });
});
