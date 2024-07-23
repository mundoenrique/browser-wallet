import { act, render, screen } from '@testing-library/react';
//Internal app
import Legal from '@/app/(Pages)/dashboard/legal/page';

describe('Legal', () => {
  beforeEach(async () => {
    await act(async () => {
      render(<Legal />);
    });
    expect(render).toBeTruthy();
  });

  // ** Renders a Legal, a title, subtitles.
  it('should render all necessary elements Dashboard Legal', () => {
    expect(
      screen.getByText('TÉRMINOS Y CONDICIONES E Commerce y Mi Tienda Online- CLIENTE DE LA CONSULTORA')
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        'El presente documento contiene los Términos y Condiciones Generales (en adelante, los “Términos y Condiciones Generales”) aplicables a los Sitios Web de las marcas Ésika, L’bel y Cyzone (en adelante, “las Marcas”) que se encuentran en las URL: www.esika.com; www.lbel.com; www.cyzone.com (en adelante, los “Sitios Web”), respecto de las condiciones de uso y venta que rigen las transacciones en los Sitios Web (en adelante, los “Servicios”).'
      )
    ).toBeInTheDocument();
  });
});
