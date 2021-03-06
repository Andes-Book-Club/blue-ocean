const express = require('express');
const axios = require('axios');
const db = require('../../../index');

const setReadingRouter = express.Router();

setReadingRouter.put('/:bookId', (req, res) => {
  let bookId = req.params.bookId;
  let userId = req.session.userId;
  
  db.query(`
    UPDATE userBooks
    SET isCompleted = false
    WHERE userId = ${userId} AND bookId = '${bookId}'
  `)
    .then((dbRes) => {
      res.status(200).send(dbRes);
    }).catch((err) => {
      console.log('end err: ', err);
      res.status(500).send(err);
    });
});

module.exports = setReadingRouter;
