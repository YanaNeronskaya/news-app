const app = require('express')();
const bodyParser = require('body-parser');
const router = require('./routes');
const Logger = require('./logger');
const logger = new Logger();

app.use((req, res) => {
    logger.logInfo(req.method, req.url);
    req.next();
})

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/news', router);

app.use(function(req, res, next) {
    res.status(404).send("Some error :(");
});

app.use(function(err, req, res, next) {
    logger.logError(err.message);
    res.status(500).send('Server does not response :(');
});

app.listen(3000, () => console.log('App listening on port 3000!'));