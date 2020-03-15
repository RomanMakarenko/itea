const express = require('express');
const app = express();
const port = 8001;
const mongoose = require('mongoose');
const ObjectId = require('mongodb').ObjectId;
const bodyParser = require('body-parser');
const mongoUserName = 'romanmakarenko';
const mongoPassword = 'qw123123';
const dbName = 'pizzeria';
const urlDb = `mongodb+srv://${mongoUserName}:${mongoPassword}@cluster0-ndmjg.mongodb.net/${dbName}?retryWrites=true&w=majority`;

app.use(bodyParser.json());
app.use(bodyParser.text());
app.use('/', express.static('public'));


mongoose.connect(urlDb);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('DB connected')
});

const Orders = mongoose.model(dbName, { items: String }, 'orders');
Orders.find({ _id: '5e68e8efeba7127071a71d8d' }, 'items', function (err, order) {
    if (err) return handleError(err);
    console.log(order)
  })

app.route('/order/create')
    .post((req, res) => {
        const orderBody = req.body;
        const newOrder = {items: orderBody};
        mongoose.connection.collection.insertOne(newOrder, (err, data) => {
            console.log(data)
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

    app.listen(port, () => console.log(`Listen on port: '${port}`));