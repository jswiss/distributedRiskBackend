const mongoose = require('mongoose');

// Make sure we are running node 8.4+
const [major, minor] = process.versions.node.split('.').map(parseFloat);
if (major <= 8 && minor <= 4) {
	console.log('Best upgrade your Node version son!');
	process.exit();
}

// import environmental variables from our variables.env file
require('dotenv').config({ path: 'variables.env' });

// Connect to our Database and handle an bad connections
mongoose.connect(process.env.DATABASE);
mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises
mongoose.connection.on('error', err => {
	console.error(`🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → ${err.message}`);
});

// READY?! Let's go! import all of our models
require('./checkins/CheckIn');
require('./locations/Location');
require('./movements/Movement');
require('./teams/Team');
require('./users/User');

// Start our app!
const app = require('./app');
app.set('port', process.env.PORT || 7777);
const server = app.listen(app.get('port'), () => {
	console.log(`Express running → PORT ${server.address().port}`);
});

// Temp send email
// require('./handlers/mail');
