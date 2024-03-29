const { Schema, model } = require('mongoose');
// Schema to create Thought model
const reactionSchema = require('./Reaction');
const thoughtSchema = new Schema(
    {
        thoughtText: { type: String, require: true, minLength: 1, maxLength: 280 },
        createdAt: { type: Date, default: Date.now },
        userName: { type: String, require: true },
        userId: { type: String, require: false },
        reactions: [reactionSchema]
    },
    {
        toJSON: {
            virtuals: true
        },
        id: false
    }
);

// Create a virtual property `reactionCount` that gets count of thoughts in this model
thoughtSchema
    .virtual('reactionCount')
    // Getter
    .get(function () {
        return this.reactions.length;
    })
// Create a virtual property `formatedTime` that format a time
thoughtSchema
    .virtual('formatedDate')
    .get(function () {
        return this.createdAt.toLocaleDateString();
    })

// Initialize our Thought model
const Thought = model('thought', thoughtSchema);

module.exports = Thought;