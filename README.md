# pulsoid-free

Raw data from pulsoid.com without paying for the api key.

## Usage

```ts
import { Pulsoid } from 'pulsoid-free';

const hrmonitor = new Pulsoid();
hrmonitor.authenticate('https://pulsoid.net/widget/view/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx');

hrmonitor.on('authenticated', () => {
  console.log('monitor authenticated');
});

hrmonitor.on('heartRateUpdate', (rate) => {
  console.log(`heart rate: ${rate} bpm`);
});
```

## License

MIT
```
Copyright 2023 gurrrrrrett3

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
```

