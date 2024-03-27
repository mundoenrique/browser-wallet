import { NextRequest } from 'next/server';

const clientsData = [
  {
    id: 1,
    date: '2023-10-29T05:44:36Z',
    name: 'Ingaborg Yatman',
    amount: 984,
    status: 'Cobrado',
    status_type: '2',
    month: '1',
    number: '987654321',
  },
  {
    id: 2,
    date: '2024-02-07T04:43:42Z',
    name: 'Clem Longbottom',
    amount: 889,
    status: 'Vencido',
    status_type: '4',
    month: '1',
    number: '987654321',
  },
  {
    id: 3,
    date: '2023-05-23T14:48:24Z',
    name: 'Nani Fullagar',
    amount: 355,
    status: 'Cobrado',
    status_type: '2',
    month: '1',
    number: '987654321',
  },
  {
    id: 4,
    date: '2023-06-21T18:54:46Z',
    name: 'Pyotr Aizikov',
    amount: 361,
    status: 'Cobrado',
    status_type: '2',
    month: '1',
    number: '987654321',
  },
  {
    id: 5,
    date: '2023-08-13T11:19:41Z',
    name: 'Mab Bing',
    amount: 402,
    status: 'Vencido',
    status_type: '4',
    month: '1',
    number: '987654321',
  },
  {
    id: 6,
    date: '2024-02-07T04:43:42Z',
    name: 'Clem Longbottom',
    amount: 889,
    status: 'Vencido',
    status_type: '4',
    month: '1',
    number: '987654321',
  },
  {
    id: 7,
    date: '2023-05-23T14:48:24Z',
    name: 'Nani Fullagar',
    amount: 355,
    status: 'Cobrado',
    status_type: '2',
    month: '1',
    number: '987654321',
  },
  {
    id: 8,
    date: '2023-06-21T18:54:46Z',
    name: 'Pyotr Aizikov',
    amount: 361,
    status: 'Cobrado',
    status_type: '2',
    month: '1',
    number: '987654321',
  },
  {
    id: 9,
    date: '2023-08-13T11:19:41Z',
    name: 'Mab Bing',
    amount: 402,
    status: 'Vencido',
    status_type: '4',
    month: '1',
    number: '987654321',
  },
  {
    id: 10,
    date: '2023-10-29T05:44:36Z',
    name: 'Ingaborg Yatman',
    amount: 984,
    status: 'Cobrado',
    status_type: '2',
    month: '1',
    number: '987654321',
  },
  {
    id: 11,
    date: '2024-02-07T04:43:42Z',
    name: 'Clem Longbottom',
    amount: 889,
    status: 'Pendiente',
    status_type: '3',
    month: '1',
    number: '987654321',
  },
  {
    id: 12,
    date: '2023-05-23T14:48:24Z',
    name: 'Nani Fullagar',
    amount: 355,
    status: 'Cobrado',
    status_type: '2',
    month: '1',
    number: '987654321',
  },
  {
    id: 13,
    date: '2023-06-21T18:54:46Z',
    name: 'Pyotr Aizikov',
    amount: 361,
    status: 'Cobrado',
    status_type: '2',
    month: '1',
    number: '987654321',
  },
  {
    id: 14,
    date: '2023-08-13T11:19:41Z',
    name: 'Mab Bing',
    amount: 402,
    status: 'Vencido',
    status_type: '4',
    month: '1',
    number: '987654321',
  },
  {
    id: 15,
    date: '2023-10-29T05:44:36Z',
    name: 'Ingaborg Yatman',
    amount: 984,
    status: 'Pendiente',
    status_type: '3',
    month: '1',
    number: '987654321',
  },
  {
    id: 16,
    date: '2024-02-07T04:43:42Z',
    name: 'Clem Longbottom',
    amount: 889,
    status: 'Vencido',
    status_type: '4',
    month: '1',
    number: '987654321',
  },
  {
    id: 17,
    date: '2023-05-23T14:48:24Z',
    name: 'Nani Fullagar',
    amount: 355,
    status: 'Cobrado',
    status_type: '2',
    month: '1',
    number: '987654321',
  },
  {
    id: 18,
    date: '2023-06-21T18:54:46Z',
    name: 'Pyotr Aizikov',
    amount: 361,
    status: 'Pendiente',
    status_type: '3',
    month: '1',
    number: '987654321',
  },
  {
    id: 19,
    date: '2023-08-13T11:19:41Z',
    name: 'Mab Bing',
    amount: 402,
    status: 'Vencido',
    status_type: '4',
    month: '1',
    number: '987654321',
  },
  {
    id: 20,
    date: '2023-10-29T05:44:36Z',
    name: 'Ingaborg Yatman',
    amount: 984,
    status: 'Cobrado',
    status_type: '2',
    month: '1',
    number: '987654321',
  },
  {
    id: 21,
    date: '2024-02-07T04:43:42Z',
    name: 'Clem Longbottom',
    amount: 889,
    status: 'Cobrado',
    status_type: '2',
    month: '1',
    number: '987654321',
  },
  {
    id: 22,
    date: '2023-05-23T14:48:24Z',
    name: 'Nani Fullagar',
    amount: 355,
    status: 'Vencido',
    status_type: '4',
    month: '1',
    number: '987654321',
  },
  {
    id: 23,
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
