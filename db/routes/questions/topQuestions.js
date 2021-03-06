const express = require('express');

const db = require('../../index.js')

const questionsTopQuestionsRouter = express.Router();

questionsTopQuestionsRouter.get('/', (req, res) => {
  db.query(`SELECT questions.questionBody, questions.upvotes, users.profileName
  FROM questions
  JOIN users ON questions.createdBy = users.userId
  ORDER BY upvotes DESC
  LIMIT 5;`)
    .then((data) => {
      res.status(200).send(data.rows);
    }).catch((err) => {
      res.status(500).send(err);
    });
});

module.exports = questionsTopQuestionsRouter