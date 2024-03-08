import { render, screen } from '@testing-library/react';
//Internal app
import Signup from '@/app/(Pages)/signup/page';

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

describe('CardStep', () => {
  let submitButton: Node | Window;

  beforeEach(() => {
    render(<Signup />);
    expect(render).toBeTruthy();
    submitButton = screen.getByRole('button', { name: /¡Inicia YA!/i });
  });

  // ** Renders a Signup, a title, subtitles and a submit button.
  it('should render all necessary elements Signup landing', () => {
    expect(screen.getByRole('img', { name: /animation/i })).toBeInTheDocument();
    expect(screen.getByText(/¡Obtén tu cuenta Yiro en sólo 4 pasos!/i)).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  // ** Renders a Signup, a title, subtitles and a submit button.
  it('should render all necessary elements Signup step 1', () => {
    expect(screen.getByText(/paso/i)).toBeInTheDocument();
  });
});
