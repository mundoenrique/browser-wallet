import { render, waitFor, screen } from '@testing-library/react';
//Internal app
import Recover from '@/app/(Pages)/password-recover/page';

jest.mock('@/utils/api', () => ({
  api: {
    post: jest.fn().mockResolvedValue({
      status: 200,
      data: { data: { otpUuId: 'abc123' } },
    }),
  },
}));

jest.mock('@/app/(Pages)/password-recover/partial/OTP', () => ({
  __esModule: true,
  default: jest.fn().mockReturnValue(<div data-testid="mocked-otp-component" />),
}));

jest.mock('@/app/(Pages)/password-recover/partial/UpdatePass', () => ({
  __esModule: true,
  default: jest.fn().mockReturnValue(<div data-testid="mocked-update-pass-component" />),
}));

jest.mock('@/store', () => ({
  useHeadersStore: jest.fn(() => ({
    host: jest.fn(),
    back: jest.fn(),
  })),
  useUserStore: jest.fn(() => ({ user: { userId: 'mockedUserId' } })),
  useUiStore: jest.fn(() => ({ setModalError: jest.fn() })),
  useOtpStore: jest.fn(() => ({
    countdown: jest.fn(),
    counting: false,
    setCounting: jest.fn(),
    setTime: jest.fn(),
    otpValid: 'OTP',
    requestTFACode: jest.fn(),
    handleResendOTP: jest.fn(),
  })),
}));

describe('Recover', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  //** This test checks if the initial state of the component is correct
  it('has correct initial state', () => {
    const { getByTestId } = render(<Recover />);
    expect(getByTestId('mocked-otp-component')).toBeInTheDocument();
  });

  //** This test checks if the timer starts when the component is mounted
  it('starts timer on mount', async () => {
    jest.useFakeTimers();
    const setIntervalSpy = jest.spyOn(global, 'setInterval');
    render(<Recover />);
    expect(setIntervalSpy).toHaveBeenCalled();
    jest.useRealTimers();
    setIntervalSpy.mockRestore();
  });

  //** This test checks if the OTP component is rendered when otpValid is "OTP"
  it('renders mocked OTP component when otpValid is "OTP"', async () => {
    render(<Recover />);
    await waitFor(() => expect(screen.getByTestId('mocked-otp-component')).toBeInTheDocument());
  });

  //** This test checks if the UpdatePass component is rendered when otpValid is "PASSWORD"
  it('renders mocked UpdatePass component when otpValid is "PASSWORD"', async () => {
    jest.spyOn(require('@/store'), 'useOtpStore').mockImplementation(() => ({
      countdown: jest.fn(),
      counting: false,
      setCounting: jest.fn(),
      setTime: jest.fn(),
      otpValid: 'PASSWORD',
    }));
    render(<Recover />);
    await screen.findByTestId('mocked-update-pass-component');
  });

  //** This test checks if the default component (OTP) is rendered when otpValid is neither "OTP" nor "PASSWORD"
  it('renders default component when otpValid is neither "OTP" nor "PASSWORD"', async () => {
    jest.spyOn(require('@/store'), 'useOtpStore').mockImplementation(() => ({
      countdown: jest.fn(),
      counting: false,
      setCounting: jest.fn(),
      setTime: jest.fn(),
      otpValid: 'SOME_OTHER_VALUE',
    }));
    render(<Recover />);
    await waitFor(() => expect(screen.getByTestId('mocked-otp-component')).toBeInTheDocument());
  });

  //** This test checks if the timer starts when counting is true and initialized.current is false
  it('starts timer when counting is true and initialized.current is false', async () => {
    jest.spyOn(require('@/store'), 'useOtpStore').mockImplementation(() => ({
      countdown: jest.fn(),
      counting: true,
      setCounting: jest.fn(),
      setTime: jest.fn(),
      otpValid: 'OTP',
    }));
    jest.useFakeTimers();
    const setIntervalSpy = jest.spyOn(global, 'setInterval');
    render(<Recover />);
    expect(setIntervalSpy).toHaveBeenCalled();
    jest.useRealTimers();
    setIntervalSpy.mockRestore();
  });
});
