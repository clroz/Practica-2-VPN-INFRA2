#!/bin/sh
python3 - <<'PY'
import xml.etree.ElementTree as ET
p='/opt/unetlab/labs/DMZ y Jump Server INFRA2.unl'
r=ET.parse(p).getroot()
nets={x.get('id'): x.get('name') for x in r.findall('.//networks/network')}
for n in r.findall('.//nodes/node'):
    print('NODE', n.get('id'), n.get('name'), 'type='+str(n.get('type')), 'image='+str(n.get('image')))
    for i in n.findall('interface'):
        print('  PORT', i.get('name'), '=>', nets.get(i.get('network_id'), 'network:'+str(i.get('network_id'))))
    if n.get('type')=='docker':
        print('  ADDRESS_FIELDS', ' '.join(k+'='+str(n.get(k)) for k in ('eth1_ip','eth2_ip','eth3_ip','default_route','DNS') if n.get(k)))
PY