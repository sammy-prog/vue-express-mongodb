const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

//Get Posts
router.get('/', async (req, res) => {
    const posts = await loadPostCollection();
    //find with empty returns all
    res.send(await posts.find({}).toArray());
});
//Add Post 
router.post('/', async(req,res) => {
    const posts = await loadPostCollection();
    await posts.insertOne({
        text: req.body.text,
        createdAt: new Date()
    });
    
    res.status(201).send();
});

//Delete Post
router.delete('/:id', async (req, res) => {
    const posts = await loadPostCollection();
    //mongo requires ids to e changed to objectID
    await posts.deleteOne({_id: new mongodb.ObjectID(req.params.id)});
    res.status(200).send();
})
async function loadPostCollection() {
    //connect to mongodb cluster
    const client = await mongodb.MongoClient.connect 
    ('mongodb+srv://sammy-mongo:sami1234@cluster0.lxxbc.mongodb.net/vue_express?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    return client.db('vue_express').collection('posts');
}

module.exports = router;