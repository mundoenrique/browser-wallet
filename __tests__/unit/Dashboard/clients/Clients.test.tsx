import { act, render, screen, fireEvent, waitFor } from '@testing-library/react';
//Internal app
import Clients from '@/app/(Pages)/dashboard/clients/page';
import { createMockRouter } from '@/utils/mocks';
import { mockRouterPush } from '../../../tools/unitTestHelper.test';

describe('Clients', () => {
  let router = createMockRouter({});
  const routerPushMock = jest.fn();

  beforeEach(async () => {
    mockRouterPush(routerPushMock)
    await act(async () => {
      render(<Clients />);
    });
    expect(render).toBeTruthy();
  });

  //** Renders a title, subtitles.
  it('should render all text, titles, subtitles.', () => {
    expect(screen.getByText(/mis clientes/i)).toBeInTheDocument();
    expect(screen.getByText(/total deuda clientes/i)).toBeInTheDocument();
  });

  //** Display a link to the dashboard page and navigate to dashboard page when link is clicked.
  it('should navigate to dashboard page when link is clicked', () => {
    expect(screen.getByText(/volver/i)).toBeInTheDocument();
    expect(screen.getByText(/volver/i).getAttribute('href')).toBe('/dashboard');
    fireEvent.click(screen.getByText(/volver/i));
    waitFor(() => {
      expect(router.push).toHaveBeenCalledWith('/dashboard');
    });
  });
});