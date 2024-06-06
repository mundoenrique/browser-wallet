import { render, screen } from '@testing-library/react';
//Internal app
import Legal from '@/app/(WebViews)/legal/page';

jest.mock('jose', () => ({
  compactDecrypt: jest.fn(() => ({ plaintext: 'mocked plaintext' })),
}));
describe('Legal', () => {
  beforeEach(() => {
    render(<Legal />);
    jest.clearAllMocks();
  });

  it('should render all text, titles, subtitles.', () => {
    expect(screen.getByText(/TÉRMINOS Y CONDICIONES E Commerce y Mi Tienda Online- CLIENTE DE LA CONSULTORA/i)).toBeInTheDocument();
    expect(screen.getByText(/Actualización: febrero 2023/i)).toBeInTheDocument();
  });
});