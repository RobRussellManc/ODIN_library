const myLibrary = [
    ['The Hobbit', 'J.R.R. Tolkien', '295', 'yes'],
    ['The Test', 'J.TEEEEST.R. Tolkien', '425', 'no']
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


function updateReadStatus(i, bookRead, buttons) {
    // Update the read status's in MyLibrary
    if (bookRead == 'yes') {
        myLibrary[i][3] = 'yes';
        
    } else {
        myLibrary[i][3] = 'no';
        
    }
    
    console.table(myLibrary);
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

        // Create spans/headers for each bit of info
        var bookNameHeader = document.createElement("span");
        bookNameHeader.innerText = 'Book title';
        bookNameHeader.classList.add('bookHeader');
        var authorNameHeader = document.createElement("span");
        authorNameHeader.innerText = 'Author';
        authorNameHeader.classList.add('bookHeader');
        var pagesHeader = document.createElement("span");
        pagesHeader.innerText = '# pages';
        pagesHeader.classList.add('bookHeader');
        var hasReadHeader = document.createElement("span");
        hasReadHeader.innerText = 'Book completed?';
        hasReadHeader.classList.add('bookHeader');

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
        numberPages.innerText = currentBook[2] + ' pages';

        // Add has read
        var hasRead = document.createElement("span")
        hasRead.id = 'hasRead';
        hasRead.innerHTML = 'Book completed?<br>';

        // Create read/not read buttons
        var yesRead = document.createElement("button");
        yesRead.innerText = 'Yes';
        yesRead.classList.add('readButton');
        yesRead.addEventListener("click", () => {updateReadStatus(i, 'yes')});


        var noRead = document.createElement("button");
        noRead.innerText = 'No'
        noRead.classList.add('readButton');
        noRead.addEventListener("click", () => {updateReadStatus(i, 'no')});

        // Set the default colors of the read buttons
        if (currentBook[3] == 'yes') {
            yesRead.classList.add('yesReadButton');
        } else {
            noRead.classList.add('noReadButton');
        }

        hasRead.appendChild(yesRead);
        hasRead.appendChild(noRead);        
        
        // Add delete button
        var delButton = document.createElement("button")
        delButton.id = 'delButton';
        delButton.value = i;
        delButton.innerHTML = 'Delete';
        delButton.addEventListener("click", () => {deletePressed(i)})
        

        // Create spans/headers for each bit of info
        var textby = document.createElement("span");
        textby.innerText = 'by';
        textby.classList.add('bookHeader');

     
        // Append each span to the book box
        newDiv.appendChild(bookName);
        // Add the word 'by' between bookname and author
        newDiv.appendChild(textby);
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


