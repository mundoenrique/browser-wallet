import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { regularExpressions } from '@/config/validationForm/regex';

//** Renders main component
export const renderComponent = (component: any) => {
  render(component);
};

//** Function to validate render inputs
export const renderInput = async (inputName: any) => {
  expect(inputName).toBeInTheDocument();
};

//** Function to wshow error message when the user submits the form with an empty password field.
export const emptyField = async (submitButton: any, erroMsg: string) => {
  fireEvent.click(submitButton);
  await waitFor(() => {
    expect(screen.getByText(erroMsg)).toBeInTheDocument();
  });
};

//** Function to display a toggle button to show/hide the password.
export const togglePasswordVisibility = async (passwordInput: any, toggleButton: any) => {
  expect(passwordInput).toHaveAttribute('type', 'password');

  fireEvent.click(toggleButton);
  await waitFor(() => expect(passwordInput).toHaveAttribute('type', 'text'));

  fireEvent.click(toggleButton);
  await waitFor(() => expect(passwordInput).toHaveAttribute('type', 'password'));
};

//** Function to format password.
// export const passwordFormat = async (input: any) => {
//   const passwordInput = screen.getByLabelText(input);
//   fireEvent.change(passwordInput, { target: { value: '123' } });
//   await waitFor(() => expect(screen.getByText(/la contraseña debe tener 6 caracteres/i)).toBeInTheDocument());

//   fireEvent.change(passwordInput, { target: { value: '123' } });
//   await waitFor(() => expect(screen.getByText(/contraseña invalida/i)).toBeInTheDocument());

//   const isValid = regularExpressions.password?.test('123456');
//   // Check if validation error is displayed
//   if (!isValid) {
//     expect(screen.getByText(/contraseña invalida/i)).toBeInTheDocument();
//   }
// };
