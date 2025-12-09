const myLibrary = new Array;

function Book(title, author, pages, id) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.id = id;
}

function addBookToLibrary(title, author, pages) {
    const id = crypto.randomUUID()
    const book = new Book(title, author, pages, id);
    myLibrary.push(book);
}

//Add new book:
const newBookForm = document.querySelector("#new-book");
newBookForm.addEventListener("submit", (e)=>{
    e.preventDefault();
    const bookName = document.querySelector("#book-name").value;
    const bookAuthor = document.querySelector("#book-author").value;
    const bookPages = document.querySelector("#book-pages").value;
    addBookToLibrary(bookName, bookAuthor, bookPages);

    //Books quantity
    const booksQtty = document.querySelector("#total-books");
    booksQtty.textContent = `Total books stored: ${myLibrary.length}`
})

//Show book list
const showBtn = document.querySelector("#show-btn");
const booksContainer = document.querySelector("#books-container");
showBtn.addEventListener("click", () => {
    booksContainer.innerHTML = "";
    for (let i = 0; i < myLibrary.length; i++) {
        const bookCard = document.createElement("div");
        bookCard.className = "book-card";
        
        const bookName = document.createElement("p")
        bookName.textContent = `Title: ${myLibrary[i].title}`;
        bookCard.appendChild(bookName);

        const bookAuthor = document.createElement("p")
        bookAuthor.textContent = `Author: ${myLibrary[i].author}`;
        bookCard.appendChild(bookAuthor);

        const bookPages = document.createElement("p")
        bookPages.textContent = `Pages: ${myLibrary[i].pages}`;
        bookCard.appendChild(bookPages);

        const bookId = document.createElement("p")
        bookId.textContent = `ID: ${myLibrary[i].id}`;
        bookCard.appendChild(bookId);

        document.querySelector("#books-container").appendChild(bookCard);
    
    }
})





