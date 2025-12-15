const myLibrary = [];

class Book {
    constructor(title, author, pages, read, id) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
        this.id = id;
    }

    toggleRead() {
        this.read = !this.read;
    }

    getReadText() {
        return this.read ? "Yes" : "No";
    }

    getToggleButtonText() {
        return this.read ? "Mark as not read" : "Mark as read"
    }
}

function addBookToLibrary(data) {
    myLibrary.push(new Book(
        data.title,
        data.author,
        data.pages,
        data.read,
        data.id
    ));
}

//Add new book:
const newBookForm = document.getElementById("new-book");
newBookForm.addEventListener("submit", (e)=>{
    e.preventDefault();
    const title = document.getElementById("book-name").value;
    const author = document.getElementById("book-author").value;
    const pages = document.getElementById("book-pages").value;
    const read  = document.querySelector("input[name='is-read']:checked").value === "true"; //convierte bookRead a boolean.
    const uniqueId = `book-${crypto.randomUUID()}`;
    addBookToLibrary({title, author, pages, read, id: uniqueId});
    document.getElementById("new-book").reset();

    //Books quantity
    const booksQtty = document.getElementById("book-count");
    booksQtty.textContent = myLibrary.length;

    //Add book to table
    const booksTable = document.getElementById("books-table");
    const bookRow = document.createElement("tr");
    bookRow.id = uniqueId;
    
    const bookName = document.createElement("td");
    bookName.textContent = title;
    bookRow.appendChild(bookName);

    const bookAuthor = document.createElement("td");
    bookAuthor.textContent = author;
    bookRow.appendChild(bookAuthor);

    const bookPages = document.createElement("td")
    bookPages.textContent = pages;
    bookRow.appendChild(bookPages);

    const bookRead = document.createElement("td");
    bookRead.className = "read-status";
    bookRead.dataset.id = uniqueId;
    bookRead.textContent = read ? "Yes" : "No";
    bookRow.appendChild(bookRead);

    const bookId = document.createElement("td");
    bookId.textContent = uniqueId;
    bookRow.appendChild(bookId);

    //Remove button
    const removeColumn = document.createElement("td");
    const removeButton = document.createElement("button");
    removeButton.className = "remove-btn";
    removeButton.id = uniqueId;
    removeButton.textContent = "Remove";
    removeColumn.appendChild(removeButton);
    bookRow.appendChild(removeColumn);

    //Add toggle read status button
    const toggleColumn = document.createElement("td");
    const toggleButton = document.createElement("button");
    toggleButton.className = "toggle-btn";
    toggleButton.dataset.id = uniqueId;
    if (read) {
        toggleButton.textContent = "Mark as not read";
    } else {
        toggleButton.textContent = "Mark as read";
    };
    toggleColumn.appendChild(toggleButton);
    bookRow.appendChild(toggleColumn);

    booksTable.appendChild(bookRow);
});

//Remove book functionality
document.body.addEventListener("click", (e)=>{
    if (e.target.matches(".remove-btn")){
        const bookToDeleteId = e.target.id;
        const index = myLibrary.findIndex(book => book.id === bookToDeleteId);
        myLibrary.splice(index, 1);
        document.getElementById(bookToDeleteId).remove();
        //Update book counter
        const booksQtty = document.getElementById("book-count");
        booksQtty.textContent = myLibrary.length;
    };
});

//Toggle read status functionality
document.body.addEventListener("click", (e)=>{
    if (e.target.matches(".toggle-btn")) {
        const bookId = e.target.dataset.id;

        const book = myLibrary.find(book => book.id === bookId);
        if (!book) return;

        book.toggleRead();

        e.target.textContent = book.getToggleButtonText();

        const readContent = document.querySelector(`.read-status[data-id="${book.id}"]`);
        readContent.textContent = book.getReadText();
    } else return;
});








