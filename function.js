const myLibrary = [];
const bookContainer = document.getElementById("bookContainer");
const newBookButton = document.getElementById("newBookButton");
const newBookForm = document.getElementById("newBookForm");
const closeBtn = document.querySelector(".close");
const newBookModal = document.getElementById("newBookModal");

function Book(title, author, pages, isRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
}
Book.prototype.toggleReadStatus = function () {
  this.isRead = !this.isRead;
};

Book.prototype.removeBookFromLibrary = function (book) {
  const bookIndex = myLibrary.indexOf(book);
  myLibrary.splice(bookIndex, 1);
  displayBooks();
};

function addBookToLibrary(title, author, pages, isRead) {
  const newBook = new Book(title, author, pages, isRead);
  myLibrary.push(newBook);

  displayBooks();
}

function displayBooks() {
  // Remove all existing book cards
  while (bookContainer.firstChild) {
    bookContainer.removeChild(bookContainer.firstChild);
  }

  myLibrary.map((book) => {
    const bookCard = createBookCard(book);
    bookContainer.appendChild(bookCard);
  });
}

function createBookCard(book) {
  const bookCard = document.createElement("div");
  bookCard.classList.add("book-card");

  const title = document.createElement("h3");
  title.textContent = book.title;
  bookCard.appendChild(title);

  const author = document.createElement("p");
  author.textContent = "Author: " + book.author;
  bookCard.appendChild(author);

  const pages = document.createElement("p");
  pages.textContent = "Pages: " + book.pages;
  bookCard.appendChild(pages);

  const isRead = document.createElement("p");
  isRead.textContent = book.isRead ? "Read: Yes" : "Read: No";
  bookCard.appendChild(isRead);

  const toggleReadButton = document.createElement("button");
  toggleReadButton.textContent = "I Read it";
  toggleReadButton.addEventListener("click", () => {
    book.toggleReadStatus();
    displayBooks();
  });
  bookCard.appendChild(toggleReadButton);

  const removeButton = document.createElement("button");
  removeButton.textContent = "Remove";
  removeButton.addEventListener("click", () =>
    book.removeBookFromLibrary(book)
  );
  bookCard.appendChild(removeButton);

  return bookCard;
}

////////////////////

// Event listener for the "NEW BOOK" button
newBookButton.addEventListener("click", openNewBookModal);

function openNewBookModal() {
  newBookModal.style.display = "block";
}

closeBtn.addEventListener("click", closeNewBookModal);

function closeNewBookModal() {
  newBookModal.style.display = "none";
  resetForm();
}

// Event listener for the book form submission
newBookForm.addEventListener("submit", handleFormSubmission);

function handleFormSubmission(e) {
  e.preventDefault();
  const { title, author, pages, isRead } = extractFormValues();

  addBookToLibrary(title, author, pages, isRead);
  resetForm();
  closeNewBookModal();
  displayBooks();
}

function extractFormValues() {
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const isRead = document.getElementById("isRead").checked;

  return { title, author, pages, isRead };
}

function resetForm() {
  newBookForm.reset(); // Changed bookForm to newBookForm
}

function hideNewBookForm() {
  newBookForm.style.display = "none";
}

// Initial display of books
displayBooks();
