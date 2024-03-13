import { render, screen } from '@testing-library/react';
//Internal app
import Legal from '@/app/(Pages)/dashboard/legal/page';

jest.mock('jose', () => {
  return {
    compactDecrypt: jest.fn(() => {
      return { plaintext: 'mocked plaintext' };
    }),
  };
});

describe('Legal', () => {
  let subtitle1: string;

  beforeEach(() => {
    render(<Legal />);
    expect(render).toBeTruthy();
  });

  // ** Renders a Legal, a title, subtitles.
  it('should render all necessary elements Dashboard Legal', () => {
    expect(screen.getByText(/términos y condiciones/i)).toBeInTheDocument();
    expect(screen.getByText(/lorem ipsum dolor sit ameti/i)).toBeInTheDocument();
  });
});
