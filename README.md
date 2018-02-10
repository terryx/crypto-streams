## Crypto streams
Stream public market data from cryptocurrency exchange

![logo](./example.png)

## Getting started
```bash
npm install
npm run gdax:trades -- --env=dev
```

### Tips
Adjust amount in the `config.js` to watch for different total price according
to environment setting

#### Examples
```bash
# Track OKEX futures
npm run okex:futures -- --currency=btc --env=dev
```
