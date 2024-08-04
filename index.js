require("dotenv").config();
const express = require("express");
const path = require('path');
const app = express();
const customerRoutes = require('./routes/customerRoutes');

const PORT = process.env.PORT || 3001;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', customerRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
