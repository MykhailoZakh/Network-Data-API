const connection = require('../config/connection');

const { User, Reaction, Thought } = require('../models');

const { userData, thoughtData, reactionData } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('connected');
    // Delete the collections if they exist
    let usersCheck = await connection.db.listCollections({ name: 'users' }).toArray();
    if (usersCheck.length) {
        await connection.dropCollection('users');
    }

    let thoughtsCheck = await connection.db.listCollections({ name: 'thoughts' }).toArray();
    if (thoughtsCheck.length) {
        await connection.dropCollection('thoughts');
    }

    let reactionsCheck = await connection.db.listCollections({ name: 'reactions' }).toArray();
    if (reactionsCheck.length) {
        await connection.dropCollection('reactions');
    }

    // Add users, thoughts, and reaction to the collection and await the results
    await User.collection.insertMany(userData);
    await Thought.collection.insertMany(thoughtData);
    await Reaction.collection.insertMany(reactionData);


    // Add courses to the collection and await the results


    // Log out the seed data to indicate what should appear in the database
    console.table(userData);
    console.table(thoughtData);
    console.table(reactionData);
    console.info('Seeding complete! 🌱');
    process.exit(0);
});
