//This section is added as per instructions on heroku
const PORT = process.env.PORT || 3000;

const express = require('express');

const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const path = require("path");

app.set('view engine', 'ejs');
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

app.get('/', function (req, res) {
  res.redirect('chat')
})

app.get("/chat", async (req, res, next) => {
	try {
		res.render("index", {
			title: "Chat home",
		});
	} catch (e) {
		console.error(e);
	}
});

io.on("connection", (socket) => {
    io.emit("chatter", `${socket.id} has joined!`);
    socket.on("chatter", async (msg) => {
        io.emit("chatter", `${socket.id} : ${msg}`);
    });
});

http.listen(PORT, () => {
    console.log("listening on *:" + PORT);
});