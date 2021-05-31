import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import QuizzesList from './quizzes/QuizzesList';
import ReadingList from './reading/ReadingList';
import LineGraph from '../metrics/LineGraph';
import CompletedList from './completed/CompletedList';
import QuizModal from './quizzes/QuizModal';

const Dashboard = () => {
  const [books, updateBooks] = useState([]);
  const [quizzes, updateQuizzes] = useState([]);
  // const [modal, toggleModal] = useState(<></>);
  const [modal, setModal] = useState(false);
  const [quiz, setQuiz] = useState(null);

  const toggleModal = () => setModal(!modal);

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
        getQuizzes();
      }).catch((err) => {
        console.log('error: ', err);
      });
  };

  function toggleQuiz(bookid) {
    // toggleModal(<QuizModal bookId={bookid} toggleQuiz={closeQuiz} />);
    setQuiz(bookid);
    toggleModal();
  }

  useEffect(() => {
    getBooks();
    getQuizzes();
  }, []);

  return (
    <div className="dashboard">
      <QuizzesList quizzes={quizzes} toggleQuiz={toggleQuiz} />
      <Modal isOpen={modal} toggleModal={toggleModal} className="popup">
        <ModalHeader toggleModal={toggleModal}>Quiz</ModalHeader>
        <ModalBody>
          <QuizModal bookid={quiz} className="quiz" />
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggleModal}>Cancel Quiz</Button>
        </ModalFooter>
      </Modal>
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
