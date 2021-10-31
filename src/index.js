const express = require('express');
var bodyParser = require('body-parser');
var routes = require('./routes/routes');
const path = require('path');
var cors = require('cors');
// const db = require('./models');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

const PORT = process.env.PORT || 3005;
const app = express();

// db.sequelize.sync();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());


app.use('/api', routes);

app.listen(PORT, () => {
  console.log(`Server listeniong on ${PORT}`);
});
