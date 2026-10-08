const fs = require('fs');
const path = require('path');
const { Client } = require(process.env.SSH2_MODULE);
const password = process.env.PNET_AUDIT_PASSWORD;
if (!password) throw new Error('Set PNET_AUDIT_PASSWORD in the environment.');
const source = '/opt/unetlab/labs/DMZ y Jump Server INFRA2.unl';
const destination = path.resolve(__dirname, '..', 'INFRA2.unl');
const client = new Client();
client.on('ready', () => client.sftp((error, sftp) => {
  if (error) throw error;
  sftp.fastGet(source, destination, (copyError) => {
    sftp.end();
    client.end();
    if (copyError) {
      console.error(copyError.message);
      process.exitCode = 1;
      return;
    }
    console.log(`Copied active PNETLab topology to ${destination}`);
  });
}));
client.on('error', (error) => {
  console.error(error.message);
  process.exitCode = 1;
});
client.connect({ host: '192.168.22.132', username: 'root', password, readyTimeout: 15000 });