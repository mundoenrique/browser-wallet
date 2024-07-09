import { act, render, screen } from '@testing-library/react';
//Internal app
import CardConfiguration from '@/app/(Pages)/dashboard/card-configuration/page';
import { mockRouterPush } from '../../../tools/unitTestHelper.test';

jest.mock('@/store', () => ({
  ...jest.requireActual('@/store'),
  useUserStore: jest.fn(() => ({ user: { userId: 'mockedUserId' } })),
  useConfigCardStore: jest.fn(() => ({
    updatePage: jest.fn(() => 'mockedCardId'),
    page: { userId: 'mockedUserId' },
  })),
  useNavTitleStore: jest.fn(() => ({ updateTitle: jest.fn() })),
  useMenuStore: jest.fn(() => ({ setCurrentItem: jest.fn() })),
}));


jest.mock('@/app/(Pages)/dashboard/card-configuration/partial/Main.tsx', () => ({
  __esModule: true,
  default: jest.fn().mockReturnValue(<div data-testid="mocked-main-component" />),
}));

describe('CardConfiguration', () => {
  const routerPushMock = jest.fn();

  beforeEach(async () => {
    mockRouterPush(routerPushMock)
    await act(async () => {
      render(<CardConfiguration />);
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  //** Renders a title, subtitles and button
  test('should render all necessary elements', async () => {
    expect(screen.getByTestId('mocked-main-component')).toBeInTheDocument();
  });

});