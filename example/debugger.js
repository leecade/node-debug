'use strict'

var Client = require('_debugger').Client
var client = new Client()

if(process.argv.length < 3) {
  console.log('Usage: node debugger.js <pid>')
  process.exit(1)
}

var pid = parseInt(process.argv[2], 10)

// once the client disconnent, stop the process
// client.unref()

// 1. Send `SIGUSR1` to enter debug mode
process.kill(pid, 'SIGUSR1')

// 2. Then connect the default debug port
setTimeout(function () {
  client.connect(5858)
}, 500)

client.on('ready', function() {
  console.log('enter bug mode')

  // 3. Printf current 'global.message' value
  client.req({
    'command': 'evaluate',
    'arguments': {
      'expression': 'global.message',
      'global': true
    }
  }, function(err, body, res) {
    if(err) {
      throw new Error(err)
    }
    console.log('peek successful', body.text)
  })

  // 4. Modify var value in runttime
  var newMessage = 'modf by debug!'
  
  var msg = {
    'command': 'evaluate',
    'arguments': {
      'expression': 'global.message="' + newMessage + '"',
      'global': true
    }
  }

  client.req(msg, function(err, body, res) {
    console.log('modified to %s', newMessage)
  })
})

client.on('break', function() {
  console.log("break event")
  client.reqContinue(function(err, body, res) {
    console.log('continued')
  })
})
