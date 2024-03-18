import { NextRequest } from 'next/server';

const movementData = [
  {
    date: '2023-10-29T05:44:36Z',
    title: 'Ingaborg Yatman',
    amount: 984,
    incoming: false,
  },
  {
    date: '2024-02-07T04:43:42Z',
    title: 'Clem Longbottom',
    amount: 889,
    incoming: true,
  },
  {
    date: '2023-05-23T14:48:24Z',
    title: 'Nani Fullagar',
    amount: 355,
    incoming: false,
  },
  {
    date: '2023-06-21T18:54:46Z',
    title: 'Pyotr Aizikov',
    amount: 361,
    incoming: true,
  },
  {
    date: '2023-08-13T11:19:41Z',
    title: 'Mab Bing',
    amount: 402,
    incoming: false,
  },
  {
    date: '2024-02-07T04:43:42Z',
    title: 'Clem Longbottom',
    amount: 889,
    incoming: true,
  },
  {
    date: '2023-05-23T14:48:24Z',
    title: 'Nani Fullagar',
    amount: 355,
    incoming: false,
  },
  {
    date: '2023-10-29T05:44:36Z',
    title: 'Ingaborg Yatman',
    amount: 984,
    incoming: false,
  },
  {
    date: '2024-02-07T04:43:42Z',
    title: 'Clem Longbottom',
    amount: 889,
    incoming: true,
  },
  {
    date: '2023-05-23T14:48:24Z',
    title: 'Nani Fullagar',
    amount: 355,
    incoming: false,
  },
  {
    date: '2023-06-21T18:54:46Z',
    title: 'Pyotr Aizikov',
    amount: 361,
    incoming: true,
  },
  {
    date: '2023-08-13T11:19:41Z',
    title: 'Mab Bing',
    amount: 402,
    incoming: false,
  },
  {
    date: '2024-02-07T04:43:42Z',
    title: 'Clem Longbottom',
    amount: 889,
    incoming: true,
  },
  {
    date: '2023-05-23T14:48:24Z',
    title: 'Nani Fullagar',
    amount: 355,
    incoming: false,
  },
  {
    date: '2023-10-29T05:44:36Z',
    title: 'Ingaborg Yatman',
    amount: 984,
    incoming: false,
  },
  {
    date: '2024-02-07T04:43:42Z',
    title: 'Clem Longbottom',
    amount: 889,
    incoming: true,
  },
  {
    date: '2023-05-23T14:48:24Z',
    title: 'Nani Fullagar',
    amount: 355,
    incoming: false,
  },
  {
    date: '2023-06-21T18:54:46Z',
    title: 'Pyotr Aizikov',
    amount: 361,
    incoming: true,
  },
  {
    date: '2023-08-13T11:19:41Z',
    title: 'Mab Bing',
    amount: 402,
    incoming: false,
  },
  {
    date: '2024-02-07T04:43:42Z',
    title: 'Clem Longbottom',
    amount: 889,
    incoming: true,
  },
  {
    date: '2023-05-23T14:48:24Z',
    title: 'Nani Fullagar',
    amount: 355,
    incoming: false,
  },
  {
    date: '2023-10-29T05:44:36Z',
    title: 'Ingaborg Yatman',
    amount: 984,
    incoming: false,
  },
  {
    date: '2024-02-07T04:43:42Z',
    title: 'Clem Longbottom',
    amount: 889,
    incoming: true,
  },
  {
    date: '2023-05-23T14:48:24Z',
    title: 'Nani Fullagar',
    amount: 355,
    incoming: false,
  },
  {
    date: '2023-06-21T18:54:46Z',
    title: 'Pyotr Aizikov',
    amount: 361,
    incoming: true,
  },
  {
    date: '2023-08-13T11:19:41Z',
    title: 'Mab Bing',
    amount: 402,
    incoming: false,
  },
  {
    date: '2024-02-07T04:43:42Z',
    title: 'Clem Longbottom',
    amount: 889,
    incoming: true,
  },
  {
    date: '2023-05-23T14:48:24Z',
    title: 'Nani Fullagar',
    amount: 355,
    incoming: false,
  },
];
export async function GET(request: NextRequest) {
  const limit = request.nextUrl.searchParams.get('limit');
  const currentPage = request.nextUrl.searchParams.get('currentPage');
  const cursor = (parseInt(currentPage ? currentPage : '0') - 1) * parseInt(limit ? limit : '0');
  const responseJson = {
    metadata: {
      total: movementData.length,
      ...(limit && { limit: parseInt(limit) }),
      ...(currentPage && { currentPage: parseInt(currentPage) }),
      ...(limit && { LastPage: Math.ceil(movementData.length / parseInt(limit)) }),
    },
    ...{ data: movementData.slice(cursor, cursor + 10) },
  };
  await new Promise((resolve) => {
    setTimeout(resolve, 1000);
  });
  return Response.json(responseJson);
}
