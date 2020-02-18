const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

require('dotenv').config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());

app.get('/', (req, res) => res.status(200).send({
  message: 'API works!'
}));

app.use('/api', require('./server/routes'));

// error handler
app.use((err, req, res, next) => res.status(401).json(err.message))

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));

module.exports = app;