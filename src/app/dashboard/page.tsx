'use client';

function ramdomNumber(count: number) {
  return Math.floor(Math.random() * count);
}
export default function Dashboard() {
  const random = ramdomNumber(2);

  if (random === 1) {
    throw new Error('Error en componente');
  }

  return (
    <>
      <h1>Dashboard Page</h1>
      <h2>{random}</h2>
    </>
  );
}
