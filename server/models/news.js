const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const NewsSchema = new Schema({
    id: ObjectId,
    source: {
        id: String,
        name: String
    },
    description: String,
    url: String,
    author: String,
    title: String,
    publishedAt: Date
});

const News = mongoose.model('News', NewsSchema);

module.exports = News;
