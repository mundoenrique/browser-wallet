import { NextRequest } from 'next/server';

const clientsData = [
  {
    date: '2023-10-29T05:44:36Z',
    name: 'Ingaborg Yatman',
    amount: 984,
    status: 'Cobrado',
    status_type: '2',
    month: '1',
    number: '987654321',
  },
  {
    date: '2024-02-07T04:43:42Z',
    name: 'Clem Longbottom',
    amount: 889,
    status: 'Vencido',
    status_type: '4',
    month: '1',
    number: '987654321',
  },
  {
    date: '2023-05-23T14:48:24Z',
    name: 'Nani Fullagar',
    amount: 355,
    status: 'Cobrado',
    status_type: '2',
    month: '1',
    number: '987654321',
  },
  {
    date: '2023-06-21T18:54:46Z',
    name: 'Pyotr Aizikov',
    amount: 361,
    status: 'Cobrado',
    status_type: '2',
    month: '1',
    number: '987654321',
  },
  {
    date: '2023-08-13T11:19:41Z',
    name: 'Mab Bing',
    amount: 402,
    status: 'Vencido',
    status_type: '4',
    month: '1',
    number: '987654321',
  },
  {
    date: '2024-02-07T04:43:42Z',
    name: 'Clem Longbottom',
    amount: 889,
    status: 'Vencido',
    status_type: '4',
    month: '1',
    number: '987654321',
  },
  {
    date: '2023-05-23T14:48:24Z',
    name: 'Nani Fullagar',
    amount: 355,
    status: 'Cobrado',
    status_type: '2',
    month: '1',
    number: '987654321',
  },
  {
    date: '2023-06-21T18:54:46Z',
    name: 'Pyotr Aizikov',
    amount: 361,
    status: 'Cobrado',
    status_type: '2',
    month: '1',
    number: '987654321',
  },
  {
    date: '2023-08-13T11:19:41Z',
    name: 'Mab Bing',
    amount: 402,
    status: 'Vencido',
    status_type: '4',
    month: '1',
    number: '987654321',
  },
  {
    date: '2023-10-29T05:44:36Z',
    name: 'Ingaborg Yatman',
    amount: 984,
    status: 'Cobrado',
    status_type: '2',
    month: '1',
    number: '987654321',
  },
  {
    date: '2024-02-07T04:43:42Z',
    name: 'Clem Longbottom',
    amount: 889,
    status: 'Vencido',
    status_type: '4',
    month: '1',
    number: '987654321',
  },
  {
    date: '2023-05-23T14:48:24Z',
    name: 'Nani Fullagar',
    amount: 355,
    status: 'Cobrado',
    status_type: '2',
    month: '1',
    number: '987654321',
  },
  {
    date: '2023-06-21T18:54:46Z',
    name: 'Pyotr Aizikov',
    amount: 361,
    status: 'Cobrado',
    status_type: '2',
    month: '1',
    number: '987654321',
  },
  {
    date: '2023-08-13T11:19:41Z',
    name: 'Mab Bing',
    amount: 402,
    status: 'Vencido',
    status_type: '4',
    month: '1',
    number: '987654321',
  },
  {
    date: '2023-10-29T05:44:36Z',
    name: 'Ingaborg Yatman',
    amount: 984,
    status: 'Cobrado',
    status_type: '2',
    month: '1',
    number: '987654321',
  },
  {
    date: '2024-02-07T04:43:42Z',
    name: 'Clem Longbottom',
    amount: 889,
    status: 'Vencido',
    status_type: '4',
    month: '1',
    number: '987654321',
  },
  {
    date: '2023-05-23T14:48:24Z',
    name: 'Nani Fullagar',
    amount: 355,
    status: 'Cobrado',
    status_type: '2',
    month: '1',
    number: '987654321',
  },
  {
    date: '2023-06-21T18:54:46Z',
    name: 'Pyotr Aizikov',
    amount: 361,
    status: 'Cobrado',
    status_type: '1',
    month: '1',
    number: '987654321',
  },
  {
    date: '2023-08-13T11:19:41Z',
    name: 'Mab Bing',
    amount: 402,
    status: 'Vencido',
    status_type: '4',
    month: '1',
    number: '987654321',
  },
  {
    date: '2023-10-29T05:44:36Z',
    name: 'Ingaborg Yatman',
    amount: 984,
    status: 'Cobrado',
    status_type: '2',
    month: '1',
    number: '987654321',
  },
  {
    date: '2024-02-07T04:43:42Z',
    name: 'Clem Longbottom',
    amount: 889,
    status: 'Cobrado',
    status_type: '2',
    month: '1',
    number: '987654321',
  },
  {
    date: '2023-05-23T14:48:24Z',
    name: 'Nani Fullagar',
    amount: 355,
    status: 'Vencido',
    status_type: '4',
    month: '1',
    number: '987654321',
  },
  {
    date: '2023-06-21T18:54:46Z',
    name: 'Pyotr Aizikov',
    amount: 361,
    status: 'Vencido',
    status_type: '4',
    month: '1',
    number: '987654321',
  },
];

export async function GET(request: NextRequest) {
  const limit = request.nextUrl.searchParams.get('limit');
  const currentPage = request.nextUrl.searchParams.get('currentPage');
  const month = request.nextUrl.searchParams.get('month');
  const status = request.nextUrl.searchParams.get('status');
  const cursor = (parseInt(currentPage ? currentPage : '0') - 1) * parseInt(limit ? limit : '0');
  const datosFiltrados = clientsData.filter((item) => {
    if (month && status) {
      return item.month === month && item.status_type === status;
    }
    if (month) {
      return item.month === month;
    }
    if (status) {
      return item.status_type === status;
    }
    return item;
  });

  const responseJson = {
    metadata: {
      total: clientsData.length,
      ...(limit && { limit: parseInt(limit) }),
      ...(currentPage && { currentPage: parseInt(currentPage) }),
      ...(limit && { LastPage: Math.ceil(clientsData.length / parseInt(limit)) }),
    },
    ...{ data: datosFiltrados.slice(cursor, cursor + 10) },
  };
  await new Promise((resolve) => {
    setTimeout(resolve, 1000);
  });
  return Response.json(responseJson);
}
