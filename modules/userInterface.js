/* eslint-disable import/no-cycle */
import StoredBooks from '../index.js';

// the User Interface class that displays the books at the top
let books;
export default class UserInterFace {
  static showBooks() {
    books = StoredBooks.getBook();
    books.forEach((book) => {
      UserInterFace.showBookList(book);
    });
  }

  // This is where i created the html elements dynamically
  static showBookList(book) {
    const bookLib = document.querySelector('.library');
    const bookDiv = document.createElement('div');
    bookDiv.className = 'book-container';
    const titleDiv = document.createElement('h5');
    const authorDiv = document.createElement('h5');
    const removeBtn = document.createElement('button');

    titleDiv.innerText = `${book.title}`;
    authorDiv.innerText = `${book.author}`;
    const bookReferences = document.createElement('p');
    bookReferences.innerText = `${book.title} by ${book.author}`;
    removeBtn.innerText = 'Remove';
    removeBtn.className = 'btn';
    bookDiv.appendChild(bookReferences);
    bookDiv.appendChild(removeBtn);
    bookLib.appendChild(bookDiv);
    removeBtn.addEventListener('click', () => {
      UserInterFace.deleteBook(removeBtn);
      const listNum = document.getElementById('showListNum');
      listNum.className = 'list';
      listNum.innerText = `${StoredBooks.bookNumber()}`;
    });
  }

  static clearInput() {
    document.getElementById('author').value = '';
    document.getElementById('title').value = '';
  }

  // this is the function for the remove button
  static deleteBook(removeBtn) {
    const books = StoredBooks.getBook();
    const bookTitle = removeBtn.parentElement.firstElementChild.innerText;
    const filteredBooks = books.filter((book) => book.title !== bookTitle.slice(0, bookTitle.indexOf('by') - 1));
    localStorage.setItem('books', JSON.stringify(filteredBooks));
    removeBtn.parentElement.remove();
  }
}
// module.exports = {UserInterFace}