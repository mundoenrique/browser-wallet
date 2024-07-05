# Wallet YIRO

<div align='center'>
<img src="https://img.shields.io/badge/Node%20js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" />&nbsp;&nbsp;
<img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />&nbsp;&nbsp;
<img src="https://img.shields.io/badge/next%20js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" />&nbsp;&nbsp;
<img src="https://img.shields.io/badge/redis-CC0000.svg?&style=for-the-badge&logo=redis&logoColor=white" />
</div>

## Manual de configuración para la aplicación YIRO

[Versión](#versión)

[Requerimientos](#requerimientos)

[Llaves RSA](#llaves-rsa)

[Variables de entorno](#variables-de-entorno)

[Archivos de logs](#archivos-de-logs)

[Ejemplo de despliegue](#ejemplo-de-despliegue)

[Consideraciones generales](#consideraciones-generales)

[Conexión desde Somos Belcorp](#conexión-desde-somos-belcorp)

## Versión

0.15.0 (Versión preliminar)

## Requerimientos

- Salida a internet para descarga de imagen base
- Llaves RSA JWE, JWS para middleware web y backend Novopayment
- Instancia de REDIS cache para pruebas de aceptación del usuario (uat) y producción (prod)

## Llaves RSA

- **Json Web Encryption (Middleware)** privada y pública para middleware **YIRO (web y/o SDK)**

  - Generar JWE middleware privada PKCS#1:

    openssl genpkey -algorithm RSA -out jwe_midd_private_key_pkcs1.pem -pkeyopt rsa_keygen_bits:2048

  - Convertir JWE middleware privada PKCS#1 a PKCS#8:

    openssl pkcs8 -in jwe_midd_private_key_pkcs1.pem -topk8 -nocrypt -out jwe_midd_private_key_pkcs8.pem

  - Generar JWE middleware pública:

    openssl rsa -in jwe_midd_private_key_pkcs8.pem -pubout -out jwe_midd_public_key.pem

- **Json Web Signature (Middleware)** privada y pública para middleware **YIRO (web y/o SDK)**

  - Generar JWS middleware privada PKCS#1:

    openssl genpkey -algorithm RSA -out jws_midd_private_key_pkcs1.pem -pkeyopt rsa_keygen_bits:2048

  - Convertir JWS middleware privada PKCS#1 a PKCS#8:

    openssl pkcs8 -in jws_midd_private_key_pkcs1.pem -topk8 -nocrypt -out jws_midd_private_key_pkcs8.pem

  - Generar JWS middleware pública:

    openssl rsa -in jws_midd_private_key_pkcs8.pem -pubout -out jws_midd_public_key.pem

- **Json Web Encryption (Backend)** privada para conexión con backend **NOVOPAYMENT**

  - Convertir JWE backend privada PKCS#1 a PKCS#8:

    openssl pkcs8 -in {{llave-rsa-jwe-back}}.pem -topk8 -nocrypt -out jwe_back_private_key_pkcs8.pem

- **Json Web Signature (Backend)** privada para conexión con backend **NOVOPAYMENT**

  - Convertir JWS backend privada PKCS#1 a PKCS#8:

    openssl pkcs8 -in {{llave-rsa-jws-back}}.pem -topk8 -nocrypt -out jws_back_private_key_pkcs8.pem

### Consideraciones para las llaves RSA

- Estos pasos se deben hacer para cada ambiente (uat y prod)
- En la aplicación Web se deben insertar sin el header (-----BEGIN PUBLIC KEY-----) ni footer (-----END PUBLIC KEY-----) entre comillas dobles ("")
- Las llaves públicas JWE y JWS middleware se deben insertar en el SDK según instrucciones que se especificaran en el mismo

## Variables de entorno

Completar los valores de los archivos

- ./env/env.uat
- ./env/env.prod

REDIS_HOST={{REDIS_HOST}}

REDIS_PORT={{REDIS_PORT}}

REDIS_SSL={{ ON | OFF}} \* Según especificación de conexión

REDIS_USER={{REDIS_USER}} \* Escribir '' en caso de no configurar

REDIS_PASSWORD={{REDIS_PASSWORD}} \* Escribir '' en caso de no configurar

WEB_URL={{WEB_HOST_NAME}} \* URL de acceso a la aplicación

BACK_URL={{BACK_HOST_NAME}} \* URL de acceso a los servicios Novopayment

LOG_FILE={{ ON | OFF}} \* habilitar o deshabilitar la escritura de logs en archivos

MAX_FIES={{MAX_DAYS_LOG_FILE}} \* Tiempo de expiración de para archivos de logs, por defecto 60 días (60d)

TIMEZONE={{TIMEZONE}} \* Zona horaria para fecha de logs, por defecto Lima (America/Lima)

TENANT_ID={{TENANT_ID}} \* Tenant Id Generado en la ceremonia

CREDENTIALS_KEY={{CREDENTIALS_KEY}} \* Id Oauth Generado en la ceremonia

CREDENTIALS_SECRET={{CREDENTIALS_SECRET}} \* Secret Oauth Generado en la ceremonia

MIDDLE_JWE_PRIVATE_KEY="{{MIDDLE_JWE_PRIVATE_KEY}}" \* Llave pkcs8 generada en el paso anterior

MIDDLE_JWE_PUBLIC_KEY="{{MIDDLE_JWE_PUBLIC_KEY}}" \* Llave generada en el paso anterior

MIDDLE_JWS_PRIVATE_KEY="{{MIDDLE_JWS_PRIVATE_KEY}}" \* Llave pkcs8 generada en el paso anterior

MIDDLE_JWS_PUBLIC_KEY="{{MIDDLE_JWS_PUBLIC_KEY}}" \* Llave generada en el paso anterior

BACK_JWE_PRIVATE_KEY="{{BACK_JWE_PRIVATE_KEY}}" \* Llave pkcs8 generada en el paso anterior

BACK_JWE_PUBLIC_KEY="{{BACK_JWE_PUBLIC_KEY}}" \* Generada en la ceremonia

BACK_JWS_PRIVATE_KEY="{{BACK_JWS_PRIVATE_KEY}}" \* pkcs8 generada en el paso anterior

## Archivos de logs

En caso de activar la escritura de logs en archivos es posible crear un volumen al servidor anfitron para mantener un historial de logs.

En el orquestador de su preferencia mapear un volumen desde el contenemor (/app/logs) a la ruta del servidor anfitrión

```
  ...
  spec
    containers
      volumeMounts:
        - mountPath: {{path}}
          name: volumeName
    ...

```

## Ejemplo de despliegue

Para ejemplificar el despliegue se usa docker compose (**No recomendado para producción**)

1. Configurar DNS y VHOST

2. Editar el archivo .env

- WEB_ENV={{uat | prod}}

3. Editar el archivo (./env/.env.{{uat | prod}})

- REDIS_HOST=redis
- REDIS_PORT=6379
- REDIS_SSL=OFF
- REDIS_USER=''
- REDIS_PASSWORD=qPVPjootJC^4CUve6B%D2H

4. Ejecutar en la raíz de la aplicación Yiro

   ```
   docker compose up --build -d
   ```

## Consideraciones generales

1. Tomar en cuenta las instrucciones del Dockerfile-belcorp para la construcción del Dockerfile en el orquestador de su preferencia
2. Garantizar que el orquestador envíe el argumento APP_ENV=${{uat | prod}}

## Conexión desde Somos Belcorp

1. Desde la aplicación somos Belcorp realizar una petición GET a la aplicación Yiro.

   - CURL:

     ```
     '{{BASE_URL}}/api/v1/setcode?consultantCode=1234568&countryCode=PE' \
      --header 'X-Request-Id: e30b625a-e085-42a5-aac2-3d52f73ad8fe'
     ```

   - Donde:
     - BASE_URL: es el HOSTNAME de la aplicación YIRO definido por BELCORP.
     - ConsultantCode: es el código de la consultora
     - CountryCode: es el País donde opera la consultora

2. La aplicación responderá una URI

```
{
    "data": "/identify/88bd1e1f-b454-4c9a-b242-ec6c6c1fa985"
}

```

3. Desde Somos Belcorp deben redireccionar el navegador del usuario a la URL

- {{BASE_URL}}/identify/88bd1e1f-b454-4c9a-b242-ec6c6c1fa985
