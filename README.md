# DMZ y Jump Server (INFRA2)

> **Video demostrativo:** pendiente de grabación después de validar los servicios. El video final se enlazará aquí.

## Propósito

Construir un acceso remoto seguro mediante VPN IPsec desde la red de usuarios hacia un Jump Server, con acceso restringido al Web Server de Caja por HTTPS, RDP y SSH. El FortiGate se debe configurar y demostrar por GUI. Los usuarios de VLAN 10 reciben su dirección por DHCP; el usuario sin privilegios solo debe ver la aplicación web publicada, mientras que el usuario con privilegios dispone de Web, PuTTY y RDP.

## Topología activa

![Diagrama de referencia de la práctica](docs/imagenes/topologia-infra2.png)

El mapa comprobado de interfaces, puertos, imágenes y estado inicial está en [inventario de puertos y enlaces](docs/puertos-topologia-activa.md).

## Requisitos

- VPN entre el sitio del cliente y el sitio de servidores; la VPN solo permite llegar al Jump Server.
- LAN de usuario en VLAN 10, `/25`, con DHCP.
- Web Server y Jump Server en LAN distintas, cada una `/29`.
- Desde Jump Server hacia Web Server, permitir únicamente TCP 443 (HTTPS), 3389 (RDP) y 22 (SSH).
- Publicar por RDP RemoteApp y RD Web Client: Web para el usuario sin privilegios; Web, PuTTY y RDP para el usuario con privilegios.
- FortiGate configurado y demostrado desde la GUI.

## Estado actual

La topología activa se inspeccionó el 8 de octubre de 2026. El ISO de Windows Server 2022 y el disco virtual ya están en PNETLab, y se creó un nodo Windows; sin embargo, Windows aún no está instalado, el nodo está conectado al enlace de `RED DEVICE` y el Jump Ubuntu sigue conectado a FortiGate `port3`. La VPN, el direccionamiento, DHCP, VLAN, las políticas y RDS siguen pendientes de instalación, configuración y validación. El detalle comprobado está en [estado actual de INFRA2](docs/estado-actual-infra2.md).

El plan de direccionamiento propuesto y la limitación de imágenes se detallan en [puertos y enlaces](docs/puertos-topologia-activa.md). Los scripts de inspección usados están en `scripts/`.

## Evidencias

Se añadirán capturas de la GUI de FortiGate, del estado del túnel, las políticas, DHCP, las aplicaciones publicadas y las pruebas de acceso al completar la configuración. No se incluirán credenciales ni claves precompartidas.
