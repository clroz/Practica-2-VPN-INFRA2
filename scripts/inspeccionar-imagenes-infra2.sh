#!/bin/sh
echo '=== Docker images ==='
docker images --format '{{.Repository}}:{{.Tag}}' | sort
echo '=== QEMU images ==='
find /opt/unetlab/addons/qemu -mindepth 1 -maxdepth 1 -type d -printf '%f\n' 2>/dev/null | sort
echo '=== Active node network details ==='
for c in docker32 docker33 docker34 docker35 docker36; do docker inspect --format '{{.Name}} networks={{json .NetworkSettings.Networks}}' "$c"; done