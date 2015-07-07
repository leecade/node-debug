// message content will be modified !
global.message = "hello world!"

var server = require('http').createServer(function (req, res) {
  res.end(global.message)
}).listen(8001)

console.log('Visit http://localhost:8001 to see the message')
console.log('pid = %d', process.pid)

process.on('uncaughtException', function (err) {
  console.error(err.stack)
  console.log("Node NOT Exiting...")
})
