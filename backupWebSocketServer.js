//This section is added as per instructions on heroku
const PORT = process.env.PORT || 3000;
const INDEX = '/index.html';

const express = require('express');

const server = express()
    .use((req, res) => res.sendFile(INDEX, { root: __dirname }))
    .listen(PORT, () => console.log(`Listening on ${PORT}`));

//web socket on server side
const { Server } = require('ws');
const wss = new Server({ server });
//---

//create a clientArray
let Clients = [];
let currentClientWsValue;
let currentClientNumberOnArray = 0;

function checkClientArray() {
    for (let i = 0; i < Clients.length; i++) {
        console.log(`Client ${i + 1}'s ready state is: ${Clients[i][0].readystate}`)
        if (Clients[i][0]=== undefined) {
            // if (Clients[i]=== currentClientWsValue) {
            Clients.splice(i, 1);
            console.log(`Array has been spliced!`);
            break;
        }
    }
}
wss.on("connection", ws => {
    currentClientNumberOnArray++;
    console.log("CURRENT CLIENT NUMBER ON ARRAY: " + currentClientNumberOnArray)
    Clients.push([currentClientNumberOnArray, ws]);
    //Keep track of the current client so we can delete him later
    console.log(`Client ${currentClientNumberOnArray} has connected`);
    console.log(`There are ${Clients.length} clients connected`);

    //format IndexOfClient" followed by number

    ws.on("close", () => {
        checkClientArray();
        console.log(`Client ${currentClientNumberOnArray} has disconnected`);
    })

    ws.on("message", (message) => {
        console.log("This is the message we received: " + message);
        for (let i = 0; i < Clients.length; i++) {
            Clients[i][0].send(message);
        }

    })
})