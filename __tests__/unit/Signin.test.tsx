import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import userEvent from '@testing-library/user-event';
import Signin from '@/app/(Onboarding)/signin/page';

describe('Signin', () => {
  const mockRouter = { push: jest.fn() };

  beforeEach(() => {
    render(<Signin />);
  });

  it('should render the form', () => {
    expect(screen.getByTestId('signin-form')).toBeInTheDocument();
  });

  it('should render password input and login button', () => {
    expect(screen.getByTestId('password-input')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Ingresar/i })).toBeInTheDocument();
  });

  it('should not show any validation errors before login is attempted', () => {
    expect(screen.queryByText(/Ingresa una contraseña/i)).not.toBeInTheDocument();
  });

  it('should have the correct href for the forgot password link', () => {
    const link = screen.getByText(/Olvide mi contraseña/i);
    expect(link).toBeInTheDocument();
    expect(link.getAttribute('href')).toBe('/password-recover');
  });

  it('should show validation error if form is submitted without entering password', async () => {
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /Ingresar/i }));
    });
    expect(await screen.findByText(/Ingresa una contraseña/i)).toBeInTheDocument();
    expect(mockRouter.push).not.toHaveBeenCalled();
  });

  it('should call router.push with "/dashboard" when form is submitted with password', async () => {
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    await userEvent.type(screen.getByTestId('password-input'), '123456');
    fireEvent.click(screen.getByRole('button', { name: /Ingresar/i }));
    await waitFor(() => {
      expect(mockRouter.push).toHaveBeenCalledWith(`/dashboard`);
    });
  });
});
