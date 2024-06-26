import { act, render, screen } from '@testing-library/react';
//Internal app
import Movements from '@/app/(Pages)/dashboard/movements/page';
import { redirectLinks, mockRouterPush } from '../../../tools/unitTestHelper.test';

describe('Movements', () => {
  const routerPushMock = jest.fn();

  beforeEach(async () => {
    mockRouterPush(routerPushMock)
    await act(async () => {
      render(<Movements />);
    });
    expect(render).toBeTruthy();
  });

  //** Renders a title, subtitles.
  it('should render all necessary elements', () => {
    expect(screen.getByText('Movimientos')).toBeInTheDocument();
    expect(screen.getByText('Historial')).toBeInTheDocument();
  });

  it('should navigate to dashboard page when link is clicked', async () => {
    const textLink = screen.getByText('Volver');
    const routePath = '/dashboard';
    redirectLinks(textLink, routePath, routerPushMock);
  });
});
