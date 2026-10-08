# Puertos y enlaces comprobados en INFRA2

La topología se descargó del archivo activo de PNETLab el 8 de octubre de 2026. El mapa describe el cableado actual; no implica que los equipos o controles de seguridad ya estén configurados.

## Conexiones del archivo activo

| Equipo | Interfaz | Conectado a | Estado y función objetivo |
|---|---|---|---|
| RED DEVICE | `eth1` | ISP `eth1`, red `RED DEVICEiface_1` | Enlace exterior del cliente; el contenedor activo es Ubuntu Server. |
| RED DEVICE | `eth2` | Winserver `e0`, red `Winserveriface_0` | Enlace actual incorrecto para el Jump Server; Windows está del lado cliente. |
| ISP | `eth2` | FortiGate `port1`, red `ISPiface_2` | WAN simulada del FortiGate. |
| FortiGate | `port2` | WEB-SERVER `eth1`, red `WEB-SERVERiface_1` | LAN prevista del Web Server. |
| FortiGate | `port3` | JUMP-SERVER Ubuntu `eth1`, red `Fortinetiface_2` | LAN actual del Jump; debe alojar el Windows Server cuando se reubique. |
| PC | Sin interfaz conectada en el archivo activo | — | Nodo Chrome desconectado; falta ubicar el cliente. |

El Winserver aparece como nodo QEMU con 2 CPU, 4096 MB de RAM y una interfaz. La ISO está en `cdrom.iso`; `virtioa.qcow2` tiene 50 GB de tamaño virtual, pero su archivo ocupa unos 196 KB, señal de que Windows aún no se ha instalado. No añadirlo a las pruebas como un servidor operativo.

## Plan de direccionamiento propuesto, aún no aplicado

Los bloques `203.0.113.0/30` y `198.51.100.0/30` son rangos TEST-NET reservados para documentación y laboratorios aislados; no son direcciones públicas enrutables en Internet.

| Segmento | Red | Direcciones sugeridas |
|---|---|---|
| Red cliente, VLAN 10 | `192.168.10.0/25` | Gateway `.1`; DHCP para usuarios |
| RED DEVICE ↔ ISP | `203.0.113.0/30` | ISP `.1`, RED DEVICE `.2` |
| ISP ↔ FortiGate `port1` | `198.51.100.0/30` | ISP `.1`, FortiGate `.2` |
| Web Server, FortiGate `port2` | `192.168.30.0/29` | FortiGate `.1`, Web `.2` |
| Jump Server, FortiGate `port3` | `192.168.40.0/29` | FortiGate `.1`, Windows Jump `.2` |

La selección final del tipo de VPN y de la función del equipo RED DEVICE debe corresponderse con el modo exigido por el profesor. Las políticas del FortiGate y su demostración se deben configurar y validar por GUI. La VPN solo debe alcanzar el Jump Server; desde Jump, el Web Server solo debe aceptar HTTPS, RDP y SSH.
