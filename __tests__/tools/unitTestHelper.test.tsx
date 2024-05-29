import { render, screen, fireEvent, waitFor } from '@testing-library/react';

/**
 * Function to validate that the inputs exist and that it is initialized to empty
 * @param inputName - input field name
 */
async function renderInput(inputName: HTMLElement) {
  expect(inputName).toBeInTheDocument();
}

/**
 * Funciton to validate redirect links
 * @param textLink - text link name
 * @param routePath - redirect link
 * @param router - router mock
 */
async function redirectLinks(textLink: HTMLElement, routePath: string, router: Function) {
  expect(textLink).toBeInTheDocument();
  expect(textLink).toHaveAttribute('href', routePath);
  fireEvent.click(textLink);
  await waitFor(() => {
    expect(router).toHaveBeenCalledWith(routePath);
  });
}

/**
 * Funciton to show error message when the user submits the form with an empty password field.
 * @param submitButton - button name
 * @param erroMsg - error message
 */
function emptyField(submitButton: HTMLElement, erroMsg: string) {
  fireEvent.click(submitButton);
  waitFor(() => {
    expect(screen.queryByText(erroMsg)).toBeInTheDocument();
  });
}

/**
 * Function to display a toggle button to show/hide the password.
 * @param passwordInput - input field name
 * @param toggleButton - button to hide/show password
 */
function togglePasswordVisibility(passwordInput: HTMLInputElement, toggleButton: HTMLElement) {
  expect(passwordInput).toHaveAttribute('type', 'password');
  fireEvent.click(toggleButton);
  waitFor(() => expect(passwordInput).toHaveAttribute('type', 'text'));
  fireEvent.click(toggleButton);
  waitFor(() => expect(passwordInput).toHaveAttribute('type', 'password'));
}

//** Function to format password.
// async function passwordFormat(input: any) {
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

export { renderInput, emptyField, togglePasswordVisibility, redirectLinks };
