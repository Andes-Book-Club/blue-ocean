import React from 'react';
import axios from 'axios';

function QuizView(props) {
  let { set, prev, next, list, answers, toggleQuiz } = props;
  const choices = [];
  console.log(list);
  if (!Object.keys(set).length) {
    set = list[0];
    if (!set) {
      return (
        <div>
          <h2>No Questions Available</h2>
        </div>
      );
    }
  }

  const responseBody = {
    questionId: set.questionid,
    userId: 1,
    isCorrect: false,
    selectedAnswer: 1,
    userRating: 0,
  };

  let submit = (<button type="button" className="quiz-menu-btn" onClick={() => {
    axios.post('/answers', {
      answers: Object.values(answers),
    })
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
    toggleQuiz(<></>);
  }}>
    Submit
  </button>);

  let nextBtn = (<button
    type="button"
    className="quiz-menu-btn"
    onClick={() => {
      next(set);
    }
    }>
    Next
  </button>);

  function updateVote(vote) {
    if (vote === 1) {
      axios.put(`/questions/update/upvote/${set.questionid}`, {
        upvote: vote,
      })
        .then(data => console.log(data));
    } else {
      axios.put(`/questions/update/downvote/${set.questionid}`, {
        downvote: vote,
      })
        .then(data => console.log(data));
    }
  }

  Object.keys(set).forEach(item => {
    if (item.includes('answer') && item !== 'correctanswer') {
      choices.push(set[item]);
    }
  });

  let buttonType = JSON.stringify(set) === JSON.stringify(list[list.length - 1]) ? submit : nextBtn;
  return (
    <div className="quiz-prompt">
      <div className="question-vote">
        <button
          type="button"
          className="question-vote-choice"
          onClick={() => {
            if (responseBody.userRating === 1) {
              // responseBody.userRating = 0;
              return;
            }
            responseBody.userRating = 1;
            updateVote(responseBody.userRating);
          }}>
          <img src="https://img.icons8.com/ios/44/000000/good-quality--v1.png" />
        </button>
        <button
          type="button"
          className="question-vote-choice"
          onClick={() => {
            if (responseBody.userRating === -1) {
              responseBody.userRating = 0;
              return;
            }
            responseBody.userRating = -1;
            updateVote(responseBody.userRating);
          }}>
          <img src="https://img.icons8.com/ios/44/000000/poor-quality.png" />
        </button>
      </div>
      <p className="quiz-question">
        {set.questionbody}
      </p>

      <form className="answers" onSubmit={(e) => { }}>
        {
          choices.map((answer, i) => {
            return <button id={i + 1} key={i + 1} type="button" className="quiz-answer" onClick={(e) => {
              responseBody.isCorrect = set.correctanswer === parseInt(e.target.id)
              responseBody.selectedAnswer = parseInt(e.target.id);
              answers[set.questionid] = responseBody;
            }}>{answer}</button>;
          })
        }
      </form>

      <div className="quiz-menu">
        <button type="button" className="quiz-menu-btn" onClick={() => prev(set)}>Back</button>
        {buttonType}
      </div>
    </div>
  );
}

export default QuizView;
