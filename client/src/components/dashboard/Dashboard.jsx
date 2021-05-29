import React, { useState, useEffect } from 'react';
import axios from 'axios';
import QuizzesList from './quizzes/QuizzesList';
import ReadingList from './reading/ReadingList';
import LineGraph from '../metrics/LineGraph';
import CompletedList from './completed/CompletedList';
import QuizModal from './quizzes/QuizModal';

const Dashboard = () => {
  const [books, updateBooks] = useState([]);
  const [quizzes, updateQuizzes] = useState([]);
  const [modal, toggleModal] = useState(<></>);


  const getQuizzes = () => {
    axios.get('/users/quizzes')
    .then((res) => {
      updateQuizzes(res.data);
    }).catch((err) => {
      console.log('error: ', err);
    });
  };

  const getBooks = () => {
    axios.get('/users/books')
      .then((res) => {
        updateBooks(res.data);
        getQuizes();
      }).catch((err) => {
        console.log('error: ', err);
      });
  };
  function closeQuiz(jsx) {
    toggleModal(jsx);
  }

  function toggleQuiz(bookid) {
    toggleModal(<QuizModal bookId={bookid} toggleQuiz={closeQuiz} />);
  }

  useEffect(() => {
    getBooks();
    getQuizzes();
  }, []);

  return (
    <div className="dashboard">
      <QuizzesList quizzes={quizzes} toggleQuiz={toggleQuiz} />
      {modal}
      <LineGraph />
      <ReadingList
        getBooks={getBooks}
        readingBooks={books.filter((book) => !book.iscompleted)}
        books={books}
      />
      <CompletedList
        getBooks={getBooks}
        completedBooks={books.filter((book) => book.iscompleted)}
        books={books}
      />
    </div>
  );
};

export default Dashboard;