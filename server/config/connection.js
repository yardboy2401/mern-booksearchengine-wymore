//require mongoose
const mongoose = require('mongoose');

//mongoose connection to database from Heroku or localhost
mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost/googlebooks',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  },
);

//module export of mongoose.connection
module.exports = mongoose.connection;
