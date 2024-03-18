import { useRouter } from 'next/navigation';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
//Internal app
import Signin from '@/app/(Pages)/signin/page';
import {
  togglePasswordVisibility,
  emptyField,
  renderInput
} from '../../tools/unitTestHelper';
import { createMockRouter } from '@/utils/mocks';

const routerPushMock = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('jose', () => {
  return {
    compactDecrypt: jest.fn(() => {
      return { plaintext: 'mocked plaintext' };
    }),
  };
});

describe('Signin', () => {
  let passwordInput: Node | Window;
  let submitButton: Node | Window;
  let toggleButton: HTMLElement;
  let passwordRecoveryLink: any;
  let router = createMockRouter({});

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: routerPushMock });
    render(<Signin />);
    expect(render).toBeTruthy();
    passwordInput = screen.getByLabelText(/contraseña/i);
    toggleButton = screen.getByLabelText(/toggle password visibility/i);
    submitButton = screen.getByRole('button', { name: /ingresar/i });
    passwordRecoveryLink = screen.getByText(/olvide mi contraseña/i);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  //** Renders a form with a logo.
  it('should render form and logo', () => {
    expect(screen.getByTestId('signin-form')).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /logo/i })).toBeInTheDocument();
  });

  //** Renders a title, subtitles.
  it('should render all text, titles, subtitles.', () => {
    expect(screen.getByText(/dinero en tu bolsillo/i)).toBeInTheDocument();
    expect(screen.getByText(/¡sin complicaciones!/i)).toBeInTheDocument();
    expect(screen.getByText(/¡hola andrea!/i)).toBeInTheDocument();
    expect(screen.getByText(/para continuar, ingresa la contraseña de tu cuenta digital./i)).toBeInTheDocument();
  });

  //** Renders a inputs, buttons.
  it('should render all inputs, buttons.', () => {
    renderInput(passwordInput);
    renderInput(toggleButton);
    renderInput(passwordRecoveryLink);
    renderInput(submitButton);
  });

  //** Displays an error message when the user submits the form with an empty password field.
  it('should display an error message for empty field', async () => {
    emptyField(submitButton, 'ingrese una contraseña');
  });

  //** Displays a toggle button to show/hide the password.
  it('should render a toggle button to show/hide the password', () => {
    togglePasswordVisibility(passwordInput, toggleButton);
  });

  //** Display a link to the password recovery page and navigate to password recovery page when link is clicked.
  it('should render password recovery link', () => {
    expect(passwordRecoveryLink).toBeInTheDocument();
    expect(passwordRecoveryLink.getAttribute('href')).toBe('/password-recover');
    fireEvent.click(passwordRecoveryLink);
    waitFor(() => {
      expect(router.push).toHaveBeenCalledWith('/password-recover');
    });
  });
});
