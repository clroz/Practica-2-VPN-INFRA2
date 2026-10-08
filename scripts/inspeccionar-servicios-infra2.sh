#!/bin/sh
for c in docker35 docker36 docker33 docker34; do
  echo "=== $c ==="
  docker exec "$c" sh -c 'cat /etc/os-release | head -n 3; for x in ip ipsec swanctl dhcpd dnsmasq iptables sshd apache2 xrdp; do printf "%s=" "$x"; command -v "$x" || true; done'
done