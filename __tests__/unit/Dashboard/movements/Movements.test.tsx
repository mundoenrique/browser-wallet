import { act, render, screen } from '@testing-library/react';
//Internal app
import Movements from '@/app/(Pages)/dashboard/movements/page';
import { redirectLinks, mockRouterPush } from '../../../tools/unitTestHelper.test';

jest.mock('@/store', () => ({
  ...jest.requireActual('@/store'),
  useHeadersStore: jest.fn(() => ({
    host: jest.fn(),
    back: jest.fn(),
  })),
  useUserStore: jest.fn(() => ({
    getUserCardId: jest.fn(() => 'mockedCardId'),
    user: { userId: 'mockedUserId', firstName: 'John' },
  })),
}));

// Mocking the Autocomplete component
interface AutocompleteProps {
  getOptionLabel?: (option: any) => string;
  options: any[];
}

jest.mock('@mui/material/Autocomplete', () => {
  const MockAutocomplete = (props: AutocompleteProps) => {
    const { getOptionLabel, options } = props;
    const optionLabel = getOptionLabel ? getOptionLabel(options[0]) : '';
    return (
      <div>
        <input data-testid="autocomplete-input" value={optionLabel} readOnly />
      </div>
    );
  };
  MockAutocomplete.displayName = 'MockAutocomplete';
  return MockAutocomplete;
});

describe('Movements', () => {
  const routerPushMock = jest.fn();

  beforeEach(async () => {
    mockRouterPush(routerPushMock);
    await act(async () => {
      render(<Movements />);
    });
    expect(render).toBeTruthy();
  });

  //** Renders a title, subtitles.
  it('should render all necessary elements', () => {
    expect(screen.getByText('Movimientos')).toBeInTheDocument();
    expect(screen.getByText('Historial')).toBeInTheDocument();
  });

  it('should navigate to dashboard page when link is clicked', async () => {
    const textLink = screen.getByText('Volver');
    const routePath = '/dashboard';
    redirectLinks(textLink, routePath, routerPushMock);
  });
});
