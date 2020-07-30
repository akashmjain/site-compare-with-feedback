const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();




// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://admin:<password>@cluster0.aoba4.mongodb.net/<dbname>?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });


// get comments
router.get('/',async (req, res) => {
    const comments = await loaCommentsCollection();
    res.send(await comments.find({}).toArray());

})
// add comments
router.post('/', async (req, res) => {
    const comments = await loaCommentsCollection();
    await comments.insertOne({
        product_key: req.body.product_key,
        msg: req.body.msg,
        rating: req.body.rating,
        createdAt: new Date(),
    });
    res.status(201).send();

});

// delete comments
router.delete('/:id', async (req, res) => {
    const comments = await loaCommentsCollection();
    await comments.deleteOne({_id: new mongodb.ObjectID(req.params.id)})
    res.status(200).send();
});



async function loaCommentsCollection() {
    const mongodb_url = 'mongodb+srv://admin:qwerty@123@cluster0.fdguj.mongodb.net/<dbname>?retryWrites=true&w=majority';
    const client = await mongodb.MongoClient.connect(mongodb_url, {
        useNewUrlParser: true
    });

    return client.db('vue_express').collection('posts');
}
module.exports= router;