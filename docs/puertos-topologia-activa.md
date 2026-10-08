# Inventario de puertos y enlaces de INFRA2

Inspección de solo lectura del archivo activo `/opt/unetlab/labs/DMZ y Jump Server INFRA2.unl` en PNETLab. La configuración de FortiGate debe realizarse y demostrarse desde su GUI.

## Cableado confirmado

| Equipo | Interfaz | Conectado a | Función prevista |
|---|---|---|---|
| RED DEVICE | `eth1` | ISP `eth1` | Enlace WAN del lado del cliente |
| RED DEVICE | `eth2` | Red `PCiface_1` / PC `eth1` | LAN del usuario, VLAN 10 |
| ISP | `eth2` | FortiGate `port1` | WAN del FortiGate |
| FortiGate | `port2` | WEB-SERVER `eth1` | LAN dedicada del servidor web |
| FortiGate | `port3` | JUMP-SERVER `eth1` | LAN dedicada del Jump Server |
| PC | `eth1` | Red `PCiface_1` / RED DEVICE `eth2` | Cliente de la VPN |

La topología activa no contiene un switch Cisco. `RED DEVICE` es un router Ubuntu 20.04. PNETLab tiene disponible `pnetlab/ubuntu-router-ipsec:infra3-ready`, que incluye strongSwan, iptables y dnsmasq; la imagen actual `ubuntu_sv` no incluye esos servicios.

## Estado de las interfaces y servicios observado

El archivo activo asigna las conexiones anteriores, pero sus campos de direccionamiento IPv4 de los nodos están vacíos. Las direcciones `10.177.0.x` vistas en Docker son de administración de PNETLab; no son las redes de usuario, WAN ni servidor del ejercicio.

`WEB-SERVER` y `JUMP-SERVER` están ejecutando `pnetlab/apache2:latest` (Ubuntu 20.04). Ambos exponen HTTP/HTTPS y SSH; el Jump Server no escucha en TCP 3389. La lista de imágenes QEMU instaladas solo muestra FortiGate 7.0.9 e IOSv2; no se encontró una imagen de Windows Server para habilitar RDS RemoteApp o RD Web Client.

## Plan de direccionamiento propuesto

Los bloques WAN son rangos TEST-NET reservados para documentación y laboratorios aislados; no son direcciones públicas enrutables en Internet.

| Segmento | Red | Dirección sugerida |
|---|---|---|
| LAN de usuario, VLAN 10 | `192.168.10.0/25` | RED DEVICE `.1`; DHCP para clientes |
| RED DEVICE ↔ ISP | `203.0.113.0/30` | ISP `.1`, RED DEVICE `.2` |
| ISP ↔ FortiGate port1 | `198.51.100.0/30` | ISP `.1`, FortiGate `.2` |
| LAN del Web Server, port2 | `192.168.30.0/29` | FortiGate `.1`, Web `.2` |
| LAN del Jump Server, port3 | `192.168.40.0/29` | FortiGate `.1`, Jump `.2` |

La VPN debe incluir solamente VLAN 10 y la LAN del Jump Server. No debe incluir la LAN del Web Server. El firewall permitirá al usuario llegar al Jump Server; desde el Jump Server se limitará el tráfico al Web Server a HTTPS, RDP y SSH.

> Este direccionamiento está propuesto y aún no se ha aplicado. Si el curso requiere bloques específicos, se debe sustituir antes de configurar.