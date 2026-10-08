#!/bin/sh
for c in docker32 docker33 docker34 docker35 docker36; do
  echo "=== $c ==="
  docker inspect --format 'image={{.Config.Image}} ip={{.NetworkSettings.IPAddress}}' "$c"
  docker exec "$c" sh -c 'hostname; if command -v ip >/dev/null 2>&1; then ip -br -4 addr; ip route; else cat /proc/net/dev; fi; ss -lntp 2>/dev/null || netstat -lntp 2>/dev/null || true'
done