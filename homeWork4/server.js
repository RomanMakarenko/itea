const express = require('express');
const app = express();
const port = 8001;
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const bodyParser = require('body-parser');
const mongoUserName = 'romanmakarenko';
const mongoPassword = 'qw123123'
const urlDb = `mongodb+srv://${mongoUserName}:${mongoPassword}@cluster0-ndmjg.mongodb.net/test?retryWrites=true&w=majority`;

app.use(bodyParser.json());
app.use(bodyParser.text());
app.use('/', express.static('public'));

MongoClient.connect(urlDb, { useUnifiedTopology: true }, (err, client) => {
    if (err) console.log(err);
    console.log('Connected to db');
    app.listen(port, () => console.log(`Listen on port: '${port}`));
    const collection = client.db('pizzeria').collection('orders');
    app.locals.collection = collection;

    process.on('SIGINT', () => {
        console.log("Close process");
        client.close();
        process.exit();
    });
});

app.route('/order/create')
    .post((req, res) => {
        const orderBody = req.body;
        const newOrder = {items: orderBody};
        app.locals.collection.insertOne(newOrder, (err, data) => {
            res.send(`Order with id: '${data.insertedId}' was created`).end();
        });
    });

app.route('/order/:id')
    .get((req, res) => {
        app.locals.collection.findOne({ _id: ObjectId(req.params.id) }, (err, data) => {
            res.status(200).json(data.items);
        });
    })
    .put((req, res) => {
        const orderBody = req.body;
        const updatedOrder = {items: orderBody};
        app.locals.collection.findOneAndUpdate(
            { _id: ObjectId(req.params.id) },
            { $set: updatedOrder },
            { returnNewDocument: false },
            (err, data) => {
                res.send(`Order with id: '${data.value._id}' was updated`).end();
            });
    })
    .delete((req, res) => {
        app.locals.collection.findOneAndDelete({ _id: ObjectId(req.params.id) }, (err, data) => {
            res.send(`User with id: '${data.value._id}' was deleted`).end();
        });
    });