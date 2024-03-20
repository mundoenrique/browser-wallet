import { render, screen, fireEvent, waitFor } from '@testing-library/react';

//** Renders components
async function renderComponent(component: any) {
  render(component);
};

//** validate that the inputs exist and that it is initialized to empty
async function renderInput(inputName: any) {
  expect(inputName).toBeInTheDocument();
  expect(inputName).toHaveValue('');
}

//** Function to validate redirect links
async function redirectLinks(textLink: any, routePath: string, router: any) {
  expect(textLink).toBeInTheDocument();
  fireEvent.click(textLink);
  waitFor(() => {
    expect(router.push).toHaveBeenCalledWith(routePath);
  });
};

//** Function to wshow error message when the user submits the form with an empty password field.
async function emptyField(submitButton: any, erroMsg: string) {
  fireEvent.click(submitButton);
  await waitFor(() => {
    expect(screen.getByText(erroMsg)).toBeInTheDocument();
  });
};

//** Function to display a toggle button to show/hide the password.
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