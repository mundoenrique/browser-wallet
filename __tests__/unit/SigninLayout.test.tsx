import { render } from '@testing-library/react';
import SigninLayout, { metadata } from '@/app/(Onboarding)/signin/layout';

describe('SigninLayout', () => {
  it('should render LoginLayout component when children props is passed', () => {
    const { getByText } = render(
      <SigninLayout>
        <div>Test Children</div>
      </SigninLayout>
    );

    expect(getByText('Test Children')).toBeInTheDocument();
  });

  it('should have correct metadata', () => {
    expect(metadata).toEqual({
      title: 'Signin',
      description: 'Inicio de sesión en tu bolsillo',
    });
  });
});
