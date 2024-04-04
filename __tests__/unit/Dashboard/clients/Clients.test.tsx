import { useRouter } from 'next/navigation';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
//Internal app
import Clients from '@/app/(Pages)/dashboard/clients/page';
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

describe('Clients', () => {
  let router = createMockRouter({});

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: routerPushMock });
    render(<Clients />);
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