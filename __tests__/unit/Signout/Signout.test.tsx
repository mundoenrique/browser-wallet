import { render, screen, cleanup } from '@testing-library/react';
//Internal app
import Signout from '@/app/(Pages)/signout/page';
import { useHeadersStore } from '@/store';

describe('Signout', () => {
  const backLink = 'https://example.com';

  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  describe('Reder texts', () => {
    it('should render all text, titles, subtitles', async () => {
      render(<Signout />);
      expect(screen.getByText('Su sesión ha finalizado.')).toBeInTheDocument();
      expect(screen.getByText('Vuelve a iniciar sesion desde Somos Belcorp')).toBeInTheDocument();
    });
  });

  describe('Render link', () => {
    it('should render link with backLink', async () => {
      useHeadersStore.setState({ backLink });
      render(<Signout />);
      expect(screen.getByText('Volver')).toHaveAttribute('href', backLink);
    });
  });
});
