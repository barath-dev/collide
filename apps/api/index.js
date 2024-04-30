const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const WebSocket = require('ws');
const bodyParser = require('body-parser');
require('dotenv').config();

app.use(cors());
app.use(express.json());

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

app.use(bodyParser.json());

// WebSocket server setup
const wss = new WebSocket.Server({ port: process.env.WEBSOCKET_PORT }); // WebSocket server port

// WebSocket connection handler
wss.on('connection', function connection(ws) {
    // Send initial count to the client
    sendCountToClients();

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

app.listen(process.env.SERVER_PORT, () => {
    console.log('server listening on port 8080')
});
