const { Schema, model } = require('mongoose');
const mongoose = require('mongoose');
// Schema to create Reaction model
const reactionSchema = new Schema(
    {
        reactionId: mongoose.ObjectId,
        reactionBody: { type: String, require: true, maxLength: 280 },
        createdAt: { type: Date, default: Date.now },
        userName: { type: String, require: true },

    },
    {
        toJSON: {
            virtuals: true
        },
        id: false
    }
);

// Create a virtual property `formatedTime` that format a time
reactionSchema
    .virtual('formatedDate')
    .get(function () {
        return this.createdAt.getDate();
    })

// Initialize our Reaction model
const Reaction = model('reaction', reactionSchema);

module.exports = Reaction;