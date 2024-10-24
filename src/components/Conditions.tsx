import { List, ListItem, Typography } from '@mui/material';

/**
 *
 * Component used to display the conditions of service and as a webview in the mobile application
 */
export default function Conditions() {
  return (
    <>
      <Typography variant="h6" align="center" sx={{ mb: 3 }}>
        CONTRATO DE CUENTA GENERAL DE DINERO ELECTRÓNICO PERSONA NATURAL
      </Typography>
      <Typography paragraph>
        Servitebca Perú, Servicio de Transferencia Electrónica de Beneficios y Pagos S.A. &#40;en adelante,
        “SERVITEBCA”&#41; y el Cliente celebran un contrato, aprobado por medio de la resolución SBS 3002- 2018 por el
        cual se regulan los términos y condiciones aplicables a la cuenta general de dinero electrónico de persona
        natural
      </Typography>
      <Typography variant="subtitle1">PRIMERA. DEFINICIONES:</Typography>
      <Typography paragraph>
        Cliente: persona natural titular de la cuenta general de dinero electrónico abierta en SERVITEBCA
      </Typography>
      <Typography paragraph>Cuenta: cuenta general de dinero electrónico, cuya titularidad es del CLIENTEA</Typography>
      <Typography paragraph>
        Dinero Electrónico: valor monetario almacenado en soportes electrónicos &#40;tales como tarjetas electrónicas
        prepago&#41; diseñados para atender usos generales.
      </Typography>
      <Typography paragraph>
        Emisión: la conversión de dinero electrónico por el mismo valor que se recibe, a través de su almacenamiento en
        un soporte electrónico; incluye la emisión propiamente dicho, la reconversión a efectivo &#40;retiros&#41;,
        transferencias, pagos y cualquier otro movimiento o transacción vinculado al valor monetario almacenado en el
        soporte electrónico.
      </Typography>
      <Typography paragraph>
        Empresa: empresa que ha suscrito un contrato de servicios con SERVITEBCA para que le provea los servicios de
        emisión, gestión y procesamiento de tarjetas electrónica recargables. La Empresa solicita la emisión de las
        Tarjetas y podrá también realizar recargas &#40;conversión&#41; a las mismas.
      </Typography>
      <Typography paragraph>
        Tarjeta: tarjeta electrónica que será entregada por SERVITEBCA al CLIENTE para que éste pueda realizar
        operaciones y acceder a servicios que SERVITEBCA le ofrezca, con cargo al saldo en la Cuenta, para lo cual
        utilizará la Clave Secreta que le será proporcionada conjuntamente con la Tarjeta.
      </Typography>
      <Typography paragraph>
        <strong>SEGUNDA. OBJETO:</strong> Mediante el presente contrato las partes acuerdan que SERVITEBCA brindará el
        servicio de dinero electrónico al CLIENTE, a través de una Cuenta cuyo soporte electrónico será la Tarjeta. La
        Tarjeta podrá ser utilizada a nivel nacional e internacional.
      </Typography>
      <Typography paragraph>
        <strong>TERCERA. CONDICIÓN PARA LA PRESTACIÓN DEL SERVICIO:</strong> Para que EL CLIENTE pueda obtener la
        Tarjeta, la Empresa debe haber firmado un contrato de servicios con SERVITEBCA y haber ordenado su emisión a
        favor del CLIENTE. Para ser titular de la Tarjeta, el CLIENTE debe ser mayor de edad y haber completado los
        datos de identificación requeridos por SERVITEBCA.
      </Typography>
      <Typography variant="subtitle1">
        CUARTA. CARACTERÍSTICAS Y CONDICIONES DE LAS OPERACIONES, LÍMITES Y RESTRICCIONES:
      </Typography>
      <Typography paragraph>4.1 Operaciones</Typography>
      <List sx={{ listStyleType: 'lower-alpha', pl: 2 }}>
        <ListItem sx={{ display: 'list-item', p: 0 }}>
          <Typography paragraph>
            Recargas &#40;o conversión&#41;: La Tarjeta admite recargas de la Empresa y del CLIENTE.
          </Typography>
        </ListItem>
        <ListItem sx={{ display: 'list-item', p: 0 }}>
          <Typography paragraph>
            Retiros de efectivo &#40;o reconversión&#41;: EL CLIENTE podrá realizar retiros de efectivo a través de
            todos los cajeros automáticos a nivel nacional y en el exterior. Los retiros podrán hacerse en cualquier
            moneda, en cuyo caso estarán sujetos al tipo de cambio.
          </Typography>
        </ListItem>
        <ListItem sx={{ display: 'list-item', p: 0 }}>
          <Typography paragraph>
            Consumos: EL CLIENTE podrá realizar consumos para el pago de bienes y/o servicios en los establecimientos
            afiliados a las marcas Visa, según corresponda a la Tarjeta. El valor del consumo será debitado de la Cuenta
            y se indicará en el voucher. Asimismo, el CLIENTE podrá realizar consumos en páginas web, locales e
            internacionales. En cualquier caso, los consumos podrán efectuarse en cualquier moneda, en cuyo caso estarán
            sujetos al tipo de cambio.
          </Typography>
        </ListItem>
        <ListItem sx={{ display: 'list-item', p: 0 }}>
          <Typography paragraph>
            Consultas de saldos y movimientos: El CLIENTE podrá efectuar consultas de saldos y movimientos por
            &#40;i&#41; Acceso a billetera Yiro desde el App/Web de Somos &#40;ii&#41; Centro de Contacto de Yiro, a
            través de los canales que serán debidamente informados a los usuarios &#40;en adelante el “Centro de
            Contacto”&#41;, &#40;iii&#41; Cualquier otro canal que sea comunicado.
          </Typography>
        </ListItem>
      </List>
      <Typography paragraph>
        El CLIENTE podrá encontrar el detalle de las instrucciones para efectuar operaciones con la Tarjeta a través los
        canales de comunicación establecidos para Yiro.
      </Typography>
      <Typography paragraph>
        4.2. Límites y Restricciones Las operaciones que realice el CLIENTE con la Tarjeta estarán sujetas a los límites
        transaccionales cuyo detalle se encuentra en los Términos y Condiciones aceptados por el CLIENTE al abrir la
        cuenta y en Yiro desde el App/Web de SomosBelcorp.
      </Typography>
      <Typography paragraph>
        <strong>QUINTA. CONDICIONES DE USO DE LA TARJETA:</strong> La Tarjeta será magnetizada y numerada y vendrá en un
        sobre cerrado y sellado el cual también contendrá las condiciones de uso de la Tarjeta. Con la Tarjeta, el
        CLIENTE podrá realizar transacciones, en Soles y Dólares de los Estados Unidos de América, en el Perú y en el
        extranjero. La Tarjeta es prepago por lo que el uso de la misma estará condicionado a que la Cuenta tenga saldo
        disponible. El CLIENTE asume plena responsabilidad por el resguardo y mal uso de la Tarjeta, así como por la
        pérdida o hurto de la misma, debiendo informar inmediatamente a SERVITEBCA por los medios definidos en el
        presente Contrato.
      </Typography>
      <Typography paragraph>
        <strong>SEXTA. CLAVE SECRETA:</strong> Junto con la Tarjeta, SERVITEBCA entregará a EL CLIENTE una clave secreta
        &#40;en adelante, la “Clave”&#41;. Dicha Clave será la única que podrá ser utilizada por EL CLIENTE para
        realizar consumos en establecimientos afiliados a la red de Visa, según corresponda a la Tarjeta, así como para
        efectuar disposiciones de efectivo en cajeros automáticos. El CLIENTE asume responsabilidad por mantener en
        reserva y no divulgar las claves, ya que todas las transacciones realizadas mediante el uso de éstas serán
        consideradas como válidamente efectuadas por EL CLIENTE.
      </Typography>
      <Typography variant="subtitle1">SÉTIMA. BLOQUEO DE TARJETAS:</Typography>
      <List sx={{ listStyleType: 'upper-alpha', pl: 2 }}>
        <ListItem sx={{ display: 'list-item', p: 0 }}>
          <Typography variant="subtitle1">POR HURTO, ROBO, EXTRAVIO DE TARJETA O PERDIDA DE CLAVE SECRETA</Typography>
          <Typography paragraph>
            7.1. EL CLIENTE deberá bloquear la Cuenta en caso de hurto, robo o extravío de la Tarjeta o Clave, o en caso
            de que un tercero no autorizado tome conocimiento de cualquiera de las Claves, inmediatamente después de que
            ocurra cualquiera de estos hechos. EL CLIENTE podrá bloquear la Cuenta ingresando a Yiro desde el App/Web de
            Somos Belcorp, llamando al Centro de Contacto o a través de otros canales que se pondrán a su disposición y
            que le serán oportunamente informados. EL CLIENTE será responsable por las transacciones realizadas con la
            Tarjeta en tanto SERVITEBCA no haya recibido la respectiva solicitud de bloqueo.
          </Typography>
          <Typography paragraph>
            7.2. En caso exista saldo remanente en la Cuenta bloqueada:
            <br /> &#40;i&#41; EL CLIENTE deberá solicitar la reposición de la Tarjeta, previo pago de la comisión
            respectiva, según el Tarifario vigente, el cual también se encuentra en los Términos y Condiciones, los
            cuales 1 Ver Nota al pie anterior. estarán a disposición del cliente al ingresar a Yiro desde el App/Web de
            SomosBelcorp. El saldo se trasladará a la nueva Tarjeta. <br />
            &#40;ii&#41; En caso El CLIENTE no desee la reposición de la Tarjeta, podrá solicitar el reembolso del saldo
            disponible en la Tarjeta bloqueada, para lo cual deberá comunicarse con el Centro de Contacto para que le
            informe los mecanismos para la devolución. Dichos mecanismos para devolución del saldo remanente incluyen,
            según se determine, la entrega de dinero en efectivo o cheque.
          </Typography>
        </ListItem>
        <ListItem sx={{ display: 'list-item', p: 0 }}>
          <Typography variant="subtitle1">POR OTROS MOTIVOS</Typography>
          <Typography paragraph>
            7.3. El CLIENTE podrá bloquear temporalmente la Cuenta directamente a través del App o a través del Centro
            de Contacto. Para activar la Cuenta nuevamente, podrá hacerlo a través del App o del Centro de Contacto, en
            cuyo caso deberá pasar la validación positiva.
          </Typography>
          <Typography paragraph>
            7.4. El CLIENTE podrá bloquear definitivamente la Cuenta, directamente a través del App o a través del
            Centro de Contacto. De contar con saldo disponible y no solicitar la reposición de la Tarjeta, EL CLIENTE
            deberá solicitar al Centro de Contacto la devolución. SERVITEBCA informará los mecanismos para la devolución
            &#40;entrega en efectivo o cheque&#41;, la cual se llevará a cabo en la oficina de SERVITEBCA.
          </Typography>
        </ListItem>
        <ListItem sx={{ display: 'list-item', p: 0 }}>
          <Typography variant="subtitle1">POR PARTE DE SERVITEBCA</Typography>
          <Typography paragraph>
            7.5. SERVITEBCA podrá bloquear temporalmente la Cuenta por mandato de autoridad competente o cuando tenga
            indicios de operaciones fraudulentas, inusuales, irregulares, ilícitas o sospechosas, incumpliendo la
            política de lavado de activos de SERVITEBCA de acuerdo con la ley de la materia o cuando el CLIENTE hubiera
            suministrado información inexacta, incompleta o falsa. En estos supuestos, SERVITEBCA le informará al
            CLIENTE de la medida adoptada mediante los canales de comunicación de la billetera Yiro,
          </Typography>
        </ListItem>
      </List>
      <Typography paragraph>
        <strong>OCTAVA. EXCLUSIÓN DE RESPONSABILIDAD:</strong> EL CLIENTE no será responsable de pérdidas en casos de
        clonación de la Tarjeta, suplantación del usuario en las oficinas de SERVITEBCA o funcionamiento defectuoso de
        los canales o sistemas puestos a disposición de EL CLIENTE para efectuar sus operaciones.
      </Typography>
      <Typography paragraph>
        <strong>NOVENA. PLAZO:</strong> El presente Contrato es de plazo indeterminado.
      </Typography>
      <Typography paragraph>
        <strong>DÉCIMA. RESOLUCIÓN:</strong> SERVITEBCA podrá resolver el presente Contrato en cualquiera de los
        siguientes supuestos:
      </Typography>
      <Typography paragraph>
        a&#41; Si la Cuenta se mantuviera inactiva &#40;sin movimientos&#41; por un plazo igual o mayor a seis
        &#40;6&#41; meses;
      </Typography>
      <Typography paragraph>b&#41; Caso fortuito o fuerza mayor;</Typography>
      <Typography paragraph>
        c&#41; Cuando se trate de la aplicación de normas prudenciales emitidas por la Superintendencia de Banca,
        Seguros y Administradoras de Fondos de Pensiones, tales como aquéllas vinculadas a la prevención de lavado de
        activos y financiamiento del terrorismo;
      </Typography>
      <Typography paragraph>
        d&#41; Por suministro de información falsa, incompleta o insuficiente por parte de EL CLIENTE;
      </Typography>
      <Typography paragraph>
        e&#41; Si mantener el Contrato vigente incumple las políticas de SERVITEBCA o de alguna disposición legal.
      </Typography>
      <Typography paragraph>
        En los supuestos descritos en los literales c&#41; y d&#41;, la comunicación respecto a la resolución del
        Contrato o bloqueo de la Cuenta se realizará dentro de los siete &#40;07&#41; días calendarios posteriores de
        adoptada la medida. En los demás supuestos, SERVITEBCA informará al CLIENTE de la decisión de resolver el
        Contrato con tres &#40;3&#41; días hábiles de anticipación.
      </Typography>
      <Typography paragraph>
        Una vez resuelto definitivamente el Contrato, EL CLIENTE únicamente podrá obtener el reembolso de los fondos
        disponibles en la Tarjeta previa comunicación con el Centro de Contacto para que le informe los mecanismos para
        la devolución.
      </Typography>
      <Typography paragraph>
        <strong>UNDÉCIMA. TARIFAS DE SERVICIOS:</strong> Los servicios objeto de este Contrato estarán sujetos a las
        comisiones y gastos que se indican en el Tarifario que será entregado al CLIENTE conjuntamente con el presente
        Contrato y que forma parte del mismo. EL CLIENTE autoriza expresamente a SERVITEBCA a compensar con los saldos
        disponibles en la Cuenta, cualquier costo, total o parcial, que se encuentre pactado en el presente Contrato. EL
        CLIENTE acepta que SERVITEBCA podrá rechazar las operaciones realizadas cuando la Cuenta no tenga saldo
        disponible para cubrir el pago de las comisiones y/o gastos, de acuerdo al presente Contrato. Si el saldo fuera
        insuficiente para cobrarse del mismo las comisiones/gastos en un plazo igual o mayor a seis &#40;6&#41; meses,
        EL CLIENTE autoriza expresamente a SERVITEBCA a resolver el Contrato y cancelar la Tarjeta.
      </Typography>
      <Typography paragraph>
        <strong>DUODÉCIMA. OBLIGACIONES DE SERVITEBCA:</strong> SERVITEBCA tendrá las siguientes obligaciones: 12.1.
        Proveer la Tarjeta a EL CLIENTE, según la presentación física y condiciones técnicas que SERVITEBCA considere
        necesarias para la prestación del servicio. 12.2. Permitir el uso de la Tarjeta para los fines establecidos en
        este Contrato, hasta el saldo disponible en la Cuenta. 12.3. Poner a disposición de EL CLIENTE un sistema de
        consulta de movimientos, consulta de saldos y de información sobre la Cuenta.
      </Typography>
      <Typography paragraph>
        <strong>DÉCIMO TERCERA. OBLIGACIONES DE EL CLIENTE:</strong> EL CLIENTE tendrá las siguientes obligaciones:
        13.1. Pagar las comisiones y/o gastos establecidos en el Tarifario vigente. 13.2. Bloquearoportunamente la
        tarjeta &#40;física y/o virtual&#41; ingresando a la sección Configuración de Yiro desde el App /Web de Somos
        Belcorp, en caso de hurto, robo o extravío de la Tarjeta o en caso un tercero tome conocimiento de la Clave,
        13.3. Actualizar constantemente sus datos desde el App /Web de Somos Belcorp, canal que podrá ser modificado
        mediante una comunicación l EL CLIENTE.
      </Typography>
      <Typography paragraph>
        <strong>DÉCIMO CUARTA. COMUNICACIONES:</strong> SERVITEBCA se reserva el derecho de modificar las condiciones
        contractuales, incluyendo comisiones y gastos, en cuyo caso informará previamente al CLIENTE dentro de los
        plazos y por los medios establecidos en el presente Contrato. Las comunicaciones que informen sobre
        modificaciones a las comisiones y/o gastos, resolución del Contrato, limitación o exoneración de responsabilidad
        por parte de SERVITEBCA así como la incorporación de servicios no relacionados directamente al servicio objeto
        del Contrato, serán enviadas al CLIENTE a través de cualquiera de los siguientes medios: &#40;i&#41; correos
        electrónicos, &#40;ii&#41; llamadas telefónicas o &#40;iii&#41; comunicaciones al domicilio. Dichas
        comunicaciones se enviarán con cuarenta y cinco &#40;45&#41; días de anticipación a su entrada en vigencia.
        Modificaciones contractuales distintas a las antes indicadas, serán informadas, con cuarenta y cinco
        &#40;45&#41; días de anticipación a su entrada en vigencia, a través de cualquiera de los siguientes medios:
        &#40;i&#41; ingresando a la billetera Yiro desde el App/Web de SomosBelcorp&#41;, o &#40;ii&#41; correos
        electrónicos y en general, cualquier otro medio electrónico que se disponga. En caso EL CLIENTE no estuviera de
        acuerdo con las modificaciones, podrá resolver el Contrato dentro de los plazos antes indicados. SERVITEBCA
        enviará a través de los canales dispuestos las comunicaciones directas según los datos consignados por EL
        CLIENTE, por lo que el CLIENTE se obliga a notificar a través de estos canales, cualquier cambio de los datos
        proporcionados
      </Typography>
      <Typography paragraph>
        EL CLIENTE podrá consultar sobre los servicios y procedimientos de SERVITEBCA a través de los siguientes canales
        de atención: &#40;i&#41; ingresando a la billetera Yiro desde el App/Web de SomosBelcorp &#40;ii&#41; Centro de
        Contacto, y cualquier otro que sea puesto ponga a su disposición
      </Typography>
      <Typography paragraph>
        Asimismo, EL CLIENTE podrá dirigir cualquier reclamo al Centro de Contacto vía llamada telefónica, Whatsapp y el
        correo electrónico autorizados.
      </Typography>
      <Typography paragraph>
        <strong>DÉCIMO QUINTA. AUTORIZACIÓN:</strong> EL CLIENTE expresamente faculta a SERVITEBCA para realizar las
        gestiones oportunas para constatar la veracidad de los datos aportados por éste. Asimismo, SERVITEBCA podrá
        requerir al CLIENTE información adicional o la rectificación o confirmación de los datos brindados por el
        CLIENTE, reservándose el derecho de no prestarle ningún servicio, en caso éste no haya suministrado o haya
        suministrado documentación y/o información falsa, incorrecta o contradictoria. A estos efectos, si el CLIENTE no
        brinda o rectifica la información solicitada dentro del plazo de siete &#40;7&#41; días calendario, SERVITEBCA
        procederá a bloquear la Cuenta y devolverá el saldo disponible en ésta, a través de los canales que se pondrán a
        su disposición y que le serán oportunamente informados,. . Del mismo modo, EL CLIENTE autoriza a SERVITEBCA, sin
        que ello implique obligación o responsabilidad por parte de SERVITEBCA, para que investigue, con las más amplias
        facultades, todo lo relativo a los presuntos usos indebidos de la Tarjeta y se compromete a prestarle toda la
        colaboración que ésta requiera.
      </Typography>
      <Typography paragraph>
        <strong>DÉCIMO SEXTA. PROTECCIÓN DE DATOS PERSONALES:</strong> Se informa que los datos personales
        proporcionados por el CLIENTE a SERVITEBCA quedan incorporados al banco de datos de clientes de SERVITEBCA.
        Dicha información será utilizada para efectos de la gestión de los servicios objeto del presente Contrato
        &#40;incluyendo procesamiento de datos, remisión de correspondencia, entre otros&#41;, la misma que podrá ser
        realizada a través de terceros. SERVITEBCA ha implementado medidas para proteger los bancos de datos y su
        tratamiento a fin de garantizar la seguridad de los mismos, evitando la alteración, pérdida, tratamiento o
        acceso no autorizado.
      </Typography>
      <Typography paragraph>
        <strong>
          DÉCIMO SÉTIMA. DOMICILIO, SOLUCIÓN DE CONTROVERSIAS, LEGISLACIÓN APLICABLE Y DECLARACIÓN DE CONFORMIDAD:
        </strong>{' '}
        17.1. Para todo efecto derivado del presente Contrato, el CLIENTE declara como domicilio el consignado en la
        cartilla de información. Asimismo, para la solución de controversias derivadas del Contrato, las partes se
        someten a la competencia y jurisdicción de los jueces del lugar donde se celebra el Contrato. 17.2. El presente
        Contrato se regula bajo las normas aplicables de la República del Perú. 17.3. EL CLIENTE declara que:
        &#40;i&#41; suscribe este Contrato aceptando sus términos, &#40;ii&#41; las dudas sobre los términos y conceptos
        han sido absueltos y &#40;iii&#41; ha recibido la información/documentación necesaria respecto a la Cuenta y las
        Tarjetas
      </Typography>
      <Typography paragraph>
        <strong>DÉCIMO OCTAVA. TEXTO DEL CONTRATO:</strong> 18.1. El Texto del presente documento también se encuentra
        en la sección de Configuración de la billetera Yiro dentro del App/Web de Somos Belcorp
        &#40;www.somosbelcorp.com&#41;. 18.2. EL CLIENTE declara haber recibido un ejemplar del presente Contrato, así
        como una guía de uso de la Tarjeta. Para mayor información sobre las condiciones de uso, EL CLIENTE podrá
        ingresar a la billetera Yiro a través del App/ Web de Somos Belcorp o comunicarse con el Centro de Contacto
      </Typography>
    </>
  );
}
