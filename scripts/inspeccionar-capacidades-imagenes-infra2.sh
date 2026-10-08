#!/bin/sh
for image in pnetlab/ubuntu-router-ipsec:infra3 pnetlab/ubuntu-router-ipsec:infra3-ready pnetlab/pnet-chrome-net:infra3-ready; do
  echo "=== $image ==="
  docker run --rm --network none --entrypoint sh "$image" -c 'for x in ip ipsec swanctl dhcpd dnsmasq udhcpd busybox iptables sshd; do printf "%s=" "$x"; command -v "$x" || true; done'
done