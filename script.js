const myLibrary = new Array;

function Book(title, author, pages, read, id) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = id;
}

function addBookToLibrary(title, author, pages, read) {
    const id = crypto.randomUUID()
    const book = new Book(title, author, pages, read, id);
    myLibrary.push(book);
}

//Add new book:
const newBookForm = document.querySelector("#new-book");
newBookForm.addEventListener("submit", (e)=>{
    e.preventDefault();
    const bookName = document.querySelector("#book-name").value;
    const bookAuthor = document.querySelector("#book-author").value;
    const bookPages = document.querySelector("#book-pages").value;
    const bookRead  = document.querySelector("input[name='is-read']:checked").value === "true"; //convierte bookRead a boolean.
    addBookToLibrary(bookName, bookAuthor, bookPages, bookRead);
    document.getElementById("new-book").reset();

    //Books quantity
    const booksQtty = document.querySelector("#total-books");
    booksQtty.textContent = `Total books stored: ${myLibrary.length}`
})

//Show book list with button
const showBtn = document.querySelector("#show-btn");
const booksContainer = document.querySelector("#books-container");
showBtn.addEventListener("click", () => {
    booksContainer.innerHTML = "";
    for (let i = 0; i < myLibrary.length; i++) {
        const bookCard = document.createElement("div");
        bookCard.className = "book-card";
        
        const bookName = document.createElement("p");
        bookName.textContent = `Title: ${myLibrary[i].title}`;
        bookCard.appendChild(bookName);

        const bookAuthor = document.createElement("p");
        bookAuthor.textContent = `Author: ${myLibrary[i].author}`;
        bookCard.appendChild(bookAuthor);

        const bookPages = document.createElement("p")
        bookPages.textContent = `Pages: ${myLibrary[i].pages}`;
        bookCard.appendChild(bookPages);

        const bookRead = document.createElement("p");
        bookRead.textContent = myLibrary[i].read ? "This book is already read" : "This book has not been read";
        bookCard.appendChild(bookRead);

        const bookId = document.createElement("p");
        bookId.textContent = `ID: ${myLibrary[i].id}`;
        bookCard.appendChild(bookId);

        const removeButton = document.createElement("button");
        removeButton.className = "delete-book-btn";
        removeButton.textContent = "Delete";
        removeButton.addEventListener("click", ()=>{
            //code to remove book;
        })
        bookCard.appendChild(removeButton);

        document.querySelector("#books-container").appendChild(bookCard);
    
    }
})







