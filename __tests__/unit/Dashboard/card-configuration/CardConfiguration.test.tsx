import { act, render, screen } from '@testing-library/react';
//Internal app
import CardConfiguration from '@/app/(Pages)/dashboard/card-configuration/page';
import { mockRouterPush } from '../../../tools/unitTestHelper.test';

describe('CardConfiguration', () => {
  const routerPushMock = jest.fn();

  beforeEach(async () => {
    mockRouterPush(routerPushMock)
    await act(async () => {
      render(<CardConfiguration />);
    });
    expect(render).toBeTruthy();
  });

  //** Renders a title, subtitles and button
  test('should render all necessary elements', async () => {
    expect(screen.getByText(/configuración de mi tarjeta/i)).toBeInTheDocument();
    expect(screen.getByText(/activa tu tarjeta física/i)).toBeInTheDocument();
    expect(screen.getByText(/bloqueo temporal/i)).toBeInTheDocument();
    expect(screen.getByText(/bloquear por perdida o robo/i)).toBeInTheDocument();
    expect(screen.getByText(/cambiar pin/i)).toBeInTheDocument();
    expect(screen.getByText(/eliminar cuenta yiro/i)).toBeInTheDocument();
  });

});