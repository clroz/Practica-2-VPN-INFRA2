set -eu

image_dir=/opt/unetlab/addons/qemu/winserver-2022
printf '%s\n' '--- WINDOWS IMAGE FILES ---'
ls -lh "$image_dir"
if [ -f "$image_dir/virtioa.qcow2" ]; then
  printf '%s\n' '--- VIRTUAL DISK ---'
  qemu-img info "$image_dir/virtioa.qcow2"
fi
printf '%s\n' '--- RUNNING QEMU PROCESSES ---'
pgrep -af 'qemu-system|qemu_wrapper' || true
printf '%s\n' '--- ACTIVE INFRA2 LAB ---'
stat -c '%y %s %n' '/opt/unetlab/labs/DMZ y Jump Server INFRA2.unl'
