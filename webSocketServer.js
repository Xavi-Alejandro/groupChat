//web socket on server side
const WebSocket = require("ws");
const assignedPort = process.env.PORT || 8082;
const wss = new WebSocket.Server({ port: assignedPort })

//create a clientArray
let Clients = [];

wss.on("connection", ws => {
    Clients.push(ws);
    console.log("A client has connected to wss");

    ws.on("close", () => {
        console.log("client has disconnected");
    })

    ws.on("message", (message) => {
        console.log("This is the message we received: "+ message);
        for(let i = 0;i<Clients.length;i++){
            Clients[i].send(message);
        }        
    })
})