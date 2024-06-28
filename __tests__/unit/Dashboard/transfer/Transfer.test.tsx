import { act, render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
//Internal app
import Transfer from '@/app/(Pages)/dashboard/transfer/page';
import { emptyField, renderInput } from '../../../tools/unitTestHelper.test';

describe('Transfer', () => {
  let numberClient: HTMLInputElement;
  let amount: HTMLInputElement;
  let submitButton:  HTMLElement;

  beforeEach(async () => {
    await act(async () => {
      render(<Transfer />);
    });
    expect(render).toBeTruthy();
    numberClient = screen.getByLabelText(/¿a quién quieres transferir dinero?/i);
    amount = screen.getByLabelText(/¿cuánto dinero quieres transferir?/i);
    submitButton = screen.getByRole('button', { name: /enviar/i });
  });

  //** Renders a title, subtitles.
  it('should render all text, titles, subtitles.', () => {
    expect(screen.getByText('Transferir dinero')).toBeInTheDocument();
  });

  //** Renders a inputs, buttons.
  it('should render all inputs, buttons.', () => {
    renderInput(numberClient);
    renderInput(amount);
    renderInput(submitButton);
  });

  //** Displays an error message when the user submits the form with an empty password field.
  it('should display an error message for empty field', () => {
    emptyField(submitButton, 'Campo obligatorio');
  });

  //** Displays a submit form, show modal and transfer succes
  test('should display submit form and show modal confirm', async () => {
    fireEvent.change(numberClient, { target: { value: '04241412589' } });
    fireEvent.change(amount, { target: { value: '120' } });
    fireEvent.click(submitButton);
    await waitFor(() => {
      expect(screen.getByTestId('modalResponsive')).toBeInTheDocument();
      expect(screen.getByText('✋¿Deseas transferir el dinero?')).toBeInTheDocument();
      expect(screen.getByText('El monto total se transferirá en este momento')).toBeInTheDocument();
      renderInput(screen.getByRole('button', { name: /aceptar/i }));
    });
    const acceptButton = screen.getByRole('button', { name: /aceptar/i });
    userEvent.click(acceptButton);

    // const handleConfirmationModal = jest.fn();
    const setOpenModal = jest.fn();
    const setOpenRc = jest.fn();
    const reset = jest.fn();

    // await act(async () => {
      // await handleConfirmationModal({ dataForm: 'test data', setOpenModal, setOpenRc, reset });
    // });

    expect(setOpenModal).toHaveBeenCalledTimes(1);
    expect(setOpenModal).toHaveBeenCalledWith(false);
    expect(setOpenRc).toHaveBeenCalledWith(true);
    expect(reset).toHaveBeenCalled();

    // await waitFor(() => {
    //   expect(screen.queryByTestId('modalResponsive')).toBeNull();
    //   expect(screen.getByText('Comprobante')).toBeInTheDocument();
    //   expect(screen.getByText('Transacción exitosa')).toBeInTheDocument();
    // });
  });
});