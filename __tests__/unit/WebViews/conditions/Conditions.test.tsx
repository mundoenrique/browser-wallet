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
    expect(screen.getByText(/Condiciones de contrato de dinero electónico./i)).toBeInTheDocument();

    const titles = screen.getAllByRole('heading', { level: 6 });
    expect(titles).toHaveLength(2);
    expect(titles[1]).toHaveTextContent('Lorem ipsum dolor sit amet');

    const paragraphs = screen.getAllByText(/Lorem ipsum dolor sit amet/i).filter((element) => element.tagName === 'P');
    expect(paragraphs).toHaveLength(2);

    expect(paragraphs[0]).toHaveTextContent(
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    );
    expect(paragraphs[1]).toHaveTextContent(
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    );
  });
});
