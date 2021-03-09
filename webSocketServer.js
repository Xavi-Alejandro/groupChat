//This section is added as per instructions on heroku
const PORT = process.env.PORT || 3000;
const INDEX = '/index.html';

const express = require('express');

const server = express()
    .use((req, res) => res.sendFile(INDEX, { root: __dirname }))
    .listen(PORT, () => console.log(`Listening on ${PORT}`));

//web socket on server side
const WebSocket = require('ws');
const wss = new WebSocket.Server({ server });
//---

wss.on("connection", ws => {
    //GOLD!!!
    ws.on("message", (message) => {
        // console.log("This is the message we received: " + message);
        wss.clients.forEach(function relayMessage(client){
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
            else{
                client.send("!MyMessage"+message);
            }
        })
    })
})