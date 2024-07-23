import { act, render, screen } from '@testing-library/react';
//Internal app
import { mockRouterPush } from '../../../tools/unitTestHelper.test';
import CardConfiguration from '@/app/(Pages)/dashboard/card-configuration/page';

jest.mock('@/app/(Pages)/dashboard/card-configuration/partial/Main.tsx', () => ({
  __esModule: true,
  default: jest.fn().mockReturnValue(<div data-testid="mocked-main-component" />),
}));

describe('CardConfiguration', () => {
  const routerPushMock = jest.fn();

  beforeEach(async () => {
    mockRouterPush(routerPushMock);
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
