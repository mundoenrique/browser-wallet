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
    expect(screen.getByText(/TÉRMINOS Y CONDICIONES – BILLETERA YIRO- PERÚ/i)).toBeInTheDocument();
  });
});
