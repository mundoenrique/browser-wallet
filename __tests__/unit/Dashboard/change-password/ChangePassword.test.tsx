import { act, render, screen, fireEvent, waitFor } from '@testing-library/react';
//Internal app
import ChangePassword from '@/app/(Pages)/dashboard/change-password/page';
import ModalOtp from '@/components/modal/ModalOtp';
import { renderInput } from '../../../tools/unitTestHelper.test';
import { api } from '@/utils/api';

jest.mock('@/store', () => ({
  ...jest.requireActual('@/store'),
  useUserStore: jest.fn(() => ({
    getUserPhone: jest.fn(() => '+51912345678'),
    user: { userId: 'mockedUserId', firstName: 'John' },
  })),
}));

jest.mock('@/utils/api');
const mockApi = api as jest.Mocked<typeof api>;

describe('ChangePassword', () => {
  let currentPassword: HTMLInputElement;
  let newPassword: HTMLInputElement;
  let confirmPassword: HTMLInputElement;
  let submitButton: HTMLElement;
  let otpInput: HTMLInputElement;
  let otpButton: HTMLElement;
  const sendGTMEvent = jest.fn();

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

  describe('Render forms function', () => {
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

  describe('Navigates sendGtmEvent', () => {
    it('sendGTMEvent onSubmit form open modal', async () => {
      fireEvent.change(currentPassword, { target: { value: '123456a' } });
      fireEvent.change(newPassword, { target: { value: '123456a' } });
      fireEvent.change(confirmPassword, { target: { value: 'a123456' } });
      fireEvent.click(submitButton);

      waitFor(() => {
        expect(sendGTMEvent).toHaveBeenCalled();
        expect(sendGTMEvent).toHaveBeenCalledWith({
          event: 'ga4.trackEvent',
          eventName: 'select_content',
          eventParams: {
            content_type: 'boton_modal',
            section: 'Yiro :: cambiarContraseña',
            previous_section: 'dashboard',
            selected_content: 'Verificar',
            destination_page: `http://localhost:3000/dashboard/change-password`,
            pop_up_type: 'Cambiar contraseña',
            pop_up_title: 'Verificación en dos pasos',
          },
        });
      });
    });
  });
});
