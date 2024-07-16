import { act, render, screen } from '@testing-library/react';
//Internal app
import FrequenQuetions from '@/app/(Pages)/dashboard/help/frequent-questions/page';

describe('FrequenQuetions', () => {

  beforeEach(async () => {
    await act(async () => {
      render(<FrequenQuetions />);
    });
    expect(render).toBeTruthy();
  });

  //** Renders a title, subtitles.
  it('should render all text, titles, subtitles.', () => {
    expect(screen.getByText('Preguntas frecuentes')).toBeInTheDocument();
  });
});
