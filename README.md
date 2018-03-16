## Crypto streams
[![CircleCI](https://circleci.com/gh/terryx/crypto-streams.svg?style=svg)](https://circleci.com/gh/terryx/crypto-streams)

A simple utility library for streaming public market data from cryptocurrency exchanges

## Getting started
`npm install --save crypto-streams`

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
