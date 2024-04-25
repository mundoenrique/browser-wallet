import { useRouter } from 'next/navigation';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
//Internal app
import Signin from '@/app/(Pages)/signin/page';
import { renderInput, emptyField, togglePasswordVisibility, redirectLinks } from '../../tools/unitTestHelper.test';
import { createMockRouter } from '@/utils/mocks';
import { useApi } from '@/hooks/useApi';
import { encryptForge } from '@/utils/toolHelper';

jest.mock('@next/third-parties/google', () => {
  return {
    GoogleTagManager: jest.fn(() => {
      return { plaintext: 'mocked plaintext' };
    }),
    sendGTMEvent: jest.fn(() => {
      return { plaintext: 'mocked plaintext' };
    }),
  };
});

jest.mock('@/utils/toolHelper', () => {
  return {
    encryptForge: jest.fn(() => {
      return { plaintext: 'mocked plaintext' };
    }),
  };
});

jest.mock('@/hooks/useApi', () => ({
  useApi: jest.fn(),
}));

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
  let router = createMockRouter({});
  let form: any;
  let passwordInput: any;
  let toggleButton: any;
  let submitButton: any;
  const userId = '943cc6d1-5f89-498d-933d-badba7a78046';
  const mockUserData = {
    firstName: 'John',
    lastName: 'Doe',
  };
  const mockApi = {
    post: jest.fn().mockResolvedValue({ status: 200 }),
    get: jest.fn().mockResolvedValue({ data: { data: mockUserData } }),
  };

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: routerPushMock });
    (useApi as jest.Mock).mockReturnValue(mockApi);
    render(<Signin />);
    form = screen.getByTestId('signin-form');
    passwordInput = screen.getByLabelText(/contraseña/i);
    toggleButton = screen.getByLabelText(/toggle password visibility/i);
    submitButton = screen.getByRole('button', { name: /ingresar/i });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  //** Renders a title, subtitles.
  it('should render logo, all text, titles, subtitles.', async () => {
    expect(screen.getByRole('img', { name: /logo/i })).toBeInTheDocument();
    expect(screen.getByText(/dinero en tu bolsillo/i)).toBeInTheDocument();
    expect(screen.getByText(/¡sin complicaciones!/i)).toBeInTheDocument();
    expect(screen.getByText(/para continuar, ingresa la contraseña de tu cuenta digital./i)).toBeInTheDocument();
  });

  //** Renders a form, inputs, buttons.
  it('should render all inputs, buttons.', () => {
    renderInput(form);
    renderInput(passwordInput);
    renderInput(toggleButton);
    renderInput(submitButton);
  });

  //** Displays errors empty field, a toggle button to show/hide the password.
  it('Validation input password and toggle button', async () => {
    emptyField(submitButton, 'ingrese una contraseña');
    togglePasswordVisibility(passwordInput, toggleButton);
  });

  //** Display a link to the password recovery page and navigate to password recovery page when link is clicked.
  it('should render password recovery link', () => {
    const textLink = screen.getByText(/olvide mi contraseña/i);
    const routePath = '/password-recover';
    redirectLinks(textLink, routePath, router);
  });

  //** Get user data
  it('call API getUserDetails', async () => {
    mockApi.get.mockResolvedValueOnce(JSON.stringify({ userId }));

    waitFor(() => {
      expect(mockApi.get).toHaveBeenCalled();
      expect(mockApi.get).toHaveBeenCalledWith(`/users/${userId}`);
      expect(screen.getByText(`¡Hola ${mockUserData.firstName}!`)).toBeInTheDocument();
     });
  });

  //** send form with correct information
  it('calls the API with the correct credentials', async () => {
    fireEvent.change(passwordInput, { target: { value: '123456' } });
    fireEvent.click(submitButton);
    fireEvent.submit(form);

    const requestData = {
      userId: userId,
      password: encryptForge(passwordInput)
    }

    mockApi.post.mockResolvedValueOnce({requestData});

    waitFor(() => {
      expect(mockApi.post).toHaveBeenCalled();
      expect(mockApi.post).toHaveBeenCalledTimes(1);
      expect(mockApi.post).toHaveBeenCalledWith('/users/credentials', requestData);
      expect(router.push).toHaveBeenCalledWith('/dashboard');
    });
  });

});
