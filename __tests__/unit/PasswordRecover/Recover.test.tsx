import { render, act, waitFor, screen, fireEvent } from '@testing-library/react';
//Internal app
import { api } from '@/utils/api';
import Recover from '@/app/(Pages)/password-recover/page';

jest.mock('@/utils/api');
const mockApi = api as jest.Mocked<typeof api>;

jest.mock('@/app/(Pages)/password-recover/partial/OtpRecover', () => ({
  __esModule: true,
  default: jest.fn().mockReturnValue(<div data-testid="mocked-otp-recover-component" />),
}));

jest.mock('@/app/(Pages)/password-recover/partial/UpdatePass', () => ({
  __esModule: true,
  default: jest.fn().mockReturnValue(<div data-testid="mocked-update-pass-component" />),
}));

jest.mock('@/store', () => ({
  useHeadersStore: jest.fn(() => ({ host: jest.fn() })),
  useUserStore: jest.fn(() => ({ user: { userId: 'mockedUserId' } })),
  useUiStore: jest.fn(() => ({ setModalError: jest.fn() })),
  useOtpStore: jest.fn(() => ({
    otpValid: 'OTP',
    setOtpUuid: jest.fn(),
  })),
}));

describe('Recover', () => {
  const sendGTMEvent = jest.fn();

  beforeEach(async () => {
    await act(async () => {
      render(<Recover />);
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  //** This test checks if the initial state of the component is correct
  it('has correct initial state', () => {
    expect(screen.getByTestId('mocked-otp-recover-component')).toBeInTheDocument();
  });

  it('sendGTMEvent button', async () => {
    const navExternal = screen.getByText('Volver');
    fireEvent.click(navExternal);

    waitFor(() => {
      expect(sendGTMEvent).toHaveBeenCalled();
      expect(sendGTMEvent).toHaveBeenCalledWith({
        event: 'ga4.trackEvent',
        eventName: 'select_content',
        eventParams: {
          content_type: 'boton',
          section: 'Yiro :: recuperarContraseña',
          previous_section: 'Yiro :: login :: interno',
          selected_content: 'Volver',
          destination_page: `http://localhost:3000/signin`,
        },
      });
    });
  });

  it('submit form and call api post', async () => {
    fireEvent.click(screen.getByTestId('mocked-otp-recover-component'));

    await mockApi.post(`/users/051999541/tfa`, { otpProcessCode: 'CHANGE_PASSWORD_OTP' });

    await waitFor(() => {
      expect(mockApi.post).toHaveBeenCalledTimes(1);
      expect(mockApi.post).toHaveBeenCalledWith('/users/051999541/tfa', { otpProcessCode: 'CHANGE_PASSWORD_OTP' });
    });
  });
});
