'use client';

import {
  Box,
  Link,
  List,
  ListItem,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';

import { DashLine } from '@/components';

/**
 *
 * Component used to display the terms and conditions and as a webview in the mobile application
 */
export default function Policies() {
  return (
    <>
      <Typography
        variant="h6"
        color="primary"
        sx={{ color: 'primary.main', mb: 6, display: { md: 'block' }, textAlign: 'center' }}
      >
        POLÍTICA DE PRIVACIDAD – BILLETERA YIRO - PERÚ
      </Typography>

      <Stack spacing={2} sx={{ px: { xs: 2, md: 0 }, textAlign: 'justify', mb: { xs: 10, md: 0 } }}>
        <Typography variant="subtitle1">Actualización: Octubre 2024</Typography>

        <Typography variant="subtitle1">I. INTRODUCCIÓN</Typography>
        <Typography variant="body1">
          <strong>CETCO S.A.,</strong> en adelante <strong>“LA EMPRESA”</strong>, empresa responsable del tratamiento y
          seguridad de los datos proporcionados por los usuarios de Perú, a través de la billetera digital denominada
          “Yiro” (en adelante, la “Billetera”), la cual se encuentra alojada en la página “Somos Belcorp” contenida en
          el siguiente URL:
          <Link href="https://www.somosbelcorp.biz" target="_blank" rel="noopener" sx={{ pl: 1 }}>
            www.somosbelcorp.biz
          </Link>
          o en la aplicación móvil “Ésika Conmigo” (en adelante, los “Sitios Web”), tiene el compromiso de respetar la
          privacidad de sus usuarios (en adelante, los “Usuarios”) y proteger la confidencialidad de su información
          privada y datos personales.,
        </Typography>

        <Typography paragraph>
          Es en ese sentido que <strong>LA EMPRESA</strong> ha desarrollado la presente política de privacidad (en
          adelante, la “Política de Privacidad”) que describe la manera en que se tratará la información de los Usuarios
          que califiquen como datos personales.
        </Typography>

        <Typography variant="subtitle1">2. NORMATIVA APLICABLE, PRINCIPALES CONCEPTOS Y PRINCIPIOS RECTORES</Typography>

        <Typography paragraph>
          <strong>LA EMPRESA</strong> declara que cualquier tratamiento de los datos personales se ajusta a lo
          establecido en la Ley N° 29733, Ley de Protección de Datos Personales (en adelante, la “LPDP”) y su
          Reglamento, aprobado por Decreto Supremo N° 003-2019-JUS (en adelante, el “Reglamento de la LPDP”), la
          Directiva de Seguridad de la Información, aprobada por la Resolución Directoral N° 019-2013- JUS/DGPDP, la
          Guía Práctica para la Observancia del “Deber de Informar”, aprobada mediante Resolución Directoral N°
          80-2019-JUS/DGTAIPD, así como a otros instrumentos vigentes aplicables dentro del territorio peruano que
          regulan la protección de los datos personales, incluyendo, sin que resulte limitativo, las Directivas emitidas
          por el Ministerio de Justicia y Derechos Humanos (en adelante, la “Normativa de Protección de Datos
          Personales”).
        </Typography>

        <Typography paragraph>
          De acuerdo con la LPDP, se entiende por datos personales toda información sobre una persona natural -incluida
          a aquella con negocio- que la identifica o la hace identificable a través de medios que pueden ser
          razonablemente utilizados. Dicha información puede ser numérica, alfabética, gráfica, fotográfica, acústica,
          sobre hábitos personales, o de cualquier otro tipo concerniente a una persona natural (en adelante, los “Datos
          Personales”).
        </Typography>

        <Typography paragraph>
          Asimismo, se entiende por tratamiento de Datos Personales a cualquier operación o procedimiento técnico,
          automatizado o no, que permite la recopilación, registro, organización, almacenamiento, conservación,
          elaboración, modificación, extracción, consulta, utilización, bloqueo, supresión, comunicación por
          transferencia o por difusión o cualquier otra forma de procesamiento que facilite el acceso, correlación o
          interconexión de los Datos Personales.
        </Typography>

        <Typography paragraph>
          <strong>LA EMPRESA</strong> desarrolla su Política de Privacidad en atención a los principios rectores en
          materia de protección de datos personales que establece la LPDP y el Reglamento de la LPDP, y, por tanto,
          destacan los siguientes:
        </Typography>

        <List>
          <ListItem>
            <Box sx={{ display: 'flex' }}>
              <Typography variant="body1" sx={{ marginRight: 1 }}>
                (i)
              </Typography>
              <Typography variant="body1">
                De acuerdo con el principio de legalidad, <strong>LA EMPRESA</strong> rechaza la recopilación de los
                Datos Personales por medios fraudulentos, desleales o ilícitos.
              </Typography>
            </Box>
          </ListItem>
          <ListItem>
            <Box sx={{ display: 'flex' }}>
              <Typography variant="body1" sx={{ marginRight: 1 }}>
                (ii)
              </Typography>
              <Typography variant="body1">
                Conforme al principio de consentimiento, en el tratamiento de los Datos Personales mediará el
                consentimiento que otorgue el titular de los datos, salvo por las exenciones previstas en la LPDP. Se
                considera que el tratamiento de los Datos Personales es lícito cuando el titular del dato personal
                hubiere prestado su consentimiento libre, previo, informado, expreso e inequívoco.
              </Typography>
            </Box>
          </ListItem>
          <ListItem>
            <Box sx={{ display: 'flex' }}>
              <Typography variant="body1" sx={{ marginRight: 1 }}>
                (iii)
              </Typography>
              <Typography variant="body1">
                Los Datos Personales facilitados por su titular se recopilarán para una finalidad determinada explicita
                y lícita, y no se extenderá a otra finalidad que no haya sido la establecida de manera 1 Toda referencia
                a días será considerada días hábiles. inequívoca como tal al momento de su recopilación, excluyendo los
                casos de actividades de valor histórico, estadístico o científico cuando se utilice un procedimiento de
                disociación o anonimización.
              </Typography>
            </Box>
          </ListItem>
          <ListItem>
            <Box sx={{ display: 'flex' }}>
              <Typography variant="body1" sx={{ marginRight: 1 }}>
                (iv)
              </Typography>
              <Typography variant="body1">
                Todo tratamiento de Datos Personales que realice <strong>LA EMPRESA</strong> será adecuado, relevante y
                no excesivo a la finalidad para la que estos hubiesen sido recopilados.
              </Typography>
            </Box>
          </ListItem>
        </List>

        <Typography variant="subtitle1">3. CALIDAD DE LOS DATOS PERSONALES</Typography>

        <Typography paragraph>
          Los Datos Personales de los Usuarios tienen que ser exactos y correctos, de forma que respondan con veracidad
          a su situación actual. En caso contrario, estos datos no serán válidos.
        </Typography>

        <Typography paragraph>
          Los Datos Personales objeto de tratamiento son recopilados para el cumplimiento de las finalidades expuestas
          en este documento y no se usarán para otras finalidades incompatibles con las especificadas.
        </Typography>

        <Typography paragraph>
          En aplicación del principio de calidad y a fin de mantener información necesaria y/o actualizada para el
          cumplimiento de las obligaciones contractuales y/o legales, <strong>LA EMPRESA</strong> podrá obtener Datos
          Personales de manera lícita a través de información recibida de otros Usuarios en el marco de aquella que
          mantiene en su poder para fines exclusivamente relacionados con su vida privada o familiar, de terceros o que
          sea obtenida de fuentes públicas y lícitas. En tal sentido, esta información podrá ser utilizada para las
          finalidades descritas siempre que el Usuario haya autorizado dichos usos o sean aquellas finalidades que se
          encuentran exceptuadas de solicitar el consentimiento de conformidad a la LPDP, así como también podrá ser
          transferida a los terceros que se encuentran autorizados para cumplir con las finalidades designadas.
        </Typography>

        <Typography paragraph>
          Es obligación del Usuario, en su interacción con <strong>LA EMPRESA</strong>, proporcionar datos que sean
          verdaderos, exactos y completos, siendo responsable por la autenticidad y vigencia de éstos; comprometiéndose
          a mantenerlos actualizados. <strong>LA EMPRESA</strong> no se hace responsable de la veracidad de la
          información que no sea de elaboración propia, por lo que no asume responsabilidad alguna por posibles daños o
          perjuicios que pudieran originarse por el uso de dicha información.
        </Typography>

        <Typography variant="subtitle1">4. PROTECCIÓN DE DATOS PERSONALES</Typography>

        <List>
          <ListItem>
            <Box sx={{ display: 'flex' }}>
              <Typography variant="subtitle1" sx={{ marginRight: 1 }}>
                a.
              </Typography>
              <Box>
                <Typography variant="subtitle1">
                  IDENTIDAD Y DOMICILIO DEL TITULAR DEL BANCO DE DATOS PERSONALES:
                </Typography>
                <Typography paragraph>
                  El titular de los bancos de datos en los que se almacenarán los Datos Personales facilitados por los
                  Usuarios en la Billetera es <strong> CETCO S.A. (LA EMPRESA)</strong>, con domicilio en Av. Felipe
                  Pardo y Aliaga N° 652, Int. 1001, distrito de San Isidro, provincia y departamento de Lima. Dichos
                  bancos de datos personales han sido declarados a la Autoridad Nacional de Protección de Datos
                  Personales, mediante su inscripción en el Registro Nacional de Protección de Datos Personales con la
                  denominación “Consultoras”, con el Código RNPDP-PJ Nº 14391.
                </Typography>
              </Box>
            </Box>
          </ListItem>
          <ListItem>
            <Box sx={{ display: 'flex' }}>
              <Typography variant="subtitle1" sx={{ marginRight: 1 }}>
                b.
              </Typography>
              <Box>
                <Typography variant="subtitle1">FINALIDADES DEL TRATAMIENTO:</Typography>
                <Typography paragraph>
                  <strong>LA EMPRESA</strong> cumple con informarle a los Usuarios que el tratamiento de sus Datos
                  Personales será necesario para atender las solicitudes o requerimientos que se le formulen a través de
                  los Sitios Web, así como para cumplir con las obligaciones a su cargo, las mismas que de otra forma no
                  podrían ejecutarse en los términos señalados en los Términos y Condiciones – Billetera Yiro- Perú (los
                  “Términos y Condiciones”). Atendiendo a ello,<strong>LA EMPRESA</strong> tratará los Datos Personales
                  para las siguientes finalidades:
                </Typography>
                <List sx={{ listStyleType: 'disc', pl: 2 }}>
                  <ListItem sx={{ display: 'list-item' }}>
                    <Typography paragraph>
                      Procesar solicitudes de registro y/o suscripción de Usuarios a la Billetera y transmitir los Datos
                      Personales necesarios para la contratación de los instrumentos de pago y/o cuentas asociadas a
                      dicha Billetera, los cuales son provistos por Servitebca Perú, Servicio de Transferencia
                      Electrónica de Beneficios y Pagos S.A. (en adelante, “Tebca”), brindar soporte al Usuario, validar
                      la identidad de los Usuarios y la veracidad de la información proporcionada por éstos y atender
                      consultas, solicitudes, peticiones, reclamos y cualquier otro tipo de requerimiento de información
                      presentada por los Usuarios vinculado con los servicios provistos por y/o a través de la
                      Billetera.
                    </Typography>
                  </ListItem>
                  <ListItem sx={{ display: 'list-item' }}>
                    <Typography paragraph>
                      Gestionar la relación comercial y las transacciones realizadas en la Billetera y realizar el
                      seguimiento correspondiente, para lo cual podrá transmitir los Datos Personales que sean
                      requeridos por el proveedor de los instrumentos de pago y/o cuentas antes mencionado.
                    </Typography>
                  </ListItem>
                  <ListItem sx={{ display: 'list-item' }}>
                    <Typography paragraph>
                      Enviar promociones y/o publicidad, en caso el usuario lo autorice, vinculadas a la Billetera y/o a
                      la promoción de las marcas de <strong>LA EMPRESA</strong> (Ésika, L’bel y Cyzone).
                    </Typography>
                  </ListItem>
                  <ListItem sx={{ display: 'list-item' }}>
                    <Typography paragraph>
                      En caso el Usuario lo autorice, enviar promociones y/o publicidad de <strong>LA EMPRESA</strong>{' '}
                      y/o de sus empresas vinculadas listadas en el Anexo 1, en relación con los servicios y actividades
                      de la Billetera o con la promoción de las marcas de <strong>LA EMPRESA</strong>. Para estos
                      efectos, <strong>LA EMPRESA</strong> podrá compartir los datos personales de los Usuarios con sus
                      empresas vinculadas, las cuales se pueden encontrar dentro o fuera del territorio nacional.
                    </Typography>
                  </ListItem>
                  <ListItem sx={{ display: 'list-item' }}>
                    <Typography paragraph>
                      Invitar a participar al Usuario de promociones comerciales de <strong>LA EMPRESA</strong> y/o de
                      sus empresas vinculadas listadas en el Anexo 1, en caso lo autorice, y en caso participe,
                      informarle sobre los ganadores de los premios. Los Usuarios que participen en las promociones,
                      concursos o sorteos mencionados, autorizan expresamente a que <strong>LA EMPRESA</strong> o la
                      empresa vinculada que sea responsable de la promoción, difunda, de manera gratuita y por los
                      medios que estime convenientes, los Datos Personales de los Usuarios que resulten ganadores,
                      incluidos sus nombres, testimonio y su imagen.
                    </Typography>
                  </ListItem>
                  <ListItem sx={{ display: 'list-item' }}>
                    <Typography paragraph>
                      Supervisar, monitorear y moderar el comportamiento y la actividad de los Usuarios en las secciones
                      en las que los Usuarios puedan crear o generar contenido, como las secciones de consultas,
                      comentarios, blogs y/o conversaciones en foros, en caso corresponda de manera directa y/o a través
                      de terceros proveedores.
                    </Typography>
                  </ListItem>
                  <ListItem sx={{ display: 'list-item' }}>
                    <Typography paragraph>
                      Realizar, de manera directa y/o a través de terceros proveedores, estudios internos sobre los
                      intereses, satisfacción, comportamientos y hábitos de conducta de los Usuarios a fin de poder
                      enriquecer y complementar la información de los Usuarios y de este modo ofrecer a los Usuarios un
                      mejor producto/servicio de acuerdo con sus necesidades específicas. Ello permitirá que los
                      Usuarios reciban contenido personalizado sobre la base de sus intereses, ya sea a través de la
                      Billetera, como a través de otros medios digitales y/o no electrónicos.
                    </Typography>
                  </ListItem>
                  <ListItem sx={{ display: 'list-item' }}>
                    <Typography paragraph>
                      Realizar validaciones internas de manera directa y/o a través de terceros, tales como, empresas de
                      cobranzas, de evaluación de riesgo crediticio públicas o privadas, proveedoras de listas
                      restrictivas para la gestión de los riesgos de lavado de activos y financiamiento del terrorismo,
                      empresas de consultoría, empresas emisoras de dinero electrónico y, en general, en cualquier
                      central de riesgo que permita la evaluación crediticia de los Usuarios, en caso corresponda a los
                      servicios solicitados por el Usuario a través de la Billetera.
                    </Typography>
                  </ListItem>
                  <ListItem sx={{ display: 'list-item' }}>
                    <Typography paragraph>
                      Utilizar los datos de las transacciones realizadas por los Usuarios a través de la Billetera,
                      incluyendo, pero sin limitarse a los lugares, montos, fecha, tipos de comercio, etc; con la
                      finalidad de gestionar de manera directa y/o en coordinación con Tebca los riesgos asociados al
                      uso de la Billetera, incluyendo, sin que resulte limitativo, los riesgos de fraude y de lavado de
                      activos y financiamiento del terrorismo.
                    </Typography>
                  </ListItem>
                  <ListItem sx={{ display: 'list-item' }}>
                    <Typography paragraph>
                      Cumplir con las obligaciones legales y/o contractuales que resulten aplicables a la provisión de
                      la Billetera, incluyendo aquellas que correspondan a éste como canal de contratación y uso del
                      servicio de dinero electrónico provisto por Tebca, conforme al marco normativo aplicable en Perú,
                      a los acuerdos celebrados con Tebca y el resto de empresas vinculadas o afiliadas a{' '}
                      <strong>LA EMPRESA</strong> para la provisión de operaciones a través de la Billetera y a los
                      Términos y Condiciones celebrados entre <strong>LA EMPRESA</strong> y los Usuarios.
                    </Typography>
                  </ListItem>
                  <ListItem sx={{ display: 'list-item' }}>
                    <Typography paragraph>
                      Atender requerimientos judiciales y/o administrativos y/o de cualquier otra autoridad competente;
                      y cumplir, de ser el caso, con los mandatos que éstas instruyan.
                    </Typography>
                  </ListItem>
                </List>
                <Typography paragraph>
                  Los Datos Personales que recopila o trata <strong>LA EMPRESA</strong> estarán relacionados con una o
                  varias de las finalidades determinadas señaladas de manera previa. El tratamiento de los Datos
                  Personales realizado por <strong>LA EMPRESA</strong> no se extenderá a otra finalidad que no haya sido
                  la establecida al momento de su recopilación o en el marco de los acuerdos celebrados con los
                  titulares de Datos Personales, excluyendo los casos en que se utilice un procedimiento de disociación
                  o anonimización.
                </Typography>
              </Box>
            </Box>
          </ListItem>
          <ListItem>
            <Box sx={{ display: 'flex' }}>
              <Typography variant="subtitle1" sx={{ marginRight: 1 }}>
                c.
              </Typography>
              <Box>
                <Typography variant="subtitle1">DATOS PERSONALES NECESARIOS:</Typography>
                <Typography paragraph>
                  Para llevar a cabo las finalidades autorizadas descritas en la presente Política de Privacidad, es
                  obligatorio que nos proporcione los siguientes Datos Personales:
                </Typography>
                <List sx={{ listStyleType: 'disc', pl: 2 }}>
                  <ListItem sx={{ display: 'list-item', p: 0 }}>
                    <Typography variant="body1">Nombres y apellidos.</Typography>
                  </ListItem>
                  <ListItem sx={{ display: 'list-item', p: 0 }}>
                    <Typography variant="body1">Información biométrica</Typography>
                  </ListItem>
                  <ListItem sx={{ display: 'list-item', p: 0 }}>
                    <Typography variant="body1">Número de DNI, pasaporte o carné de extranjería.</Typography>
                  </ListItem>
                  <ListItem sx={{ display: 'list-item', p: 0 }}>
                    <Typography variant="body1">Dirección de domicilio.</Typography>
                  </ListItem>
                  <ListItem sx={{ display: 'list-item', p: 0 }}>
                    <Typography variant="body1">Número de teléfono.</Typography>
                  </ListItem>
                  <ListItem sx={{ display: 'list-item', p: 0 }}>
                    <Typography variant="body1">Correo electrónico</Typography>
                  </ListItem>
                  <ListItem sx={{ display: 'list-item', p: 0 }}>
                    <Typography variant="body1">Imagen</Typography>
                  </ListItem>
                  <ListItem sx={{ display: 'list-item', p: 0 }}>
                    <Typography variant="body1">Firma electrónica</Typography>
                  </ListItem>
                  <ListItem sx={{ display: 'list-item', p: 0 }}>
                    <Typography variant="body1">Código de consultora</Typography>
                  </ListItem>
                  <ListItem sx={{ display: 'list-item', p: 0 }}>
                    <Typography variant="body1">Datos del DNI, pasaporte o carné de extranjería.</Typography>
                  </ListItem>
                  <ListItem sx={{ display: 'list-item', p: 0 }}>
                    <Typography variant="body1">Profesión</Typography>
                  </ListItem>
                  <ListItem sx={{ display: 'list-item', p: 0 }}>
                    <Typography variant="body1">Nacionalidad</Typography>
                  </ListItem>
                </List>
                <Typography paragraph>
                  Estos Datos Personales son obtenidos al momento de acceder a los Sitios Web, realizar el registro para
                  acceder a Yiro o atender cualquier requerimiento, solicitud o reclamo a través de dichos Sitios Web y
                  otros canales que se establezcan y se informen oportunamente al titular de los Datos Personales. Usted
                  reconoce que, de no proporcionar los Datos Personales necesarios para atender las finalidades
                  mencionadas en el literal b) precedente vinculadas, <strong>LA EMPRESA</strong> no podrá atender la
                  solicitud y/o requerimiento y/o necesidad que el Usuario tenga con relación a la preparación,
                  celebración y ejecución de los contratos celebrados para el acceso a la Billetera y a los instrumentos
                  y/o cuentas asociadas a la misma.
                </Typography>
              </Box>
            </Box>
          </ListItem>
          <ListItem>
            <Box sx={{ display: 'flex' }}>
              <Typography variant="subtitle1" sx={{ marginRight: 1 }}>
                d.
              </Typography>
              <Box>
                <Typography variant="subtitle1">TRANSFERENCIAS Y DESTINATARIOS:</Typography>
                <Typography paragraph>
                  <strong>LA EMPRESA</strong> podrá transferir, dentro y/o afuera del territorio peruano, los Datos
                  Personales registrados en la Billetera a terceros con el propósito de llevar a cabo el uso de la
                  Billetera, según lo detallado en la cláusula 4, literal b) de esta Política de Privacidad. Dichos
                  terceros con quienes <strong>LA EMPRESA</strong> mantiene una relación contractual, comercial o
                  jurídica, podrán ser: las empresas detalladas en los Anexos 1 y 2, empresas de cobranza, entidades
                  bancarias y/o financieras, centrales de riesgo, empresas de transporte, empresas de reparto, empresas
                  de facturación, empresas de call center, empresas de tecnología, empresas de redes sociales e
                  innovación tecnológica y/o autoridades del estado, en caso corresponda por ley, lo que es aceptado
                  expresamente por el Usuario.
                </Typography>
                <Typography paragraph>
                  Todas las personas que estén válidamente autorizadas a acceder a los Datos Personales de los Usuarios
                  lo harán bajo condiciones que garanticen su seguridad y confidencialidad y únicamente para las
                  finalidades previstas en esta Política de Privacidad.
                </Typography>
                <Typography paragraph>
                  Asimismo, los datos personales serán transferidos internacionalmente a Estados Unidos de América a la
                  empresa Amazon Web Services, con domicilio en Virginia, USA, con el motivo de almacenar los datos de
                  manera segura en la nube de dicha empresa.
                </Typography>
              </Box>
            </Box>
          </ListItem>
          <ListItem>
            <Box sx={{ display: 'flex' }}>
              <Typography variant="subtitle1" sx={{ marginRight: 1 }}>
                e.
              </Typography>
              <Box>
                <Typography variant="subtitle1">
                  EJERCICIO DE LOS DERECHOS DE INFORMACIÓN, ACCESO, RECTIFICACIÓN, CANCELACIÓN Y OPOSICIÓN DE LOS DATOS
                  PERSONALES:
                </Typography>
                <Typography paragraph>
                  Como titular de los Datos Personales, los Usuarios tienen el derecho de acceder a los Datos Personales
                  que son tratados por LA EMPRESA, conocer las características de su tratamiento, rectificarlos en caso
                  de ser inexactos o incompletos; solicitar que sean suprimidos o cancelados al considerarlos
                  innecesarios para las finalidades previamente expuestas o bien oponerse a su tratamiento para fines
                  específicos.
                </Typography>
                <Typography paragraph>
                  Los Usuarios podrán, en todo momento, revocar el consentimiento otorgado expresamente, tanto como
                  limitar el uso o divulgación de sus datos personales.
                </Typography>
                <Typography paragraph>
                  La supresión no procede cuando los Datos Personales deban ser conservados en virtud de un mandato
                  legal que justifiquen el tratamiento de los mismos, tal como lo dispone el Reglamento de la LPDP.
                </Typography>
                <Typography paragraph>
                  Los Usuarios podrán dirigir su solicitud de ejercicio de los derechos a la siguiente dirección: Av.
                  Felipe Pardo y Aliaga N° 652, Int. 1001, distrito de San Isidro, provincia y departamento de Lima y/o
                  a las siguientes direcciones: servicioalcliente@yiro.com. En ese sentido, deberán presentar -en el
                  domicilio o correo electrónico especificado previamente- la solicitud respectiva, de acuerdo a lo
                  indicado en el Procedimiento para el Ejercicio de Derechos ARCO que se encuentra dentro de la sección
                  de documentos legales de la Billetera, en los términos que establece el Reglamento de la LPDP
                  (incluyendo: nombre del titular de los datos personales y su domicilio u otro medio para recibir
                  respuesta; documentos que acrediten su identidad o la representación legal correspondiente;
                  descripción clara y precisa de los datos personales respecto de los que busca ejercer sus derechos y
                  otros elementos o documentos que faciliten la localización de los datos).
                </Typography>
                <Typography paragraph>
                  De considerar los Usuarios que su solicitud correspondiente no ha sido atendida en el ejercicio de sus
                  derechos, puede presentar una reclamación ante la Autoridad Nacional de Protección de Datos
                  Personales, dirigiéndose a la Mesa de Partes del Ministerio de Justicia y Derechos Humanos.
                </Typography>
                <Typography paragraph>
                  <strong>LA EMPRESA</strong> será responsable de los bancos de datos personales denominados “Posibles
                  Consultoras” con el Código RNPDP-PJ Nº 14391 y “Consultoras” con el código RNPDP-PJP N° 6611 y de los
                  Datos Personales contenidos en el mismo. Con el objeto de evitar la pérdida, mal uso, alteración,
                  acceso no autorizado y robo de los Datos Personales o información confidencial facilitados por el
                  Usuario, <strong>LA EMPRESA</strong> ha adoptado los niveles de seguridad y de protección de datos
                  personales legalmente requeridos y ha instalado todos los medios y medidas de seguridad técnicas,
                  legales y organizativa a su alcance.
                </Typography>
              </Box>
            </Box>
          </ListItem>
        </List>

        <Typography variant="subtitle1">5. SEGURIDAD DE LOS DATOS PERSONALES Y CONFIDENCIALIDAD</Typography>
        <Typography paragraph>
          <strong>LA EMPRESA</strong> tiene implementadas todas las medidas de índole técnica, legal y organizativa
          necesarias para garantizar la seguridad de los Datos Personales y evitar su alteración, pérdida y tratamiento
          y/o acceso no autorizado, teniendo en cuenta el estado de la tecnología, la naturaleza de los datos
          almacenados y los riesgos a que están expuestos. Los Datos Personales facilitados por los Usuarios serán
          tratados con total confidencialidad. Para mayor información sobre las medidas de seguridad adoptadas, se podrá
          consultar el siguiente link:
          <Link href="https://www.useinsider.com/legal/dpaz" target="_blank" rel="noopener" sx={{ pl: 1 }}>
            https://www.useinsider.com/legal/dpa
          </Link>
        </Typography>

        <Typography paragraph>
          <strong>LA EMPRESA</strong> se compromete a guardar secreto profesional indefinidamente respecto de estos y
          garantiza el deber de guardarlos adoptando todas las medidas de seguridad necesarias.
        </Typography>

        <Typography variant="subtitle1">6. PROPORCIONALIDAD DEL TRATAMIENTO DE LOS DATOS PERSONALES</Typography>
        <Typography paragraph>
          Los Datos Personales solicitados a los Usuarios, son adecuados, pertinentes y no excesivos en relación con la
          finalidad para los que se recogen. Sin embargo, se conservarán durante el tiempo en que pueda exigirse algún
          tipo de responsabilidad a <strong>LA EMPRESA</strong> derivada de esta relación con los Usuarios. Por lo
          tanto, los datos personales de los usuarios serán tratados por <strong>LA EMPRESA</strong> durante todo el
          tiempo que se mantenga la relación comercial con el usuario; inclusive hasta diez (10) años después que
          finalice la referida relación contractual con <strong>LA EMPRESA</strong>, a excepción de los casos en los que
          el Usuario ejerza el derecho de cancelación y/o la finalidad del tratamiento haya sido cumplida.
        </Typography>

        <Typography variant="subtitle1">7. MODIFICACIONES A LA POLÍTICA DE PRIVACIDAD</Typography>
        <Typography paragraph>
          <strong>LA EMPRESA</strong> se reserva el derecho a modificar esta Política de Privacidad en cualquier
          momento. Toda modificación será comunicada inmediatamente a los Usuarios a través de la actualización de la
          presente Política de Privacidad y tendrá efectos frente a terceros relacionadas desde su publicación en la
          sección de documentos legales de la Billetera. Para mayor claridad respecto a la vigencia de la Política de
          Privacidad, los Usuarios podrán encontrar la última fecha de actualización de la Política de Privacidad
          aplicable en la parte superior de la misma.
        </Typography>

        <Typography variant="subtitle1">8. CONSENTIMIENTO</Typography>
        <Typography paragraph>
          Al aceptar esta Política de Privacidad los usuarios están de acuerdo con todos los aspectos expuestos en este
          documento y nos autorizan a tratar sus Datos Personales para las finalidades expuestas anteriormente.
        </Typography>

        <Typography variant="subtitle1" sx={{ textAlign: 'center' }}>
          Anexo 1 – Transferencia entre empresas del mismo grupo empresarial
        </Typography>

        <TableContainer sx={{ px: 1 }}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#b4c6e7' }}>
                <TableCell align="center" sx={{ border: '1px solid black' }}>
                  <Typography variant="subtitle1">Empresa</Typography>
                </TableCell>
                <TableCell align="center" sx={{ border: '1px solid black' }}>
                  <Typography variant="subtitle1">País de constitución </Typography>
                </TableCell>
                <TableCell align="center" sx={{ border: '1px solid black' }}>
                  <Typography variant="subtitle1">Identificación</Typography>
                </TableCell>
                <TableCell align="center" sx={{ border: '1px solid black' }}>
                  <Typography variant="subtitle1">Domicilio</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell align="left" sx={{ border: '1px solid black' }}>
                  Dec Services S.A.C.
                </TableCell>
                <TableCell align="left" sx={{ border: '1px solid black' }}>
                  Perú
                </TableCell>
                <TableCell align="left" sx={{ border: '1px solid black' }}>
                  RUC: 20566558247
                </TableCell>
                <TableCell align="left" sx={{ border: '1px solid black' }}>
                  Av. Pardo y Aliaga Nº 652, interior 901, San Isidro, Lima, Perú.
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left" sx={{ border: '1px solid black' }}>
                  Belcorp Corporate Services S.A.C.
                </TableCell>
                <TableCell align="left" sx={{ border: '1px solid black' }}>
                  Perú
                </TableCell>
                <TableCell align="left" sx={{ border: '1px solid black' }}>
                  RUC: 20601050120
                </TableCell>
                <TableCell align="left" sx={{ border: '1px solid black' }}>
                  Av. Pardo y Aliaga Nº 652, interior 501, San Isidro, Lima, Perú.
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left" sx={{ border: '1px solid black' }}>
                  Fundación Belcorp
                </TableCell>
                <TableCell align="left" sx={{ border: '1px solid black' }}>
                  Perú
                </TableCell>
                <TableCell align="left" sx={{ border: '1px solid black' }}>
                  RUC: 20507648691
                </TableCell>
                <TableCell align="left" sx={{ border: '1px solid black' }}>
                  Av. Pardo y Aliaga Nº 652, San Isidro, Lima, Perú.
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left" sx={{ border: '1px solid black' }}>
                  Promotora de Belleza S.A.
                </TableCell>
                <TableCell align="left" sx={{ border: '1px solid black' }}>
                  Chile
                </TableCell>
                <TableCell align="left" sx={{ border: '1px solid black' }}>
                  RUT: 96.524.830-7
                </TableCell>
                <TableCell align="left" sx={{ border: '1px solid black' }}>
                  Av. Aeropuerto Nº 860, Quilicura, Santiago, Chile.
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left" sx={{ border: '1px solid black' }}>
                  Transbel S.A.
                </TableCell>
                <TableCell align="left" sx={{ border: '1px solid black' }}>
                  Bolivia
                </TableCell>
                <TableCell align="left" sx={{ border: '1px solid black' }}>
                  NIT: 1028501021
                </TableCell>
                <TableCell align="left" sx={{ border: '1px solid black' }}>
                  Cuarto Anillo entre Av. Paraguá y Mutualista S/N, Edificio “ITA”, Santa Cruz de la Sierra, Bolivia.
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left" sx={{ border: '1px solid black' }}>
                  Bel Star S.A.
                </TableCell>
                <TableCell align="left" sx={{ border: '1px solid black' }}>
                  Colombia
                </TableCell>
                <TableCell align="left" sx={{ border: '1px solid black' }}>
                  NIT. 8000183591
                </TableCell>
                <TableCell align="left" sx={{ border: '1px solid black' }}>
                  Km. 22 Carretera Central del Norte, Parque Industrial Canavita, Vereda Canavita, Tocancipá,
                  Cundinamarca, Colombia
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left" sx={{ border: '1px solid black' }}>
                  Grupo Transbel S.A.
                </TableCell>
                <TableCell align="left" sx={{ border: '1px solid black' }}>
                  Ecuador
                </TableCell>
                <TableCell align="left" sx={{ border: '1px solid black' }}>
                  RUC: 1791868951001
                </TableCell>
                <TableCell align="left" sx={{ border: '1px solid black' }}>
                  Inglaterra E3-266 y Avenida Amazonas, esquina Edificio Stratta, Piso 6, ciudad de Quito, Distrito
                  Metropolitano, Provincia de Pichincha, Quito, Ecuador
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left" sx={{ border: '1px solid black' }}>
                  Transbel S.A. de C.V.
                </TableCell>
                <TableCell align="left" sx={{ border: '1px solid black' }}>
                  México
                </TableCell>
                <TableCell align="left" sx={{ border: '1px solid black' }}>
                  RFC: TRA950227PX7
                </TableCell>
                <TableCell align="left" sx={{ border: '1px solid black' }}>
                  Rancho San Javier Carretera México Querétaro Km. 41.5, SN, Nave 6 lote 2 y 3, Ex-Hacienda San Miguel,
                  Cuautitlán Izcalli, México, CP 54715
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left" sx={{ border: '1px solid black' }}>
                  Dirbel Inversiones S.A.
                </TableCell>
                <TableCell align="left" sx={{ border: '1px solid black' }}>
                  Costa Rica
                </TableCell>
                <TableCell align="left" sx={{ border: '1px solid black' }}>
                  Cedula de Persona Jurídica No. 3-101- 338816
                </TableCell>
                <TableCell align="left" sx={{ border: '1px solid black' }}>
                  Centro Corporativo Plaza Roble, Edificio Las Terrazas, 3er Piso, San Rafael, Guachipelín de Escazú,
                  San José, Costa Rica
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left" sx={{ border: '1px solid black' }}>
                  L´Bel Paris S.A.
                </TableCell>
                <TableCell align="left" sx={{ border: '1px solid black' }}>
                  Panamá
                </TableCell>
                <TableCell align="left" sx={{ border: '1px solid black' }}>
                  1178871-1-577745 Dígito Verificador (DV) 80
                </TableCell>
                <TableCell align="left" sx={{ border: '1px solid black' }}>
                  Oceanía Business Plaza, Punta Pacifica, Torre 1000 Piso 25 Local G, Ciudad de Panamá, Panamá.
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left" sx={{ border: '1px solid black' }}>
                  Belcorp International Operations S.A.
                </TableCell>
                <TableCell align="left" sx={{ border: '1px solid black' }}>
                  Panamá
                </TableCell>
                <TableCell align="left" sx={{ border: '1px solid black' }}>
                  RUC: 155700835-2-2021 DV 30
                </TableCell>
                <TableCell align="left" sx={{ border: '1px solid black' }}>
                  Costa Del Este, Edificio Dream Plaza Piso 8, Corregimiento Juan Díaz, Provincia de Panamá.
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left" sx={{ border: '1px solid black' }}>
                  Belcorp Guatemala S.A.
                </TableCell>
                <TableCell align="left" sx={{ border: '1px solid black' }}>
                  Guatemala
                </TableCell>
                <TableCell align="left" sx={{ border: '1px solid black' }}>
                  NIT: 2648984-8
                </TableCell>
                <TableCell align="left" sx={{ border: '1px solid black' }}>
                  5a. Av. 5-55 Zona 14, Edificio Europlaza, Torre 1, Nivel 15, Of. 1501, Ciudad de Guatemala, Guatemala
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left" sx={{ border: '1px solid black' }}>
                  Belcorp El Salvador S.A. de C.V.
                </TableCell>
                <TableCell align="left" sx={{ border: '1px solid black' }}>
                  El Salvador
                </TableCell>
                <TableCell align="left" sx={{ border: '1px solid black' }}>
                  NIT: 0614-060203 -1045
                </TableCell>
                <TableCell align="left" sx={{ border: '1px solid black' }}>
                  Av. Boquerón Blvd. Orden de Malta, Urb. Santa Elena, Edificio Zafiro, Nivel 4, # 4-A, Antiguo
                  Cuscatlán, La Libertad, El Salvador.
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left" sx={{ border: '1px solid black' }}>
                  Ventura Corporation Limited (Sucursal)
                </TableCell>
                <TableCell align="left" sx={{ border: '1px solid black' }}>
                  Puerto Rico
                </TableCell>
                <TableCell align="left" sx={{ border: '1px solid black' }}>
                  66-0584328
                </TableCell>
                <TableCell align="left" sx={{ border: '1px solid black' }}>
                  Monte Hiedra Office Center. Av. Los Romeros 9615, Suite 501, San Juan, Puerto Rico.
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left" sx={{ border: '1px solid black' }}>
                  Transbel SRL
                </TableCell>
                <TableCell align="left" sx={{ border: '1px solid black' }}>
                  República Dominicana
                </TableCell>
                <TableCell align="left" sx={{ border: '1px solid black' }}>
                  RNC: 1-01-89378-8
                </TableCell>
                <TableCell align="left" sx={{ border: '1px solid black' }}>
                  Winston Churchill No.93 Esquina Av. Gustavo Mejia Ricart, Edificio Comercial Blue Mall, Ens. Piantini,
                  Santo Domingo, República Dominicana
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left" sx={{ border: '1px solid black' }}>
                  Ventura International Limited
                </TableCell>
                <TableCell align="left" sx={{ border: '1px solid black' }}>
                  Estados Unidos
                </TableCell>
                <TableCell align="left" sx={{ border: '1px solid black' }}>
                  EIN No. 47-087-5832
                </TableCell>
                <TableCell align="left" sx={{ border: '1px solid black' }}>
                  5201 Blue Lagoon Drive 8th Floor Suite 8 Miami, USA.
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <Typography variant="subtitle1" sx={{ textAlign: 'center' }}>
          Anexo 2
        </Typography>
        <TableContainer sx={{ px: 1 }}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#b4c6e7' }}>
                <TableCell align="center" sx={{ border: '1px solid black' }}>
                  <Typography variant="subtitle1">Nombre de la empresa</Typography>
                </TableCell>
                <TableCell align="center" sx={{ border: '1px solid black' }}>
                  <Typography variant="subtitle1">Nº de RUC </Typography>
                </TableCell>
                <TableCell align="center" sx={{ border: '1px solid black' }}>
                  <Typography variant="subtitle1">Domicilio</Typography>
                </TableCell>
                <TableCell align="center" sx={{ border: '1px solid black' }}>
                  <Typography variant="subtitle1">Finalidad</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell align="left" sx={{ border: '1px solid black' }}>
                  SERVITEBCA PERÚ, SERVICIO DE TRANSFERENCIA ELECTRÓNICA DE BENEFICIOS Y PAGOS S.A.
                </TableCell>
                <TableCell align="left" sx={{ border: '1px solid black' }}>
                  20517372294
                </TableCell>
                <TableCell align="left" sx={{ border: '1px solid black' }}>
                  Av. Circunvalacion Del Club Golf Los Incas Nro. 154 Int. 701 Urb. Club Golf Los Incas (Piso 7, Oficina
                  701-A), Santiago de Surco, Lima, Perú
                </TableCell>
                <TableCell align="left" sx={{ border: '1px solid black' }}>
                  Empresa Emisora de dinero electrónico, responsable de proveer el servicio de dinero electrónico
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left" sx={{ border: '1px solid black' }}>
                  NovoPayment Inc.
                </TableCell>
                <TableCell align="left" sx={{ border: '1px solid black' }}>
                  N/A
                </TableCell>
                <TableCell align="left" sx={{ border: '1px solid black' }}>
                  Florida, Estados Unidos de América
                </TableCell>
                <TableCell align="left" sx={{ border: '1px solid black' }}>
                  Implementación tecnológica de la Billetera y proceso de inscripción
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left" sx={{ border: '1px solid black' }}>
                  EXPERIAN PERÚ S.A.C.,
                </TableCell>
                <TableCell align="left" sx={{ border: '1px solid black' }}>
                  20525138985
                </TableCell>
                <TableCell align="left" sx={{ border: '1px solid black' }}>
                  Av. Canaval y Moreyra N° 480, Piso 19, distrito de San Isidro, Lima, Perú
                </TableCell>
                <TableCell align="left" sx={{ border: '1px solid black' }}>
                  Consulta de listas restrictivas
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <Typography variant="subtitle1" sx={{ textAlign: 'center' }}>
          PROCEDIMIENTO PARA EL EJERCICIO DE DERECHOS ARCO CETCO S.A.
        </Typography>

        <List sx={{ listStyleType: 'upper-roman', pl: 2 }}>
          <ListItem sx={{ display: 'list-item', p: 0 }}>
            <Typography variant="subtitle1">OBJETO:</Typography>
            <Typography paragraph>
              El presente documento tiene por objeto describir el procedimiento que los titulares de datos personales
              contenidos en bancos de datos de titularidad de <strong>CETCO S.A.,</strong>en adelante{' '}
              <strong>“LA EMPRESA”</strong> , deben de seguir para el ejercicio de los derechos de acceso,
              rectificación, cancelación y oposición, en adelante los “derechos ARCO”, en el marco de la Ley N° 29733 -
              Ley de Protección de Datos Personales (en adelante la “Ley”) y de su Reglamento aprobado mediante Decreto
              Supremo N° 003- 2013-JUS (en adelante el “Reglamento”).
            </Typography>
          </ListItem>
          <ListItem sx={{ display: 'list-item', p: 0 }}>
            <Typography variant="subtitle1">DERECHOS ARCO:</Typography>
            <Typography paragraph>
              De conformidad con la mencionada Ley y su Reglamento, los derechos que toda persona puede ejercer ante{' '}
              <strong>LA EMPRESA</strong>, respecto del tratamiento de sus datos personales son:
            </Typography>
            <List sx={{ listStyleType: 'circle', pl: 2 }}>
              <ListItem sx={{ display: 'list-item', p: 0 }}>
                <Typography paragraph>
                  <strong>Derecho de acceso:</strong> para obtener la información que, sobre sí mismo, sea objeto de
                  tratamiento en bancos de datos de titularidad de <strong>LA EMPRESA</strong>, la forma en que sus
                  datos fueron recopilados, las razones que motivaron su recopilación y a solicitud de quién se realizó
                  la recopilación, así como las transferencias realizadas o que se prevén hacer de ellos.
                </Typography>
              </ListItem>
              <ListItem sx={{ display: 'list-item', p: 0 }}>
                <Typography paragraph>
                  <strong>Derecho de rectificación (actualización e inclusión):</strong> para que se modifiquen los
                  datos que resulten ser parcial o totalmente inexactos, incompletos, erróneos o falsos.
                </Typography>
              </ListItem>
              <ListItem sx={{ display: 'list-item', p: 0 }}>
                <Typography paragraph>
                  <strong>Derecho de cancelación (supresión):</strong> para solicitar la supresión o cancelación de sus
                  datos personales de un banco de datos personales, cuando éstos hayan dejado de ser necesarios o
                  pertinentes para la finalidad para la cual hayan sido recopilados; hubiere vencido el plazo
                  establecido para su tratamiento; se haya revocado su consentimiento para el tratamiento; y en los
                  demás casos en los que no están siendo tratados conforme a la Ley y al Reglamento
                </Typography>
              </ListItem>
              <ListItem sx={{ display: 'list-item', p: 0 }}>
                <Typography paragraph>
                  <strong>Derecho de oposición: </strong> para oponerse, por un motivo legítimo y fundado, referido a
                  una situación personal concreta, a figurar en el banco de datos de <strong>LA EMPRESA</strong> o al
                  tratamiento de sus datos personales, siempre que por una ley no se disponga lo contrario.
                </Typography>
              </ListItem>
            </List>
          </ListItem>
          <ListItem sx={{ display: 'list-item', p: 0 }}>
            <Typography variant="subtitle1">CRITERIOS GENERALES:</Typography>
            <List sx={{ listStyleType: 'decimal', pl: 2 }}>
              <ListItem sx={{ display: 'list-item', p: 0 }}>
                <Typography variant="subtitle1">Legitimidad para el ejercicio de los Derechos ARCO:</Typography>
                <Typography paragraph>
                  Los derechos ARCO de datos personales solo pueden ser ejercidos por el Titular de los Datos
                  Personales, sin perjuicio de las normas que regulan su representación.
                </Typography>
              </ListItem>
              <ListItem sx={{ display: 'list-item', p: 0 }}>
                <Typography variant="subtitle1">
                  La solicitud de ejercicio de los Derechos ARCO se realiza a través de:
                </Typography>
                <Typography paragraph>
                  De forma física a la siguiente dirección: Av. Felipe Pardo y Aliaga N° 652, Int. 1001, distrito de San
                  Isidro, provincia y departamento de Lima; y/o de forma electrónica, a las siguientes direcciones:
                  <Link sx={{ pl: 1 }} href="mailto:servicioalcliente@yiro.com">
                    servicioalcliente@yiro.com
                  </Link>
                </Typography>
              </ListItem>
              <ListItem sx={{ display: 'list-item', p: 0 }}>
                <Typography variant="subtitle1">
                  La solicitud de ejercicio de Derechos ARCO debe ser dirigida a los responsables de la Protección de
                  Datos Personales en <strong>LA EMPRESA</strong>, quienes verificarán que la misma contenga los
                  siguientes requisitos: :
                </Typography>
                <List sx={{ listStyleType: 'lower-alpha', pl: 2 }}>
                  <ListItem sx={{ display: 'list-item', p: 0 }}>
                    <Typography paragraph>Los nombres y apellidos del Titular de los Datos Personales.</Typography>
                  </ListItem>
                  <ListItem sx={{ display: 'list-item', p: 0 }}>
                    <Typography paragraph>
                      Documento Nacional de Identidad, pasaporte o documento equivalente del Titular de los Datos
                      Personales, el mismo que deberá ser mostrado a la presentación de su solicitud para acreditar su
                      identidad, adjuntando una copia de este. En caso de representación, la solicitud deberá indicar el
                      nombre y Documento Nacional de Identidad o documento equivalente del representante del Titular de
                      los Datos Personales, a la que adjuntará una copia de este, una copia del Documento Nacional de
                      Identidad o documento equivalente de su representado y el documento en el que conste el poder del
                      representante con facultades expresas para el ejercicio del derecho ARCO respectivo (Carta Poder
                      con firma Legalizada).
                    </Typography>
                  </ListItem>
                  <ListItem sx={{ display: 'list-item', p: 0 }}>
                    <Typography paragraph>
                      Domicilio o dirección electrónica, para efectos de las notificaciones.
                    </Typography>
                  </ListItem>
                  <ListItem sx={{ display: 'list-item', p: 0 }}>
                    <Typography paragraph>
                      Petición en que se concreta la solicitud. Deberá indicarse el derecho que ejerce el Titular de los
                      Datos Personales.
                    </Typography>
                  </ListItem>
                  <ListItem sx={{ display: 'list-item', p: 0 }}>
                    <Typography paragraph>
                      Si se tratase de una solicitud de rectificación (actualización, inclusión) de datos personales, el
                      solicitante deberá indicar a qué datos personales se refiere, además, de las modificaciones que
                      deban realizarse a los mismos, aportando la documentación que sustente su petición. La solicitud
                      podrá contener algún elemento o documento adicional que coadyuve a ubicar los datos personales
                      solicitados, así como información sobre otros medios de contacto, como número telefónico, que
                      facilite la tramitación de la solicitud de ejercicio de derechos ARCO.
                    </Typography>
                  </ListItem>
                  <ListItem sx={{ display: 'list-item', p: 0 }}>
                    <Typography paragraph>
                      En el caso que se desee acceder a bancos de datos de grabación de imágenes, es necesaria una
                      fotografía reciente.
                    </Typography>
                  </ListItem>
                  <ListItem sx={{ display: 'list-item', p: 0 }}>
                    <Typography paragraph>Fecha y firma del solicitante</Typography>
                  </ListItem>
                </List>
              </ListItem>
              <ListItem sx={{ display: 'list-item', p: 0 }}>
                <Typography variant="subtitle1">
                  Recepción y subsanación de la solicitud de ejercicio de derechos
                </Typography>
                <List sx={{ listStyleType: 'lower-alpha', pl: 2 }}>
                  <ListItem sx={{ display: 'list-item', p: 0 }}>
                    <Typography paragraph>
                      Todas las solicitudes presentadas serán recibidas por <strong>LA EMPRESA</strong>, dejándose
                      constancia de su recepción.
                    </Typography>
                  </ListItem>
                  <ListItem sx={{ display: 'list-item', p: 0 }}>
                    <Typography paragraph>
                      En caso de que la solicitud no cumpla con los requisitos exigidos, <strong>LA EMPRESA</strong> en
                      un plazo de cinco (5) días1 , contado desde el día siguiente de la recepción de la solicitud,
                      formulará las observaciones por incumplimiento que no puedan ser salvadas, invitando al Titular de
                      los Datos Personales a subsanarlas dentro de un plazo máximo de cinco (5) días. Transcurrido el
                      plazo señalado sin que ocurra la subsanación se tendrá por no presentada la solicitud.
                    </Typography>
                  </ListItem>
                  <ListItem sx={{ display: 'list-item', p: 0 }}>
                    <Typography paragraph>
                      En el caso que la información proporcionada en la solicitud sea insuficiente o errónea de forma
                      que no permita su atención, <strong>LA EMPRESA</strong> podrá requerir dentro de los siete (7)
                      días siguientes de recibida la solicitud, documentación adicional al Titular de los Datos
                      Personales para atenderla. En un plazo de diez (10) días de recibido el requerimiento, contado
                      desde el día siguiente de la recepción del mismo, el Titular de Datos Personales acompañará la
                      documentación adicional que estime pertinente para fundamentar su solicitud. En caso contrario, se
                      tendrá por no presentada dicha solicitud.
                    </Typography>
                  </ListItem>
                </List>
              </ListItem>
              <ListItem sx={{ display: 'list-item', p: 0 }}>
                <Typography variant="subtitle1">Plazos de respuesta</Typography>
                <List sx={{ listStyleType: 'lower-alpha', pl: 2 }}>
                  <ListItem sx={{ display: 'list-item', p: 0 }}>
                    <Typography paragraph>
                      El plazo máximo para la respuesta de <strong>LA EMPRESA</strong> ante el ejercicio del derecho de
                      acceso será de veinte (20) días contados desde el día siguiente de la presentación de la solicitud
                      por el titular de datos personales o de su subsanación.
                    </Typography>
                    <Typography paragraph>
                      Si la solicitud fuera admitida y <strong>LA EMPRESA</strong> no acompañase a su respuesta la
                      información solicitada, el acceso será efectivo dentro de los diez (10) días siguientes a dicha
                      respuesta
                    </Typography>
                  </ListItem>
                  <ListItem sx={{ display: 'list-item', p: 0 }}>
                    <Typography paragraph>
                      En el caso del ejercicio del derecho de rectificación, oposición y/o cancelación, el plazo máximo
                      de respuesta de <strong>LA EMPRESA</strong> será de diez (10) días contados desde el día siguiente
                      de la presentación de la solicitud correspondiente o de subsanada o complementada la misma con
                      información adicional, según sea el caso.
                    </Typography>
                  </ListItem>
                  <ListItem sx={{ display: 'list-item', p: 0 }}>
                    <Typography paragraph>
                      Los plazos que correspondan para la respuesta o la atención de los referidos derechos podrán ser
                      ampliados una sola vez, y por un plazo igual, como máximo, siempre que las circunstancias lo
                      justifiquen. La justificación de la ampliación del plazo será comunicada al Titular del Dato
                      Personal dentro del plazo que se pretenda ampliar.
                    </Typography>
                  </ListItem>
                </List>
              </ListItem>
              <ListItem sx={{ display: 'list-item', p: 0 }}>
                <Typography variant="subtitle1">
                  <strong>LA EMPRESA</strong> denegará la solicitud para el ejercicio de los derechos ARCO presentada
                  por el Titular de los Datos Personales, en los siguientes supuestos:
                </Typography>
                <List sx={{ listStyleType: 'lower-alpha', pl: 2 }}>
                  <ListItem sx={{ display: 'list-item', p: 0 }}>
                    <Typography paragraph>
                      Si el solicitante no es el Titular de los Datos Personales, o el representante legal no se
                      encuentra debidamente acreditado para ello.
                    </Typography>
                    <Typography paragraph>
                      Si en los Bancos de Datos de <strong>LA EMPRESA</strong>, no se encuentran los datos personales
                      del solicitante.
                    </Typography>
                  </ListItem>
                  <ListItem sx={{ display: 'list-item', p: 0 }}>
                    <Typography paragraph>
                      Si existe un impedimento legal, o una resolución judicial o administrativa que restrinja el
                      ejercicio de los derechos ARCO al Titular de los mismos.
                    </Typography>
                  </ListItem>
                  <ListItem sx={{ display: 'list-item', p: 0 }}>
                    <Typography paragraph>
                      Cuando el Titular de los Datos Personales ya ejerció alguno de sus derechos ARCO y pretende
                      ejercerlo nuevamente sin haber transcurrido el plazo que tiene <strong>LA EMPRESA</strong> para
                      resolver su solicitud.
                    </Typography>
                  </ListItem>
                </List>
              </ListItem>
            </List>
          </ListItem>
        </List>

        <Typography variant="subtitle1">
          Una vez leído “Procedimiento para el ejercicio de derechos ARCO” sírvase descargar y presentar el formulario
          que se presenta a continuación: &quot;Formulario para el ejercicio de Derechos ARCO&quot;
        </Typography>

        <Typography variant="subtitle1" sx={{ textAlign: 'center' }}>
          FORMULARIO PARA EL EJERCICIO DE DERECHOS ARCO CETCO S.A
        </Typography>

        <Typography variant="body1" sx={{ textAlign: 'center' }}>
          Nombres del Titular de los Datos Personales:
        </Typography>
        <Typography variant="body1">
          - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
          - - - - - - - - - - - - - - - - - - -
        </Typography>
        <Typography variant="body1" sx={{ textAlign: 'center' }}>
          Apellidos del Titular de los Datos Personales:
        </Typography>
        <Typography variant="body1">
          - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
          - - - - - - - - - - - - - - - - - - -
        </Typography>
        <Typography variant="body1" sx={{ textAlign: 'center' }}>
          Nombre del representante legal del Titular de los Datos Personales (en caso corresponda):
        </Typography>
        <Typography variant="body1">
          - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
          - - - - - - - - - - - - - - - - - - -
        </Typography>
        <Typography variant="body1" sx={{ textAlign: 'center' }}>
          Documento Nacional de Identidad o documento equivalente del Titular de los Datos Personales:
        </Typography>
        <Typography variant="body1">
          - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
          - - - - - - - - - - - - - - - - - - -
        </Typography>
        <Typography variant="body1" sx={{ textAlign: 'center' }}>
          Documento Nacional de Identidad o documento equivalente del Representante Legal (cuando corresponda)
        </Typography>
        <Typography variant="body1">
          - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
          - - - - - - - - - - - - - - - - - - -
        </Typography>
        <Typography variant="body1" sx={{ textAlign: 'center' }}>
          Domicilio del Titular de los Datos Personales o de su Representante (en caso corresponda), o dirección
          electrónica, para efecto de las notificaciones que se deriven de la presente solicitud:
        </Typography>
        <Typography variant="body1">
          - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
          - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
          - - - - - - - - - - - - - - - - - - -
        </Typography>
        <Typography variant="body1" sx={{ textAlign: 'center' }}>
          N° Telefónico del Titular de los Datos Personales (opcional)
        </Typography>
        <Typography variant="body1">
          - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
          - - - - - - - - - - - - - - - - - - -
        </Typography>
        <Typography variant="body1" sx={{ textAlign: 'center' }}>
          N° Telefónico del Representante del Titular de los Datos Personales, en caso corresponda (opcional)
        </Typography>
        <Typography variant="body1">
          - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
          - - - - - - - - - - - - - - - - - - -
        </Typography>
        <Typography variant="body1" sx={{ textAlign: 'center' }}>
          Marque con una &quot;x&quot; el derecho que desea ejercer:
        </Typography>
        <Typography variant="body1">[ ] Derecho de Acceso a sus datos personales.</Typography>
        <Typography variant="body1">[ ] Derecho de Rectificación a sus datos personales.</Typography>
        <Typography variant="body1">
          [ ] Derecho de Cancelación de sus datos personales en las bases de datos.
        </Typography>
        <Typography variant="body1">[ ] Derecho de Oposición de los datos personales.</Typography>
        <Typography variant="body1">
          Detalle y sustento de la solicitud planteada (En el caso de rectificación de datos personales, el solicitante
          deberá indicar específicamente a qué datos personales se refiere, así como las modificaciones que deban
          realizarse a los mismos, aportando la documentación que sustente su petición):
        </Typography>
        <Typography variant="body1">
          - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
          - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
          - - - - - - - - - - - - - - - - - - -
        </Typography>
        <Typography paragraph>Documentos anexos a la solicitud:</Typography>
        <List sx={{ listStyleType: 'lower-alpha', pl: 2 }}>
          <ListItem sx={{ display: 'list-item', p: 0 }}>
            <Typography paragraph>
              Copia del Documento Nacional de Identidad o documento equivalente del Titular de Datos Personales, que
              debe coincidir con la información indicada precedentemente.
            </Typography>
          </ListItem>
          <ListItem sx={{ display: 'list-item', p: 0 }}>
            <Typography paragraph>
              Copia del Documento Nacional de Identidad o documento equivalente del representante legal del Titular de
              Datos Personales y documento con firmas legalizadas notarialmente en el que conste sus facultades de
              representación.
            </Typography>
          </ListItem>
          <ListItem sx={{ display: 'list-item', p: 0 }}>
            <Typography paragraph>Documentos que sustenten la solicitud (detallar)</Typography>
          </ListItem>
        </List>
        <Typography paragraph>
          Mediante el presente documento, autorizo a <strong>CETCO S.A.,</strong> a que notifique la respuesta a mi
          solicitud a la dirección postal y/o dirección electrónica registrada en el presente formulario.
        </Typography>
        <Box sx={{ display: 'flex' }}>
          <Typography paragraph>Fecha: </Typography>
          <DashLine symbol={'_'} isContinuous={true} width="10%" />
        </Box>
        <DashLine symbol={'_'} isContinuous={true} width="20%" />

        <Typography paragraph>Firma del solicitante</Typography>
      </Stack>
    </>
  );
}
