const books = [];

function Book(title, author, pages, read = false) {
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.toggleRead = function () {
  this.read = !this.read;
};

function addBook(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);
  books.push(newBook);
  displayBooks();
}

function removeBook(id) {
  const index = books.findIndex(book => book.id === id);
  if (index !== -1) {
    books.splice(index, 1);
    displayBooks();
  }
}

function toggleReadStatus(id) {
  const book = books.find(book => book.id === id);
  if (book) {
    book.toggleRead();
    displayBooks();
  }
}

function displayBooks() {
  const container = document.getElementById('books-container');
  container.innerHTML = ''; 

  books.forEach(book => {
    const card = document.createElement('div');
    card.classList.add('book-card');
    card.setAttribute('data-id', book.id);

    card.innerHTML = `
      <h3>${book.title}</h3>
      <p><strong>Author:</strong> ${book.author}</p>
      <p><strong>Pages:</strong> ${book.pages}</p>
      <p><strong>Read:</strong> ${book.read ? 'Yes' : 'No'}</p>
      <button class="toggle-read-btn">${book.read ? 'Mark as Unread' : 'Mark as Read'}</button>
      <button class="delete-btn">Delete</button>
    `;

    card.querySelector('.delete-btn').addEventListener('click', () => {
      removeBook(book.id);
    });

    card.querySelector('.toggle-read-btn').addEventListener('click', () => {
      toggleReadStatus(book.id);
    });

    container.appendChild(card);
  });
}

const newBookBtn = document.getElementById('new-book-btn');
const dialog = document.getElementById('new-book-dialog');
const form = document.getElementById('new-book-form');
const cancelBtn = document.getElementById('cancel-btn');

newBookBtn.addEventListener('click', () => {
  dialog.showModal();
});

cancelBtn.addEventListener('click', () => {
  dialog.close();
  form.reset();
});

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  const title = formData.get('title').trim();
  const author = formData.get('author').trim();
  const pages = parseInt(formData.get('pages'), 10);
  const read = formData.get('read') === 'on';

  if (title && author && pages > 0) {
    addBook(title, author, pages, read);
    dialog.close();
    form.reset();
  } else {
    alert('Please fill out all fields correctly.');
  }
});

addBook('Beauty and the beast', 'Lazarus The III', 230, true);
addBook('The Life Changer', 'Mark Rober', 188, false);
addBook('Roomies Pets', 'Thompson Mack', 105, true);

displayBooks();