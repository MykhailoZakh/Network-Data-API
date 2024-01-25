const { ObjectId } = require('mongoose').Types;
const { User, Thought, Reaction } = require('../models');

module.exports = {
    // GET all Thoughts
    async getThought(req, res) {
        try {
            const thoughts = await Thought.find();
            res.json(thoughts);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    // GET one Thought by id
    async getSingleThought(req, res) {
        try {
            const thought = await Thought.findOne({
                _id: req.params.thoughtId
            }).select('-__v');
            if (!thought) {
                return res.status(404).json({ message: 'No Thought with that ID' });
            }
            res.json(thought);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    // POST create new Thought
    async createThought(req, res) {
        try {
            const thought = await Thought.create(req.body);
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // UPDATE Thought by ID
    async updateThought(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $set: req.body },
                { runValidators: true, new: true }
            );

            if (!thought) {
                return res.status(404).json({ message: 'No Thought with this id!' });
            }

            res.json(thought);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    //   DELETE Thought by ID
    async deleteThought(req, res) {
        try {
            const thought = await Thought.findOneAndRemove({ _id: req.params.thoughtId });

            if (!thought) {
                return res.status(404).json({ message: 'No such thought exists' })
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

            res.json({ message: 'Thought successfully deleted' });
        } catch (error) {
            console.log(error);
            res.status(500).json(err);
        }
    },
}

