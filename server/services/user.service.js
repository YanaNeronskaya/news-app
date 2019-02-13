const User = require('../models/user');

class UserService {
    async getAll() {
        return await User.find();
    }

    async getById(id) {
        return await User.findById(id);
    }

    async getByUsername(username) {
        return await User.findOne({ username });
    }

    async add(user) {
        await User.create([user]);
    }

    async update(id, newUser) {
        await User.findByIdAndUpdate(id, newUser);
    }

    async delete(id) {
        await User.findByIdAndDelete(id);
    }

    async deleteAll() {
        await User.deleteMany();
    }
}

module.exports = UserService;
