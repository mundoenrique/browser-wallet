'use client';

import { Grid, Stack, Typography } from '@mui/material';

/**
 *
 * Component used to display the terms and conditions and as a webview in the mobile application
 */
export default function Terms() {
  return (
    <>
      <Typography
        variant="h6"
        color="primary"
        sx={{ color: 'primary.main', mb: 6, display: { xs: 'none ', md: 'block' }, textAlign: 'center' }}
      >
        TÉRMINOS Y CONDICIONES E Commerce y Mi Tienda Online- CLIENTE DE LA CONSULTORA
      </Typography>

      <Stack spacing={2} sx={{ px: { xs: 2, md: 0 }, textAlign: 'justify', mb: { xs: 10, md: 0 } }}>
        <Typography variant="subtitle1">Actualización: febrero 2023</Typography>

        <Typography paragraph>
          El presente documento contiene los Términos y Condiciones Generales (en adelante, los “Términos y Condiciones
          Generales”) aplicables a los Sitios Web de las marcas Ésika, L’bel y Cyzone (en adelante, “las Marcas”) que se
          encuentran en las URL: www.esika.com; www.lbel.com; www.cyzone.com (en adelante, los “Sitios Web”), respecto
          de las condiciones de uso y venta que rigen las transacciones en los Sitios Web (en adelante, los
          “Servicios”).
        </Typography>

        <Typography paragraph>
          La sola visita a una plataforma de comercio electrónico no impone al consumidor obligación alguna, a menos que
          haya aceptado en forma inequívoca los términos y condiciones ofrecidos por el vendedor u operador de la
          plataforma.
        </Typography>

        <Typography variant="subtitle1">I. INFORMACIÓN GENERAL</Typography>

        <Typography paragraph>
          Los Servicios son ofrecidos por DEC SERVICES S.A.C., identificada con RUC N° 20566558247, domiciliada en Av.
          Pardo y Aliaga N° 652, interior 901, San Isidro, Lima, Perú, representada por Leslie Pierce Balbuena,
          identificado con DNI N° 10226176, quien es la empresa titular de los Sitios Web (en adelante, “LA EMPRESA”).
        </Typography>

        <Typography paragraph>
          Asimismo, la venta y despacho de productos realizada a través de los Sitios Web será gestionada por las
          siguientes empresas según el país que corresponda:
        </Typography>

        <Grid
          container
          columns={4}
          sx={{
            display: 'flex',
            flexDirection: { xs: 'colunm', md: 'row' },
            justifyContent: { xs: 'flex-start', md: 'center' },
          }}
        >
          <Grid
            item
            xs={1}
            sx={{
              display: 'flex',
              justifyContent: { xs: 'flex-start', md: 'center' },
              alignItems: { xs: 'flex-start', md: 'center' },
            }}
          >
            <Typography variant="subtitle1">Perú:</Typography>
          </Grid>
          <Grid item xs={4} md={3} p={3}>
            <Typography variant="body1">Empresa: Cetco S.A.</Typography>
            <Typography variant="body1">
              Domicilio: Av. Pardo y Aliaga Nº 652, int. 1201, San Isidro, Lima, Perú
            </Typography>
            <Typography variant="body1">RUC: 20100123763</Typography>
          </Grid>

          <Grid
            item
            xs={4}
            md={1}
            sx={{
              display: 'flex',
              justifyContent: { xs: 'flex-start', md: 'center' },
              alignItems: { xs: 'flex-start', md: 'center' },
            }}
          >
            <Typography variant="subtitle1">Colombia:</Typography>
          </Grid>
          <Grid item xs={4} md={3} p={3}>
            <Typography variant="body1">Empresa: Bel Star S.A.</Typography>
            <Typography variant="body1">
              Domicilio: Km. 22 Carretera Central del Norte, Parque Industrial Canavita, Vereda Canavita, Tocancipá, San
              Isidro, Cundinamarca, Colombia
            </Typography>
            <Typography variant="body1">NIT: 8000183591</Typography>
          </Grid>

          <Grid
            item
            xs={4}
            md={1}
            sx={{
              display: 'flex',
              justifyContent: { xs: 'flex-start', md: 'center' },
              alignItems: { xs: 'flex-start', md: 'center' },
            }}
          >
            <Typography variant="subtitle1">Chile:</Typography>
          </Grid>
          <Grid item xs={4} md={3} p={3}>
            <Typography variant="body1">Empresa: Promotora de Belleza S.A.</Typography>
            <Typography variant="body1">Rol Único Tributario: 96.524.830-7</Typography>
            <Typography variant="body1">Domicilio: Av. Aeropuerto Nº 860, Quilicura, Santiago, Chile</Typography>
            <Typography variant="body1">Representante Legal: Lisa Weinreich</Typography>
            <Typography variant="body1">RUT: 96.524.830-7</Typography>
          </Grid>

          <Grid
            item
            xs={4}
            md={1}
            sx={{
              display: 'flex',
              justifyContent: { xs: 'flex-start', md: 'center' },
              alignItems: { xs: 'flex-start', md: 'center' },
            }}
          >
            <Typography variant="subtitle1">México:</Typography>
          </Grid>
          <Grid item xs={4} md={3} p={3}>
            <Typography variant="body1">Empresa: Transbel S.A. de C.V.</Typography>
            <Typography variant="body1">
              Domicilio: Edificio Torre Reforma - Piso 32, Calle Paseo de la Reforma 483, Colonia Cuauhtémoc, Delegación
              Cuauhtémoc, México
            </Typography>
            <Typography variant="body1">RFC:TRA950227PX7</Typography>
          </Grid>

          <Grid
            item
            xs={4}
            md={1}
            sx={{
              display: 'flex',
              justifyContent: { xs: 'flex-start', md: 'center' },
              alignItems: { xs: 'flex-start', md: 'center' },
            }}
          >
            <Typography variant="subtitle1">Ecuador</Typography>
          </Grid>
          <Grid item xs={4} md={3} p={3}>
            <Typography variant="body1">Empresa: Grupo Transbel S.A.</Typography>
            <Typography variant="body1">
              Domicilio: Inglaterra E3-266 y Avenida Amazonas, esquina Edificio Stratta, Piso 5 y 6, ciudad de Quito,
              Distrito Metropolitano, Provincia de Pichincha, Quito
            </Typography>
            <Typography variant="body1">RUC: 1791412540001</Typography>
          </Grid>

          <Grid
            item
            xs={4}
            md={1}
            sx={{
              display: 'flex',
              justifyContent: { xs: 'flex-start', md: 'center' },
              alignItems: { xs: 'flex-start', md: 'center' },
            }}
          >
            <Typography variant="subtitle1">Panamá</Typography>
          </Grid>
          <Grid item xs={4} md={3} p={3}>
            <Typography variant="body1">Empresa: L’bel Paris S.A.</Typography>
            <Typography variant="body1">
              Domicilio: Oceanía Business Plaza, Punta Pacifica, Torre 1000 Piso 25 Local G, Ciudad de Panamá
            </Typography>
            <Typography variant="body1">RUC: 1178871-1-577745 Dígito Verificador (DV) 80</Typography>
          </Grid>
        </Grid>

        <Typography paragraph>
          Cualquier persona (en adelante, el “Usuario” o los “Usuarios”) que desee acceder y/o suscribirse y/o usar los
          Sitios Web podrá hacerlo sujetándose a los Términos y Condiciones Generales, junto con todas las demás
          políticas y principios que rigen los Sitios Web y que son incorporados al presente documento directamente o
          por referencia o que son explicados y/o detallados en otras secciones de los Sitios Web.
        </Typography>

        <Typography paragraph>
          En consecuencia, todas las visitas, contratos y transacciones que se realicen a través de los Sitios Web, así
          como sus efectos jurídicos, quedarán regidos por estas reglas y sometidos a la legislación aplicable en Perú.
        </Typography>

        <Typography paragraph>
          Los Términos y Condiciones Generales contenidos en este instrumento se aplicarán y se entenderán como parte
          integral de todos los actos y contratos que se ejecuten o celebren mediante los sistemas de oferta y
          comercialización comprendidos en los Sitios Web entre los Usuarios de la misma, las Consultoras de belleza
          independientes y LA EMPRESA, y/o por cualquiera de las otras sociedades o empresas que sean filiales o
          vinculadas a ella y que formen parte del Grupo Belcorp al cual LA EMPRESA pertenece, y que hagan uso de los
          Sitios Web, a las cuales se las denominará en adelante también en forma indistinta, dentro del concepto de LA
          EMPRESA.
        </Typography>

        <Typography paragraph>
          Cualquier persona que no acepte estos Términos y Condiciones Generales, los cuales tienen un carácter
          obligatorio y vinculante, deberá abstenerse de utilizar los Sitios Web y/o los Servicios.
        </Typography>

        <Typography paragraph>
          El Usuario debe leer, entender y aceptar todas las condiciones establecidas en los Términos y Condiciones
          Generales de LA EMPRESA, así como en los demás documentos incorporados a los mismos por referencia, previo al
          acceso y/o uso de los Sitios Web y/o a la adquisición de productos y/o entrega de cualquier dato, quedando
          sujetos a lo señalado y dispuesto en los Términos y Condiciones Generales.
        </Typography>

        <Typography variant="subtitle1">1. CAPACIDAD LEGAL</Typography>

        <Typography paragraph>
          Los Servicios solo están disponibles para personas naturales que tengan capacidad legal para contratar y que
          no estén impedidos o suspendidos legalmente para hacerlo.
        </Typography>

        <Typography paragraph>
          Los menores de edad podrán actuar en los Sitios Web siempre que cuenten con la autorización de sus padres o
          tutores. Ellos serán responsables de los actos realizados por los menores de edad en los Sitios Web, en
          ejercicio de la representación legal con la que cuentan.
        </Typography>

        <Typography variant="subtitle1">2. DESCRIPCIÓN DE LOS SITIOS WEB</Typography>

        <Typography paragraph>
          Los Sitios Web son herramientas digitales que le permiten a los Usuarios navegar en sus diferentes secciones,
          visualizar los productos ofrecidos por las empresas mencionadas en el cuadro líneas arriba (en adelante, “LAS
          VENDEDORAS”) y, en caso corresponda, adquirir los productos y/o Servicios otorgados por las mismas. El acceso
          a los Sitios Web, se realizará desde equipos móviles, portátiles u ordenadores y, en general, cualquier medio
          digital que lo permita.
        </Typography>

        <Typography variant="subtitle1">3. REGISTRO EN LOS SITIOS WEB</Typography>

        <Typography paragraph>
          La navegación y el acceso a los Sitios Web es gratuita y no requiere registro previo por parte del Usuario en
          los Sitios Web para navegar en los mismos. Sin embargo, en caso los Usuarios decidan realizar una compra,
          podrán hacerlo previo registro en los Sitios Web.
        </Typography>

        <Typography paragraph>
          Para efectos del registro de los Usuarios en los Sitios Web, es obligatorio completar el formulario de
          registro en todos sus campos con datos válidos y verdaderos para convertirse en Usuario autorizado de los
          Sitios Web, de esta manera, los Usuarios podrán acceder a las promociones, y a la adquisición de productos y/o
          servicios ofrecidos en los Sitios Web.
        </Typography>

        <Typography paragraph>
          LA EMPRESA podrá utilizar diversos medios para identificar a sus Usuarios, pero no se responsabiliza por la
          certeza de los datos personales provistos por estos. Los Usuarios garantizan y responden, en cualquier caso,
          de la exactitud, veracidad, vigencia y autenticidad de los datos personales ingresados. En ese sentido, la
          declaración realizada por los Usuarios al momento de registrarse se entenderá como una Declaración Jurada.
        </Typography>

        <Typography paragraph>
          Cada Usuario sólo podrá ser titular de una (1) cuenta en los Sitios web, no pudiendo acceder a más de una (1)
          cuenta con distintas direcciones de correo electrónico o falseando, modificando y/o alterando sus datos
          personales de cualquier manera posible. En caso se detecte esta infracción, LA EMPRESA se comunicará con el
          Usuario informándole que todas sus cuentas serán agrupadas en una sola cuenta anulándose todas sus demás
          cuentas. Ello se informará al Usuario mediante el correo electrónico indicado por él mismo, o el último
          registrado en los Sitios Web. Asimismo, en estos casos, LA EMPRESA podrá tomar las acciones legales que estime
          convenientes, incluyendo, pero sin limitarse a bloquear las cuentas duplicadas, bloquear las cuentas del
          Usuario en otros canales de venta de LAS VENDEDORAS, tales como Venta Directa, etc.
        </Typography>

        <Typography paragraph>
          Si se verifica o sospecha algún uso fraudulento y/o malintencionado y/o contrario a estos Términos y
          Condiciones Generales y/o contrarios a la buena fe, LA EMPRESA tendrá el derecho inapelable de dar por
          terminados los contratos que correspondan, no hacer efectiva las promociones, cancelar las transacciones en
          curso, dar de baja las cuentas (de los Sitios Web y/o de otros canales de venta como Venta Directa) y hasta de
          perseguir judicialmente a los infractores.
        </Typography>

        <Typography paragraph>
          LA EMPRESA podrá realizar los controles que crea convenientes para verificar la veracidad de la información
          dada por el Usuario. En ese sentido, se reserva el derecho de solicitar algún comprobante y/o dato adicional a
          efectos de corroborar los datos personales, así como de suspender temporal o definitivamente a aquellos
          Usuarios cuyos datos no hayan podido ser confirmados. En caso de suspensión temporal, LA EMPRESA comunicará a
          los Usuarios, informando el tiempo de suspensión de la cuenta. En casos de inhabilitación, LA EMPRESA podrá
          dar de baja la compra efectuada, sin que ello genere derecho alguno a resarcimiento, pago y/o indemnización a
          favor de los Usuarios.
        </Typography>

        <Typography paragraph>
          El Usuario, una vez registrado, dispondrá de su dirección de email y una clave secreta (en adelante la
          “Clave”) que le permitirá el acceso personalizado, confidencial y seguro a los Sitios Web. En caso de poseer
          estos datos, el Usuario tendrá la posibilidad de cambiar la Clave para lo cual deberá sujetarse al
          procedimiento establecido en el sitio respectivo. El Usuario se obliga a mantener la confidencialidad de su
          Clave, asumiendo totalmente la responsabilidad por el mantenimiento de la confidencialidad de su Clave
          registrada en los Sitios Web, la cual le permite efectuar compras, solicitar servicios y obtener información.
          Dicha Clave es de uso personal, y su entrega a terceros no involucra responsabilidad para LA EMPRESA en caso
          de utilización indebida, negligente y/o incorrecta.
        </Typography>

        <Typography paragraph>
          El Usuario será responsable por todas las operaciones efectuadas en y desde su cuenta, pues el acceso a la
          misma está restringido con la Clave, de uso y conocimiento exclusivo del Usuario. El Usuario, además, se
          compromete a notificar a LA EMPRESA en forma inmediata y por medio idóneo y fehaciente, cualquier uso indebido
          o no autorizado de su Cuenta y/o Clave, así como el ingreso por terceros no autorizados a la misma. Se aclara
          que está prohibida la venta, cesión, préstamo o transferencia de la Clave y/o cuenta bajo ningún título. Por
          lo tanto, los Usuarios, se comprometen a mantener indemne a LA EMPRESA por el uso indebido y/o no autorizado
          de su cuenta en los Sitios Web.
        </Typography>

        <Typography paragraph>
          LA EMPRESA se reserva el derecho de rechazar cualquier solicitud de registro o de cancelar un registro
          previamente aceptado, sin que esté obligado a comunicar o exponer las razones de su decisión y sin que ello
          genere algún derecho a indemnización o resarcimiento a favor de los Usuarios.
        </Typography>

        <Typography paragraph>
          Toda la información brindada por los Usuarios será almacenada y gestionada de acuerdo a lo indicado en la
          Política de Privacidad de los Sitios Web.
        </Typography>

        <Typography variant="subtitle1">4. USO DE LOS SITIOS WEB</Typography>

        <Typography paragraph>
          A través de los Sitios Web, el Usuario podrá visualizar los productos comercializados por LAS VENDEDORAS y
          comprarlos. Para ello, podrá comprar los productos de forma directa o a través de una Consultora, ingresando
          su código de Consultora de belleza independiente antes de realizar la compra. En ambos casos, el Usuario
          deberá pagar a través de los Sitios Web ingresando su domicilio, teléfono celular, los datos de la tarjeta de
          crédito o débito o eligiendo entre las opciones de “pago efectivo” o “pago contra entrega”, con excepción de
          Chile y Panamá que tendrán solo las opciones de pago con tarjeta de débito o crédito. Para mayor detalle sobre
          los métodos de pago, se deberá consultar la sección “6. Métodos de Pago” del presente documento. Asimismo,
          será LA EMPRESA quien hará la entrega de dichos productos al Usuario según las opciones disponibles a través
          de los Sitios Web.
        </Typography>

        <Typography paragraph>
          Los productos ofrecidos en los Sitios Web, salvo que se señale una forma diferente para casos particulares u
          ofertas de determinados bienes, solo pueden ser pagados con los medios que en cada caso específicamente se
          indiquen. El uso de tarjetas de crédito o débito se sujetará a lo establecido en estos Términos y Condiciones
          Generale, tratándose de tarjetas bancarias aceptadas en los Sitios Web, los aspectos relativos a estas, tales
          como la fecha de emisión, caducidad, bloqueos, cobros de comisiones, interés de compra en cuotas, etc., se
          regirán por los respectivos contratos suscritos con el banco emisor del medio de pago, de tal forma que LA
          EMPRESA o LAS VENDEDORAS no tendrán responsabilidad por cualquiera de los aspectos señalados. Cabe señalar
          que, la operación podría cancelarse o anularse en caso el Usuario no brinde los datos completos o proporcione
          información falsa respecto a la tarjeta que utilice para la compra.
        </Typography>

        <Typography paragraph>
          La venta y despacho de los productos está condicionada a su disponibilidad. Cuando el producto no se encuentre
          disponible y/o haya tenido un error tipográfico, LA EMPRESA le notificará de inmediato al Usuario, previo al
          pago de los productos.
        </Typography>

        <Typography variant="subtitle1">4.1. FUNCIONALIDAD “SKIN ADVISOR”</Typography>

        <Typography paragraph>
          A través del Sitio Web, los Usuarios podrán hacer uso de la funcionalidad “Skin Advisor”, la misma que permite
          realizar un análisis del estado de la piel de los Usuarios. Para ello, los Usuarios deberán tomarse una foto o
          subir a la plataforma una foto en forma de “selfie”. Con la foto, la plataforma “Skin Advisor” realizará un
          análisis personalizado de la piel del Usuario y emitirá recomendaciones de productos de Las marcas ésika,
          L’bel y Cyzone adecuados para su tipo de piel y necesidades conforme a lo evaluado por el “Skin Advisor”; los
          mismos que luego podrán ser adquiridos por los Usuarios a través de las plataformas de comercialización
          digital de LA EMPRESA. Bajo ningún supuesto, “Skin Advisor” ofrece un diagnóstico ni un tratamiento médico y/o
          dermatológico.
        </Typography>

        <Typography paragraph>
          La Funcionalidad “Skin Advisor” se encontrará disponible para los Usuarios en las plataformas de
          comercialización digital de LA EMPRESA y en los siguientes links, según aplique:
        </Typography>

        <Grid
          container
          columns={4}
          sx={{
            width: { xs: 320, sm: 'auto' },
            maxWidth: { xs: '100%', sm: 'fit-content' },
            whiteSpace: 'wrap',
            overflowX: { xs: 'auto', sm: 'hidden' },
          }}
        >
          <Grid
            item
            xs={1}
            sx={{
              display: 'flex',
              flexDirection: { xs: 'colunm', md: 'row' },
              justifyContent: { xs: 'flex-start', md: 'center' },
              alignItems: { xs: 'flex-start', md: 'center' },
            }}
          >
            <Typography
              variant="subtitle1"
              sx={{
                display: 'flex',
                justifyContent: { xs: 'flex-start', md: 'center' },
                alignItems: { xs: 'flex-start', md: 'center' },
              }}
            >
              Perú:
            </Typography>
          </Grid>
          <Grid item xs={4} md={3} sx={{ p: { xs: 0, md: 3 } }}>
            <Typography variant="body1">https://beautytech.lbel.com/pe/avanzadodiagnosticodepiel</Typography>
            <Typography variant="body1">https://beautytech.esika.com/pe/diagnosticodepielonline</Typography>
            <Typography variant="body1">https://beautytech.cyzone.com/pe/diagnosticodepiel</Typography>
          </Grid>

          <Grid
            item
            xs={4}
            md={1}
            sx={{
              display: 'flex',
              flexDirection: { xs: 'colunm', md: 'row' },
              justifyContent: { xs: 'flex-start', md: 'center' },
              alignItems: { xs: 'flex-start', md: 'center' },
            }}
          >
            <Typography
              variant="subtitle1"
              sx={{
                display: 'flex',
                justifyContent: { xs: 'flex-start', md: 'center' },
                alignItems: { xs: 'flex-start', md: 'center' },
              }}
            >
              Colombia:
            </Typography>
          </Grid>
          <Grid item xs={4} md={3} sx={{ p: { xs: 0, md: 3 } }}>
            <Typography variant="body1">https://beautytech.lbel.com/co/avanzadodiagnosticodepiel</Typography>
            <Typography variant="body1">https://beautytech.esika.com/co/diagnosticodepielonline</Typography>
            <Typography variant="body1">https://beautytech.cyzone.com/co/diagnosticodepiel</Typography>
          </Grid>

          <Grid
            item
            xs={4}
            md={1}
            sx={{
              display: 'flex',
              flexDirection: { xs: 'colunm', md: 'row' },
              justifyContent: { xs: 'flex-start', md: 'center' },
              alignItems: { xs: 'flex-start', md: 'center' },
            }}
          >
            <Typography
              variant="subtitle1"
              sx={{
                display: 'flex',
                justifyContent: { xs: 'flex-start', md: 'center' },
                alignItems: { xs: 'flex-start', md: 'center' },
              }}
            >
              Chile:
            </Typography>
          </Grid>
          <Grid item xs={4} md={3} sx={{ p: { xs: 0, md: 3 } }}>
            <Typography variant="body1">https://beautytech.lbel.com/cl/avanzadodiagnosticodepiel</Typography>
            <Typography variant="body1">https://beautytech.esika.com/cl/diagnosticodepielonline</Typography>
            <Typography variant="body1">https://beautytech.cyzone.com/cl/diagnosticodepiel</Typography>
          </Grid>

          <Grid
            item
            xs={4}
            md={1}
            sx={{
              display: 'flex',
              flexDirection: { xs: 'colunm', md: 'row' },
              justifyContent: { xs: 'flex-start', md: 'center' },
              alignItems: { xs: 'flex-start', md: 'center' },
            }}
          >
            <Typography
              variant="subtitle1"
              sx={{
                display: 'flex',
                justifyContent: { xs: 'flex-start', md: 'center' },
                alignItems: { xs: 'flex-start', md: 'center' },
              }}
            >
              México:
            </Typography>
          </Grid>
          <Grid item xs={4} md={3} sx={{ p: { xs: 0, md: 3 } }}>
            <Typography variant="body1">https://beautytech.lbel.com/mx/avanzadodiagnosticodepiel</Typography>
            <Typography variant="body1">https://beautytech.esika.com/mx/diagnosticodepielonline</Typography>
            <Typography variant="body1">https://beautytech.cyzone.com/mx/diagnosticodepiel</Typography>
          </Grid>

          <Grid
            item
            xs={4}
            md={1}
            sx={{
              display: 'flex',
              flexDirection: { xs: 'colunm', md: 'row' },
              justifyContent: { xs: 'flex-start', md: 'center' },
              alignItems: { xs: 'flex-start', md: 'center' },
            }}
          >
            <Typography
              variant="subtitle1"
              sx={{
                display: 'flex',
                justifyContent: { xs: 'flex-start', md: 'center' },
                alignItems: { xs: 'flex-start', md: 'center' },
              }}
            >
              Ecuador:
            </Typography>
          </Grid>
          <Grid item xs={4} md={3} sx={{ p: { xs: 0, md: 3 } }}>
            <Typography variant="body1">https://beautytech.lbel.com/ec/avanzadodiagnosticodepiel</Typography>
            <Typography variant="body1">https://beautytech.esika.com/ec/diagnosticodepielonline</Typography>
            <Typography variant="body1">https://beautytech.cyzone.com/ec/diagnosticodepiel</Typography>
          </Grid>

          <Grid
            item
            xs={4}
            md={1}
            sx={{
              display: 'flex',
              flexDirection: { xs: 'colunm', md: 'row' },
              justifyContent: { xs: 'flex-start', md: 'center' },
              alignItems: { xs: 'flex-start', md: 'center' },
            }}
          >
            <Typography
              variant="subtitle1"
              sx={{
                display: 'flex',
                justifyContent: { xs: 'flex-start', md: 'center' },
                alignItems: { xs: 'flex-start', md: 'center' },
              }}
            >
              Panamá:
            </Typography>
          </Grid>
          <Grid item xs={4} md={3} sx={{ p: { xs: 0, md: 3 } }}>
            <Typography variant="body1">https://beautytech.lbel.com/pa/avanzadodiagnosticodepiel</Typography>
            <Typography variant="body1">https://beautytech.cyzone.com/pa/diagnosticodepiel</Typography>
          </Grid>
        </Grid>

        <Typography variant="subtitle1">5. MODIFICACIONES DEL ACUERDO</Typography>

        <Typography paragraph>
          LA EMPRESA podrá modificar los Términos y Condiciones Generales en cualquier momento. Toda modificación será
          vinculante desde su publicación en la sección de documentos legales de los Sitios Web. Para mayor claridad
          respecto a la vigencia de este documento, los Usuarios podrán encontrar la última fecha de actualización de
          este en la parte superior del presente documento.
        </Typography>

        <Typography paragraph>
          En caso de que el Usuario no esté de acuerdo con los Términos y Condiciones Generales actualizados, deberá
          abstenerse de utilizar los Sitios Web y sus actualizaciones, toda vez que la utilización de éstos implica una
          manifestación de voluntad expresa del Usuario con los Términos y Condiciones Generales vigentes.
        </Typography>

        <Typography paragraph>
          LA EMPRESA se reserva el derecho de modificar, retirar los productos o servicios ofrecidos, según la
          disponibilidad de estos, de acuerdo con los presentes Términos y Condiciones Generales, en cualquier momento y
          por cualquier motivo. En caso ocurriese una modificación en el stock de los productos seleccionados por los
          Usuarios, la misma será comunicada de este hecho de manera previa a realizar el pago de su pedido.
        </Typography>

        <Typography variant="subtitle1">6. MEDIOS DE PAGO</Typography>

        <Typography paragraph>
          El Usuario realizará la compra de los productos y servicios ofrecidos en los Sitios Web de manera directa a
          LAS VENDEDORAS. Para ello, el Usuario accederá a la plataforma de pago que está vinculada en los Sitios Web,
          en donde deberá agregar la siguiente información adicional relacionada al pedido de sus productos y al método
          de pago: Nombre, apellido, número de documento de identidad, domicilio, teléfono celular y los datos de su
          tarjeta de crédito o débito o eligiendo entre las opciones de “pago efectivo” o “pago contra entrega”.
          Asimismo, serán LAS VENDEDORAS quienes harán la entrega de dichos productos al Usuario según las opciones
          disponibles a través de los Sitios Web y de acuerdo al país que corresponda, especificadas en la sección 9. de
          los Términos y Condiciones Generales. Los métodos de pago aplicables por país son los siguientes:
        </Typography>

        <Typography paragraph>
          • <b>Perú:</b> Tarjeta de crédito o débito, pago contra entrega o pagos en efectivo a través de Agencias BCP,
          Interbank, Scotiabank y BBVA.
        </Typography>

        <Typography paragraph>
          • <b>Chile:</b> Tarjeta de crédito o débito
        </Typography>

        <Typography paragraph>
          • <b>México:</b> Tarjeta de crédito o débito o pagos en efectivo a través de Red Efectiva y Red Banco Azteca.
        </Typography>

        <Typography paragraph>
          • <b>Colombia:</b> Tarjeta de crédito o débito, pago contra entrega o pagos en efectivo a través de Efecty y
          PSE.
        </Typography>

        <Typography paragraph>
          • <b>Ecuador:</b> Tarjeta de crédito o débito, pagos en agentes y bancos (Pichincha, Western Union,
          Produbanco, Punto Zmart, Produ Ágil, Servipagos y Mi Vecino).
        </Typography>

        <Typography paragraph>
          • <b>Panamá:</b> Tarjeta de crédito o débito.
        </Typography>

        <Typography paragraph>
          Los productos ofrecidos en los Sitios Web, salvo que se señale una forma diferente para casos particulares u
          ofertas de determinados bienes, solo pueden ser pagados con los medios que en cada caso específicamente se
          indiquen. El uso de tarjetas de crédito o débito se sujetará a lo establecido en estos Términos y Condiciones
          Generales en relación con su emisor, y a lo pactado en los respectivos contratos suscritos con el banco emisor
          del medio de pago. Tratándose de tarjetas bancarias aceptadas en los Sitios Web, los aspectos relativos a
          éstas, tales como la fecha de emisión, caducidad, bloqueos, cobros de comisiones, interés de compra en cuotas,
          etc., se regirán por los respectivos contratos suscritos con el banco emisor del medio de pago, de tal forma
          que LA EMPRESA y las VENDEDORAS no tendrán responsabilidad por cualquiera de los aspectos señalados. Cabe
          señalar que, la operación podría cancelarse o anularse en caso el Usuario no brinde los datos completos o
          proporcione información falsa respecto a la tarjeta que utilice para la compra.
        </Typography>

        <Typography paragraph>
          LA EMPRESA no es propietaria, titular ni administradora de la plataforma de pago de Cybersouce ofrecida a
          través de los Sitios Web; por consiguiente, cualquier error, suspensión o fallas en el sistema de dicha
          plataforma, no serán responsabilidad de LA EMPRESA. Además, al aceptar los Términos y Condiciones Generales,
          los Usuarios también aceptan los términos y condiciones de Cybersource.
        </Typography>

        <Typography paragraph>
          La venta y despacho de los productos está condicionada a su disponibilidad. Cuando el producto no se encuentre
          disponible y/o haya tenido un error tipográfico, LA EMPRESA y/o LAS VENDEDORAS le notificarán de inmediato al
          Usuario al correo electrónico o número de teléfono indicado al momento de hacer el pedido.
        </Typography>

        <Typography paragraph>
          Además de los Términos y Condiciones Generales establecidos en este documento, cuando LA EMPRESA y/o LAS
          VENDEDORAS realicen promociones en vallas publicitarias, radio, televisión u otros medios publicitarios,
          aplican adicionalmente los siguientes Términos y Condiciones específicos:
        </Typography>

        <Typography paragraph>• El uso del cupón de descuento es completamente gratuito.</Typography>

        <Typography paragraph>
          • Cuando se ofrezcan cupones de descuento, se señalará en la publicidad, el valor del cupón, la suma mínima o
          máxima de compra (en caso aplique) para poder redimir el bono, las fechas válidas para su redención y el stock
          mínimo/ stock aplicable.
        </Typography>

        <Typography paragraph>
          • El cupón de descuento aplica para compras realizada exclusivamente en los Sitios Web.
        </Typography>

        <Typography paragraph>
          • Los cupones de descuento no podrán ser usados para la compra de productos distintos a los señalados y/o
          aplicarse en promociones distintas, las cuales se encuentren mencionados en la restricción del legal de la
          promoción.
        </Typography>

        <Typography paragraph>
          • Podrá hacer uso del bono de descuento cualquier persona natural mayor de dieciocho (18) años, conforme a lo
          establecido en el punto “Capacidad Legal” de los presentes Términos y Condiciones Generales.
        </Typography>

        <Typography paragraph>
          • El cupón de descuento no es válido para tarjetas de regalo ni ventas corporativas. Se entiende por ventas
          corporativas todas aquellas ventas realizadas a personas jurídicas.
        </Typography>

        <Typography paragraph>
          • El cupón de descuento no es válido para tarjetas de regalo ni ventas corporativas. Se entiende por ventas
          corporativas todas aquellas ventas realizadas a personas jurídicas.
        </Typography>

        <Typography paragraph>
          • El monto máximo de compra para el uso del cupón (en caso aplique) va a estar explícitamente indicado en los
          elementos gráficos de la campaña.
        </Typography>

        <Typography paragraph>• No son acumulables con otras promociones.</Typography>

        <Typography paragraph>
          • El uso del bono solamente podrá ser usado una vez por cada Usuario y una vez vencido no podrá volver a ser
          usado o reactivado.
        </Typography>

        <Typography paragraph>
          LA EMPRESA solo considerará válidos aquellos cupones de descuento que cumplan con las condiciones específicas
          de la promoción.
        </Typography>

        <Typography paragraph>
          Al hacer una compra con el cupón se entiende que el Usuario ha aceptado íntegramente tanto los Términos y
          Condiciones Generales de la página, así como los Términos y Condiciones particulares de cada promoción.
        </Typography>

        <Typography paragraph>
          El contrato de compraventa de productos quedará perfeccionado con el pago de los mismos a través de las
          plataformas puestas a disposición por LA EMPRESA en los Sitios Web.
        </Typography>

        <Typography variant="subtitle1">
          7. FORMACIÓN DEL CONSENTIMIENTO EN LOS CONTRATOS CELEBRADOS A TRAVÉS DE LOS SITIOS WEB
        </Typography>

        <Typography paragraph>
          Mediante los Sitios Web se visualizan los productos comercializados por LAS VENDEDORAS y es facultad de los
          Usuarios, realizar la compra de los productos. La compraventa de los productos no está condicionada al uso de
          los Sitios Web.
        </Typography>

        <Typography paragraph>
          Los productos que el Usuario agregue a su bolsa de pedido no se comprarán automáticamente. Al seleccionar la
          opción de “Ir a Pagar”, el Usuario podrá realizar el pago de los productos que quiera comprar a LAS
          VENDEDORAS.
        </Typography>

        <Typography paragraph>
          El Usuario puede acceder y usar los Sitios Web directamente o desde el link enviado por la Consultora. El
          Usuario verá los productos disponibles según el plazo de validez de las promociones y precios definidos por LA
          EMPRESA y/o LAS VENDEDORAS.
        </Typography>

        <Typography paragraph>
          La aceptación de los presentes Términos y Condiciones Generales constituye el otorgamiento del consentimiento
          libre, previo, expreso, informado e inequívoco de los Usuarios a la utilización de las diversas
          funcionalidades de los Sitios Web. Por lo tanto, todas las transacciones e interacciones generadas en los
          Sitios Web serán vinculantes para los Usuarios.
        </Typography>

        <Typography variant="subtitle1">8. PLAZO DE VALIDEZ DEL PRECIO</Typography>

        <Typography paragraph>
          El plazo de validez del precio de los productos será aquel que coincida con la fecha de vigencia en virtud de
          lo establecido por LA EMPRESA.
        </Typography>

        <Typography paragraph>
          Los precios de los productos disponibles en los Sitios Web serán los que se muestren en los Sitios Web.
          Asimismo, no serán aplicables a otros canales de venta utilizados por LA EMPRESA y/o sus empresas vinculadas,
          tales como otros sitios de venta por vía electrónica, tiendas u otros. Los precios de los productos ofrecidos
          en los Sitios Web están expresados en moneda local del país en el que Usuario efectúe la compra y/u operación.
          Los precios ofrecidos corresponden exclusivamente al valor del bien ofrecido y no incluyen gastos de
          transporte, manejo, envío, accesorios u otros que no se describan expresamente ni ningún otro ítem adicional o
          cobro de intereses bancarios por el método de pago utilizado.
        </Typography>

        <Typography paragraph>
          Adicionalmente, es posible que cierto número de productos puedan tener un precio incorrecto. De existir un
          error tipográfico en alguno de los precios de los productos, si el precio correcto del artículo es más alto
          que el que figura en la página, a nuestra discreción, LA EMPRESA se contactará con los Usuarios antes de que
          el producto sea enviado, y/o cancelará el pedido y le notificará al Usuario acerca de la cancelación. De
          recibir el producto con precio errado y no encontrarse conforme con el mismo, el Usuario podrá realizar la
          devolución de dicho producto y seguir el proceso señalado en nuestra Política de Cambios y Devoluciones según
          corresponda.
        </Typography>

        <Typography paragraph>
          En este caso el Usuario podrá contar con un saldo a favor en una Nota de Crédito para futuras compras en los
          sitios Web o solicitar el reembolso de su dinero correspondiente al método de pago utilizado, esto último solo
          en el caso de los países donde ello esté regulado.
        </Typography>

        <Typography variant="subtitle1">9. DESPACHO DE LOS PRODUCTOS EN LA COMPRA CON ENTREGA INMEDIATA.</Typography>

        <Typography paragraph>
          Luego de que la compra se vea reflejada en el sistema de la Empresa, previa validación de la plataforma de
          pago, el Usuario recibirá un correo electrónico de confirmación con los detalles de entrega. La preparación y
          entrega del pedido se realizará en el periodo máximo de diecinueve (19) días hábiles luego de efectuado el
          pago en los Sitios Web.
        </Typography>

        <Typography paragraph>
          Luego de ello, los productos adquiridos se sujetarán a las condiciones de despacho y entrega disponibles en
          los Sitios Web, las mismas que se detallan a continuación:
        </Typography>

        <Grid container columns={4}>
          <Grid
            item
            xs={4}
            md={1}
            sx={{ display: 'flex', justifyContent: { xs: 'flex-start', md: 'center' }, alignItems: 'center' }}
          >
            <Typography variant="subtitle1">Para Colombia:</Typography>
          </Grid>
          <Grid item xs={4} md={3} p={3}>
            <Typography variant="body1">• Bogotá: 2 a 3 días hábiles.</Typography>
            <Typography variant="body1">• Provincias: 3 a 16 días hábiles.</Typography>
            <Typography variant="body1">• Horario: Lunes a Viernes (7:30 a 18:00) y Sábados (7:30 a 13:00).</Typography>
          </Grid>

          <Grid
            item
            xs={4}
            md={1}
            sx={{ display: 'flex', justifyContent: { xs: 'flex-start', md: 'center' }, alignItems: 'center' }}
          >
            <Typography variant="subtitle1">Para México:</Typography>
          </Grid>
          <Grid item xs={4} md={3} p={3}>
            <Typography variant="body1">• Ciudad de México: 2 a 5 días hábiles.</Typography>
            <Typography variant="body1">• Provincias: 3 a 8 días hábiles.</Typography>
            <Typography variant="body1">• Horario: Lunes a Viernes (9:00 a 18:30) y Sábados (9:00 a 14:00).</Typography>
          </Grid>

          <Grid
            item
            xs={4}
            md={1}
            sx={{ display: 'flex', justifyContent: { xs: 'flex-start', md: 'center' }, alignItems: 'center' }}
          >
            <Typography variant="subtitle1">Para Chile:</Typography>
          </Grid>
          <Grid item xs={4} md={3} p={3}>
            <Typography variant="body1">• Santiago RM: 2 a 3 días hábiles.</Typography>
            <Typography variant="body1">• Provincias: 3 a 19 días hábiles.</Typography>
            <Typography variant="body1">• Horario: Lunes a Viernes (9:00 a 17:00).</Typography>
          </Grid>

          <Grid
            item
            xs={4}
            md={1}
            sx={{ display: 'flex', justifyContent: { xs: 'flex-start', md: 'center' }, alignItems: 'center' }}
          >
            <Typography variant="subtitle1">Para Perú:</Typography>
          </Grid>
          <Grid item xs={4} md={3} p={3}>
            <Typography variant="body1">• Lima metropolitana: 2 a 3 días hábiles.</Typography>
            <Typography variant="body1">• Provincias: 3 a 11 días hábiles.</Typography>
            <Typography variant="body1">• Horario: Lunes a Viernes (8:30 a 18:30) y Sábados (8:30 a 12:00)</Typography>
          </Grid>

          <Grid
            item
            xs={4}
            md={1}
            sx={{ display: 'flex', justifyContent: { xs: 'flex-start', md: 'center' }, alignItems: 'center' }}
          >
            <Typography variant="subtitle1">Para Ecuador:</Typography>
          </Grid>
          <Grid item xs={4} md={3} p={3}>
            <Typography variant="body1">• Quito: 2 a 3 días hábiles.</Typography>
            <Typography variant="body1">• Guayaquil: 3 a 4 días hábiles.</Typography>
            <Typography variant="body1">• Provincias: 4 a 6 días hábiles</Typography>
            <Typography variant="body1">• Horario: Lunes a Viernes (7:30 a 18:00) y Sábados (7:30 a 13:00)</Typography>
          </Grid>

          <Grid
            item
            xs={4}
            md={1}
            sx={{ display: 'flex', justifyContent: { xs: 'flex-start', md: 'center' }, alignItems: 'center' }}
          >
            <Typography variant="subtitle1">Para Panamá:</Typography>
          </Grid>
          <Grid item xs={4} md={3} p={3}>
            <Typography variant="body1">• Ciudad: 2 a 3 días hábiles.</Typography>
            <Typography variant="body1">• Afueras: 3 a 4 días hábiles.</Typography>
            <Typography variant="body1">• Provincias: 3 a 4 días hábiles</Typography>
            <Typography variant="body1">• Horario: Lunes a Viernes (7:30 a 18:00) y Sábados (7:30 a 13:00)</Typography>
          </Grid>
        </Grid>

        <Typography paragraph>
          ▪ El pedido llegará al domicilio indicado por el Usuario dentro del horario de entrega mencionado. No se podrá
          escoger una hora de reparto específica.
        </Typography>

        <Typography paragraph>
          ▪ De no lograrse la entrega del pedido en la primera visita, se efectuarán hasta 3 intentos adicionales. Si
          luego de ello no se ha podido entregar el pedido, este será retornado y la compra será anulada de acuerdo a lo
          siguiente:
        </Typography>

        <Typography paragraph pl={5}>
          o En Colombia y Perú, si en la compra se escogió como método de pago “pago en efectivo”, se tendrá por
          resuelto el contrato de compraventa de producto.
        </Typography>

        <Typography paragraph pl={5}>
          o Si en la compra se escogió como método de pago “tarjeta de crédito o tarjeta de débito, u otras,LA EMPRESA
          se comunicará con el Usuario mediante correo electrónico para coordinar la devolución del monto pagado por el
          producto.
        </Typography>

        <Typography paragraph>
          ▪ En caso el Usuario aún lo quiera, deberá generar una nueva orden de compra, teniendo en cuenta la posible
          modificación del precio del producto y/o su disponibilidad.
        </Typography>

        <Typography paragraph>▪ No se realizan repartos días domingo o feriados.</Typography>

        <Typography paragraph>
          ▪ Excepcionalmente, podrán verificarse situaciones por las que el pedido no llegue dentro de los periodos
          indicados previamente, como:
        </Typography>

        <Typography paragraph pl={5}>
          o Inconvenientes en el abastecimiento y despacho del pedido;
        </Typography>

        <Typography paragraph pl={5}>
          o Inconvenientes en el transporte del pedido por parte del operador logístico o por causas de fuerza mayor
          (huelgas, problemas climáticos, limitaciones por Estado de Emergencia, etc.); o,
        </Typography>

        <Typography paragraph pl={5}>
          o Que el Usuario haya consignado una dirección errada o que, siendo la correcta, no haya quien pueda recibir
          el pedido.
        </Typography>

        <Typography paragraph>
          Estos casos son escasos y se informará oportunamente al usuario el motivo de la demora y la posible solución.
        </Typography>

        <Typography paragraph>
          ▪ Soporte de Contacto: Para cualquier duda o consulta adicional, los usuarios podrán comunicarse a los
          siguientes correos y teléfonos, por país:
        </Typography>

        <Grid container columns={4}>
          <Grid
            item
            xs={4}
            md={1}
            sx={{ display: 'flex', justifyContent: { xs: 'flex-start', md: 'center' }, alignItems: 'center' }}
          >
            <Typography variant="subtitle1">Perú:</Typography>
          </Grid>
          <Grid item xs={4} md={3} p={3}>
            <Typography variant="body1">consultacompraspe@belcorp.biz</Typography>
            <Typography variant="body1">Horario de atención: De L-V de 8:00 am a 8:00 pm</Typography>
          </Grid>

          <Grid
            item
            xs={4}
            md={1}
            sx={{ display: 'flex', justifyContent: { xs: 'flex-start', md: 'center' }, alignItems: 'center' }}
          >
            <Typography variant="subtitle1">Colombia:</Typography>
          </Grid>
          <Grid item xs={4} md={3} p={3}>
            <Typography variant="body1">consultacomprasco@belcorp.biz</Typography>
            <Typography variant="body1">Horario de atención: De L-V de 8:00 am a 8:00 pm</Typography>
          </Grid>

          <Grid
            item
            xs={4}
            md={1}
            sx={{ display: 'flex', justifyContent: { xs: 'flex-start', md: 'center' }, alignItems: 'center' }}
          >
            <Typography variant="subtitle1">Chile:</Typography>
          </Grid>
          <Grid item xs={4} md={3} p={3}>
            <Typography variant="body1">consultacomprascl@belcorp.biz</Typography>
            <Typography variant="body1">Horario de atención: De L-V de 8:00 am a 8:00 pm.</Typography>
          </Grid>

          <Grid
            item
            xs={4}
            md={1}
            sx={{ display: 'flex', justifyContent: { xs: 'flex-start', md: 'center' }, alignItems: 'center' }}
          >
            <Typography variant="subtitle1">México:</Typography>
          </Grid>
          <Grid item xs={4} md={3} p={3}>
            <Typography variant="body1">consultacomprasmx@belcorp.biz</Typography>
            <Typography variant="body1">Horario de atención: De L-V de 8:00 am a 8:00 pm.</Typography>
          </Grid>

          <Grid
            item
            xs={4}
            md={1}
            sx={{ display: 'flex', justifyContent: { xs: 'flex-start', md: 'center' }, alignItems: 'center' }}
          >
            <Typography variant="subtitle1">Ecuador:</Typography>
          </Grid>
          <Grid item xs={4} md={3} p={3}>
            <Typography variant="body1">consultacomprasec@belcorp.biz</Typography>
            <Typography variant="body1">Horario de atención: de L-V de 8:00am a 8:00pm</Typography>
          </Grid>

          <Grid
            item
            md={1}
            sx={{ display: 'flex', justifyContent: { xs: 'flex-start', md: 'center' }, alignItems: 'center' }}
          >
            <Typography variant="subtitle1">Panamá:</Typography>
          </Grid>
          <Grid item xs={4} md={3} p={3}>
            <Typography variant="body1">consultacomprasPA@belcorp.biz</Typography>
            <Typography variant="body1">Horario de atención: de L-V de 8:00am a 8:00pm</Typography>
          </Grid>
        </Grid>

        <Typography paragraph>
          ▪ La información del lugar de envío es de exclusiva responsabilidad del Usuario. Por lo que dependerá de él la
          exactitud de los datos indicados para realizar una correcta y oportuna entrega de los productos a su domicilio
          o dirección de envío. Si hubiera algún error en la dirección, el producto podría no llegar en la fecha
          indicada.
        </Typography>

        <Typography paragraph>
          ▪ El Usuario sólo podrá solicitar el cambio de dirección antes de recibir el correo de confirmación de LA
          EMPRESA, si en caso el Usuario no ha ingresado la dirección correcta en el momento de realizar la compra y la
          orden ya se encuentre confirmada, el Usuario tendrá que solicitar la cancelación de la compra inicial y crear
          una nueva compra con la dirección correcta, teniendo en cuenta que la venta y despacho de los productos está
          condicionada a su disponibilidad, nuevo precio del producto y los costos asociados a esta nueva dirección.
        </Typography>

        <Typography paragraph>
          ▪ LA EMPRESA declara que, en caso haya direcciones de envío en destinos rurales o de difícil acceso que no
          puedan atenderse debido a que se encuentra en una calle o zona de difícil acceso, la empresa de reparto
          correspondiente se comunicará con el Usuario para gestionar un cambio de domicilio y poder entregar el
          producto adquirido.
        </Typography>

        <Typography paragraph>
          ▪ Cuando el Usuario reciba un producto, deberá validar que la caja o bolsa que lo contenga, esté sellada y no
          tenga signos de apertura previa. En caso contrario, no deberá recibir el producto y deberá ponerse en contacto
          inmediatamente con LA EMPRESA a través del Servicio de Atención al Cliente. En caso que el producto fuera
          recibido en buenas condiciones y completo, el Usuario firmará la guía de entrega correspondiente, dejando así
          conformidad de la misma. Luego de la aceptación del producto y firma de la guía, sólo podrá presentar reclamos
          por temas de garantía o cualquiera descrito dentro de la Política de Cambios y Devoluciones aplicable en los
          tiempos establecidos en dicho documento.
        </Typography>

        <Typography paragraph>
          ▪ Respecto a la información sobre entrega y despacho LA EMPRESA informará el costo total de despacho o entrega
          y mecanismo a través del cual el Usuario podrá realizar sus consultas al respecto, estas serán informadas
          antes de la compra de los productos.
        </Typography>

        <Typography variant="subtitle1">10. POLÍTICA DE CAMBIOS Y DEVOLUCIONES</Typography>

        <Typography paragraph>
          Para solicitar un cambio o devolución de los productos, el Usuario deberá seguir el procedimiento indicado en
          la Política de Cambios y Devoluciones, publicada en la sección de documentos legales, ubicada en la parte
          inferior de los Sitios Web.
        </Typography>

        <Typography variant="subtitle1">11. COMPROBANTE DE PAGO</Typography>

        <Typography paragraph>
          El mero acceso y visualización de los Sitios Web no generará en favor de los Usuarios boletas electrónicas de
          venta y/o ningún comprobante de pago, en caso de no haberse efectuado ninguna transacción a través de los
          Sitios Web.
        </Typography>

        <Typography paragraph>
          LAS VENDEDORAS emitirán a los Usuarios los comprobantes de pago que correspondan a cada país por la
          adquisición de los productos efectuada en los Sitios Web.
        </Typography>

        <Typography variant="subtitle1">II. PROPIEDAD INTELECTUAL</Typography>

        <Typography paragraph>
          Todo el contenido incluido o puesto a disposición del Usuario en los Sitios Web, incluyendo textos, gráficas,
          logos, íconos, imágenes, archivos de audio, descargas digitales y cualquier otra información (el “Contenido”),
          es de propiedad de LA EMPRESA o ha sido licenciada a ésta por terceros. La compilación del Contenido es
          propiedad exclusiva de LA EMPRESA y, en tal sentido, el Usuario debe abstenerse de extraer y/o reutilizar
          partes del Contenido sin el consentimiento previo y expreso de LA EMPRESA.
        </Typography>

        <Typography paragraph>
          Además del Contenido, las marcas, denominativas o figurativas, marcas de servicio, diseños industriales y
          cualquier otro elemento de propiedad intelectual que haga parte del Contenido (la “Propiedad Industrial”), son
          de propiedad de LA EMPRESA y, por tal razón, están protegidas por las leyes y los tratados internacionales de
          derecho de autor, marcas, patentes, modelos y diseños industriales.
        </Typography>

        <Typography paragraph>
          El uso indebido y la reproducción total o parcial de dichos contenidos quedan prohibidos, salvo autorización
          expresa y por escrito de LA EMPRESA. En ese sentido, los Usuarios tienen prohibido adquirir dominios web que
          contengan las marcas (Belcorp, L’bel, ésika y Cyzone) o cualquier otro elemento de Propiedad Industrial de LA
          EMPRESA.
        </Typography>

        <Typography paragraph>
          Asimismo, la Propiedad Industrial de LA EMPRESA no podrá ser usada por los Usuarios en conexión con cualquier
          producto o servicio que no sea provisto por LA EMPRESA. En el mismo sentido, la Propiedad Industrial no podrá
          ser usada por los Usuarios en conexión con cualquier producto y servicio que no sea de aquellos que
          comercializa u ofrece LA EMPRESA o de forma que produzca confusión con sus Usuarios o que desacredite a la
          Empresa o a las Empresas Proveedoras.
        </Typography>

        <Typography variant="subtitle1">III. CONTENIDO GENERADO POR EL USUARIO</Typography>

        <Typography paragraph>
          Los Usuarios tendrán la oportunidad de publicar en sus propias redes sociales: ideas, conceptos, información,
          datos, texto, fotos, gráficos, videos, mensajes, comentarios de los productos comercializados por LAS
          VENDEDORAS, material de publicidad, opiniones, etc. (en adelante, “el contenido del Usuario”). El contenido
          del Usuario estará sujeto a la Política de Privacidad de los Sitios Web y se regirá por las disposiciones
          señaladas en las Condiciones de Uso Web de los Sitios Web y en ningún caso generará contraprestación,
          responsabilidad y/o indemnización alguna por parte de LA EMPRESA.
        </Typography>

        <Typography variant="subtitle1">IV. FALLAS DEL SISTEMA</Typography>

        <Typography paragraph>
          El acceso a los Sitios Web podrá estar temporalmente no disponible, en cualquier momento, en caso de
          interrupciones necesarias en razón del mantenimiento de cualquier índole, o fallas en la operación de los
          servidores, de las empresas proveedoras de energía eléctrica, empresas prestadoras de servicios de
          telecomunicaciones, casos fortuitos, fuerza mayor, o acciones de terceros en los que LA EMPRESA no tenga
          control.
        </Typography>

        <Typography paragraph>
          A pesar de que LA EMPRESA cuenta con los más altos estándares y técnicas razonables sobre seguridad, los
          mismos que ha implementado de manera correcta y realizando sus máximos esfuerzos y diligencia, LA EMPRESA no
          se responsabiliza por cualquier daño, perjuicio o pérdida ocasionados al Usuario, causados por fallas en el
          sistema, en el servidor o en el Internet ni tampoco será responsable del uso de “passwords” o contraseñas y
          por cualquier virus que pudiera infectar el equipo del Usuario como consecuencia del acceso, uso o examen de
          los Sitios Web, ni cualquier transferencia de datos, archivos, imágenes, textos o audios contenidos en el
          mismo. Los Usuarios no podrán imputar responsabilidad alguna ni exigir pago de daños y perjuicios ni cualquier
          tipo de compensación económica resultante de dificultades técnicas o fallas en los sistemas o en Internet. LA
          EMPRESA no garantiza el acceso y uso continuado o ininterrumpido de los Sitios Web.
        </Typography>

        <Typography variant="subtitle1">V. INDEMNIDAD</Typography>

        <Typography paragraph>
          El Usuario indemnizará y mantendrá indemne a LA EMPRESA, sus filiales, empresas controladas y/o controlantes,
          directivos, administradores, representantes y empleados, por su incumplimiento de los Términos y Condiciones
          Generales y demás políticas, lineamientos y principios que se entienden incorporadas al presente o por la
          violación de cualesquiera leyes o derechos de terceros, incluyendo los honorarios de abogados
          correspondientes.
        </Typography>

        <Typography variant="subtitle1">VI. NATURALEZA JURÍDICA</Typography>

        <Typography paragraph>
          Estos Términos y Condiciones Generales son de naturaleza comercial. No originan subordinación, dependencia, ni
          relación alguna de carácter laboral entre el Usuario y LA EMPRESA. Cada una de las partes asume sus propios
          riesgos comerciales y la totalidad de los costos que acaree la utilización de los Sitios Web. Le está
          prohibido al Usuario presentarse ante terceros como trabajador, apoderado o dependiente de LA EMPRESA o
          incluir en su documentación mención alguna que lo haga aparecer en dicha calidad.
        </Typography>

        <Typography paragraph>
          Este acuerdo comercial tampoco constituye entre las partes ningún tipo de sociedad, joint venture, consorcio,
          agencia, mandato o representación.
        </Typography>

        <Typography variant="subtitle1">VII. TÉRMINOS DE LEY</Typography>

        <Typography paragraph>
          Estos Términos y Condiciones Generales serán interpretados de acuerdo con las leyes de Perú, sin dar efecto a
          cualquier principio de conflictos de ley. Si alguna disposición de estos Términos y Condiciones Generales es
          declarada ilegal, o presenta un vacío, o por cualquier razón resulta inaplicable, deberá ser interpretada
          dentro del marco del mismo y en cualquier caso no afectará la validez y la aplicabilidad de las provisiones
          restantes.
        </Typography>

        <Typography variant="subtitle1">VIII. NOTIFICACIONES</Typography>

        <Typography paragraph>
          Cualquier comentario, inquietud o reclamación respecto de los anteriores Términos y Condiciones Generales, o
          la ejecución de éstos, deberá ser notificada por escrito a LA EMPRESA a las siguientes direcciones de correo
          electrónico, según corresponda:
        </Typography>

        <Grid container columns={4}>
          <Grid
            item
            xs={4}
            md={1}
            sx={{ display: 'flex', justifyContent: { xs: 'flex-start', md: 'center' }, alignItems: 'center' }}
          >
            <Typography variant="subtitle1">Perú:</Typography>
          </Grid>
          <Grid item xs={4} md={3} p={1}>
            <Typography variant="body1">consultacompraspe@belcorp.biz</Typography>
          </Grid>

          <Grid
            item
            xs={4}
            md={1}
            sx={{ display: 'flex', justifyContent: { xs: 'flex-start', md: 'center' }, alignItems: 'center' }}
          >
            <Typography variant="subtitle1">Colombia:</Typography>
          </Grid>
          <Grid item xs={4} md={3} p={1}>
            <Typography variant="body1">consultacomprasco@belcorp.biz</Typography>
          </Grid>

          <Grid
            item
            xs={4}
            md={1}
            sx={{ display: 'flex', justifyContent: { xs: 'flex-start', md: 'center' }, alignItems: 'center' }}
          >
            <Typography variant="subtitle1">Chile:</Typography>
          </Grid>
          <Grid item xs={4} md={3} p={1}>
            <Typography variant="body1">consultacomprascl@belcorp.biz</Typography>
          </Grid>

          <Grid
            item
            xs={4}
            md={1}
            sx={{ display: 'flex', justifyContent: { xs: 'flex-start', md: 'center' }, alignItems: 'center' }}
          >
            <Typography variant="subtitle1">México:</Typography>
          </Grid>
          <Grid item xs={4} md={3} p={1}>
            <Typography variant="body1">consultacomprasmx@belcorp.biz</Typography>
          </Grid>

          <Grid
            item
            xs={4}
            md={1}
            sx={{ display: 'flex', justifyContent: { xs: 'flex-start', md: 'center' }, alignItems: 'center' }}
          >
            <Typography variant="subtitle1">Ecuador:</Typography>
          </Grid>
          <Grid item xs={4} md={3} p={1}>
            <Typography variant="body1">consultacomprasec@belcorp.biz</Typography>
          </Grid>

          <Grid
            item
            xs={4}
            md={1}
            sx={{ display: 'flex', justifyContent: { xs: 'flex-start', md: 'center' }, alignItems: 'center' }}
          >
            <Typography variant="subtitle1">Panamá:</Typography>
          </Grid>
          <Grid item xs={4} md={3} p={1}>
            <Typography variant="body1">consultacomprasPA@belcorp.biz</Typography>
          </Grid>
        </Grid>

        <Typography variant="subtitle1">IX. JURISDICCIÓN Y LEY APLICABLE</Typography>

        <Typography paragraph>
          Este acuerdo estará regido en todos sus puntos por las leyes vigentes en la República de Perú.
        </Typography>

        <Typography paragraph>
          Cualquier controversia derivada del presente acuerdo, su existencia, validez, interpretación, alcance o
          cumplimiento, será sometida a los Tribunales competentes de Cercado de Lima para lo cual los Usuarios y/o
          Consultoras renuncian al fuero de sus domicilios.
        </Typography>
      </Stack>
    </>
  );
}
