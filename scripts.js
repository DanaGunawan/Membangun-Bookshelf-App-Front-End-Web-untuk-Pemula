document.addEventListener('DOMContentLoaded', function () {
    const bookForm = document.getElementById('addBook');
    const titleInput = document.getElementById('title');
    const authorInput = document.getElementById('author');
    const yearInput = document.getElementById('year');
    const isCompleteInput = document.getElementById('check');

    const unreadList = document.getElementById('unread-list');
    const readList = document.getElementById('read-list');

    const BOOKS_KEY = 'books';

    function loadBooks() {
        const books = JSON.parse(localStorage.getItem(BOOKS_KEY)) || [];
        unreadList.innerHTML = '';
        readList.innerHTML = '';
        books.forEach(book => {
            const bookElement = createBookElement(book);
            if (book.isComplete) {
                readList.appendChild(bookElement);
            } else {
                unreadList.appendChild(bookElement);
            }
        });
    }

    function saveBooks(books) {
        localStorage.setItem(BOOKS_KEY, JSON.stringify(books));
    }

    function createBookElement(book) {
        const li = document.createElement('li');
        li.setAttribute('data-bookid', book.id);

        const h3 = document.createElement('h3');
        h3.setAttribute('data-testid', 'bookItemTitle');
        h3.textContent = book.title;
        li.appendChild(h3);

        const pAuthor = document.createElement('p');
        pAuthor.setAttribute('data-testid', 'bookItemAuthor');
        pAuthor.textContent = `Penulis: ${book.author}`;
        li.appendChild(pAuthor);

        const pYear = document.createElement('p');
        pYear.setAttribute('data-testid', 'bookItemYear');
        pYear.textContent = `Tahun: ${book.year}`;
        li.appendChild(pYear);

        const buttonContainer = document.createElement('div');

        const toggleButton = document.createElement('button');
        toggleButton.setAttribute('data-testid', 'bookItemIsCompleteButton');
        toggleButton.textContent = book.isComplete ? 'Belum selesai dibaca' : 'Selesai dibaca';
        toggleButton.addEventListener('click', function () {
            book.isComplete = !book.isComplete;
            updateBook(book);
        });
        buttonContainer.appendChild(toggleButton);

        const deleteButton = document.createElement('button');
        deleteButton.setAttribute('data-testid', 'bookItemDeleteButton');
        deleteButton.textContent = 'Hapus buku';
        deleteButton.addEventListener('click', function () {
            deleteBook(book.id);
        });
        buttonContainer.appendChild(deleteButton);

        li.appendChild(buttonContainer);

        return li;
    }

    function addBook(book) {
        const books = JSON.parse(localStorage.getItem(BOOKS_KEY)) || [];
        books.push(book);
        saveBooks(books);

        const bookElement = createBookElement(book);
        if (book.isComplete) {
            readList.appendChild(bookElement);
        } else {
            unreadList.appendChild(bookElement);
        }
    }

    function updateBook(updatedBook) {
        const books = JSON.parse(localStorage.getItem(BOOKS_KEY)) || [];
        const bookIndex = books.findIndex(book => book.id === updatedBook.id);
        books[bookIndex] = updatedBook;
        saveBooks(books);

        loadBooks();
    }

    function deleteBook(bookId) {
        const books = JSON.parse(localStorage.getItem(BOOKS_KEY)) || [];
        const updatedBooks = books.filter(book => book.id !== bookId);
        saveBooks(updatedBooks);

        loadBooks();
    }

    bookForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const book = {
            id: +new Date(),
            title: titleInput.value,
            author: authorInput.value,
            year: Number(yearInput.value),
            isComplete: isCompleteInput.checked,
        };

        addBook(book);

        bookForm.reset();
    });

    loadBooks();
});
