import { act, render, screen } from '@testing-library/react';
//Internal app
import Legal from '@/app/(Pages)/dashboard/legal/page';

describe('Legal', () => {
  beforeEach(async () => {
    await act(async () => {
      render(<Legal />);
    });
    expect(render).toBeTruthy();
  });

  // ** Renders a Legal, a title, subtitles.
  it('should render all necessary elements Dashboard Legal', () => {
    expect(screen.getByText('TÉRMINOS Y CONDICIONES – BILLETERA YIRO- PERÚ')).toBeInTheDocument();
  });
});
