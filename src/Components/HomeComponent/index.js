import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import BookShelf from '../BookShelf';
import {
  get, getAll, update,
} from '../../BooksAPI';

const getAllBooks = async () => {
  const books = await getAll();
  const orderedBooks = {
    currentlyReading: books.filter((book) => book.shelf === 'currentlyReading'),
    wantToRead: books.filter((book) => book.shelf === 'wantToRead'),
    read: books.filter((book) => book.shelf === 'read')
  };
  return orderedBooks;
}

const Home = () => {
  const [orderedBooks, setOrderedBooks] = useState({});
  useEffect(() => {
    const getInitailData = async () => {
      const ordBooks = await getAllBooks();
      setOrderedBooks(ordBooks);
    }
    getInitailData();
  }, []);

  return (
    <div className="list-books">
      <div className="list-books-content">
        <div>
          <BookShelf
            title="Currently Reading"
            books={orderedBooks.currentlyReading || []}
          />

          <BookShelf
            title="Want to Read"
            books={orderedBooks.wantToRead || []}
          />

          <BookShelf
            title="Read"
            books={orderedBooks.read || []}
          />
        </div>
      </div>
      <div className="open-search">
        <Link
          to="/search"
        >
          Add a Book
        </Link>
      </div>
    </div>

  )
}

export default Home;
