## Crypto streams
Stream public market data from cryptocurrency exchange

## Getting started
```bash
npm install
```

#### Examples
```javascript
const streams = require('crypto-streams')
const subject = streams.usd('btc')

subject.connect()

subject
  .subscribe(
    (res) => console.log(res),
    (err) => console.log(err.message)
  )
```
