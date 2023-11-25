import { Pulsoid } from '../index';

const hrmonitor = new Pulsoid();
hrmonitor.authenticate('c62febc0-9f13-4de2-87df-20c2f85aced2');

hrmonitor.on('authenticated', () => {
  console.log('monitor authenticated');
});

hrmonitor.on('heartRateUpdate', (rate) => {
  console.log(`heart rate: ${rate} bpm`);
});
