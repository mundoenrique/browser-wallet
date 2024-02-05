import { useRouter } from 'next/navigation';
import { createMockRouter } from '@/utils/mocks';
import Signin from '@/app/(Onboarding)/signin/page';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

const routerPushMock = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('Signin', () => {
  const validaPassword = '123456';
  const incorrectPassword = '123.45';
  let passwordInput: Node | Window;
  let submitButton: Node | Window;
  let router = createMockRouter({});

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: routerPushMock });
    render(<Signin />);
    passwordInput = screen.getByLabelText(/contraseña/i);
    submitButton = screen.getByRole('button', { name: /ingresar/i });
  });

  // Renders a form with a logo, a title, a subtitle, a password input field, and a submit button.
  it('should render all necessary elements', () => {
    expect(screen.getByTestId('signin-form')).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /logo/i })).toBeInTheDocument();
    expect(screen.getByText(/dinero en tu bolsillo/i)).toBeInTheDocument();
    expect(screen.getByText(/¡sin complicaciones!/i)).toBeInTheDocument();
    expect(screen.getByText(/¡hola andrea!/i)).toBeInTheDocument();
    expect(screen.getByText(/para continuar, ingresa la contraseña de tu cuenta digital./i)).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  // Displays an error message when the user submits the form with an empty password field.
  it('should display an error message for empty password field', async () => {
    fireEvent.click(submitButton);
    await waitFor(() => {
      expect(screen.getByText(/Ingresa una contraseña/i)).toBeInTheDocument();
    });
  });

  // Redirects the user to the dashboard page when the user submits the form with a valid password.
  it('should redirect to dashboard page on valid password submission', async () => {
    fireEvent.change(passwordInput, { target: { value: validaPassword } });
    fireEvent.click(submitButton);
    await waitFor(() => {
      expect(routerPushMock).toHaveBeenCalledWith('/dashboard');
    });
  });

  // Displays an error message when the user submits the form with an invalid password.
  it('should display error message for invalid password', async () => {
    fireEvent.change(passwordInput, { target: { value: incorrectPassword } });
    fireEvent.click(submitButton);
    await waitFor(() => {
      expect(routerPushMock).not.toHaveBeenCalled();
      expect(screen.getByText(/contraseña incorrecta/i)).toBeInTheDocument();
    });
  });

  // Displays an error message when the user submits the form with a password that is too short.
  it('should display error message for password that is too short', async () => {
    fireEvent.change(passwordInput, { target: { value: '123' } });
    fireEvent.click(submitButton);
    await waitFor(() => {
      expect(routerPushMock).not.toHaveBeenCalled();
      expect(screen.getByText(/la contraseña debe tener al menos 6 caracteres/i)).toBeInTheDocument();
    });
  });

  // Displays an error message when the user submits the form with a password that is too long.
  it('should display error message for password that is too long', async () => {
    fireEvent.change(passwordInput, { target: { value: '1234567890.1234567890.1234' } });
    fireEvent.click(submitButton);
    await waitFor(() => {
      expect(routerPushMock).not.toHaveBeenCalled();
      expect(screen.getByText(/la contraseña debe tener máximo 25 caracteres/i)).toBeInTheDocument();
    });
  });

  // Displays an error message when the user submits the form with a password that contains invalid characters.
  it('should display an error message when the user submits the form with a password that contains invalid characters', async () => {
    fireEvent.change(passwordInput, { target: { value: 'invalid@password' } });
    fireEvent.click(submitButton);
    await waitFor(() => {
      expect(routerPushMock).not.toHaveBeenCalled();
      expect(screen.getByText(/ingrese una contraseña/i)).toBeInTheDocument();
    });
  });

  // Displays a toggle button to show/hide the password.
  it('should render a toggle button to show/hide the password', () => {
    const toggleButton = screen.getByLabelText('toggle password visibility');
    expect(toggleButton).toBeInTheDocument();
  });

  // Displays a link to the password recovery page.
  it('should render password recovery link', () => {
    const passwordRecoveryLink = screen.getByText(/olvide mi contraseña/i);
    expect(passwordRecoveryLink).toBeInTheDocument();
    expect(passwordRecoveryLink.getAttribute('href')).toBe('/password-recover');
  });

  // Clicks on the link and navigates to the password recovery page.
  it('should navigate to password recovery page when link is clicked', () => {
    const passwordRecoveryLink = screen.getByText(/olvide mi contraseña/i);
    fireEvent.click(passwordRecoveryLink);
    waitFor(() => {
      expect(router.push).toHaveBeenCalledWith('/password-recover');
    });
  });
});
