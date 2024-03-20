import { useRouter } from 'next/navigation';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
//Internal app
import Dashboard from '@/app/(Pages)/dashboard/page';
import { redirectLinks } from '../../tools/unitTestHelper.test';
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

describe('Dashboard', () => {
  let router = createMockRouter({});

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: routerPushMock });
    render(<Dashboard />);
    expect(render).toBeTruthy();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  //** Renders a title, subtitles.
  it('should render all text, titles, subtitles.', () => {
    expect(screen.getByText('Últimos movimientos')).toBeInTheDocument();
  });

  it('should navigate to movements page when link movements is clicked', async () => {
    const textLink = screen.getByText('Ver todo');
    const routePath = '/dashboard/movements'
    redirectLinks(textLink, routePath, router)
  });
});
