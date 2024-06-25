import { render, screen, fireEvent, act } from '@testing-library/react';
// Internal app
import Dashboard from '@/app/(Pages)/dashboard/page';
import { mockRouterPush } from '../../tools/unitTestHelper.test';

jest.mock('@/store', () => ({
  ...jest.requireActual('@/store'),
  useUiStore: jest.fn(() => ({
    setModalError: jest.fn(),
    setLoadingScreen: jest.fn(),
    setErrorModal: jest.fn(),
    setReloadFunction: jest.fn(),
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
  const routerPushMock = jest.fn();

  beforeEach(async () => {
    mockRouterPush(routerPushMock)
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
});
