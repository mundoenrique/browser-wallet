import { act, render, screen, fireEvent, waitFor } from '@testing-library/react';
//Internal app
import ModalOtp from '@/components/modal/ModalOtp';
import ChangePassword from '@/app/(Pages)/dashboard/change-password/page';
import { emptyField, renderInput } from '../../../tools/unitTestHelper.test';

describe('ChangePassword', () => {
  const openOtp = true;
  const setOpenOtp = jest.fn();
  const onSubmitOtp = jest.fn();

  let currentPassword: HTMLInputElement;
  let newPassword: HTMLInputElement;
  let confirmPassword: HTMLInputElement;
  let submitButton: HTMLElement;

  beforeEach(async () => {
    await act(async () => {
      render(<ChangePassword />);
    });
    expect(render).toBeTruthy();
    currentPassword = screen.getByLabelText(/ingresar tu contraseña actual/i);
    newPassword = screen.getByLabelText(/ingresa una nueva contraseña/i);
    confirmPassword = screen.getByLabelText(/confirma tu nueva contraseña/i);
    submitButton = screen.getByRole('button', { name: /guardar/i });
  });

  //** Renders a title, subtitles and button
  it('should render all text, titles, subtitles.', () => {
    expect(screen.getByText(/cambiar contraseña/i)).toBeInTheDocument();
    expect(screen.getByText(/elige 6 números que recuerdes./i)).toBeInTheDocument();
    expect(screen.getByText(/evita utilizar tu fecha de cumpleaños para que sea más segura/i)).toBeInTheDocument();
  });

  //** validate that the inputs exist and that it is initialized to empty
  it('validate that the inputs exist and that it is initialized to empty.', () => {
    renderInput(currentPassword);
    renderInput(newPassword);
    renderInput(confirmPassword);
    renderInput(submitButton);
  });

  //** Displays an error message when the user submits the form with an empty password field.
  it('should display an error message for empty password field', async () => {
    emptyField(submitButton, 'Ingrese una contraseña');
  });

  //** Displays a submit form.
  it('should display save password', async () => {
    fireEvent.change(currentPassword, { target: { value: '231546' } });
    fireEvent.change(newPassword, { target: { value: '789456' } });
    fireEvent.change(confirmPassword, { target: { value: '789456' } });
    fireEvent.click(submitButton);
    render(<ModalOtp open={openOtp} handleClose={() => setOpenOtp(false)} onSubmit={onSubmitOtp} />);
    await waitFor(() => screen.getByTitle('🎰 Verificación en dos pasos'));
    expect(screen.getByTitle('🎰 Verificación en dos pasos')).toBeInTheDocument();
    const otpInput = screen.getByText('Ingresa el código enviado a tu número celular +51 *** *** 1214');
    expect(otpInput).toBeInTheDocument();
    fireEvent.change(otpInput, { target: { value: '1234' } });
    renderInput(screen.getByRole('button', { name: /continuar/i }));
    fireEvent.click(screen.getByRole('button', { name: /continuar/i }));
    await waitFor(() => expect(screen.getByTestId('modal-succes')).toBeInTheDocument());
  });
});
