//This section is added as per instructions on heroku
const PORT = process.env.PORT || 3000;
const INDEX = '/index.html';

const express = require('express');

const app = express();
app.use((req, res) => {
    res.sendFile(INDEX, { root: __dirname })
});
app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
});

//web socket on server side
const ws = require('ws');
const wss = new ws.Server(app.Server);
//---

//create a clientArray
let Clients = [];

wss.on("connection", ws => {

    console.log(`There are ${Clients.length} clients connected`);

    Clients.push(ws);
    console.log("A client has connected to wss");

    ws.on("close", () => {
        console.log("client has disconnected");
    })

    ws.on("message", (message) => {
        console.log("This is the message we received: " + message);
        for (let i = 0; i < Clients.length; i++) {
            Clients[i].send(message);
        }
    })
})