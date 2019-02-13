const News = require('../models/news');

class NewsService {
    async getAllNews() {
        return await News.find();
    }

    async getNewsById(id) {
        return await News.findById(id);
    }

    async addNews(newData) {
        await News.create([newData]);
    }

    async updateNews(id, newNews) {
        await News.findByIdAndUpdate(id, newNews);
    }

    async deleteNews(id) {
        await News.findByIdAndDelete(id);
    }

    async deleteAllNews() {
        await News.deleteMany();
    }
}

module.exports = NewsService;
