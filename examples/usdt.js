const index = require('../index')

const subject = index.usdt('btc')
subject.connect()

subject
  .subscribe(
    (res) => console.log(res),
    (err) => console.log(err.message)
  )
