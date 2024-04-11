# Wallet YIRO

## Manual de configuración para la aplicación YIRO

[Versión](#versión)

[Requerimientos](#requerimientos)

[Llaves RSA](#llaves-rsa)

[Variables de entorno](#variables-de-entorno)

[Ejemplo de despliegue](#ejemplo-de-despliegue)

## Versión

0.0.1 (Versión preliminar)

## Requerimientos

- Salida a internet para descarga de imagen base
- Llaves RSA JWE, JWS para middleware web y backend Novopayment
- Instancia de REDIS cache para Pruebas de aceptación del usuario (uat) y Producción (prod)

## Llaves RSA

- **Json Web Encryption (Middleware)** privada y pública para middleware **YIRO (web y/o SDK)**

  - Generar JWE middleware privada PKCS#1

    openssl genpkey -algorithm RSA -out jwe_midd_private_key_pkcs1.pem -pkeyopt rsa_keygen_bits:2048

  - Convertir JWE middleware privada PKCS#1 a PKCS#8

    openssl pkcs8 -in jwe_midd_private_key_pkcs1.pem -topk8 -nocrypt -out jwe_midd_private_key_pkcs8.pem

  - Generar JWE middleware pública

    openssl rsa -in jwe_midd_private_key_pkcs8.pem -pubout -out jwe_midd_public_key.pem

- **Json Web Signature (Middleware)** privada y pública para middleware **YIRO (web y/o SDK)**

  - Generar JWS middleware privada PKCS#1

    openssl genpkey -algorithm RSA -out jws_midd_private_key_pkcs1.pem -pkeyopt rsa_keygen_bits:2048

  - Convertir JWS middleware privada PKCS#1 a PKCS#8

    openssl pkcs8 -in jws_midd_private_key_pkcs1.pem -topk8 -nocrypt -out jws_midd_private_key_pkcs8.pem

  - Generar JWS middleware pública

    openssl rsa -in jws_midd_private_key_pkcs8.pem -pubout -out jws_midd_public_key.pem

- **Json Web Encryption (Backend)** privada para conexión con backend **NOVOPAYMENT**

  - Convertir JWE backend privada PKCS#1 a PKCS#8

    openssl pkcs8 -in {{llave-rsa-jwe-back}}.pem -topk8 -nocrypt -out jwe_back_private_key_pkcs8.pem

- **Json Web Signature (Backend)** privada para conexión con backend **NOVOPAYMENT**

  - Convertir JWS backend privada PKCS#1 a PKCS#8

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

TENANT_ID={{TENANT_ID}} \* Tentn Id Generado en la seremonia

CREDENTIALS_KEY={{CREDENTIALS_KEY}} Id Oath Generado en la seremonia

CREDENTIALS_SECRET={{CREDENTIALS_SECRET}} Id Oath Generado en la seremonia

MIDDLE_JWE_PRIVATE_KEY="{{MIDDLE_JWE_PRIVATE_KEY}}" \* Llave pkcs8 genarada en el paso anterior

MIDDLE_JWE_PUBLIC_KEY="{{MIDDLE_JWE_PUBLIC_KEY}}" \* Llave genarada en el paso anterior

MIDDLE_JWS_PRIVATE_KEY="{{MIDDLE_JWS_PRIVATE_KEY}}" \* Llave pkcs8 genarada en el paso anterior

MIDDLE_JWS_PUBLIC_KEY="{{MIDDLE_JWS_PUBLIC_KEY}}" \* Llave genarada en el paso anterior

BACK_JWE_PRIVATE_KEY="{{BACK_JWE_PRIVATE_KEY}}" \* Llave pkcs8 genarada en el paso anterior

BACK_JWE_PUBLIC_KEY="{{BACK_JWE_PUBLIC_KEY}}" \* Generada en la seremonia

BACK_JWS_PRIVATE_KEY="{{BACK_JWS_PRIVATE_KEY}}" \* pkcs8 genarada en el paso anterior
