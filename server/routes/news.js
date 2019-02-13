const express = require('express');
const router = express.Router();
const NewsService = require('../services/news.service');
const passport = require('passport');

const newsService = new NewsService();

router.get('/', async (req, res) =>res.json(await newsService.getAllNews()));

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const result = await newsService.getNewsById(id);

    if (!result) {
        res.status(404).send(`There is no existing news with id = ${id}`);
    }

    res.json(result);
});

router.post('/', async (req, res) => {
    passport.authenticate('bearer', { session: false }),
    await newsService.addNews(req.body);
    res.send();
});

router.put('/:id',   passport.authenticate('bearer', { session: false }), async (req, res) => {
    const id = +req.params.id;
    const newsToUpdate = await newsService.getNewsById(id);

    if (!newsToUpdate) {
        res.status(404).send(`There is no existing news with id = ${id}`);
    }
    await newsService.updateNews(id, req.body);
    res.send();
});

router.delete('/:id',
    passport.authenticate('bearer', { session: false }),
    async (req, res) => {
        const id = req.params.id;
        const newsToDelete = await newsService.getNewsById(id);
        if (!newsToDelete) {
            req.next();
            return;
        }
        await newsService.deleteNews(id);
        res.send();
    });

router.delete('/',
    passport.authenticate('bearer', { session: false }),
    async (req, res) => {
        await newsService.deleteAllNews();
        res.send();
    });

module.exports = router;
