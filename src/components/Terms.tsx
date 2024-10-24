'use client';

import {
  Box,
  Grid,
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

/**
 *
 * Component used to display the terms and conditions and as a webview in the mobile application
 */
export default function Terms() {
  const headerRegisters = ['Ítem', 'Lista', 'Descripción'];

  const alignments = ['center', 'center', 'left'];

  const internationalRestrictiveList = [
    [
      '1',
      'OFAC',
      'Lista actualizada del Gobierno Estadounidense en la que se determina países, organizaciones o personas con las que no deben hacer negocios ni efectuar transacciones.',
    ],
    [
      '2',
      'Listas de la ONU',
      'Listas de personas y entidades designadas por el Consejo de Seguridad de la Organización de Naciones Unidas (ONU), debido a su vinculación con el terrorismo y el financiamiento del terrorismo.',
    ],
    [
      '3',
      'INTERPOL',
      'Lista de delincuentes internacionales que figuran en los ficheros de esta Organización Policial Internacional.',
    ],
    [
      '4',
      'Most Wanted FBI',
      'El FBI es una agencia federal de investigación e inteligencia con jurisdicción sobre una gran variedad de delitos federales, incluyendo asuntos de seguridad nacional como terrorismo y espionaje, secuestro o extravío de menores, crimen organizado, corrupción pública, y delitos cibernéticos/informáticos.',
    ],
    ['5', 'DEA', 'Personas vinculadas a programas internacionales de control de drogas.'],
    [
      '6',
      'DebarredList',
      'Debarred Parties List, publicada por la Oficina de Controles Comerciales de Defensa del Departamento de Estado de los Estados Unidos.',
    ],
    [
      '7',
      'Export.gov',
      'La Lista consolidada de cribado (CSL) es una lista de partes para las que el Gobierno de los Estados Unidos mantiene restricciones sobre ciertas exportaciones, reexportaciones o transferencias de artículos.',
    ],
    [
      '8',
      'Finra',
      'Archivo de entidades solicitantes no registradas que han sido objeto de reclamaciones de inversionistas.',
    ],
    [
      '9',
      'Nonproliferation Sanctions',
      'Los Estados Unidos imponen sanciones bajo diversas autoridades legales contra individuos extranjeros, entidades privadas y gobiernos que participan en actividades de proliferación. el Registro Federal es la única lista oficial y completa de las determinaciones de sanciones por no proliferación.',
    ],
    [
      '10',
      'Unión Europea',
      'El Consejo de la Unión Europea impone sanciones internacionales que son medidas coercitivas que se aplican contra Estados, entidades no estatales o individuos que suponen una amenaza para la paz y la seguridad internacionales.',
    ],
    [
      '11',
      'AECA DEBARRED',
      'Las personas (incluidas las entidades y personas físicas) que figuran en los documentos relacionados a continuación han sido condenadas por violación o conspiración para violar la Ley de Control de Exportación de Armas (AECA).',
    ],
    [
      '12',
      'Criminal Code',
      'Public Safety Canada site - El listado de una entidad es un medio público para identificar a un grupo o individuo como asociado con el terrorismo. La definición de una entidad incluye una persona, grupo, fideicomiso, sociedad o fondo, o una asociación u organización no incorporada. La Ley Antiterrorista establece medidas para que el Gobierno de Canadá cree una lista de entidades.',
    ],
    ['13', 'FTO', 'Lista de organizaciones terroristas extranjeras del Departamento de Estado de los Estados Unidos.'],
    [
      '14',
      'OSFI (Canada)',
      'Listas de nombres sujetos a los reglamentos que establecen una lista de entidades en virtud del párrafo 83.05 (1) del Código Penal y / o del Reglamento de Aplicación de las Resoluciones de las Naciones Unidas sobre la Represión del Terrorismo (RIUNRST) y de las Naciones Unidas Al-Qaida y los reglamentos de los talibanes (UNAQTR).',
    ],
    [
      '15',
      'Finansinspektionen',
      'Las advertencias se emiten cuando las empresas intentan operar en un mercado sin tener los permisos necesarios o sin estar registradas con la autoridad supervisora en el país.',
    ],
    [
      '16',
      'Central Boreau Investigation WANTED Persons - INDIA',
      'Los datos se basan en la información proporcionada a NCB-Nueva Delhi solicitando a las agencias de aplicación de la ley. NCB-Nueva Delhi se basa en las agencias solicitantes para la exhaustividad / exactitud de la información proporcionada.',
    ],
    [
      '17',
      'Listas de los mas buscados por la Policía del Reino Unido',
      'Las fuerzas policiales de todo el Reino Unido son responsables de las apelaciones más buscadas; ellos eligen quién va en quién no. La naturaleza del crimen o la investigación también influirá en si se presenta una apelación. La policía es responsable de la exactitud de la información proporcionada y de la eliminación de las apelaciones.',
    ],
    [
      '18',
      'Banco de Inglaterra/BOE/ HM TREASURY',
      'Lista consolidada de objetivos de sanciones financieras en el Reino Unido.',
    ],
    [
      '19',
      'BID',
      'Las empresas y personas mencionadas a continuación han sido sancionadas por el Comité de Sanciones del Grupo BID por haberse determinado que estuvieron involucradas en prácticas fraudulentas, corruptas, colusorias, coercitivas u obstructivas en violación de las políticas anticorrupción del Grupo BID.',
    ],
    [
      '20',
      'Banco Mundial',
      'Las empresas y los individuos enumerados en esta lista no pueden recibir un contrato financiado por el Banco Mundial para los períodos indicados porque han sido sancionados bajo la política de fraude y corrupción del Banco, tal como se establece en las Directrices de Adquisiciones o en las Guías de Consultoría.',
    ],
    [
      '21',
      'Lista de Buscados por el ATF de los Estados Unidos de América',
      'Las responsabilidades de la ATF incluyen la investigación y prevención de delitos federales relacionados con el uso, fabricación y posesión ilícitos de armas de fuego y explosivos; actos de incendio premeditado y bombardeos; y el tráfico ilícito de alcohol y productos del tabaco.',
    ],
    [
      '22',
      'Lista de Buscados por el ICE de los Estados Unidos de América',
      'El Servicio de Inmigración y Aduanas de los Estados Unidos (ICE) hace cumplir las leyes federales que rigen el control fronterizo, las aduanas, el comercio y la inmigración para promover la seguridad nacional y la seguridad pública.',
    ],
    [
      '23',
      'Lista de Buscados por el U. S. Marshals Service de los Estados Unidos de América',
      'El Servicio Marchals es responsable de proporcionar seguridad al poder judicial federal y administrar el programa de seguridad de testigos.',
    ],
    [
      '24',
      'Lista de Buscados por el PIS de los Estados Unidos de América',
      'El Servicio de Inspección Postal de EE. UU tiene el deber de hacer cumplir las leyes que defienden el sistema de correo del país de uso ilegal o peligroso; y asegurar la confianza pública en el correo.',
    ],
    [
      '25',
      'Lista de Buscados por el Deparment of State de los Estados Unidos de América',
      'Lista de Buscados por el Deparment of State de los Estados Unidos de América.',
    ],
    [
      '26',
      'FOREIGN SANCTIONS EVADERS LIST_EEUU',
      'OFAC publica una lista de personas y entidades extranjeras que han determinado violar, intentar violar, violar o haber violado las sanciones impuestas por los Estados Unidos a Siria o al Irán de conformidad con la Orden Ejecutiva 13608. También enumera las personas extranjeras que han facilitado transacciones engañosas para o en nombre de personas sujetas a sanciones estadounidenses.',
    ],
    [
      '27',
      'BOLETIN GUARDIA CIVIL ESPANOLA',
      'Autoridades Españolas que informa sobre nacionales y extranjeros vinculados al terrorismo.',
    ],
    ['28', 'Vinculados LAFT', 'Personas y/o Empresas que puedan captarce como relacionados de a personas de listas.'],
    ['29', 'OFAC', 'OFAC Histórico.'],
    [
      '30',
      'Offshore Leaks',
      'Panama Papers, Bahamas Leaks, Offshore Leaks y Paradise Papers - Lista de Personas físicas y jurídicas relacionadas y/o vinculadas con la constitución funcionamiento de compañías constituidas en este paraíso fiscal.',
    ],
    [
      '31',
      'Nonproliferation Sanctions',
      'Los Estados Unidos imponen sanciones bajo diversas autoridades legales contra individuos extranjeros, entidades privadas y gobiernos que participan en actividades de proliferación. el Registro Federal es la única lista oficial y completa de las determinaciones de sanciones por no proliferación.',
    ],
  ];

  const nationalRestrictiveList = [
    [
      '1',
      'CONASEV (Comisión Nacional Supervisora de Empresas y Valores) / SMV (Superintendencia del Mercado de Valores)',
      'Lista consolidada de personas juridicas o naturales sancionadas por la CONASEV, hoy SMV que es el organismo público descentralizado del Sector Economía y Finanzas encargado de promover, supervisar y regular el mercado de valores.',
    ],
    [
      '2',
      'OSCE (Organismo Supervisor de las Contrataciones con el Estado)',
      'Registro Nacional de Proveedores Sancionados (RNP), lista consolida de personas jurídicas o naturales que se encuentran impedidas de contratar con el Estado por estar sancionados.',
    ],
    [
      '3',
      'SBS (Superintendencia de Banca Seguros y AFP)',
      'Lista consolidada de personas jurídicas sancionadas por la SBS.',
    ],
    [
      '4',
      'SUNASS (Superintendencia Nacional de Servicios de Saneamiento)',
      'Registro de prestadores de servicios de saneamiento que sancionados impedidos de volver a contratar.',
    ],
    [
      '5',
      'Contraloría General de la República del Perú',
      'Registro de personas naturales sancionadas por el Estado por la incorrecta aplicación de las políticas públicas y el uso de los recursos y bienes del Estado.',
    ],
    ['6', 'Ministerio de Relaciones Exteriones', 'Registro nacional de personas extraditadas.'],
    [
      '7',
      'Tribunal Constiucional del Perú',
      'Registro de sentenciados por el Tribunal Constitucional de Peru por ser extraditados.',
    ],
    [
      '8',
      'Tribunal de Contrataciones del Estado',
      'Publicación mensual de sancionados con inhabilitación por el Tribunal de Contrataciones del Estado.',
    ],
    [
      '9',
      'Tribunal de Contrataciones del Estado',
      'Publicación mensual de sancionados con multa por el Tribunal de Contrataciones del Estado.',
    ],
    [
      '10',
      'Tribunal de Contrataciones del Estado',
      'Consulta histórica de publicaciones mensuales de sancionados con inhabilitación.',
    ],
    [
      '11',
      'Tribunal de Contrataciones del Estado',
      'Consulta histórica de publicaciones mensuales de sancionados con multa.',
    ],
    [
      '12',
      'Tribunal de Contrataciones del Estado',
      'Relación de proveedores sancionados por el Tribunal de Contrataciones del Estado con sanción vigente.',
    ],
    ['13', 'Tribunal de Contrataciones del Estado', 'Proveedores sancionados por otros organismos'],
    ['14', 'Tribunal de Contrataciones del Estado', 'Relación de proveedores con inhabilitación judicial vigente.'],
    [
      '15',
      'INDECOPI (Instituto Nacional de Defensa de la Competencia y de la Propiedad Intelectual)',
      'Relación de proveedores sancionados por INDECOPI.',
    ],
    [
      '16',
      'OSCE (Organismo Supervisor de las Contrataciones con el Estado)',
      'Proveedores de otros registros impedidos de contratar con el estado.',
    ],
    ['17', 'Contraloría General de la República del Perú', 'Registro nacional de sanciones contra servidores civiles.'],
    ['18', 'Listas Internas Cliente', 'Listas Internas Cliente.'],
    ['19', 'NOTICIAS GJ / Nacionales e internacionales', 'NOTICIAS GJ / Nacionales e internacionales.'],
  ];

  const pepsList = [
    ['1', 'Registro Oficial Gobierno de Perú', 'Registro Oficial Gobierno de Perú.'],
    ['2', 'Diario Oficial El Peruano', 'Nombramientos Perú.'],
  ];

  const headersMaximunAmounts = ['', 'Monto de transacción', 'Monto diario', 'Monto semanal', 'Monto mensual'];

  const maximunAmounts = [
    ['Transferencias de fondos', 'S/4,950 ', 'S/15,000 ', 'S/35,000 ', 'S/140,000 '],
    ['Pago de pedido de Venta Directa de LA EMPRESA', 'S/4,950 ', 'S/15,000 ', 'S/35,000 ', 'S/140,000 '],
    ['Cobros a clientes a través de Cybersource', 'S/4,950 ', 'S/15,000 ', 'S/35,000 ', 'S/140,000 '],
    [
      'Cobros a clientes a través de PagoEfectivo (Banca móvil y Agentes)',
      'S/4,950 ',
      'S/15,000 ',
      'S/35,000 ',
      'S/140,000 ',
    ],
    ['Cobros a clientes a PagoEfectivo (Billeteras)', 'S/500', 'S/15,000 ', 'S/35,000 ', 'S/140,000 '],
    ,
    ['Recargas', 'S/4,950 ', 'S/15,000 ', 'S/35,000 ', 'S/140,000 '],
    ['Retiros de fondos', 'S/2,500 ', , 'S/7,500 ', 'S/30,000 ', 'S/135,000 '],
    ['Pago en establecimientos afiliados a la red Visa', 'S/4,950 ', 'S/15,000 ', 'S/35,000 ', 'S/140,000'],
  ];

  const headerCurrentRates = ['Concepto', 'Tarifa', 'Regla'];

  const currentRates = [
    ['Reposición Tarjeta Física', 'S/. 20.00', 'N/A'],
    ['Recarga de billetera a través de Pagoefectivo', 'S/. 0.00', 'Vigente hasta enero 2025'],
    ['Cobro a través de Pagoefectivo', 'S/. 0.00', ' Vigente hasta enero 2025'],
    ['Cobro a través de Link de pago', '1.90% + USD 0.055*', 'N/A'],
    ['Retiros ATM: Global net ATM', 'USD 0.53*', 'A partir del tercer retiro'],
  ];

  return (
    <>
      <Typography
        variant="h6"
        color="primary"
        sx={{ color: 'primary.main', mb: 6, display: { xs: 'none ', md: 'block' }, textAlign: 'center' }}
      >
        TÉRMINOS Y CONDICIONES – BILLETERA YIRO- PERÚ
      </Typography>

      <Stack spacing={2} sx={{ px: { xs: 2, md: 0 }, textAlign: 'justify', mb: { xs: 10, md: 0 } }}>
        <Typography paragraph>
          <strong>Última Actualización:</strong> Octubre 2024
        </Typography>

        <Typography paragraph>
          El presente documento contiene los Términos y Condiciones (en adelante, los &quot;Términos y
          Condiciones&quot;) aplicables a la billetera digital &quot;Yiro&quot; (en adelante, &quot;Yiro&quot; y/o
          &quot;Billetera&quot; y/o &quot;billetera digital&quot;) a la que se tendrá acceso en el URL:{' '}
          <Link href="http://www.somosbelcorp.com/" target="_blank" rel="noopener">
            www.somosbelcorp.com
          </Link>{' '}
          (en adelante y en App &quot;Esika Conmigo&quot;, a los que se les podrá denominar de manera conjunta como
          &quot;los Activos Digitales&quot;.
        </Typography>

        <Typography paragraph>
          El acceso y/o utilización de Yiro dentro de los Activos Digitales y/o de sus servicios constituye la
          aceptación de los presentes Términos y Condiciones.
        </Typography>

        <Typography variant="subtitle1">I. INFORMACIÓN GENERAL</Typography>

        <Typography paragraph>
          Este documento describe los Términos y Condiciones aplicables al acceso y uso de Yiro, propiedad de Ventura
          International Limited, empresa domiciliada en Estados Unidos e identificada con EIN N° 47-087-5832 (en
          adelante, &quot;VENTURA&quot;), y a los servicios de billetera proveídos a través de éste por parte de Cetco
          S.A., identificada con RUC N° 20100123763, domiciliada en Av. Pardo y Aliaga N° 652, interior 1001, distrito
          de San Isidro, provincia y departamento de Lima, Perú (en adelante, &quot;LA EMPRESA&quot;).
        </Typography>

        <Typography paragraph>
          LA EMPRESA provee el acceso a los servicios de Yiro permitiendo ordenar transferencias y pagos con cargo a la
          cuenta de dinero electrónico (en adelante, &quot;La Cuenta&quot;), provista por Servitebca Perú, Servicio de
          Transferencia Electrónica de Beneficios y Pagos S.A. (en adelante, &quot;TEBCA&quot;), empresa emisora de
          dinero electrónico, debidamente autorizada y supervisada por la Superintendencia de Banca, Seguros y AFP. La
          Cuenta se encontrará asociada a la Billetera, a través del registro del soporte que permite su uso (tarjetas
          prepago).
        </Typography>

        <Typography paragraph>
          Para los servicios de Yiro, cualquier persona registrada como consultor(a) de belleza independiente (en
          adelante, &quot;Consultora o las &quot;Consultoras&quot;, indistintamente) que desee acceder y/o utilizar los
          servicios de Yiro, deberá hacerlo a través del proceso de registro para el acceso a la billetera digital y la
          Cuenta, el cual implicará un proceso de onboarding que, de ser aprobado satisfactoriamente de conformidad con
          los requisitos establecidos en la regulación aplicable, dará derecho a la contratación y apertura de una
          cuenta de dinero electrónico y a la emisión del soporte asociado (en adelante, el &quot;Usuario&quot; o los
          &quot;Usuarios&quot;). Una vez registrados, los Usuarios podrán acceder y/o utilizar los servicios de la
          billetera Yiro.
        </Typography>

        <Typography paragraph>
          En el procedimiento de registro, las Consultoras deberán haber leído y aceptado expresamente los Términos y
          Condiciones, que se rigen por los términos y condiciones que constan seguidamente y por los términos y
          condiciones que hayan suscrito con TEBCA en mérito al Contrato de Cuenta General de Dinero Electrónico Persona
          Natural, incluyendo sus respectivos anexos, junto con todas las demás políticas, guías, lineamientos y
          principios que rigen y que son incorporados a los Activos Digitales directamente o por referencia o que son
          explicados y/o detallados en otras secciones de los mismos.
        </Typography>

        <Typography paragraph>
          LA EMPRESA garantiza que la información que provee directamente o en coordinación con TEBCA sobre las
          características, condiciones y exigencias aplicables a Yiro, la cuenta de dinero electrónico y su respectivo
          soporte (tarjeta prepago) será oportuna, suficiente, veraz, apropiada y de fácil acceso al Usuario.
        </Typography>

        <Typography paragraph>
          En consecuencia, todas las visitas, interacciones, actividades u operaciones que los Usuarios realicen en
          Yiro, así como sus efectos jurídicos, quedarán regidos por estas reglas y sometidos a la legislación aplicable
          en Perú.
        </Typography>

        <Typography paragraph>
          Los Usuarios que no acepten estos Términos y Condiciones, los cuales tienen un carácter obligatorio y
          vinculante, deberán abstenerse y/o no podrán utilizar los servicios de la billetera Yiro.
        </Typography>

        <Typography paragraph>
          LA EMPRESA declara no encontrarse sujeta a la supervisión de la Superintendencia de Banca, Seguros y AFP, la
          Superintendencia de Mercado de Valores o cualquier otra entidad u organismo distinto al Banco Central de
          Reserva del Perú (en adelante, el &quot;BCRP&quot;) que tenga competencia en materias financieras o del
          mercado de valores. Los servicios de billetera digital Yiro que provee LA EMPRESA a través de los Activos
          Digitales no se encuentran regulados ni sujetos a la fiscalización de ninguna de las autoridades antes
          señaladas, con excepción del BCRP.
        </Typography>

        <Typography variant="subtitle1">1. DEFINICIONES</Typography>

        <Typography paragraph>
          <strong>Activos Digitales:</strong> Programas y/o aplicaciones web en los que se encontrará alojada la
          billetera Yiro, que comprenden al URL:{' '}
          <Link href="http://www.somosbelcorp.com/" target="_blank" rel="noopener">
            www.somosbelcorp.com
          </Link>{' '}
          (&quot;Somos Belcorp&quot;) y al App &quot;Esika Conmigo&quot;.
        </Typography>

        <Typography paragraph>
          <strong>Código de Operación (OTP):</strong> Secuencia de dígitos de uso único que se enviará mediante SMS, y
          será requerido como factor de autenticación para el registro y para la aprobación de ciertas operaciones.
        </Typography>

        <Typography paragraph>
          <strong> Clave Personal:</strong> Secuencia de seis (6) dígitos numéricos que sustituye, con la misma validez,
          la firma gráfica o manuscrita del Usuario, y que será requerida como dispositivo de seguridad para ingresar a
          Yiro, acceder a la Cuenta, y así instruir operaciones con la Tarjeta, con cargo a dicha Cuenta.
        </Typography>

        <Typography paragraph>
          <strong>Consultora(s):</strong> Es toda persona natural consultora de belleza independiente registrada como
          tal en los Activos Digitales.
        </Typography>

        <Typography paragraph>
          <strong>Cuenta:</strong> Cuenta de dinero electrónico del Usuario de Yiro, administrada por TEBCA, y
          habilitada a los Usuarios a través de Yiro una vez completado el proceso de registro de la billetera en los
          Activos Digitales. Tiene la definición de &quot;Cuenta&quot; en el Contrato de Cuenta General de Dinero
          Electrónico Persona Natural celebrado entre el Usuario y TEBCA.
        </Typography>

        <Typography paragraph>
          <strong>Datos Personales del Usuario:</strong> Toda información sobre el Usuario que lo identifica o la hace
          identificable a través de medios que pueden ser razonablemente utilizados.
        </Typography>

        <Typography paragraph>
          <strong>Política de Privacidad:</strong> Política de Privacidad – Billetera Yiro – Perú que describe el
          tratamiento que LA EMPRESA realizará respecto de la información que califique como Datos Personales del
          Usuario.
        </Typography>

        <Typography paragraph>
          <strong>Servicio(s):</strong> Son todos los servicios ofrecidos a través de Yiro, incluyendo la habilitación a
          través de los Activos Digitales de la billetera que le permite asociar la Tarjeta e instruir órdenes de pagos
          y transferencias con cargo a la Cuenta, entre otras funcionalidades que puedan ser posteriormente habilitadas
          por LA EMPRESA.
        </Typography>

        <Typography paragraph>
          <strong>Tarjeta:</strong> Es una Tarjeta Prepago marca Visa magnetizada y numerada (electrónica y/o física),
          para uso exclusivo personal e intransferible del Usuario, y que cuenta con elementos electrónicos y/o
          digitales que identifican a su titular como tal. La Tarjeta emitida a solicitud de LA EMPRESA y en favor del
          Usuario constituye el soporte para el uso del dinero electrónico acreditado en la Cuenta. La Tarjeta no
          constituye una tarjeta de débito, una tarjeta de crédito o algún otro tipo de tarjeta bancaria y se rige por
          las disposiciones contenidas en el Contrato de Cuenta General de Dinero Electrónico Persona Natural celebrado
          entre el Usuario y TEBCA y el marco normativo aplicable a dicho servicio.
        </Typography>

        <Typography paragraph>
          <strong> Términos y Condiciones:</strong> Tiene el significado que se le atribuye en la introducción de este
          documento.
        </Typography>

        <Typography paragraph>
          Usuario(s): Es toda Consultora activa que ha culminado satisfactoriamente el proceso de registro en los
          Activos Digitales que alojan Yiro.
        </Typography>

        <Typography paragraph>
          <strong>Yiro:</strong> Es la billetera digital propiedad de LA EMPRESA. que se encuentra a disposición de las
          Consultoras mediante los Activos Digitales.
        </Typography>

        <Typography variant="subtitle1">2. CAPACIDAD LEGAL</Typography>

        <Typography paragraph>
          Los Servicios sólo están disponibles para personas naturales mayores de edad, que tengan capacidad legal para
          contratar y que no estén impedidos o suspendidos legalmente para hacerlo, ni que hayan sido inhabilitados por
          LA EMPRESA. En tal sentido, a través de la aceptación de los Términos y Condiciones, el potencial Usuario
          reconoce que se encuentra plenamente facultado para asumir las obligaciones y compromisos que se produzcan
          como consecuencia de la utilización de Yiro, las que se entenderán plenamente vinculantes.
        </Typography>

        <Typography paragraph>
          Asimismo, el Usuario asumirá la responsabilidad total y eximirá de toda responsabilidad a LA EMPRESA, VENTURA
          y TEBCA por el uso indebido del Servicio, incluyendo en lo que respecta a la utilización de una Tarjeta sin la
          debida autorización.
        </Typography>

        <Typography paragraph>
          El Usuario únicamente podrá utilizar Yiro para las operaciones, actividades e interacciones habilitadas en los
          Activos Digitales, por lo que se obliga a abstenerse de utilizar la misma con fines ilícitos, contrarios y/o
          distintos a lo establecido en estos Términos y Condiciones, que sean lesivos de derechos o de intereses de
          terceros o que de cualquier forma puedan atentar contra el buen funcionamiento de Yiro y/o los Activos
          Digitales y/o la reputación de LA EMPRESA. El Usuario reconoce y declara que, en caso de detectar conductas
          como las antes mencionadas, que incluyen, sin que la lista resulte limitativa, actos tales como provisión de
          información falsa, incompleta y/o inexacta, fraude, estafa, operaciones inusuales y/o sospechosas, acoso,
          hostigamiento, extorsión y/o agresión; TEBCA, en mérito del Contrato de Cuenta General de Dinero Electrónico
          Persona Natural se reserva el derecho de bloquear temporalmente la Cuenta del Usuario. Además, LA EMPRESA
          podrá imposibilitar que el Usuario que haya cometido dichas conductas pueda afiliarse a Yiro en el futuro.
        </Typography>

        <Typography variant="subtitle1">3. DESCRIPCIÓN GENERAL DE YIRO</Typography>
        <Typography paragraph>
          Yiro es una billetera digital que se encuentra disponible en los Activos Digitales y que está dirigida
          únicamente a las Consultoras de LA EMPRESA. Una vez que la Consultora haya completado el proceso de registro y
          creado su Cuenta en Yiro, podrá acceder a los Servicios. El Usuario podrá cancelar con carácter temporal o de
          manera definitiva la Cuenta Yiro en cualquier momento ingresando a los Activos Digitales, en la sección de
          configuración de cuenta. Para cualquier asistencia se podrá contactar al Call Center a los siguientes números:
          Lima: 7076080, Provincia: 0800-80-700.es.
        </Typography>

        <Typography variant="subtitle1">4. USO DE LA BILLETERA</Typography>

        <Typography paragraph>
          El Usuario, a efectos de acceder a los Activos Digitales donde se encuentra alojado Yiro, requerirá contar con
          un equipo informático y/o dispositivo electrónico (computadora, tablet, teléfono celular, entre otros) con
          acceso a alguna red de telecomunicaciones (internet) y compatible con las características técnicas requeridas
          por los Activos Digitales. Por tanto, el Usuario declara entender y aceptar que, para el correcto
          funcionamiento y/o acceso a determinados contenidos y/o información y/o funcionalidad de los Activos Digitales
          y, como parte de la propia seguridad del Usuario, LA EMPRESA podrá consultar acerca del estado y las
          condiciones en que el Usuario opera con ellos.
        </Typography>

        <Typography paragraph>
          La aceptación de estos Términos y Condiciones conlleva la habilitación para que el Usuario pueda usar y gozar
          de todos los derechos previstos en este documento, además de aquellos que reconoce la legislación aplicable en
          Perú. De igual manera, involucra asumir y cumplir determinadas obligaciones detalladas en estos Términos y
          Condiciones, por lo que es importante que el Usuario lo lea detenidamente antes de aceptarlo.
        </Typography>

        <Typography variant="subtitle1">4.1 REGISTRO</Typography>

        <Typography paragraph>
          Las Consultoras que deseen registrarse como usuarios de Yiro deberán seguir el siguiente proceso de registro
          para la contratación y apertura de la Cuenta.
        </Typography>

        <Typography paragraph>
          Para efectos de lo anterior, la Consultora deberá completar los siguientes pasos:
        </Typography>

        <List>
          <ListItem>
            <Box sx={{ display: 'flex' }}>
              <Typography variant="body1" sx={{ marginRight: 1 }}>
                (i)
              </Typography>

              <Typography variant="body1">
                Confirmar información personal precargada (puede modificar número de celular o correo electrónico si es
                necesario, tomando en consideración que dicha modificación aplicará también como sus nuevos datos de
                contacto como Consultora);
              </Typography>
            </Box>
          </ListItem>
          <ListItem>
            <Box sx={{ display: 'flex' }}>
              <Typography variant="body1" sx={{ marginRight: 1 }}>
                (ii)
              </Typography>

              <Typography variant="body1">
                Aceptar los presentes Términos y Condiciones y la Política de Privacidad de la Billetera;
              </Typography>
            </Box>
          </ListItem>
          <ListItem>
            <Box sx={{ display: 'flex' }}>
              <Typography variant="body1" sx={{ marginRight: 1 }}>
                (iii)
              </Typography>

              <Typography variant="body1">
                Confirmar su número de celular mediante Código de Operación enviado vía SMS;
              </Typography>
            </Box>
          </ListItem>
          <ListItem>
            <Box sx={{ display: 'flex' }}>
              <Typography variant="body1" sx={{ marginRight: 1 }}>
                (iv)
              </Typography>

              <Typography variant="body1">
                Indicar su ocupación de acuerdo a la lista desplegable. Solo en caso la Consultora tuviese una ocupación
                adicional a ser consultora de belleza independiente, deberá marcar cualquier otra opción que no sea
                &quot;Consultora de Belleza Independiente&quot;;
              </Typography>
            </Box>
          </ListItem>
          <ListItem>
            <Box sx={{ display: 'flex' }}>
              <Typography variant="body1" sx={{ marginRight: 1 }}>
                (v)
              </Typography>

              <Typography variant="body1">
                Indicar si es una persona expuesta políticamente (PEP) de acuerdo a la definición del término contenida
                en el proceso y proveer la información exigida en caso ostente dicha condición;
              </Typography>
            </Box>
          </ListItem>
          <ListItem>
            <Box sx={{ display: 'flex' }}>
              <Typography variant="body1" sx={{ marginRight: 1 }}>
                (vi)
              </Typography>

              <Typography variant="body1">
                Validar su identidad mediante la carga de una foto de su Documento Nacional de Identidad y una foto tipo
                selfie
              </Typography>
            </Box>
          </ListItem>
          <ListItem>
            <Box sx={{ display: 'flex' }}>
              <Typography variant="body1" sx={{ marginRight: 1 }}>
                (vii)
              </Typography>

              <Box>
                <Typography variant="body1">
                  Una vez cargada la información antes indicada, LA EMPRESA realizará una validación de los datos
                  proporcionados. Dicha validación se realizará a través de la plataforma de un proveedor autorizado,
                  conforme a lo establecido expresamente en la Política de Privacidad de LA EMPRESA respecto de los
                  siguientes datos:
                </Typography>
                <List sx={{ listStyleType: 'disc', pl: 2 }}>
                  <ListItem sx={{ display: 'list-item', p: 0 }}>
                    <Typography paragraph>
                      Validación de datos biométricos, respecto del selfie tomado y las fotos del Documento de Identidad
                      cargadas, de acuerdo a la zona geográfica en la que se encuentre la Consultora.
                    </Typography>
                  </ListItem>
                  <ListItem sx={{ display: 'list-item', p: 0 }}>
                    <Typography paragraph>
                      Validación con el Registro Nacional de Identificación y Estado Civil (RENIEC), respecto del
                      registro del Documento de Identidad en dicha entidad, en caso corresponda.
                    </Typography>
                  </ListItem>
                  <ListItem sx={{ display: 'list-item', p: 0 }}>
                    <Typography paragraph>Validación con las siguientes listas PLAFT/PEP’s:</Typography>
                  </ListItem>
                </List>
              </Box>
            </Box>
          </ListItem>
        </List>

        <TableContainer sx={{ px: 1 }}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#b4c6e7' }}>
                {headerRegisters.map((header, index) => (
                  <TableCell
                    key={index}
                    align={(alignments[index] as 'right' | 'left' | 'center' | 'inherit' | 'justify') || 'left'}
                    sx={{ border: '1px solid black' }}
                  >
                    <Typography variant="subtitle1">{header}</Typography>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow sx={{ backgroundColor: '#b4c6e7' }}>
                <TableCell align="center" sx={{ border: '1px solid black' }}>
                  <Typography variant="subtitle1">I</Typography>
                </TableCell>
                <TableCell align="left" sx={{ border: '1px solid black' }}></TableCell>
                <TableCell align="left" sx={{ border: '1px solid black' }}>
                  <Typography variant="subtitle1">LISTAS RESTRICTIVAS INTERNACIONALES</Typography>
                </TableCell>
              </TableRow>
              {internationalRestrictiveList.map((list, rowIndex) => (
                <TableRow key={rowIndex}>
                  {list.map((item, index) => (
                    <TableCell
                      align={(alignments[index] as 'right' | 'left' | 'center' | 'inherit' | 'justify') || 'left'}
                      sx={{ border: '1px solid black' }}
                      key={index}
                    >
                      <Typography variant="body1">{item}</Typography>
                    </TableCell>
                  ))}
                </TableRow>
              ))}
              <TableRow sx={{ backgroundColor: '#b4c6e7' }}>
                <TableCell align="center" sx={{ border: '1px solid black' }}>
                  <Typography variant="subtitle1">II</Typography>
                </TableCell>
                <TableCell align="left" sx={{ border: '1px solid black' }}></TableCell>
                <TableCell align="left" sx={{ border: '1px solid black' }}>
                  <Typography variant="subtitle1">LISTAS RESTRICTIVAS NACIONALES PERU</Typography>
                </TableCell>
              </TableRow>
              {nationalRestrictiveList.map((list, rowIndex) => (
                <TableRow key={rowIndex}>
                  {list.map((item, index) => (
                    <TableCell
                      align={(alignments[index] as 'right' | 'left' | 'center' | 'inherit' | 'justify') || 'left'}
                      sx={{ border: '1px solid black' }}
                      key={index}
                    >
                      <Typography variant="body1">{item}</Typography>
                    </TableCell>
                  ))}
                </TableRow>
              ))}
              <TableRow sx={{ backgroundColor: '#b4c6e7' }}>
                <TableCell align="center" sx={{ border: '1px solid black' }}>
                  <Typography variant="subtitle1">III</Typography>
                </TableCell>
                <TableCell align="left" sx={{ border: '1px solid black' }}></TableCell>
                <TableCell align="left" sx={{ border: '1px solid black' }}>
                  <Typography variant="subtitle1">LISTAS PEPs/PRP</Typography>
                </TableCell>
              </TableRow>
              {pepsList.map((list, rowIndex) => (
                <TableRow key={rowIndex}>
                  {list.map((item, index) => (
                    <TableCell
                      align={(alignments[index] as 'right' | 'left' | 'center' | 'inherit' | 'justify') || 'left'}
                      sx={{ border: '1px solid black' }}
                      key={index}
                    >
                      <Typography variant="body1">{item}</Typography>
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Typography paragraph>
          Al finalizar dicho proceso, la Consultora deberá crear una clave personal, que servirá para acceder a Yiro en
          las siguientes oportunidades. La Consultora se obliga a mantener la confidencialidad de su clave de acceso a
          Yiro, asumiendo totalmente la responsabilidad por el mantenimiento de la confidencialidad de su clave
          registrada, la cual le permite tener acceso a los Servicios de Yiro. Dicha clave es de uso personal, y su
          entrega a terceros no involucra responsabilidad para LA EMPRESA ni para TEBCA, en caso de utilización
          indebida, negligente y/o incorrecta. La Consultora acepta y reconoce que deberá cumplir con las exigencias de
          seguridad adicionales o complementarias establecidas por LA EMPRESA o TEBCA para el acceso a Yiro o a las
          operaciones que desde o hacia Yiro sean realizadas. Las Consultoras deberán asumir y reconocer aquellas
          operaciones que se realicen desde o hacia Yiro que incumplan los mecanismos de seguridad establecidos.
        </Typography>

        <Typography paragraph>
          En caso la Consultora no cumpla con el procedimiento de registro establecido en esta cláusula y/o el correcto
          llenado de la información requerida y/o no cumpla satisfactoriamente con los requisitos internamente
          establecidos por LA EMPRESA para ser Usuario de Yiro, no podrá acceder a los Servicios.
        </Typography>

        <Typography paragraph>
          Todos los pasos deberán ser cumplidos a cabalidad por la Consultora a efectos de culminar satisfactoriamente
          con el procedimiento de registro para convertirse en Usuario de la billetera Yiro. Una vez que la Consultora
          haya sido aceptada como Usuario de Yiro, se le comunicará por medio de correo electrónico que su Cuenta fue
          creada con éxito, y que la Tarjeta asociada a la misma ha sido generada en automático bajo un formato
          electrónico o virtual, por lo que estará habilitado a empezar a utilizar los Servicios.
        </Typography>

        <Typography paragraph>
          En caso las validaciones no fuesen aprobadas, LA EMPRESA podrá solicitar que se subsanen los errores u
          omisiones consignados, en caso corresponda. Adicionalmente, se deja constancia que, LA EMPRESA, podrá rechazar
          las solicitudes de registro, por los siguientes motivos: cuando los datos proporcionados no coincidan con los
          del Documento de Identidad, en caso sea aplicable; cuando los datos biométricos del selfie tomado no coincidan
          con la foto del Documento de Identidad, en caso aplique, cuando las fotos cargadas sean ilegibles o estén en
          mala resolución y que las mismas no permitan ser identificadas y/o por cualquier otro motivo justificado de LA
          EMPRESA, incluyendo aquellos previstos en la regulación aplicable al servicio de dinero electrónico.
        </Typography>

        <Typography paragraph>
          La Consultora, reconoce y acepta (i) que la información que ingresa y/o proporciona a través de los Activos
          Digitales al momento de registrarse y en cualquier otro momento será verdadera, precisa, actual y completa, y
          acepta mantener y actualizar esta información personal cuando sea necesario a través de los canales de Somos
          Belcorp App y Web y (ii) LA EMPRESA siempre podrá solicitarle información adicional y documentación que
          respalde la información proporcionada para efectos de su registro. En tal sentido, una de las causas
          justificadas que denieguen el registro en Yiro será aquella consistente en la provisión de información
          inexacta y/o inconsistente y/o falsa.
        </Typography>

        <Typography variant="subtitle1">4.2 NAVEGACIÓN Y USO DE YIRO</Typography>

        <Typography paragraph>
          Para efectos de la utilización de los Servicios de Yiro, los Usuarios aceptan que: (i) para confirmar los
          movimientos de dinero que se deseen realizar, se podría solicitar el Código de Operación enviado por SMS en
          cada caso al teléfono celular registrado inicialmente, (ii) una vez que el Usuario haya aprobado la operación
          mediante el Código de Operación, se considerará válida, aceptada y efectuada por él, y (iii) las operaciones
          realizadas a través de Yiro pueden demorar entre 0 y 48 horas en procesarse y visualizarse por parte de los
          Usuarios.
        </Typography>

        <Typography paragraph>
          Las transacciones procesadas serán comunicadas al Usuario por correo electrónico en cada caso.
        </Typography>

        <Typography paragraph>
          Además, LA EMPRESA cumple con informar a los Usuarios que, las principales funcionalidades incluidas en Yiro,
          son las siguientes pero que podrán incluirse funcionalidades adicionales, las cuales serán informadas por LA
          EMPRESA oportunamente
        </Typography>

        <List sx={{ listStyleType: 'disc', pl: 3 }}>
          <ListItem sx={{ display: 'list-item', p: 0 }}>
            <Typography variant="subtitle1"> Acceso a Contactos:</Typography>
            <Typography paragraph>
              Yiro tendrá acceso a la agenda de contactos grabada en el teléfono celular del Usuario, a efectos de
              habilitar dicha información en su Billetera, identificar los contactos que mantienen Cuentas creadas con
              el objetivo de facilitar las transferencias entre Usuarios y hacer un correcto seguimiento a las deudas de
              sus clientes. Al hacer uso de esta funcionalidad, el Usuario reconoce que cuenta con la autorización de
              sus contactos para utilizar sus datos personales durante el uso de los Servicios.
            </Typography>
          </ListItem>
          <ListItem sx={{ display: 'list-item', p: 0 }}>
            <Typography variant="subtitle1">Recargas:</Typography>
            <Typography paragraph>
              Esta funcionalidad permite al Usuario convertir dinero en dinero electrónico. El dinero que los Usuarios
              transfieran desde los canales autorizados que se indican seguidamente se convertirá en dinero electrónico
              de manera automática (en tiempo real). Los Usuarios podrán recargar su Cuenta mediante códigos CIP/QR
              provistos por terceros autorizados (ej. Pagoefectivo) para billeteras electrónicas, transferencias, banca
              móvil, banca por internet y agentes. Asimismo, los Usuarios reconocen que LA EMPRESA no asume ninguna
              responsabilidad por errores o demora en el procesamiento de las transferencias a través de estos canales
              como consecuencia de la información consignada por los Usuarios. Los Usuarios declaran que el servicio de
              cobro a terceros que constituye una recarga hacia sus Cuentas puede estar sujeto al pago de comisiones,
              las cuales serán comunicadas a través de los canales oficiales de Yiro y se encuentran detalladas en el
              punto 6de este documento. Finalmente, las solicitudes remitidas en mérito a dicho servicio de cobro pueden
              estar sujetas a limites vigentes y/o que incorpore a futuro LA EMPRESA, según requerimientos y/o
              exigencias que realice Pago Efectivo, las cuales le serán comunicadas vía correo electrónico. Los Usuarios
              reconocen que, cuando el dinero se encuentre cargado a sus Cuentas, no tendrán derecho a solicitar que se
              revierta la operación.
            </Typography>
          </ListItem>
          <ListItem sx={{ display: 'list-item', p: 0 }}>
            <Typography variant="subtitle1">Cobro a clientes:</Typography>
            <Typography paragraph>
              Los Usuarios podrán enviar solicitudes de cobro a terceros mediante códigos CIP/QR de Pagoefectivo para
              pagos con otras billeteras electrónicas, transferencias, pago desde banca móvil, banca por internet y
              agentes en los términos indicados previamente; así como links (enlaces) de cobro que LA EMPRESA facilita a
              los Usuarios a través de un proveedor autorizado (Cybersource) para que los pagos en su favor puedan ser
              realizados con Tarjeta de Crédito y/o Débito de sus clientes. Dichos pagos serán acreditados en la Cuenta
              de manera automática (en tiempo real). Asimismo, los Usuarios reconocen que LA EMPRESA no asume ninguna
              responsabilidad por errores o demora en el procesamiento de los pagos a través de estos canales como
              consecuencia de la información consignada por los Usuarios. Será responsabilidad de los usuarios validar
              los datos de importe y nombre de persona a la que solicitan el cobro antes de realizar cualquier
              transacción. Los Usuarios declaran que el servicio de cobro a terceros puede estar sujeto al pago de
              comisiones, las cuales, de ser aplicables, le serán comunicadas a través de los canales oficiales de Yiro
              y se encuentran detalladas en el punto 6 de este documento.
            </Typography>
            <Typography paragraph>
              Finalmente, las solicitudes remitidas en mérito a dicho servicio de cobro pueden estar sujetas a limites
              adicionales según lo determine Pago Efectivo para pagos con otras billeteras electrónicas, transferencias,
              pago desde banca móvil, banca por internet y agentes; y Links de cobro de Cybersource para pagos con
              Tarjeta de Crédito y/o Débito; las cuales le serán comunicadas vía correo electrónico y se encuentran
              detalladas en el punto de &quot;montos máximos&quot; de este documento. Las transferencias pueden estar
              sujetas a límites de montos máximos aplicables que podrán consultarse en la sección de Preguntas
              Frecuentes
            </Typography>
          </ListItem>
          <ListItem sx={{ display: 'list-item', p: 0 }}>
            <Typography variant="subtitle1"> Retiro de fondos con tarjeta en soporte físico</Typography>
            <Typography paragraph>
              Los Usuarios declaran que el otorgamiento de la Cuenta a su favor involucra la emisión automática de una
              Tarjeta en soporte virtual o electrónico a su favor. La Tarjeta sólo podrá ser utilizada contra el saldo
              disponible en dicha Cuenta para realizar las operaciones indicadas en los presentes Términos y
              Condiciones.
            </Typography>
            <Typography paragraph>
              Asimismo, los Usuarios podrán solicitar y activar una tarjeta en soporte físico de la marca Visa vinculada
              a su Cuenta de Yiro, a través de la cual podrán realizar retiros de los fondos acreditados en su Cuenta a
              través de la red de agentes GlobalNet y la red de agentes asociados a Visa. Los Usuarios declaran que el
              servicio de retiros de fondos puede estar sujeto al pago de comisiones indicadas por cada establecimiento
              y/o Visa, y/o detalladas en la sección 6 de este documento. Asimismo, los Usuarios reconocen que LA
              EMPRESA no asume ninguna responsabilidad por errores o demora en el procesamiento de los retiros a través
              de estos canales.
            </Typography>
          </ListItem>
          <ListItem sx={{ display: 'list-item', p: 0 }}>
            <Typography variant="subtitle1"> Pago de pedido de Venta Directa de LA EMPRESA</Typography>
            <Typography paragraph>
              Los Usuarios podrán realizar el pago de su deuda con LA EMPRESA por la compra de productos de las marcas
              ésika, L’bel y Cyzone mediante la modalidad de Venta Directa. El Usuario es responsable por los pagos que
              realice a través de Yiro debiendo para ello consignar los datos necesarios de manera correcta. LA EMPRESA
              no asumirá responsabilidad por los errores que el Usuario pueda cometer, toda vez que ejecutará las
              instrucciones de pago del Usuario de acuerdo a la información proporcionada por el Usuario. El Usuario
              podrá revisar el detalle de operaciones ejecutadas en la sección de &quot;Últimos Movimientos&quot; de
              Yiro. El monto máximo aplicable podrá consultarse en la sección de Preguntas Frecuentes de Yiro. La
              realización de estas operaciones se encontrará sujetas a las validaciones de seguridad aplicables al
              ingresar a la sección &quot;Pagar: Mi deuda con ésika&quot;.
            </Typography>
          </ListItem>
          <ListItem sx={{ display: 'list-item', p: 0 }}>
            <Typography variant="subtitle1"> Seguimiento de cobros a clientes:</Typography>
            <Typography paragraph>
              Los Usuarios podrán llevar el seguimiento de cobros a sus clientes desde la sección &quot;Gestionar: Mis
              Clientes me deben&quot; de Yiro. En dicha sección, encontrarán el estado en que se encuentra su solicitud:
              (i) si aún no te paga, dirá &quot;Cobro Pendiente&quot;; (ii) si ya pagó, dirá &quot;Cobrado&quot; y verás
              el dinero en tu Cuenta, (iii) si la solicitud está vencida, dirá &quot;Vencido&quot;. Asimismo, los
              Usuarios reconocen que Yiro no asume ninguna responsabilidad por errores como consecuencia de la
              información consignada por los Usuarios con relación a los montos adeudados por sus clientes.
            </Typography>
          </ListItem>
          <ListItem sx={{ display: 'list-item', p: 0 }}>
            <Typography variant="subtitle1"> Pago en establecimientos afiliados de la red Visa</Typography>
            <Typography paragraph>
              Los Usuarios podrán pagar con su tarjeta virtual y/o física en establecimientos físicos y/o digitales
              afiliados a la red Visa a nivel nacional y en el extranjero. LA EMPRESA no asumirá responsabilidad por los
              errores que el Usuario pueda cometer, toda vez que ejecutará las instrucciones de pago de acuerdo a la
              información proporcionada por el Usuario. El Usuario podrá revisar el detalle de operaciones en la sección
              de Últimos Movimientos. El monto máximo aplicable podrá consultarse en la sección de Preguntas Frecuentes
              de Yiro.
            </Typography>
          </ListItem>
          <ListItem sx={{ display: 'list-item', p: 0 }}>
            <Typography variant="subtitle1"> Consulta de saldos y movimientos </Typography>
            <Typography paragraph>
              Los Usuarios podrán visualizar el saldo de su cuenta y los cinco (5) últimos movimientos de entrada y
              salida de dinero en la pantalla principal de Yiro. Asimismo, al dar click en el botón &quot;Ver
              todo&quot;, tendrán acceso al detalle de los movimientos de entrada y salida de dinero efectuados durante
              los últimos tres (3) meses.
            </Typography>
          </ListItem>
          <ListItem sx={{ display: 'list-item', p: 0 }}>
            <Typography variant="subtitle1"> Cambio de Clave Personal</Typography>
            <Typography paragraph>
              Los Usuarios podrán cambiar la Clave Personal de acceso a Yiro en la sección &quot;Cambiar
              Contraseña&quot; dentro del Menú de &quot;Configuración&quot; de Yiro. Para hacer efectivo el cambio, el
              Usuario deberá ingresar su última contraseña y una nueva contraseña de seis (6) dígitos numéricos, la cual
              deberá repetir para confirmar dicho cambio. La realización de estas operaciones se encontrará sujetas a
              las validaciones de seguridad aplicables.
            </Typography>
          </ListItem>
          <ListItem sx={{ display: 'list-item', p: 0 }}>
            <Typography variant="subtitle1"> Solicitud y activación de nueva Tarjeta Física</Typography>
            <Typography paragraph>
              Los Usuarios podrán solicitar una tarjeta en soporte físico desde la sección &quot;¿Ya solicitaste tu
              tarjeta?&quot; dentro del Menú de &quot;Configuración&quot; de Yiro. La tarjeta física solicitada será
              enviada en la caja de pedido de productos de las marcas ésika, L’bel y Cyzone, siguiente a la solicitud.
              Una vez recibida la tarjeta, el Usuario deberá ingresar a la sección &quot;Activa tu tarjeta física&quot;
              dentro del Menú de &quot;Configuración&quot; y escanear el QR impreso en la carta de Bienvenida que se
              encuentra en el sobre junto a la tarjeta. Asimismo, los Usuarios reconocen que Yiro no asume ninguna
              responsabilidad por errores como consecuencia de la información consignada por los Usuarios para la
              entrega de las Tarjetas. Además, los Usuarios declaran que el servicio de reposición de tarjeta puede
              estar sujeto al pago de comisiones, las cuales podrán ser comunicadas a través de los canales oficiales de
              Yiro y se encuentran detalladas en el punto 6 de este documento.
            </Typography>
          </ListItem>
          <ListItem sx={{ display: 'list-item', p: 0 }}>
            <Typography variant="subtitle1"> Bloqueo de la Tarjeta</Typography>
            <Typography paragraph>
              Los Usuarios podrán bloquear su Tarjeta por pérdida, robo o deterioro desde la sección &quot;Configuración
              de tarjeta&quot; dentro del Menú de &quot;Configuración&quot; de Yiro. Asimismo, los Usuarios reconocen
              que Yiro no asume ninguna responsabilidad por errores como consecuencia de la instrucción consignada por
              el Usuario para el bloqueo de la Tarjeta, acción inmediata e irreversible.
            </Typography>
          </ListItem>
        </List>

        <Typography variant="subtitle1">4.3. RESTRICCIÓN DE ACCESOS A CUENTAS</Typography>

        <Typography paragraph>
          TEBCA y/o LA EMPRESA estarán facultadas a bloquear temporalmente la Cuenta de los Usuarios por diferentes
          motivos, entre ellos:
        </Typography>

        <List sx={{ listStyleType: 'disc', pl: 3 }}>
          <ListItem sx={{ display: 'list-item', p: 0 }}>
            <Typography variant="body1">
              Operaciones sospechosas (inusuales, irregulares, etc.) que incumplan la política de lavado de activos de
              TEBCA;
            </Typography>
          </ListItem>
          <ListItem sx={{ display: 'list-item', p: 0 }}>
            <Typography variant="body1">
              Suministro de información inexacta, incompleta o falsa por parte de los Usuarios.{' '}
            </Typography>
          </ListItem>
        </List>

        <Typography paragraph>
          En caso de bloqueo de la Cuenta, ello será informado por escrito a los Usuarios.
        </Typography>

        <Typography variant="subtitle1">4.4. RESOLUCIÓN DE CONTRATO DE DINERO ELECTRÓNICO</Typography>

        <Typography paragraph>
          Por otro lado, TEBCA podrá resolver el Contrato de Cuenta General de Dinero Electrónico Persona Natural por
          los motivos descritos a continuación:
        </Typography>

        <List sx={{ listStyleType: 'disc', pl: 3 }}>
          <ListItem sx={{ display: 'list-item', p: 0 }}>
            <Typography variant="body1">Cuenta inactiva y sin movimientos por un plazo mayor a 6 meses</Typography>
          </ListItem>
          <ListItem sx={{ display: 'list-item', p: 0 }}>
            <Typography variant="body1">Casos de fuerza mayor</Typography>
          </ListItem>
          <ListItem sx={{ display: 'list-item', p: 0 }}>
            <Typography variant="body1">Prevención de lavado de activos y financiamiento del terrorismo</Typography>
          </ListItem>
          <ListItem sx={{ display: 'list-item', p: 0 }}>
            <Typography variant="body1">Suministro de información incorrecta por parte del Usuario</Typography>
          </ListItem>
        </List>

        <Typography paragraph>
          TEBCA y/o LA EMPRESA podrán solicitar información a los Usuarios en cualquier momento a efectos de verificar
          el cumplimiento de lo establecido en los Términos y Condiciones y Contrato de Cuenta General de Dinero
          Electrónico Persona Natural.
        </Typography>

        <Typography variant="subtitle1">5. MONTOS MÁXIMOS</Typography>

        <Typography paragraph>
          Los montos máximos diarios y por transacción de transferencias de fondos, recargas, cobros a clientes, retiros
          de fondos, pago de pedido de Venta Directa de LA EMPRESA, pago en establecimientos afiliados a la red Visa, y
          otras operaciones monetarias, ejecutadas con cargo a la Cuenta asociada Yiro por parte de los Usuarios serán
          los siguientes:
        </Typography>

        <TableContainer sx={{ px: 1 }}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#b4c6e7' }}>
                {headersMaximunAmounts.map((header, index) => (
                  <TableCell key={index} align="left" sx={{ border: '1px solid black' }}>
                    <Typography variant="subtitle1">{header}</Typography>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {maximunAmounts.map((amountlist, rowIndex) => (
                <TableRow key={rowIndex}>
                  {amountlist &&
                    amountlist.map((item, index) => (
                      <TableCell align="left" sx={{ border: '1px solid black' }} key={index}>
                        <Typography variant="body1">{item}</Typography>
                      </TableCell>
                    ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Typography paragraph>
          Cada movimiento de dinero podría solicitar la aprobación por un Código de Operación enviado por SMS. El
          Usuario reconoce que estos montos podrían ser modificados por LA EMPRESA, bastando para ello una previa
          comunicación por escrito (Whatsapp, correo electrónico, SMS, etc) y/o a través de los canales oficiales de
          Yiro.
        </Typography>

        <Typography variant="subtitle1">6. TARIFAS VIGENTES</Typography>

        <TableContainer sx={{ px: 1 }}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#b4c6e7' }}>
                {headerCurrentRates.map((header, index) => (
                  <TableCell key={index} align="left" sx={{ border: '1px solid black' }}>
                    <Typography variant="subtitle1">{header}</Typography>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {currentRates.map((list, rowIndex) => (
                <TableRow key={rowIndex}>
                  {list.map((item, index) => (
                    <TableCell align="left" sx={{ border: '1px solid black' }} key={index}>
                      <Typography variant="body1">{item}</Typography>
                    </TableCell>
                  ))}
                </TableRow>
              ))}
              <TableRow>
                <TableCell align="left" sx={{ border: '1px solid black' }}>
                  <Typography variant="body1">Retiros ATM: Red VISA</Typography>
                </TableCell>
                <TableCell align="left" sx={{ border: '1px solid black' }} colSpan={2}>
                  <Typography variant="body1">Aplican comisiones de la red de agentes donde se retira</Typography>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Typography paragraph>*aplica el tipo de cambio vigente al momento del cobro</Typography>

        <Typography variant="subtitle1">7. SEGURIDAD</Typography>

        <Typography paragraph>
          El Usuario es responsable de la Tarjeta, tanto en su formato electrónico como físico, así como el acceso
          (custodia de Clave Personal) a la Cuenta de Yiro a la que puede ingresar por App y/o Web desde un teléfono
          móvil, tablet o cualquier otro dispositivo electrónico. Toda operación con cargo a la Tarjeta electrónica
          realizada a través de Yiro, con la Clave Personal de la Cuenta y el Código de Operación (OTP) se presumirá
          hecha por el Usuario; y tratándose de la Tarjeta, en su formato físico, de ser aplicable, toda operación
          realizada con ésta y la clave de acceso será imputable a una operación ejecutada por el referido Usuario. La
          clave de acceso y la Clave Personal es administrada únicamente por el Usuario, quien se encargará de
          mantenerla en total reserva y podrá modificarla en cualquier momento. El Usuario será responsable por las
          transacciones que se efectúan, a excepción de las operaciones expresamente establecidas por la legislación
          aplicable donde se exceptúa de responsabilidad al Usuario, salvo que se acredite lo contrario.
        </Typography>

        <Typography variant="subtitle1">8. MODIFICACIONES DE LOS TÉRMINOS Y CONDICIONES</Typography>

        <Typography paragraph>
          LA EMPRESA directamente o, a partir de la negociación realizada con TEBCA, se reserva el derecho a modificar
          los Términos y Condiciones en cualquier momento. Toda modificación será comunicada inmediatamente a los
          Usuarios a través de la actualización de los Activos Digitales, así como mediante comunicaciones directas y
          tendrá efectos frente a terceros relacionadas desde su publicación en la sección de documentos legales de los
          Activos Digitales. Para mayor claridad respecto a la vigencia de este documento, los Usuarios podrán encontrar
          la última fecha de actualización del mismo en la parte superior del presente documento; esto, será informado
          oportunamente al Usuario a través de medios suficientemente idóneos.
        </Typography>
        <Typography paragraph>
          En caso de que, los Usuarios no estén de acuerdo con los Términos y Condiciones actualizados, deberán
          abstenerse de utilizar los Servicios de Yiro y sus actualizaciones, toda vez que la utilización de éstos
          implica una manifestación de voluntad expresa de los Usuarios con los Términos y Condiciones vigentes
        </Typography>
        <Typography paragraph>
          LA EMPRESA se reserva el derecho de modificar, retirar los servicios ofrecidos, de acuerdo con los presentes
          Términos y Condiciones Generales, en cualquier momento y por cualquier motivo.
        </Typography>
        <Typography paragraph>
          En caso de que LA EMPRESA tome la decisión de desactivar Yiro y/o alguno de sus Servicios, LA EMPRESA enviará
          una notificación por escritos a los Usuarios sobre la desactivación de los Servicios a efectos de que inicien
          con el retiro de sus fondos en el plazo que se indicará en dicha notificación. Asimismo, luego de enviada esta
          notificación, no se permitirá el registro de nuevos Usuarios. Posteriormente, LA EMPRESA notificará sobre la
          fecha en la que se realizará el bloqueo de las opciones de recarga de fondos en la Billetera. Po último, LA
          EMPRESA informará a los Usuarios que tengan saldo positivo en su Billetera sobre las alternativas que tendrán
          para disponer de sus fondos luego de la desactivación de Yiro.
        </Typography>

        <Typography variant="subtitle1">9. FORMACIÓN DEL CONSENTIMIENTO</Typography>

        <Typography paragraph>
          La aceptación de los presentes Términos y Condiciones constituye el otorgamiento del consentimiento libre,
          previo, expreso, informado e inequívoco de los Usuarios a la utilización de las diversas funcionalidades de
          Yiro. Por lo tanto, todas las transacciones e interacciones generadas en Yiro serán vinculantes para los
          Usuarios.
        </Typography>

        <Typography variant="subtitle1">10. AUTORIZACIONES EN EL USO DE LA BILLETERA YIRO </Typography>

        <Typography paragraph>
          Dentro de las funcionalidades que brinda la billetera, existen distintos mecanismos de autenticación y/o
          aprobación, los cuales el usuario declara conocer y aceptar como válidos. Algunos ejemplos son los Códigos de
          Operación enviadas por SMS, Clave Personal, clave acceso asociada a la Tarjeta en formato físico,
          verificaciones biométricas, entre otros. Estos mecanismos de validación pueden ser modificados en cualquier
          momento por LA EMPRESA sin previo aviso.
        </Typography>

        <Typography variant="subtitle1">11. DECLARACIÓN JURADA DE ORIGEN DE FONDOS</Typography>

        <Typography paragraph>
          Los Usuarios manifiestan que los fondos y valores con los que opera no provienen ni se vinculan directa o
          indirectamente a ninguna actividad ilícita y declaran bajo juramento que los fondos y valores que se utilizan
          para realizar las operaciones provienen de actividades lícitas.
        </Typography>

        <Typography variant="subtitle1">12. SOPORTE DE CONTACTO</Typography>

        <Typography paragraph>
          El soporte o mecanismo de contacto para formular preguntas, reclamos, sugerencias y realizar cambios o
          devoluciones deberá hacerse al siguiente número de teléfono: 7076080 desde Lima, 0800-80-700 desde provincia
          y/o correo electrónico servicioalcliente@yiro.pe. El Usuario tendrá acceso en Yiro al Libro de Reclamaciones
          virtual, ubicado en la Billetera.
        </Typography>

        <Typography variant="subtitle1">13. PROPIEDAD INTELECTUAL</Typography>

        <Typography paragraph>
          Todo el contenido incluido o puesto a disposición del Usuario en Yiro, incluyendo textos, gráficas, logos,
          íconos, imágenes, archivos de audio, descargas digitales y cualquier otra información (en adelante, el
          &quot;Contenido&quot;), es de propiedad de LA EMPRESA o ha sido licenciada a ésta por terceros. La compilación
          del Contenido es propiedad exclusiva de LA EMPRESA y, en tal sentido, el Usuario y/o Consultor(a) debe
          abstenerse de extraer y/o reutilizar partes del Contenido o realizar cualquier tipo de explotación o
          aprovechamiento del mismo sin el consentimiento previo y expreso de LA EMPRESA.
        </Typography>

        <Typography paragraph>
          Además del Contenido, las marcas, denominativas o figurativas, marcas de servicio, diseños industriales y
          cualquier otro elemento de propiedad intelectual y/o industrial que haga parte del Contenido (en adelante, la
          &quot;Propiedad Intelectual&quot;), son de propiedad de LA EMPRESA y, por tal razón, están protegidas por las
          leyes y los tratados internacionales de derecho de autor, marcas, patentes, modelos y diseños industriales.
        </Typography>

        <Typography paragraph>
          El uso indebido y la reproducción total o parcial de dichos elementos de Propiedad Intelectual quedan
          prohibidos, salvo autorización expresa y por escrito de LA EMPRESA. En ese sentido, el Usuario tiene prohibido
          adquirir dominios web que contengan la marca Yiro o cualquier otro elemento de Propiedad Intelectual de LA
          EMPRESA o cualquier otra empresa del Grupo Belcorp, con independencia de si el mismo se encuentra o no
          inscrito ante el INDECOPI.
        </Typography>

        <Typography variant="subtitle1">14. FALLAS DURANTE EL ACCESO Y/O USO DE YIRO</Typography>

        <Typography paragraph>
          El acceso a Yiro podrá estar temporalmente no disponible, en cualquier momento, en caso de interrupciones
          necesarias en razón del mantenimiento de cualquier índole, o fallas en la operación de los servidores, de las
          empresas proveedoras de energía eléctrica, empresas prestadoras de servicios de telecomunicaciones, casos
          fortuitos, fuerza mayor, o acciones de terceros en los que LA EMPRESA no tenga control.
        </Typography>

        <Typography paragraph>
          Así, si bien Yiro cuenta con los más altos estándares y técnicas razonables sobre seguridad, los mismos que ha
          implementado de manera correcta y realizando sus máximos esfuerzos y diligencia para el acceso y/o uso de las
          funcionalidades; LA EMPRESA no se responsabiliza por cualquier daño, perjuicio o pérdida ocasionados al
          Usuario, derivada de casos fortuitos, de fuerza mayor o hecho determinantes de terceros. En línea con lo
          señalado, LA EMPRESA no se responsabiliza por cualquier daño, perjuicio o pérdida ocasionados al Usuario,
          causados por fallas en el sistema, en el servidor o en el Internet, tampoco será responsable del uso de
          &quot;passwords&quot; o contraseñas y por cualquier virus que haya surgido como consecuencia de un uso
          inadecuado del internet o software(s) por parte del Usuario que pudiera infectar su equipo u ordenador,
          mientras se haya encontrado utilizando Yiro. De darse este supuesto, LA EMPRESA no tendrá ningún tipo de
          responsabilidad sobre la eventual transferencia de datos, archivos, imágenes, textos o audios contenidos en el
          equipo y ordenador del Usuario, de tal manera que no podrá exigirse ningún pago de daños y perjuicios ni
          cualquier tipo de compensación económica resultante de dificultades técnicas o fallas en el Internet que no
          resulten atribuibles a LA EMPRESA.
        </Typography>

        <Typography paragraph>
          Finalmente, LA EMPRESA no garantiza el acceso y uso continuado o ininterrumpido de los Servicios y
          funcionalidades de Yiro. Dado que Yiro opera sobre una infraestructura electrónica de acceso remoto vía
          internet, el acceso permanente a los Activos Digitales no puede ser garantizado y LA EMPRESA no lo asegura, ni
          garantiza. Por lo mismo, si bien LA EMPRESA tiene por política adoptar las medidas tendientes a minimizar
          cualquier mal funcionamiento o funcionamiento discontinuado o irregular de los sistemas que soportan Yiro, LA
          EMPRESA no asume obligación ni responsabilidad alguna por cualquier interrupción o desperfecto en su
          funcionamiento, problemas de conexión, falta de cobertura o cobertura intermitente, sea cual fuere su causa.
        </Typography>

        <Typography variant="subtitle1">15. INDEMNIDAD</Typography>

        <Typography paragraph>
          Los Usuarios indemnizarán y mantendrán indemne a LA EMPRESA sus filiales, empresas controladas y/o
          controlantes, directivos, administradores, representantes y empleados, por su incumplimiento en los Términos y
          Condiciones y demás políticas, lineamientos y principios que se entienden incorporadas al presente o por la
          violación de cualesquiera leyes o derechos de terceros.
        </Typography>

        <Typography variant="subtitle1">16. NATURALEZA JURÍDICA</Typography>

        <Typography paragraph>
          Estos Términos y Condiciones son de naturaleza comercial. No originan subordinación, dependencia, ni relación
          alguna de carácter laboral entre los Usuarios y LA EMPRESA. Cada una de las partes asume sus propios riesgos
          comerciales y la totalidad de los costos que implique la utilización de Yiro, si existiesen. Le está prohibido
          a los Usuarios presentarse ante terceros como trabajador, apoderado o dependiente de LA EMPRESA o incluir en
          su documentación mención alguna que lo haga aparecer en dicha calidad.
        </Typography>

        <Typography paragraph>
          Este acuerdo comercial tampoco constituye entre las partes ningún tipo de sociedad, joint venture, consorcio,
          agencia, mandato o representación.
        </Typography>

        <Typography variant="subtitle1">17. LEY APLICABLE</Typography>

        <Typography paragraph>
          Estos Términos y Condiciones serán interpretados de acuerdo con las leyes de Perú, sin dar efecto a cualquier
          principio de conflictos de ley. Si alguna disposición de estos Términos y Condiciones es declarada ilegal, o
          presenta un vacío, o por cualquier razón resulta inaplicable, la misma deberá ser interpretada dentro del
          marco del mismo y en cualquier caso no afectará la validez y la aplicabilidad de las provisiones restantes.
        </Typography>

        <Typography variant="subtitle1">18. JURISDICCIÓN </Typography>

        <Typography paragraph>
          Cualquier controversia derivada del presente acuerdo, su existencia, validez, interpretación, alcance o
          cumplimiento, será sometida a los Jueces y Tribunales competentes de Cercado de Lima, para lo cual los
          Usuarios y/o Consultoras renuncian al fuero de sus domicilios.
        </Typography>
      </Stack>
    </>
  );
}
