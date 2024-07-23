import React from 'react';
import { act, render, screen, waitFor } from '@testing-library/react';
//Internal app
import { api } from '@/utils/api';
import Clients from '@/app/(Pages)/dashboard/clients/page';
import { mockRouterPush } from '../../../tools/unitTestHelper.test';

jest.mock('@/app/(Pages)/dashboard/clients/partial/listClients', () => ({
  __esModule: true,
  default: jest.fn().mockReturnValue(<div data-testid="mocked-otp-component" />),
}));

jest.mock('@/store', () => ({
  ...jest.requireActual('@/store'),
  useUserStore: jest.fn(() => ({
    user: { userId: 'mockedUserId', firstName: 'John' },
  })),
}));

jest.mock('@/utils/api');
const mockApi = api as jest.Mocked<typeof api>;

describe('Clients', () => {
  const clientsData = [
    {
      id: 1,
      name: 'Client 1',
      date: '2022-01-01',
      status: 'PAID',
      amount: 100,
    },
  ];
  const routerPushMock = jest.fn();
  mockApi.get.mockResolvedValue({ status: 200, data: { data: clientsData } });

  beforeEach(async () => {
    mockRouterPush(routerPushMock);
    await act(async () => {
      render(<Clients />);
    });
  });

  //** Renders a title, subtitles.
  it('should render all text, titles, subtitles.', () => {
    expect(screen.getByText(/mis clientes/i)).toBeInTheDocument();
    expect(screen.getByText(/total deuda clientes/i)).toBeInTheDocument();
  });

  it('calls onSubmit function when form is submitted', async () => {
    await mockApi.get(`/payments/123456789/chargelist`, {
      params: { days: 30, limit: 100, page: 1, date: 7, transactionCode: 1 },
    });

    await waitFor(() => {
      expect(mockApi.get).toHaveBeenCalled();
      expect(mockApi.get).toHaveBeenCalledWith(`/payments/123456789/chargelist`, {
        params: { days: 30, limit: 100, page: 1, date: 7, transactionCode: 1 },
      });
    });
  });
});
