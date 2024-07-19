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

    // it('sendGTMEvent close modal', async () => {
    //   const openOtp = true;
    //   const onSubmitOtp = jest.fn();
    //   const setOpenOtp = jest.fn();

    //   await act(async () => {
    //     await render(
    //       <ModalOtp
    //         open={openOtp}
    //         handleClose={() => { setOpenOtp(false) }}
    //         onSubmit={onSubmitOtp}
    //         processCode="CHANGE_PASSWORD_OTP"
    //       />
    //     );
    //   });


    //   const closeModal = screen.getByText('Cerrar');
    //   fireEvent.click(closeModal);

    //   waitFor(() => {
    //     expect(sendGTMEvent).toHaveBeenCalled();
    //     expect(sendGTMEvent).toHaveBeenCalledWith({
    //       event: 'ga4.trackEvent',
    //       eventName: 'select_content',
    //       eventParams: {
    //         content_type: 'boton_modal',
    //         section: 'Yiro :: cambiarContraseña',
    //         previous_section: 'dashboard',
    //         selected_content: 'Cerrar',
    //         destination_page: `http://localhost:3000/dashboard/change-password`,
    //         pop_up_type: 'Cambiar contraseña',
    //         pop_up_title: 'Verificación en dos pasos',
    //       },
    //     });
    //   });
    // });
  });

  describe('onSubmit function and call apis', () => {
    // it('calls onSubmit open modal', async () => {
    //   const onSubmitOtp = jest.fn();
    //   const setOpenOtp = jest.fn();

    //   fireEvent.change(currentPassword, { target: { value: '123456a' } });
    //   fireEvent.change(newPassword, { target: { value: '123456a' } });
    //   fireEvent.change(confirmPassword, { target: { value: 'a123456' } });
    //   fireEvent.click(submitButton);

    //   render(
    //     <ModalOtp
    //       open={true}
    //       handleClose={() => { setOpenOtp(false) }}
    //       onSubmit={onSubmitOtp}
    //       processCode="CHANGE_PASSWORD_OTP"
    //     />
    //   );


    //   await waitFor(() => expect(ModalOtp).toHaveBeenCalled());
    // });

    // it('calls onSubmitOtp api.post validate tfa', async () => {
    //   const onSubmitOtp = jest.fn();
    //   const setOpenOtp = jest.fn();
    //   await act(async () => {
    //     render(
    //       <ModalOtp
    //         open={true}
    //         handleClose={() => { setOpenOtp(false) }}
    //       onSubmit={onSubmitOtp}
    //       processCode="CHANGE_PASSWORD_OTP"
    //       />
    //     );
    //   });

    //   otpInput = screen.getByRole('textbox', { name: /otp/i });
    //   submitButton = screen.getByRole('button', { name: /verificar/i });

    //   fireEvent.change(otpInput, { target: { value: '1234' } });
    //   fireEvent.click(otpButton);

    //   const setLoadinScreen = jest.fn(() => true);

    //   const payload = {
    //     otpProcessCode: 'CHANGE_PASSWORD_OTP',
    //     otpUuId: '1123456789',
    //     otpCode: otpInput.value,
    //   };

    //   await mockApi.post('/users/051999541/validate/tfa', payload);

    //   await waitFor(() => {
    //     expect(mockApi.post).toHaveBeenCalledTimes(1);
    //     expect(mockApi.post).toHaveBeenCalledWith(`/users/051999541/validate/tfa`, payload);
    //   });

      // waitFor(() => {
      //   expect(sendGTMEvent).toHaveBeenCalled();
      //   expect(sendGTMEvent).toHaveBeenCalledWith({
      //     event: 'ga4.trackEvent',
      //     eventName: 'select_content',
      //     eventParams: {
      //       content_type: 'boton_modal',
      //       section: 'Yiro :: cambiarContraseña',
      //       previous_section: 'dashboard',
      //       selected_content: 'Verificar',
      //       destination_page: `http://localhost:3000/dashboard/change-password`,
      //       pop_up_type: 'Cambiar contraseña',
      //       pop_up_title: 'Verificación en dos pasos',
      //     },
      //   });
      // });
    // });

    // it('calls onSubmit when form is submitted', async () => {
    //   fireEvent.change(currentPassword, { target: { value: '123456a' } });
    //   fireEvent.change(newPassword, { target: { value: '123456a' } });
    //   fireEvent.change(confirmPassword, { target: { value: 'a123456' } });
    //   fireEvent.click(submitButton);

    //   const requestData = {
    //     currentPassword: currentPassword.value,
    //     newPassword: newPassword.value,
    //   };

    //   await mockApi.put('/onboarding/users/051999541/password', requestData);

    //   await waitFor(() => {
    //     expect(mockApi.put).toHaveBeenCalledTimes(1);
    //     expect(mockApi.put).toHaveBeenCalledWith(`/onboarding/users/051999541/password`, requestData);
    //   });
    // });

    // it('API recharge error', async () => {
    //   await mockApi.put.mockImplementation(() => Promise.reject(new Error('API error')));

    //   await waitFor(() => {
    //     expect(mockApi.put).toHaveBeenCalled();
    //   });
    // });
  });
});
