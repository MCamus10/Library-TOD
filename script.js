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
const newBookForm = document.getElementById("new-book");
newBookForm.addEventListener("submit", (e)=>{
    e.preventDefault();
    const title = document.getElementById("book-name").value;
    const author = document.getElementById("book-author").value;
    const pages = document.getElementById("book-pages").value;
    const read  = document.querySelector("input[name='is-read']:checked").value === "true"; //convierte bookRead a boolean.
    const uniqueId = `book-${crypto.randomUUID()}`;
    addBookToLibrary(title, author, pages, read, uniqueId);
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
    bookRead.id = uniqueId;
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
    toggleButton.id = uniqueId;
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
    if (e.target.matches(".toggle-btn")){
        //Toggle button text
        if (e.target.textContent === "Mark as read"){
            e.target.textContent = "Mark as not read";
        } else {
            e.target.textContent = "Mark as read";
        }
        //Toggle read status
        const bookToToggleId = e.target.id;
        const index = myLibrary.findIndex(book => book.id === bookToToggleId);
        myLibrary[index].read = !myLibrary[index].read;
        const readContent = document.querySelector(".read-status#" + myLibrary[index].id);
    
        if (readContent.textContent === "Yes"){
            readContent.textContent = "No"
        } else {
            readContent.textContent = "Yes"        
        };
        
    };
});










