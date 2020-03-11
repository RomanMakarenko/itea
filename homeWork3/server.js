const express = require('express');
const app = express();
const port = 8000;
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const missedOrderMSG = 'Sorry, order with such id does not exist';

app.use('/', express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use((req, res, next) => {
    fs.readFile(path.join(__dirname, 'db.json'), (err, data) => {
        if (err) console.log(err);
        const db = data;
        res.locals.db = JSON.parse(db.toString());
        next();
    })
});
app.route('/order/create')
    .post((req, res) => {
        console.log('=========4=========')
        const orderBody = req.body;
        const newId = Object.keys(res.locals.db).length + 2;
        res.locals.db[newId] = {item: orderBody};
        fs.writeFile(path.join(__dirname, 'db.json'), JSON.stringify(res.locals.db), (err) => {
            if (err) console.log(err);
            res.send(`Order with id: '${newId}' was created`).end();
        });
    });

app.route('/order/:id')
    .get((req, res) => {
        console.log('=========1=========')
        const id = req.params.id;
        res.locals.db[id] !== undefined
        ? res.status(200).json(res.locals.db[req.params.id].item)
        : res.status(202).json(missedOrderMSG);
    })
    .put((req, res) => {
        console.log('=========2=========')
        const orderBody = req.body;
        const id = req.params.id;
        try {
            res.locals.db[id].item = orderBody;
        }
        catch (e) {
            res.status(202).json(missedOrderMSG);
        }
        fs.writeFile(path.join(__dirname, 'db.json'), JSON.stringify(res.locals.db), (err) => {
            if (err) console.log(err);
            res.send(`Order with id: '${id}' was updated. `
            + `New order ${JSON.stringify(res.locals.db[req.params.id].item)}`).end();
        });
    })
    .delete((req, res) => {
        console.log('=========3=========')
        const id = req.params.id;
        delete res.locals.db[id];
        fs.writeFile(path.join(__dirname, 'db.json'), JSON.stringify(res.locals.db), (err) => {
            if (err) console.log(err);
            res.send(`Order with id: '${id}' was deleted`).end();
        });
    })


app.listen(port, () => console.log(`Listen on port: '${port}'`));