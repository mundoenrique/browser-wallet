import { render, screen } from '@testing-library/react';
// Internal app
import Conditions from '@/app/(WebViews)/conditions/page';

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
