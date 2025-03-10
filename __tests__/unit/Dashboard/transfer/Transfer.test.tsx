import { act, render, screen, fireEvent, waitFor } from '@testing-library/react';
//Internal app
import { api } from '@/utils/api';
import Transfer from '@/app/(Pages)/dashboard/transfer/page';
import { renderInput } from '../../../tools/unitTestHelper.test';

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
});
