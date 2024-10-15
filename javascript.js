const myLibrary = [
    ['The Hobbit', 'J.R.R. Tolkien', '295', 'yes'],
    ['The Test', 'J.TEEEEST.R. Tolkien', 'ssd295', 'no']
];

console.table(myLibrary);
//console.log(myLibrary.length)


// On page load, add all books in library
addBookToPage(myLibrary)


// Select the add book form button
const form_btn = document.querySelector("#submit");

form_btn.onclick = (event) => {
    
    // Prevent the page from reloading
    event.preventDefault();
    // Add book to library
    addBookToLibrary();
    
} 

// Function activited when user clicks delete on a book
function deletePressed(bookToDelete) {
    console.log(bookToDelete);
    // Remove selected book from myLibrary
    myLibrary.splice(bookToDelete, 1); 
    // Re-draw book boxes
    addBookToPage(myLibrary)
   }


// Function to update number of books info
function numOfBooks(bookArray) {
    let books_text = document.getElementById('num_books');
    books_text.innerText = bookArray.length;
}
    
numOfBooks(myLibrary);

function addBookToLibrary() {
    // Get the form element
    const form = document.getElementById('myForm');

    // Get submitted info from the form 
    const bookName = form.elements['fname'].value;
    const authorName = form.elements['authorName'].value;
    const numPages = form.elements['numPages'].value;
    const hasRead = form.elements['hasRead'].value;
    console.log(bookName);
    form.reset();
    

    const newBookArray = [bookName, authorName, numPages, hasRead]
    myLibrary.push(newBookArray);

    addBookToPage(myLibrary);
}

function addBookToPage(bookArray) {

    // Select the container displaying book cards
    const book_container = document.querySelector(".main_box");

    // Clear the container
    book_container.innerHTML = '';
    

    

    for (let i = 0; i < bookArray.length; i++) {
        let currentBook = bookArray[i]

        // Create bookbox div
        const newDiv = document.createElement("div");
        newDiv.className = 'book_box';

        // Add book name
        var bookName = document.createElement("span")
        bookName.id = 'bookName';
        bookName.innerText = currentBook[0];

        // Add author
        var author = document.createElement("span")
        author.id = 'author';
        author.innerText = currentBook[1];

        // Add number pages
        var numberPages = document.createElement("span")
        numberPages.id = 'pages';
        numberPages.innerText = currentBook[2];

        // Add has read
        var hasRead = document.createElement("span")
        hasRead.id = 'has_read';
        hasRead.innerText = currentBook[3];

        
        
        
        // Add delete button
        var delButton = document.createElement("button")
        delButton.id = 'delButton';
        delButton.value = i;
        delButton.innerHTML = 'Delete ' + i;
        delButton.addEventListener("click", () => {deletePressed(i)})
        
        // Append each span to the book box
        newDiv.appendChild(bookName);
        newDiv.appendChild(author);
        newDiv.appendChild(numberPages);
        newDiv.appendChild(hasRead);
        newDiv.appendChild(delButton);

        // Append book box to the book container div
        book_container.appendChild(newDiv);
    }

    // Update number of books text in side bar
    numOfBooks(myLibrary);
}


