import React from 'react';
import Book from '../../../widgets/Book';
import Carousel from '../../../widgets/Carousel';

const ReadingList = ({ readingBooks, getBooks }) => (
  <div className="reading-list">
    <h2>Currently Reading</h2>
    {readingBooks.length > 0
      ? (
        <Carousel className="reading-section">
          { readingBooks.map((book, index) => (
            <Book
              status="Reading"
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

export default ReadingList;