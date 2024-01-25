const { ObjectId } = require('mongoose').Types;
const { User, Thought, Reaction } = require('../models');

module.exports = {
    // GET all Users
    async getUsers(req, res) {
        try {
            const users = await User.find();
            res.json(users);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    // GET one User by id
    async getSingleUser(req, res) {
        try {
            const user = await User.findOne({
                _id: req.params.userId
            }).select('-__v');
            if (!user) {
                return res.status(404).json({ message: 'No student with that ID' });
            }
            res.json(user);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    // POST create new User
    async createUser(req, res) {
        try {
            const user = await User.create(req.body);
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // UPDATE User by ID
    async updateUser(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $set: req.body },
                { runValidators: true, new: true }
            );

            if (!user) {
                return res.status(404).json({ message: 'No application with this id!' });
            }

            res.json(user);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    //   DELETE User by ID
    async deleteUser(req, res) {
        try {
            const user = await User.findOneAndRemove({ _id: req.params.userId });

            if (!user) {
                return res.status(404).json({ message: 'No such student exists' })
            }

            // const users = await User.updateMany(
            //     { students: req.params.studentId },
            //     { $pull: { students: req.params.studentId } },
            //     { new: true }
            // );

            // if (!course) {
            //     return res.status(404).json({
            //         message: 'Student deleted, but no courses found',
            //     });
            // }

            res.json({ message: 'User successfully deleted' });
        } catch (error) {
            console.log(error);
            res.status(500).json(err);
        }
    },
}

