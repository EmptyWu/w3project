const express = require('express');
const router = express.Router();
const posts = require("../controllers/posts");

router.get('/', async(req, res) => {
   await posts.getData(req, res);
});


router.post('/', async (req, res) => {
    await posts.postData(req, res);
});

router.delete('/', async (req, res) => {
    await posts.deleteAllData(req, res);
});

router.delete('/:id', async (req, res) => {
    await posts.deleteSingleData(req, res);
});

router.patch('/:id', async (req, res) => {
    await posts.patchData(req, res);
});


module.exports = router;