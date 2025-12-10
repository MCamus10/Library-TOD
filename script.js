const myLibrary = new Array;

function Book(title, author, pages, read, id) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = id;
}

function addBookToLibrary(title, author, pages, read, id) {
    const book = new Book(title, author, pages, read, id);
    myLibrary.push(book);

}

//Add new book:
const newBookForm = document.querySelector("#new-book");
newBookForm.addEventListener("submit", (e)=>{
    e.preventDefault();
    const title = document.querySelector("#book-name").value;
    const author = document.querySelector("#book-author").value;
    const pages = document.querySelector("#book-pages").value;
    const read  = document.querySelector("input[name='is-read']:checked").value === "true"; //convierte bookRead a boolean.
    const uniqueId = crypto.randomUUID();
    addBookToLibrary(title, author, pages, read, uniqueId);
    document.getElementById("new-book").reset();

    //Books quantity
    const booksQtty = document.querySelector("#total-books");
    booksQtty.textContent = `Total books stored: ${myLibrary.length}`;

    //Add book to table
    const booksTable = document.querySelector("#books-table");
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

    booksTable.appendChild(bookRow);
});

//Remove book functionality
document.body.addEventListener("click", (e)=>{
    if (e.target.matches(".remove-btn")){
        const bookToDelete = e.target.id;
        const index = myLibrary.findIndex(book => book.id === bookToDelete);
        myLibrary.splice(index, 1);
        const rowToDelete = document.getElementById(bookToDelete);
        document.getElementById(bookToDelete).remove();
        const booksQtty = document.querySelector("#total-books");
        booksQtty.textContent = `Total books stored: ${myLibrary.length}`;
    };
});







