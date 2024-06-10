import { render } from '@testing-library/react';
//Internal app
import MyDebt from '@/app/(Pages)/dashboard/debt/page';
import { useDebStore } from '@/store';

// Mock the components
jest.mock('@/app/(Pages)/dashboard/debt/partial', () => ({
  Success: jest.fn(() => <div>Success Component</div>),
  Error: jest.fn(() => <div>Error Component</div>),
  Debt: jest.fn(() => <div>Debt Component</div>),
}));

jest.mock('jose', () => {
  return {
    compactDecrypt: jest.fn(() => {
      return { plaintext: 'mocked plaintext' };
    }),
  };
});

describe('MyDebt Component', () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  //** Renders the Debt component when the view is DEBT
  it('renders Debt component when view is DEBT', () => {
    useDebStore.setState({ view: 'DEBT' });
    const { getByText } = render(<MyDebt />);
    expect(getByText('Debt Component')).toBeInTheDocument();
  });

  //** Renders the Success component when the view is SUCCESS
  it('renders Success component when view is SUCCESS', () => {
    useDebStore.setState({ view: 'SUCCESS' });
    const { getByText } = render(<MyDebt />);
    expect(getByText('Success Component')).toBeInTheDocument();
  });

  //** Renders the Error component when the view is ERROR
  it('renders Error component when view is ERROR', () => {
    useDebStore.setState({ view: 'ERROR' });
    const { getByText } = render(<MyDebt />);
    expect(getByText('Error Component')).toBeInTheDocument();
  });

  //** Renders the Debt component as default when the view is undefined
  it('renders Debt component as default when view is undefined', () => {
    useDebStore.setState({ view: undefined });
    const { getByText } = render(<MyDebt />);
    expect(getByText('Debt Component')).toBeInTheDocument();
  });
});
