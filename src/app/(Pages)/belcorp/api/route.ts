import axios from 'axios';
export async function GET() {
  try {
    const response = await axios.get('https://pre1a.niubizqr.pagoefectivo.pe/671A19EA-5351-41F2-9FD1-F625D04A5069.png');
    return Response.json(
      { data: Buffer.from(response.data, 'binary').toString('base64') },
      {
        status: 200,
      }
    );
  } catch (error: any) {
    return Response.json(
      { error },
      {
        status: error?.status,
      }
    );
  }
}
