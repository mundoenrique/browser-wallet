import { render, screen } from '@testing-library/react';
// Internal app
import Questions from '@/app/(WebViews)/questions/page';

jest.mock('jose', () => ({
  compactDecrypt: jest.fn(() => ({ plaintext: 'mocked plaintext' })),
}));

describe('Questions', () => {
  beforeEach(() => {
    render(<Questions />);
    jest.clearAllMocks();
  });

  it('should render all text, titles, and subtitles', () => {
    const questionTitles = screen.getAllByRole('heading', { level: 6 });
    expect(questionTitles).toHaveLength(2);
    expect(questionTitles[0]).toHaveTextContent('Question 1');
    expect(questionTitles[1]).toHaveTextContent('Question 2');

    const questionContents = screen.getAllByText(/Lorem ipsum/);
    expect(questionContents).toHaveLength(2);
  });
});
