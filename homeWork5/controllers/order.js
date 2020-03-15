const models = require('../models');

const createOrder = (req, res) => {
    const orderData = JSON.parse(req.body);
    models.Order.create(orderData, (err, data) => {
        if(err) console.log(err);
        res.status(201).send(`Order with id: '${data}' was created`).end();
    });
};

const getOrder = (req, res) => {
    models.Order.findById(req.params.id, (err, data) => {
        if (err) console.log(err);
        res.status(200).json(data);
    });
}

const updateOrder = (req, res) => {
    const orderData = JSON.parse(req.body);
    models.Order.findOneAndUpdate(
        { _id: req.params.id },
        orderData,
        { new: true },
        (err, data) => {
            if (err) console.log(err);
            res.send(`Order with id: '${data._id}' was updated`).end();
        });
}

const removeOrder = (req, res) => {
    models.Order.findOneAndRemove({ _id: req.params.id }, (err, data) => {
        if (err) console.log(err);
        res.send(`Order with id: '${data._id}' was deleted`).end();
    });
};

module.exports = {
    createOrder,
    getOrder,
    updateOrder,
    removeOrder,
}
