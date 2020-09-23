const bodyParser = require('body-parser');
const app = require('express')();
const cors = require('cors');
const morgan = require('morgan');
const phoneRoutes = require('./routes/phone')
const usersRoutes = require('./routes/users')
//Cross Origin
app.use(cors());

// Logs
app.use(morgan('dev'));

// Data parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Health check
app.get('/sup', (req, res) => {
  res.status(200).json({ message: 'Whats up' });
});

app.use('/users', usersRoutes);
app.use('/phones', phoneRoutes);

// Error handling
app.use((err, req, res, next) => {
  // format errors
  res.status(err.status || 500).json({
    message: err.message,
    errors: err,
  });
});


module.exports = app;
