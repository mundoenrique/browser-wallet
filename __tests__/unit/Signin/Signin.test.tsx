import { useRouter } from 'next/navigation';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
//Internal app
import Signin from '@/app/(Pages)/signin/page';
import { renderInput, emptyField, togglePasswordVisibility, redirectLinks } from '../../tools/unitTestHelper.test';
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

const userId = '943cc6d1-5f89-498d-933d-badba7a78046';
jest.mock('@/hooks/useApi', () => ({
  useApi: () => ({
    get: jest.fn(() => Promise.resolve({ data: userId })),
    // post: jest.fn(() => Promise.resolve({ data: userData })),
  }),
}));

describe('Signin', () => {
  let router = createMockRouter({});

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: routerPushMock });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  //** Renders a title, subtitles.
  it('should render logo, all text, titles, subtitles.', () => {
    render(<Signin />);
    expect(screen.getByRole('img', { name: /logo/i })).toBeInTheDocument();
    expect(screen.getByText(/dinero en tu bolsillo/i)).toBeInTheDocument();
    expect(screen.getByText(/¡sin complicaciones!/i)).toBeInTheDocument();
    // expect(screen.getByText('¡Hola Jhon!')).toBeInTheDocument();
    expect(screen.getByText(/para continuar, ingresa la contraseña de tu cuenta digital./i)).toBeInTheDocument();
  });

  //** Renders a form, inputs, buttons.
  it('should render all inputs, buttons.', () => {
    render(<Signin />);
    let form = screen.getByTestId('signin-form');
    let passwordInput = screen.getByLabelText(/contraseña/i);
    let toggleButton = screen.getByLabelText(/toggle password visibility/i);
    let submitButton = screen.getByRole('button', { name: /ingresar/i });
    renderInput(form);
    renderInput(passwordInput);
    renderInput(toggleButton);
    renderInput(submitButton);
  });

  //** Displays errors empty field, a toggle button to show/hide the password.
  it('Validation input password and toggle button', async () => {
    render(<Signin />);
    let passwordInput = screen.getByLabelText(/contraseña/i);
    let toggleButton = screen.getByLabelText(/toggle password visibility/i);
    let submitButton = screen.getByRole('button', { name: /ingresar/i });
    emptyField(submitButton, 'ingrese una contraseña');
    togglePasswordVisibility(passwordInput, toggleButton);
  });

  //** Display a link to the password recovery page and navigate to password recovery page when link is clicked.
  it('should render password recovery link', () => {
    render(<Signin />);
    const textLink = screen.getByText(/olvide mi contraseña/i);
    const routePath = '/password-recover';
    redirectLinks(textLink, routePath, router);
  });

  it('call API getUserDetails', async () => {
    const getUserDetailsMock = jest.fn();
    render(<Signin getUserDetails={getUserDetailsMock} />);
    await waitFor(() => expect(getUserDetailsMock).toHaveBeenCalledTimes(1));
  });

  it('renders user data when userData is available', () => {
    const userData = { firstName: 'John', userId: '123' };
    render(<Signin userData={userData} />);
    expect(screen.getByText(`¡Hola ${userData.firstName}!`)).toBeInTheDocument();
  });

  it('calls onSubmit when form is submitted', async () => {
    const onSubmitMock = jest.fn();
    render(<Signin onSubmit={onSubmitMock} />);
    let form = screen.getByTestId('signin-form');
    fireEvent.submit(form);
    await waitFor(() => expect(onSubmitMock).toHaveBeenCalledTimes(1));
  });

});
