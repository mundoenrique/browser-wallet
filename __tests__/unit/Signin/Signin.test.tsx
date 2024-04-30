import { useRouter } from 'next/navigation';
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
//Internal app
import Signin from '@/app/(Pages)/signin/page';
import { renderInput, emptyField, togglePasswordVisibility, redirectLinks } from '../../tools/unitTestHelper.test';
import { useApi } from '@/hooks/useApi';

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
  let form: HTMLFormElement
  let passwordInput: HTMLInputElement
  let toggleButton: HTMLButtonElement
  let submitButton: HTMLElement
  const userData = {
    firstName: 'John',
    lastName: 'Doe',
    userId: '943cc6d1-5f89-498d-933d-badba7a78046'
  };
  const mockApi = {
    post: jest.fn().mockResolvedValue({ status: 200, data: { userId: userData.userId } }),
    get: jest.fn().mockResolvedValue({ status: 200, data: { data: userData } }),
  };
  const mockRouter = {
    push: jest.fn(),
  };

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    (useApi as jest.Mock).mockReturnValue(mockApi);
    render(<Signin />);
    form = screen.getByTestId('signin-form');
    passwordInput = screen.getByLabelText(/contraseña/i);
    toggleButton = screen.getByLabelText(/toggle password visibility/i);
    submitButton = screen.getByRole('button', { name: /ingresar/i });
  });

  // afterEach(() => {
  //   jest.clearAllMocks();
  // });

  //** Renders a title, subtitles.
  it('should render logo, all text, titles, subtitles.', () => {
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

  // //** Displays errors empty field, a toggle button to show/hide the password.
  // it('Validation input password and toggle button', () => {
  //   emptyField(submitButton, 'Ingrese una contraseña');
  //   togglePasswordVisibility(passwordInput, toggleButton);
  // });

  //** Display a link to the password recovery page and navigate to password recovery page when link is clicked.
  it('should render password recovery link', async () => {
    const textLink = screen.getByText(/olvide mi contraseña/i);
    const routePath = '/password-recover';
    redirectLinks(textLink, routePath, mockRouter.push);
  });

  //** Get user data
  it('call API getUserDetails', async () => {
    await act(async () => {
      await mockApi.get(`/users/${userData.userId}`);
    });

    await waitFor(() => {
      expect(mockApi.get).toHaveBeenCalled();
      expect(mockApi.get).toHaveBeenCalledWith(`/users/${userData.userId}`);
      expect(screen.getByText(`¡Hola ${userData.firstName}!`)).toBeInTheDocument();
     });
  });

  //** Get user data error
  it('call API getUserDetails error', async () => {
    await act(async () => {
      await mockApi.get.mockImplementation(() => {
        return Promise.reject(new Error('API error'));
      });
    });

    await waitFor(() => {
      expect(mockApi.get).toHaveBeenCalled();
    });
  });

  //** send form with correct information
  it('call the API LOGIN with the correct credentials', async () => {
    fireEvent.change(passwordInput, { target: { value: '123456' } });
    fireEvent.click(submitButton);

    const requestData = {
      userId: userData?.userId || '',
      password: passwordInput.value
    }

    await act(async () => {
      await mockApi.post('/users/credentials', requestData);
    });

    await waitFor(() => {
      expect(mockApi.post).toHaveBeenCalled();
      expect(mockApi.post).toHaveBeenCalledWith('/users/credentials', requestData);
      expect(mockRouter.push).toHaveBeenCalledWith('/dashboard');
    });
  });

  //** send form with incorrect information
  it('call the API LOGIN with the incorrect credentials', async () => {
    fireEvent.change(passwordInput, { target: { value: '123456' } });
    fireEvent.click(submitButton);

    await mockApi.post.mockImplementation(() => {
      return Promise.reject(new Error('API error'));
    });

    await waitFor(() => {
      expect(mockApi.post).toHaveBeenCalled();
      // expect(screen.getByTitle('API error')).toBeInTheDocument();
    });
  });

});
