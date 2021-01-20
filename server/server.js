/* eslint-disable no-console */
const express = require('express');

const db = require('../database/connection.js');
db.icons = require('../database/models/icons.model.js');
db.overview = require('../database/models/overview.model.js');
// const queries = require('../database/database.js');

const app = express();

app.use(express.static('./public/dist'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

db.overview.belongsToMany(db.icons, { through: 'overview_icons' });
db.icons.belongsToMany(db.overview, { through: 'overview_icons' });

app.get('/overview/icons/', (req, res) => {
  const productNum = req.query.product_id;
  return db.overview.findByPk(productNum, { include: [db.icons] })
    .then((overviewInfo) => {
      res.send(overviewInfo);
    })
    .catch((err) => {
      console.log('ERROR IN SERVER: ', err);
    });
});

app.listen(6001, () => {
  console.log('listening on port 6001!');
});
