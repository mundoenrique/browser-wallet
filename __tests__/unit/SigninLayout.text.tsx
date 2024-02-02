import { render, screen } from '@testing-library/react';
import SigninLayout, { metadata } from '@/app/(Onboarding)/signin/layout';

describe('SigninLayout', () => {
  it('should render the children', () => {
    const testId = 'child-component';
    render(
      <SigninLayout>
        <div data-testid={testId}>Test Child</div>
      </SigninLayout>
    );
    expect(screen.getByTestId(testId)).toBeInTheDocument();
  });

  it('should have correct metadata', () => {
    expect(metadata).toEqual({
      title: 'Signin',
      description: 'Inicio de sesión en tu bolsillo',
    });
  });
});
