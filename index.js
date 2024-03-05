require('dotenv').config();
const express = require('express');
const cors = require('cors');
const session = require('express-session');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 },
}));

const corsOptions = {
    origin: process.env.CLIENT_URL,
    credentials: true,
  };
app.use(cors(corsOptions));

app.get('/', (req, res) => {
  res.send('ok');
});
require('./routes/auth')(app);
require('./routes/business')(app);
require('./routes/message')(app);
require('./routes/product')(app);
require('./models');

const port = 3000;
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
