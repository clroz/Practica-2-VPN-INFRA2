# Estado verificado de INFRA2

Última inspección: 8 de octubre de 2026. El inventario se obtuvo del archivo activo de PNETLab `/opt/unetlab/labs/DMZ y Jump Server INFRA2.unl` y del host PNETLab `192.168.22.132`.

## Componentes observados

| Componente | Estado observado | Observación |
|---|---|---|
| FortiGate | QEMU FortiGate-VM64-KVM, versión de imagen 7.0.9; proceso activo | La configuración debe verificarse y realizarse desde la GUI, como exige la práctica. |
| WEB-SERVER | Contenedor Ubuntu/Apache | Conectado a `port2` del FortiGate mediante `WEB-SERVERiface_1`. |
| JUMP-SERVER original | Contenedor Ubuntu/Apache | Sigue conectado a `port3` del FortiGate mediante `Fortinetiface_2`; Ubuntu no satisface RDS RemoteApp. |
| Winserver | Nodo QEMU, 2 CPU, 4096 MB, una interfaz | El proceso está activo y arranca con la ISO, pero el disco qcow2 solo ocupa unos 196 KB: Windows todavía no está instalado. |
| Disco virtual | `winserver-2022/virtioa.qcow2`, qcow2 de 50 GB virtuales | Creado; no equivale a un sistema instalado. |
| ISO | `winserver-2022/cdrom.iso`, 4.8 GB | Windows Server 2022 Evaluation en español, x64. |
| RED DEVICE | Contenedor Ubuntu Server | Enlace exterior compartido con ISP; no se ha confirmado como Cisco ni con VLAN/DHCP/IPsec configurados. |
| PC cliente | Chrome Docker | El archivo activo no contiene una interfaz conectada para este nodo. |
| ISP | Contenedor Ubuntu Server | Simula la red intermedia entre el extremo cliente y el FortiGate. |

## Hallazgos que bloquean la validación

- La interfaz del Winserver está conectada a `RED DEVICEiface_2`; el Jump Ubuntu sigue conectado al `port3` del FortiGate. El servidor Windows aún no ocupa la LAN dedicada del Jump Server.
- El archivo activo no contiene un switch Cisco ni dos nodos de usuario VLAN 10.
- No se han verificado VLAN 10 `/25`, DHCP, LAN Web y Jump `/29`, IP pública simulada, túnel VPN, restricciones de acceso ni reglas de puertos desde la GUI de FortiGate.
- Windows Server no está instalado. Por tanto, tampoco están configurados RDS, RemoteApp, RD Web Client ni las cuentas de usuario solicitadas.
- No hay pruebas de aceptación ni evidencia de video para esta infraestructura todavía.

## Criterio de cierre

La práctica se considerará terminada después de instalar y configurar los servidores; demostrar desde la GUI de FortiGate que la VPN solo llega al Jump Server y que el Jump solo alcanza HTTPS, RDP y SSH del Web Server; validar ambos perfiles de usuario; guardar running-configs; y subir al repositorio documentación, capturas y el enlace del video institucional (máximo 10 minutos, fecha/hora visible, rostro y voz).
