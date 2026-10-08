#!/bin/sh
echo '=== Lab-container interfaces ==='
for c in docker33 docker34 docker35 docker36; do echo "--- $c ---"; docker exec "$c" sh -c 'ls -1 /sys/class/net; ip -br link'; done
echo '=== Host bridges ==='
ip -br link
bridge link 2>/dev/null | head -n 35
echo '=== Active lab runtime directories ==='
find /opt/unetlab/tmp/0 -mindepth 1 -maxdepth 2 -type d -printf '%T@ %p\n' 2>/dev/null | sort -nr | head -n 15