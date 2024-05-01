const express = require('express');
const http = require('http');
const cors = require('cors');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const WebSocket = require('ws') ;
const bodyParser = require('body-parser');
const { log } = require('console');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.use(bodyParser.json());

const server = http.createServer(app);

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.log("Error connecting to MongoDB", err);
});

const waitlistSchema = new Schema({
    email: {
        type: String,
        required: true
    },
});

const Model = mongoose.model('user', waitlistSchema);

// WebSocket server setup
const wss = new WebSocket.Server({ noServer:true}); // WebSocket server port

// WebSocket connection handler
wss.on('connection', function connection(ws) {
    // Send initial count to the client
    sendCountToClients();

    console.log('Client connected');
    // Listen for changes in the database
    Model.watch().on('change', () => {
        // Send updated count to clients when there's a change
        sendCountToClients();
    });
});

// Function to send count to all connected clients
function sendCountToClients() {
    Model.countDocuments().then(count => {
        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify({ count }));
            }
        });
    }).catch(error => {
        console.error('Error while getting document count:', error);
    });
}


app.post("/submit", async (req, res) => {

    try {
        console.log(req.body);
        const { email } = req.body;
        const user = new Model({ email });
        const result = await Model.findOne({ email: email });
        if (result) {
            console.log("User already exists");
            res.send("User already exists");
        } else {
            await user.save();
            console.log("User added successfully");
            res.send("User added successfully");
        }
    } catch (error) {
        res.send(error);
    }
});

app.get("/", async (req, res) => {
    try {
        const count = await Model.countDocuments();
        res.send({count});
    } catch (error) {
        res.send(error);
    }
});


app.listen(process.env.PORT || 8080,'0.0.0.0' ,() => {
    console.log('server listening on port 8080')
});

server.on('upgrade', function upgrade(request, socket, head) {
    wss.handleUpgrade(request, socket, head, function done(ws) {
        wss.emit('connection', ws, request);
    });
});

server.listen(process.env.WEBSOCKET_PORT || 8002, () => {
    console.log('server listening on port 8002')
});
