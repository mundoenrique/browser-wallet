import React from 'react';
import { render, act, screen, fireEvent, waitFor } from '@testing-library/react';
import Belcorp from '@/app/(Pages)/belcorp/page';
import { renderInput } from '../../tools/unitTestHelper.test';
import { api } from '@/utils/api';

jest.mock('@/utils/api');
const mockApi = api as jest.Mocked<typeof api>;

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    replace: jest.fn(),
  }),
}));

describe('Belcorp component', () => {
  let codeConsultant: HTMLInputElement;
  let codeCountry: HTMLButtonElement;
  let submitButton: HTMLElement;
  const userData = {
    consultant: '12345678',
    country: 'PE',
  };
  mockApi.get.mockResolvedValue({ status: 200, data: { data: userData } });
  const onSubmitMock = jest.fn();

  beforeEach(async () => {
    await act(async () => {
      render(<Belcorp onSubmit={onSubmitMock}/>);
    });
    codeConsultant = screen.getByLabelText('Código de la consultora');
    codeCountry = screen.getByLabelText('País');
    submitButton = screen.getByRole('button', { name: /enviar/i });
  });

  it('renders correctly', () => {
    renderInput(codeConsultant);
    renderInput(codeCountry);
    renderInput(submitButton);
  });

  it('calls onSubmit function when form is submitted', async () => {
    const { consultant, country } = userData;
    const fetchMock = jest.fn().mockResolvedValue({
      json: () => Promise.resolve({ data: 'https://example.com' }),
    });
    global.fetch = fetchMock;

    fireEvent.change(codeConsultant, { target: { value: '123456' } });
    fireEvent.change(codeCountry, { target: { value: 'PE' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalled();
    });

  });

});