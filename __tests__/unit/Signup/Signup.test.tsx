import { render, screen } from '@testing-library/react';
//Internal app
import Signup from '@/app/(Pages)/signup/page';
import { renderInput } from '../../tools/unitTestHelper.test';

describe('Signup', () => {
  let submitButton: HTMLElement;

  beforeEach(() => {
    render(<Signup />);
    expect(render).toBeTruthy();
    submitButton = screen.getByRole('button', { name: /¡Inicia YA!/i });
  });

  //** Renders with a logo.
  it('should render form and logo', () => {
    expect(screen.getByRole('img', { name: /animation/i })).toBeInTheDocument();
  });

  //** Renders a title, subtitles.
  it('should render all text, titles, subtitles.', () => {
    expect(screen.getByText(/¡Obtén tu cuenta Yiro en sólo 4 pasos!/i)).toBeInTheDocument();
    expect(screen.getByText(/paso/i)).toBeInTheDocument();
  });

  //** Renders a inputs, buttons.
  it('should render all text, titles, subtitles.', () => {
    renderInput(submitButton);
  });
});
