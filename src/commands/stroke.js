const request = require('superagent')

module.exports = {
  meta: {
    help: 'Stroke someone\'s ego.',
    usage: '"<name>"',
    module: 'Fun',
    level: 0,
    timeout: 5
  },
  fn: function (msg, suffix) {
    let name
    if (suffix) {
      name = suffix.split('"')
      if (name.length === 1) {
        name = ['', name]
      }
    } else {
      name = ['Jake', 'Heinz']
    }
    request.get('http://api.icndb.com/jokes/random')
      .query({ escape: 'javascript' })
      .query({ firstName: name[0] })
      .query({ lastName: name[1] })
      .end((err, res) => {
        if (!err && res.status === 200) {
          msg.channel.createMessage(res.body.value.joke)
        } else {
          global.logger.error(`REST call failed: ${err}`)
        }
      })
  }
}
