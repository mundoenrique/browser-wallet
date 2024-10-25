import { render, screen } from '@testing-library/react';
//Internal app
import Policies from '@/app/(WebViews)/policies/page';

class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

global.ResizeObserver = ResizeObserver;

jest.mock('jose', () => ({
  compactDecrypt: jest.fn(() => ({ plaintext: 'mocked plaintext' })),
}));

describe('Policies', () => {
  beforeEach(() => {
    render(<Policies />);
    jest.clearAllMocks();
  });

  it('should render all text, titles, subtitles.', () => {
    expect(screen.getByText(/POLÍTICA DE PRIVACIDAD – BILLETERA YIRO - PERÚ/i)).toBeInTheDocument();
  });
});
