const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

const port = 8000;
const mongoUserName = 'romanmakarenko';
const mongoPassword = 'qw123123';
const dbName = 'pizzeria';
const urlDb = `mongodb+srv://${mongoUserName}:${mongoPassword}@cluster0-ndmjg.mongodb.net/${dbName}?retryWrites=true&w=majority`;
const routers = require('./views');


app.use(bodyParser.json());
app.use(bodyParser.text());
app.use('/', express.static('public'));
app.use(routers.OrderRouter);
app.use(routers.UserRouter);

mongoose.connect(urlDb, {
    useNewUrlParser   : true,
    useUnifiedTopology: true
}, (err, connection) => {
    if (err) console.log(err);
    console.log("Connected to db");
    app.listen(port, () => console.log(`Listen on port: '${port}'`));
    process.on('SIGINT', () => {
        console.log("Close process");
        connection.close();
        process.exit();
    });
});
