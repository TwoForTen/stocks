import { createServer } from 'http'
import { parse } from 'url'
import next from 'next'
import { throttle } from 'lodash'
const WebSocket = require('ws');
const socketio = require('socket.io');


const port = parseInt(process.env.PORT || '3001', 10)
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = createServer((req, res) => {
    const parsedUrl = parse(req.url!, true)
    handle(req, res, parsedUrl)
  }).listen(port)

  const socket = new WebSocket('wss://ws.finnhub.io?token=buqgi8v48v6qdskvns3g');
  const io = socketio(server)

  socket.setMaxListeners(2);

  const subscribedSymbols: string[] = [];

  const unsubscribe = () => {
    if(subscribedSymbols.length > 0)
      console.log(subscribedSymbols)
      for(let i=0;i < subscribedSymbols.length;i++){
        socket.send(JSON.stringify({'type':'unsubscribe','symbol': subscribedSymbols[i]}))
        subscribedSymbols.shift();
    }
}

  // Connection opened -> Subscribe
  socket.addEventListener('open', (event: any) => {
    io.on('connection', (ioSocket: any) => {
      ioSocket.on('subscribe', (msg: string) => {
        if(msg) {
          socket.send(JSON.stringify({'type':'subscribe', 'symbol': msg.toUpperCase()}))
          subscribedSymbols.push(msg.toUpperCase());
        }
      })

      ioSocket.on('unsubscribe', unsubscribe);

      ioSocket.on('disconnect', unsubscribe);

      socket.addEventListener('message', (event: any) => {
        ioSocket.emit('data', event.data);
      });
    })
    
  });

  // Listen for messages
  
  
  // Unsubscribe
   

  // tslint:disable-next-line:no-console
  console.log(
    `> Server listening at http://localhost:${port} as ${
      dev ? 'development' : process.env.NODE_ENV
    }`
  )
})