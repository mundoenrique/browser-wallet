import { useRouter } from 'next/navigation';
import { render, screen } from '@testing-library/react';
//Internal app
import CardConfiguration from '@/app/(Pages)/dashboard/card-configuration/page';

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

describe('CardConfiguration', () => {

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: routerPushMock });
    render(<CardConfiguration />);
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