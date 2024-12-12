import { render, screen } from '@testing-library/react';
// Internal app
import { Conditions, Terms, Policies } from '@/components';

class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

global.ResizeObserver = ResizeObserver;

jest.mock('jose', () => ({
  compactDecrypt: jest.fn(() => ({ plaintext: 'mocked plaintext' })),
}));

describe('Conditions', () => {
  beforeEach(() => {
    render(<Conditions />);
    jest.clearAllMocks();
  });

  it('should render all text, titles, and subtitles', () => {
    expect(screen.getByText(/CONTRATO DE CUENTA GENERAL DE DINERO ELECTRÓNICO PERSONA NATURAL/i)).toBeInTheDocument();
  });
});

describe('Terms', () => {
  beforeEach(() => {
    render(<Terms />);
    jest.clearAllMocks();
  });

  it('should render all text, titles, and subtitles', () => {
    expect(screen.getByText(/TÉRMINOS Y CONDICIONES – BILLETERA YIRO- PERÚ/i)).toBeInTheDocument();
  });
});

describe('Policies', () => {
  beforeEach(() => {
    render(<Policies />);
    jest.clearAllMocks();
  });

  it('should render all text, titles, and subtitles', () => {
    expect(screen.getByText(/POLÍTICA DE PRIVACIDAD – BILLETERA YIRO - PERÚ/i)).toBeInTheDocument();
  });
});
