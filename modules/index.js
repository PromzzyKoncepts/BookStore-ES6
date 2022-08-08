// Using Class Book represents a book and the various values used
/* eslint-disable import/no-cycle */

import UserInterFace from './userInterface.js';
import Book from './Book.js';
import dates from './luxon.js';

const { DateTime } = dates;

// call the books and add them to the local storage
export default class StoredBooks {
  static getBook() {
    let books;
    if (localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }
    return books;
  }

  static addBook(book) {
    const books = StoredBooks.getBook();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }

  // this part counts the numbber of books present from the local storage
  static bookNumber() {
    const books = JSON.parse(localStorage.getItem('books')) || [];
    return books.length;
  }
}

const listNum = document.getElementById('showListNum');
// on loading or reloading browser, it restored the storedbooks
window.addEventListener('load', () => {
  UserInterFace.showBooks();
  document.getElementsByClassName('library')[0].style.display = 'none';
  document.getElementById('form').style.display = 'flex';
  document.getElementById('contact').style.display = 'none';
  document.getElementsByClassName('formElement')[0].style.display = 'flex';
  document.getElementsByTagName('h1')[0].style.display = 'none';
  listNum.className = 'list';
  listNum.innerText = `${StoredBooks.bookNumber()}`;
});

// addeventlistener functions for the add button
document.querySelector('#add').addEventListener('click', (e) => {
  e.preventDefault();
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const bookAddedMsg = document.getElementById('display-msg');
  const message = document.createElement('p');
  message.className = 'message';
  bookAddedMsg.appendChild(message);
  if (!title || !author) {
    message.innerText = 'Title and author cannot be empty';
    message.classList = 'error';
  } else {
    const book = new Book(title, author);
    StoredBooks.addBook(book);
    UserInterFace.showBookList(book);
    UserInterFace.clearInput();
    message.innerText = 'Great! Your book was successfully added!!';
    listNum.className = 'list';
    listNum.innerText = `${StoredBooks.bookNumber()}`;
  }
  setTimeout(() => {
    message.textContent = '';
    message.style.display = 'none';
  }, 3000);
});

// navbar section
const showContact = document.getElementById('showContact');
const showForm = document.getElementById('showForm');
const showBooks = document.getElementById('showList');

showContact.addEventListener('click', () => {
  document.getElementsByClassName('library')[0].style.display = 'none';
  document.getElementById('contact').style.display = 'flex';
  document.getElementsByClassName('formElement')[0].style.display = 'none';
  document.getElementsByTagName('h1')[0].style.display = 'none';
});

showForm.addEventListener('click', () => {
  document.getElementsByClassName('library')[0].style.display = 'none';
  document.getElementById('form').style.display = 'flex';
  document.getElementById('contact').style.display = 'none';
  document.getElementsByClassName('formElement')[0].style.display = 'flex';
  document.getElementsByTagName('h1')[0].style.display = 'none';
});

showBooks.addEventListener('click', () => {
  document.getElementsByClassName('library')[0].style.display = 'block';
  document.getElementById('contact').style.display = 'none';
  document.getElementsByClassName('formElement')[0].style.display = 'none';
});

const changeNavColor = (index) => {
  const navItems = document.querySelectorAll('.nav-item');
  Array.from(navItems).forEach((item, ind) => (ind === index ? item.classList.toggle('clicked-link') : item.classList.remove('clicked-link')));
};
window.changeNavColor = changeNavColor;

const date = document.getElementsByClassName('date');
date[0].innerHTML = DateTime.now().toLocaleString(DateTime.DATETIME_MED);
