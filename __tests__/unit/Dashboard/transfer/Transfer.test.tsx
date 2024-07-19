import { act, render, screen, fireEvent, waitFor } from '@testing-library/react';
//Internal app
import Transfer from '@/app/(Pages)/dashboard/transfer/page';
import Success from '@/app/(Pages)/dashboard/transfer/partial/Success';
import { renderInput } from '../../../tools/unitTestHelper.test';
import { api } from '@/utils/api';

jest.mock('@/store', () => ({
  ...jest.requireActual('@/store'),
  useUserStore: jest.fn(() => ({
    getUserPhone: jest.fn(() => '123456798'),
    senderCardId: jest.fn(() => '123456798'),
    user: { userId: 'mockedUserId', firstName: 'John' },
  })),
}));

jest.mock('@/utils/api');
const mockApi = api as jest.Mocked<typeof api>;

describe('Transfer', () => {
  let numberClient: HTMLInputElement;
  let amount: HTMLInputElement;
  let submitButton: HTMLElement;
  const sendGTMEvent = jest.fn();

  beforeEach(async () => {
    await act(async () => {
      render(<Transfer />);
    });
    expect(render).toBeTruthy();
    numberClient = screen.getByLabelText(/¿a quién quieres transferir dinero?/i);
    amount = screen.getByLabelText(/¿cuánto dinero quieres transferir?/i);
    submitButton = screen.getByRole('button', { name: /enviar/i });
  });

  describe('Render form, all text, titles, subtitles', () => {
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

    // it('should render component success.', async () => {
    //   const setOpenRc = jest.fn();
    //   const openRc = jest.fn();
    //   const transferInfo = {
    //     receiver: '',
    //     amount: null,
    //     date: '',
    //     transactionCode: '',
    //   };

    //   await act(async () => {
    //     render(
    //       <Success
    //       onClick={() => {
    //         setOpenRc(!openRc);
    //       }}
    //       transferDetail={transferInfo}
    //       />
    //     );
    //   });
    // });
  });

  describe('Navigates sendGtmEvent', () => {
    it('sendGTMEvent button cards', async () => {
      fireEvent.change(numberClient, { target: { value: '123456' } });
      fireEvent.change(amount, { target: { value: '10.00' } });
      fireEvent.click(submitButton);

      waitFor(() => {
        expect(sendGTMEvent).toHaveBeenCalled();
        expect(sendGTMEvent).toHaveBeenCalledWith({
          event: 'ga4.trackEvent',
          eventName: 'select_content',
          eventParams: {
            content_type: 'boton',
            section: 'Yiro :: transferencia :: monto',
            previous_section: 'dashboard',
            selected_content: 'Enviar',
            destination_page: `http://localhost:3000/dashboard`,
          },
        });
      });
    });
  });

  describe('Call onSubmits', () => {
    // it('calls onSubmitOtp api.post validate tfa', async () => {
    //   const setOpenOtp = jest.fn(() => true);

    //   let otpInput: HTMLInputElement = screen.getByRole('textbox', { name: /otp/i });
    //   let otpButton: HTMLElement = screen.getByRole('button', { name: /verificar/i });

    //   fireEvent.change(otpInput, { target: { value: '1234' } });
    //   fireEvent.click(otpButton);

    //   const setLoadinScreen = jest.fn(() => true);

    //   const payload = {
    //     otpProcessCode: 'CHANGE_PASSWORD_OTP',
    //     otpUuId: '1123456789',
    //     otpCode: otpInput.value,
    //   };

    //   await mockApi.post('/users/051999541/validate/tfa', payload);

    //   await waitFor(() => {
    //     expect(mockApi.post).toHaveBeenCalledTimes(1);
    //     expect(mockApi.post).toHaveBeenCalledWith(`/users/051999541/validate/tfa`, payload);
    //   });
    // });

    // test('handleConfirmation call api.post sendMoney', async () => {
    //   fireEvent.change(numberClient, { target: { value: '123456789' } });
    //   fireEvent.change(amount, { target: { value: '10.00' } });
    //   fireEvent.click(submitButton);

    //   const payload = {
    //     sender: {
    //     cardId: senderCardId(),
    //     },
    //     receiver: {
    //       cardId: receiverCardId,
    //     },
    //     amount: amount,
    //     fee: '0.00',
    //     tax: '0.00',
    //     description: 'Web transfer',
    //     source: 'Web transfer',
    //     externalId: '-',
    //   };

    //   await mockApi.post('/cards/sendmoney', payload);

    //   await waitFor(() => {
    //     expect(mockApi.post).toHaveBeenCalledTimes(1);
    //     expect(mockApi.post).toHaveBeenCalledWith('/cards/sendmoney', payload);
    //   });
    // });
  });
});