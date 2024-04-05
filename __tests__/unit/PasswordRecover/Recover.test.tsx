import { render, screen, fireEvent } from '@testing-library/react';
//Internal app
import Recover from '@/app/(Pages)/password-recover/page';

jest.mock('jose', () => {
  return {
    compactDecrypt: jest.fn(() => {
      return { plaintext: 'mocked plaintext' };
    }),
  };
});

jest.mock('mui-one-time-password-input', () => {
  return {
    compactDecrypt: jest.fn(() => {
      return { plaintext: 'mocked plaintext' };
    }),
  };
});

describe('Recover', () => {
  let title: Node | Window;
  let otpInput: Node | Window;
  let continueButton: Node | Window;

  test('renders OTP component when otpValid is false', async () => {
    render(<Recover />);
    title = screen.getByTitle('Recupera tu contraseña');
    otpInput = screen.getByText('Hemos enviado por tu seguridad un código SMS a tu celular *6549. Ingrésalo aquí.');
    continueButton = screen.getByRole('button', { name: /continuar/i });
    expect(title).toBeInTheDocument();
    expect(otpInput).toBeInTheDocument();
    expect(continueButton).toBeInTheDocument();
  });


  test('calls setOTP when the OTP is entered and verified', async () => {
    const setOTP = jest.fn();
    render(<Recover />);
    otpInput = screen.getByText('Hemos enviado por tu seguridad un código SMS a tu celular *6549. Ingrésalo aquí.');
    // Simulate entering a valid OTP
    fireEvent.change(otpInput, { target: { value: '1234' } });
    continueButton = screen.getByRole('button', { name: /continuar/i });
    fireEvent.click(continueButton);
    expect(setOTP).toHaveBeenCalledWith(true);
    expect(screen.getByTitle('Recuperar tu contraseña')).toBeInTheDocument();
    expect(screen.getByText(/elige 6 números que recuerdes./i)).toBeInTheDocument();
    expect(screen.getByText('Evita fechas de cumpleaños, números consecutivos ó iguales.')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /continuar/i })).toBeInTheDocument();
  });
});