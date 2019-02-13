const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
    res.render('index', { title: 'Express', user: req.user });
});

module.exports = router;
