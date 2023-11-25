import { Pulsoid } from '../index';

const hrmonitor = new Pulsoid();
const key = process.argv[2];

if (!key) {
  console.log('usage: node dist/test/index.test.js <key>');
  process.exit(1);
}

hrmonitor.authenticate(key);

hrmonitor.on('authenticated', () => {
  console.log('monitor authenticated');
});

hrmonitor.on('heartRateUpdate', (rate) => {
  console.log(`heart rate: ${rate} bpm`);
});

process.on('SIGINT', () => {
  console.log('exiting');
  process.exit(0);
});
