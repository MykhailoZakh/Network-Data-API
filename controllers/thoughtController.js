const { ObjectId } = require('mongoose').Types;
const { User, Thought, Reaction } = require('../models');

module.exports = {
    // GET all Thoughts
    async getThought(req, res) {
        try {
            const thoughts = await Thought.find().populate('reactions');
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
            }).populate('reactions').select('-__v');
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
            const user = await User.findOneAndUpdate(
                { _id: req.body.userId },
                { $addToSet: { thoughts: thought._id } },
                { new: true }
            );
            if (!user) {
                return res.status(404).json({
                    message: 'Application created, but found no user with that ID',
                })
            }
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

            const user = await User.findOneAndUpdate(
                { thoughts: req.params.thoughtId },
                { $pull: { thoughts: req.params.thoughtId } },
                { new: true }
            );

            if (!user) {
                return res.status(404).json({
                    message: 'Application created but no user with this id!',
                });
            }

            res.json({ message: 'Thought successfully deleted' });
        } catch (error) {
            console.log(error);
            res.status(500).json(err);
        }
    },

    // Add Reaction to selected Thought by ID
    async addReaction(req, res) {
        try {
            // const reaction = await Reaction.create(req.body)
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $addToSet: { reactions: req.body } },
                { new: true }
            );
            if (!thought) {
                return res.status(404).json({
                    message: 'No Thought with that ID',
                })
            }
            res.json(thought);
        } catch (error) {
            console.error(error)
            res.status(500).json(error);
        }
    },

    // Remove Reaction from thought by ID 
    async deleteReaction(req, res) {
        try {
            // const reaction = await Reaction.findOneAndRemove({ _id: req.params.reactionId });
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: { reactions: { reactionId: req.params.reactionId } } },
                { runValidators: true, new: true }
            );
            if (!thought) {
                return res.status(404).json({
                    message: 'No Thought with that ID',
                })
            };
            // if (!reaction) {
            //     return res.status(404).json({
            //         message: 'No Reaction with that ID',
            //     })
            // };
            res.json(`Reaction successfully deleted`);
        } catch (error) {
            console.error(error);
            res.status(500).json(error);
        }
    },
}

