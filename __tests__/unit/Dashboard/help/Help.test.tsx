import { act, render, screen, fireEvent, waitFor } from '@testing-library/react';
//Internal app
import Help from '@/app/(Pages)/dashboard/help/page';
import { mockRouterPush } from '../../../tools/unitTestHelper.test';

describe('Help', () => {
  const routerPushMock = jest.fn();

  beforeEach(async () => {
    mockRouterPush(routerPushMock)
    await act(async () => {
      render(<Help />);
    });
    expect(render).toBeTruthy();
  });

  //** Renders a title, subtitles.
  it('should render all text, titles, subtitles.', () => {
    expect(screen.getByText('Ayuda')).toBeInTheDocument();
    expect(screen.getByText(/¿necesitas contactarnos?/i)).toBeInTheDocument();
    expect(screen.getByText(/contáctanos por WhatsApp/i)).toBeInTheDocument();
    expect(screen.getByText(/atención personalizada/i)).toBeInTheDocument();
    expect(screen.getByText(/centro de ayuda/i)).toBeInTheDocument();
    expect(screen.getByText('Lima o extranjero (511) 707 6080 y Provincia 0800 80700')).toBeInTheDocument();
    expect(screen.getByText(/soporte/i)).toBeInTheDocument();
  });
});
