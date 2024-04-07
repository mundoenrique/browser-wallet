import { useRouter } from 'next/navigation';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
//Internal app
import Help from '@/app/(Pages)/dashboard/help/page';
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

describe('Help', () => {
  let router = createMockRouter({});

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: routerPushMock });
    render(<Help />);
    expect(render).toBeTruthy();
  });

  //** Renders a title, subtitles.
  it('should render all text, titles, subtitles.', () => {
    expect(screen.getByText('Ayuda')).toBeInTheDocument();
    expect(screen.getByText(/¿necesitas contactarnos?/i)).toBeInTheDocument();
    expect(screen.getByText(/preguntas frecuentes/i)).toBeInTheDocument();
    expect(screen.getByText(/inquietudes y asesorías/i)).toBeInTheDocument();
    expect(screen.getByText(/contáctanos por WhatsApp/i)).toBeInTheDocument();
    expect(screen.getByText(/atención personalizada/i)).toBeInTheDocument();
    expect(screen.getByText(/centro de ayuda/i)).toBeInTheDocument();
    expect(screen.getByText('Lima o extranjero (511) 707 6080 y Provincia 0800 80700')).toBeInTheDocument();
    expect(screen.getByText(/soporte/i)).toBeInTheDocument();
    expect(screen.getByText(/support@belcorp.com/i)).toBeInTheDocument();
  });

  //** Display a link to the frequent questions
  it('should navigate to frequent questions page when link is clicked', async () => {
    expect(screen.getByText(/preguntas frecuentes/i)).toBeInTheDocument();
    fireEvent.click(screen.getByText(/preguntas frecuentes/i));
    waitFor(() => {
      expect(router.push).toHaveBeenCalledWith('/dashboard/help/frequent-questions');
    });
  });
});
