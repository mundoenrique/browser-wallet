export async function GET() {
  return new Response('Health check ok test', {
    status: 200,
  });
}
