const express = require('express');
var bodyParser = require('body-parser');
var routes = require('./routes/routes');
var userRoutes = require('./routes/user.routes');
var penaltyRoutes = require('./routes/penalty.routes');
var personRoutes = require('./routes/person.routes');
var provinceRoutes = require('./routes/province.routes');
var authRoutes = require('./routes/auth.routes');
const path = require('path');
var cors = require('cors');


require('./config/db.relations');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

const PORT = process.env.PORT || 3000;
const app = express();

app.set('view engine', 'ejs');
// db.sequelize.sync();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use('/auth', authRoutes);

app.use('/api', routes);
app.use('/api/user', userRoutes);
app.use('/api/penalty', penaltyRoutes);
app.use('/api/person', personRoutes);
app.use('/api/province', provinceRoutes);



app.listen(PORT, () => {
  console.log(`Server listeniong on ${PORT}`);
});
