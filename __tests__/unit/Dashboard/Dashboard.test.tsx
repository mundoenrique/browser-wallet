import { useRouter } from 'next/navigation';
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
// Internal app
import Dashboard from '@/app/(Pages)/dashboard/page';
import { api } from '@/utils/api';

const routerPushMock = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('jose', () => {
  return {
    compactDecrypt: jest.fn(() => {
      return { plaintext: 'mocked plaintext' };
    }),
  };
});

jest.mock('mui-one-time-password-input', () => {
  return {
    compactDecrypt: jest.fn(() => {
      return { plaintext: 'mocked plaintext' };
    }),
  };
});

jest.mock('@/store', () => ({
  ...jest.requireActual('@/store'),
  useUiStore: jest.fn(() => ({
    setModalError: jest.fn(),
    setLoadingScreen: jest.fn(),
    setErrorModal: jest.fn(), setReloadFunction: jest.fn(),
  })),
  useUserStore: jest.fn(() => ({
    getUserCardId: jest.fn().mockReturnValue('mockedCardId'),
    user: { userId: 'mockedUserId', firstName: 'John' },
  })),
}));

jest.mock('@/utils/api', () => ({
  api: {
    get: jest.fn().mockResolvedValue({ data: { data: [] } }),
  },
}));

//** Define the mock component within jest.mock call
jest.mock('@/components/cards/cardInformation/CardInformation', () => {
  const MockedCardInformation = () => <div>Mocked CardInformation</div>;
  MockedCardInformation.displayName = 'CardInformation';
  return MockedCardInformation;
});

describe('Dashboard', () => {
  beforeEach(async () => {
    (useRouter as jest.Mock).mockReturnValue({ push: routerPushMock });
    await act(async () => {
      render(<Dashboard />);
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  //** Renders a title, subtitles.
  it('should render all text, titles, subtitles.', () => {
    expect(screen.getByText('Últimos movimientos')).toBeInTheDocument();
  });

  //** Navigates to /dashboard/debt on CardDebt click
  it('should navigate to /dashboard/debt on CardDebt click', () => {
    const cardDebt = screen.getByText('Pagar');
    fireEvent.click(cardDebt);
    expect(routerPushMock).toHaveBeenCalledWith('/dashboard/debt');
  });

  //** Navigates to /dashboard/clients on OweMe CardDebt click
  it('should navigate to /dashboard/clients on OweMe CardDebt click', () => {
    const oweMeCardDebt = screen.getByText('Gestionar');
    fireEvent.click(oweMeCardDebt);
    expect(routerPushMock).toHaveBeenCalledWith('/dashboard/clients');
  });

  //** Test getMovements function with successful API call
  it('should call getMovements and update state on success', async () => {
    const mockData = [{ id: 1, description: 'Test movement' }];
    (api.get as jest.Mock).mockResolvedValueOnce({ data: { data: mockData } });

    await act(async () => {
      render(<Dashboard />);
    });

    expect(api.get).toHaveBeenCalledWith('/cards/mockedCardId/transactions', { params: { days: 90, limit: 5 } });
    await waitFor(() => {
      expect(screen.getByText('Test movement')).toBeInTheDocument();
    });
  });

});
