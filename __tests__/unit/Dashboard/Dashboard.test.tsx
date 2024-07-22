import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
// Internal app
import Dashboard from '@/app/(Pages)/dashboard/page';
import { mockRouterPush } from '../../tools/unitTestHelper.test';
import { api } from '@/utils/api';

jest.mock('@/store', () => ({
  ...jest.requireActual('@/store'),
  useUserStore: jest.fn(() => ({
    getUserCardId: jest.fn().mockReturnValue('mockedCardId'),
    user: { userId: 'mockedUserId', firstName: 'John' },
  })),
}));

jest.mock('@/utils/api');
const mockApi = api as jest.Mocked<typeof api>;

//** Define the mock component within jest.mock call
jest.mock('@/components/cards/cardInformation/CardInformation', () => {
  const MockedCardInformation = () => <div>Mocked CardInformation</div>;
  MockedCardInformation.displayName = 'CardInformation';
  return MockedCardInformation;
});

describe('Dashboard', () => {
  const movementsData = { id: 1, amount: 10 };
  const routerPushMock = jest.fn();
  mockApi.get.mockResolvedValue({ status: 200, data: { data: movementsData } });

  beforeEach(async () => {
    mockRouterPush(routerPushMock);
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
    expect(screen.getByText('Ver todo')).toBeInTheDocument();
  });

  it('call API getMovements', async () => {
    await mockApi.get(`/cards/123456/transactions`, { params: { days: 90, limit: 5 } })
    await waitFor(() => {
      expect(mockApi.get).toHaveBeenCalled();
      expect(mockApi.get).toHaveBeenCalledWith(`/cards/123456/transactions`, { params: { days: 90, limit: 5 } });
    });
  });

  it('call API getMovements error', async () => {
      mockApi.get.mockImplementation(() => Promise.reject(new Error('API error')));
      await waitFor(() => {
        expect(mockApi.get).toHaveBeenCalled();
      });
    });

  describe('Navigations', () => {
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
  });
});
