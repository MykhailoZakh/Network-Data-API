const { Schema, model } = require('mongoose');
// Schema to create User model
const userSchema = new Schema(
    {
        userName: { type: String, require: true, unique: true, trim: true },
        email: {
            type: String, require: true, unique: true, trim: true, validate: {
                validator: function (v) {
                    return /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(v);
                }
            },
            // match: /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'thought'
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'user'
            }
        ]
    },
    {
        toJSON: {
            virtuals: true
        },
        id: false
    }
);

// Create a virtual property `friendCount` that gets count of friends of the user
userSchema
    .virtual('friendCount')
    // Getter
    .get(function () {
        return this.friends.length;
    })


// Initialize our User model
const User = model('user', userSchema);

module.exports = User;