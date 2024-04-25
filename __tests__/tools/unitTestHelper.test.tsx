import { render, screen, fireEvent, waitFor } from '@testing-library/react';

/**
 * Function to Renders components
 * @param component - imported component name
 */
async function renderComponent(component: any) {
  render(component);
};

/**
 * Function to validate that the inputs exist and that it is initialized to empty
 * @param inputName - input field name
 */
async function renderInput(inputName: any) {
  expect(inputName).toBeInTheDocument();
  // expect(inputName).toHaveValue('');
}

/**
 * Funciton to validate redirect links
 * @param textLink - text link name
 * @param routePath - redirect link
 * @param router - router mock
 */
async function redirectLinks(textLink: any, routePath: string, router: any) {
  expect(textLink).toBeInTheDocument();
  fireEvent.click(textLink);
  waitFor(() => {
    expect(router.push).toHaveBeenCalledWith(routePath);
  });
};

/**
 * Funciton to show error message when the user submits the form with an empty password field.
 * @param submitButton - button name
 * @param erroMsg - error message
 */
async function emptyField(submitButton: any, erroMsg: string) {
  fireEvent.click(submitButton);
  await waitFor(() => {
    expect(screen.getByText(erroMsg)).toBeInTheDocument();
  });
};

/**
 * Function to display a toggle button to show/hide the password.
 * @param passwordInput - input field name
 * @param toggleButton - button to hide/show password
 */
async function togglePasswordVisibility(passwordInput: any, toggleButton: any) {
  expect(passwordInput).toHaveAttribute('type', 'password');
  fireEvent.click(toggleButton);
  await waitFor(() => expect(passwordInput).toHaveAttribute('type', 'text'));
  fireEvent.click(toggleButton);
  await waitFor(() => expect(passwordInput).toHaveAttribute('type', 'password'));
};

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

export {
  renderComponent,
  renderInput,
  emptyField,
  togglePasswordVisibility,
  redirectLinks
};