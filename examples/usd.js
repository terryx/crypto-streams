const index = require('../index')

const subject = index.usd('btc')
subject.connect()

subject
  .subscribe(
    (res) => console.log(res),
    (err) => console.log(err.message)
  )
