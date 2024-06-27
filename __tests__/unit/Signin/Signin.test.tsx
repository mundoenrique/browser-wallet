import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
//Internal app
import { api } from '@/utils/api';
import Signin from '@/app/(Pages)/signin/page';
import { renderInput, redirectLinks, mockRouterPush } from '../../tools/unitTestHelper.test';

jest.mock('@/utils/api');
const mockApi = api as jest.Mocked<typeof api>;

describe('Signin', () => {
  let form: HTMLFormElement;
  let passwordInput: HTMLInputElement;
  let toggleButton: HTMLButtonElement;
  let submitButton: HTMLElement;
  const userData = {
    firstName: 'John',
    lastName: 'Doe',
    userId: '943cc6d1-5f89-498d-933d-badba7a78046',
  };

  mockApi.get.mockResolvedValue({ status: 200, data: { data: userData } });
  mockApi.post.mockResolvedValue({ status: 200, data: { userId: userData.userId } });
  const routerPushMock = jest.fn();

  beforeEach(async () => {
    mockRouterPush(routerPushMock)
    await act(async () => {
      render(<Signin />);
    });
    form = screen.getByTestId('signin-form');
    passwordInput = screen.getByLabelText(/contraseña/i);
    toggleButton = screen.getByLabelText(/toggle password visibility/i);
    submitButton = screen.getByRole('button', { name: /ingresar/i });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('API calls', () => {
    it('should call API getUserDetails and render logo, all text, titles, subtitles', async () => {
      await mockApi.get(`/users/${userData.userId}`);

      await waitFor(() => {
        expect(mockApi.get).toHaveBeenCalled();
        expect(mockApi.get).toHaveBeenCalledWith(`/users/${userData.userId}`);
        expect(screen.getByRole('img', { name: /logo/i })).toBeInTheDocument();
        expect(screen.getByText(/dinero en tu bolsillo/i)).toBeInTheDocument();
        expect(screen.getByText(/¡sin complicaciones!/i)).toBeInTheDocument();
        expect(screen.getByText(`¡Hola ${userData.firstName}!`)).toBeInTheDocument();
        expect(screen.getByText(/para continuar, ingresa la contraseña de tu cuenta digital./i)).toBeInTheDocument();
      });
    });

    it('should handle API getUserDetails error', async () => {
      mockApi.get.mockImplementation(() => Promise.reject(new Error('API error')));

      await waitFor(() => {
        expect(mockApi.get).toHaveBeenCalled();
      });
    });
  });

  describe('Form interactions', () => {
    it('should render all inputs, buttons', () => {
      renderInput(form);
      renderInput(passwordInput);
      renderInput(toggleButton);
      renderInput(submitButton);
    });

    it('should render password recovery link and navigate to password recovery page when link is clicked', async () => {
      const textLink = screen.getByText(/olvide mi contraseña/i);
      const routePath = '/password-recover';
      redirectLinks(textLink, routePath, routerPushMock);
    });

    it('should call the API LOGIN with the correct credentials and navigate to dashboard', async () => {
      fireEvent.change(passwordInput, { target: { value: '123456' } });
      fireEvent.click(submitButton);

      const requestData = {
        userId: userData?.userId || '',
        password: passwordInput.value,
      };

      await mockApi.post('/users/credentials', requestData);

      await waitFor(() => {
        expect(mockApi.post).toHaveBeenCalled();
        expect(mockApi.post).toHaveBeenCalledWith('/users/credentials', requestData);
        expect(routerPushMock).toHaveBeenCalledWith('/dashboard');
      });
    });

    it('should handle API LOGIN error when credentials are incorrect', async () => {
      fireEvent.change(passwordInput, { target: { value: '123456' } });
      fireEvent.click(submitButton);

      mockApi.post.mockImplementation(() => Promise.reject(new Error('API error')));

      await waitFor(() => {
        expect(mockApi.post).toHaveBeenCalled();
      });
    });
  });
});
