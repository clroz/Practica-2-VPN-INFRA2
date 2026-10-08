set -eu
printf '%s\n' '--- WINDOWS CONSOLE PROCESS ---'
pgrep -af 'name Winserver|qemu-system-x86_64.*winserver|qemu-system.*Winserver' || true
printf '%s\n' '--- VNC LISTENERS ---'
ss -ltnp | grep -E '(:590[0-9]|:59[1-9][0-9]|:30[0-9]{3}|:24[0-9]{3})' || true
printf '%s\n' '--- AVAILABLE VNC/REMOTE TOOLS ---'
for tool in vncdo vncdotool vncviewer x11vnc websockify; do
  command -v "$tool" || true
done
printf '%s\n' '--- PNET CONSOLE FILES ---'
find /opt/unetlab/tmp/6/38 -maxdepth 1 -type s -o -type f 2>/dev/null | sort || true
