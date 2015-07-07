# node-debug

node debug note

## Considering

- Hot config

- Remote control

- AOP monitoring

- Friendly debug node in chrome

### DEMO

```js
node server.js
```

> Visit http://localhost:8001 to see the message

record the `pid`, then

```js
node debugger.js `pid`
```

Refresh the browser, you may see content has changed

### How to enter debug mode

- Way 1

startup with `--debug-brk` param

```js
node --debug-brk=5858 [filename]
```

- Way 2

Send a `SIGUSR1` signal to node process

> For example

```bash
$ kill -SIGUSR1 4162
```

When node process enter debug mode, there will open a TCP port for listen (default port is `5858`)

### Connect a debug process

```js
node debug localhost:5858
```

Then the process is hang on, type these basic commands:

<kbd>c</kbd> Go on

<kbd>s</kbd> Step into next function

<kbd>o</kbd> Step out of current function

### Debugger protocol

simple:

```js
var msg = {
  'command': 'evaluate',
  'arguments': {
    'expression': 'global.message="' + 'newMessage' + '"',
    'global': true
  }
}
```

send the message:

```
client.req(msg, function (err, body, res) {})
```

### Ref

https://github.com/joyent/node/blob/master/lib/_debugger.js

https://github.com/oneapm/node-oneapm-debugger
