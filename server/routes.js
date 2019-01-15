const express = require('express');
const router = express.Router();
const NewsService = require('./news.service');

const newsService = new NewsService();

router.get('/', (req, res) => res.json(newsService.getAllNews()));

router.get('/:id', (req, res) => {
    const { id } = req.params
    const result = newsService.getNewsById(id);

    if (!result) {
        res.status(404).send(`There is no existing news with id = ${id}`);
    }

    res.json(result);
});

router.post('/', (req, res) => {
    newsService.addNews(req.body);
    res.send();
});

router.put('/:id', (req, res) => {
    const id = +req.params.id;
    const newsToUpdate = newsService.getNewsById(id);

    if (!newsToUpdate) {
        res.status(404).send(`There is no existing news with id = ${id}`);
    }
    newsService.updateNews(id, req.body);
    res.send();
});

router.delete('/:id', (req, res) => {
    const id = +req.params.id;
    const newsToDelete = newsService.getById(id);

    if (!newsToDelete) {
        res.status(404).send(`There is no existing news with id = ${id}`);
    }

    newsService.deleteNews(id);
    res.send();
});

module.exports = router;