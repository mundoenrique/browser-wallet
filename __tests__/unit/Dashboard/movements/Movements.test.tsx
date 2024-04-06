import { useRouter } from 'next/navigation';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
//Internal app
import Movements from '@/app/(Pages)/dashboard/movements/page';
import { redirectLinks } from '../../../tools/unitTestHelper.test';
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

describe('Movements', () => {
  let router = createMockRouter({});

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: routerPushMock });
    render(<Movements />);
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
    redirectLinks(textLink, routePath, router);
  });
});
