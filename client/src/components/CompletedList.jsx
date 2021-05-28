import React, { useState, useEffect } from 'react';
import Book from './Book';
import Carousel from '../widgets/Carousel';

const CompletedList = ({ completedBooks, getBooks, books }) => (
  <div className="completed-list">
    <h2>Completed Reading</h2>
    {completedBooks.length > 0
      ? (
        <Carousel className="completed-section">
          { completedBooks.map((book, index) => (
            <Book
              status="Completed"
              key={index}
              book={book}
              index={index}
              getBooks={getBooks}
            />
          ))}
        </Carousel>
      )
      : <></>}
  </div>
);

export default CompletedList;
