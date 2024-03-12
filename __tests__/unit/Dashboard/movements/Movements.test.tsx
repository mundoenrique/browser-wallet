import { useRouter } from 'next/navigation';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
//Internal app
import Movements from '@/app/(Pages)/dashboard/movements/page';
import { createMockRouter } from '@/utils/mocks';

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

describe('Movements', () => {
  let router = createMockRouter({});
  let link: any;

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: routerPushMock });
    render(<Movements />);
    expect(render).toBeTruthy();
    link = screen.getByText('Volver');
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  //** Renders a title, subtitles.
  it('should render all necessary elements', () => {
    expect(screen.getByText('Movimientos')).toBeInTheDocument();
    expect(link).toBeInTheDocument();
    expect(screen.getByText('Historial')).toBeInTheDocument();
  });

  it('should navigate to dashboard page when link is clicked', async () => {
    fireEvent.click(link);
    waitFor(() => {
      expect(router.push).toHaveBeenCalledWith('/dashboard');
    });
  });
});
