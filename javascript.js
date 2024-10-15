// Store book class instances
const myLibrary = [];

// Used to track what the current view is
let currentView = 'grid';


function currentViewSetter(currentView) {
    if (currentView == 'grid') {
        addBookToPage(myLibrary);
    } else {
        tableView(myLibrary);
    }
}

// Constructor function to make books
function Book(title, author, pages, has_read) {
    console.log(this.pages);
    this.title = title;
    this.author = author;
    if (pages === undefined || pages === null || pages === '') {
        this.pages = 'unknown';
    } else {
        this.pages = pages
    }
    
    this.has_read = has_read;
}

const starting_books =  [['The Hobbit', 'J.R.R. Tolkien', '295', 'yes'],
['The Test', 'J.TEEEEST.R. Tolkien', '425', 'no']];

// Create initial 2 books
for (let i = 0; i < 2; i++) {
    let book = new Book(...starting_books[i]);
    myLibrary.push(book);
}

// On page load, add all books in library
addBookToPage(myLibrary)

// Select the add book form button
const form_btn = document.querySelector("#submit");

form_btn.onclick = (event) => {
    const form = document.getElementById('myForm');

    if (form.checkValidity()) {
        event.preventDefault();
        addBookToLibrary();
    } else {
        form.reportValidity();
    }


    // Prevent the page from reloading
    
    // Add book to library
    
} 

// Function activited when user clicks delete on a book
function deletePressed(bookToDelete) {
    console.log(bookToDelete);
    // Remove selected book from myLibrary
    myLibrary.splice(bookToDelete, 1); 
    // re-draw current view of the books
    currentViewSetter(currentView);
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
    const bookName = form.elements['bookNameField'].value;
    const authorName = form.elements['authorName'].value;
    const numPages = form.elements['numPages'].value;
    const hasRead = form.elements['hasRead'].value;
    console.log(bookName);
    form.reset();
    
    let book = new Book(bookName, authorName, numPages, hasRead )
    myLibrary.push(book);

    currentViewSetter(currentView);
}

// Add listener to table view button
const tableViewButton = document.querySelector('#tableView');
tableViewButton.addEventListener("click", () => {tableView(myLibrary)});

// Add listener to grid view button
const gridViewButton = document.querySelector('#gridView');
gridViewButton.addEventListener("click", () => {addBookToPage(myLibrary)});



function tableView(bookArray) {
    currentView = 'table';
    // Select the container displaying book cards
    const book_container = document.querySelector(".main_box");
    // Set window to inline display
    book_container.setAttribute("style", "display: inline");

    // Clear the container
    book_container.innerHTML = '';  
    
    const table = document.createElement('table');

    // Create header of table
    const headerRow = document.createElement('tr');
    const headers = ['Title', 'Author', 'Num. pages', 'Completed?', 'Delete'];

    headers.forEach(headerText => {
        const th = document.createElement('th');
        th.textContent = headerText;
        headerRow.appendChild(th);
    })
    table.appendChild(headerRow);

    headersFromClass = ['title', 'author', 'pages'];

    // Add book rows
    bookArray.forEach(function(book, i) {
        const row = document.createElement('tr');
        headersFromClass.forEach(function(header) {
            const td = document.createElement('td');
            td.textContent = book[header];
            row.appendChild(td);
        })
        const td = document.createElement('td');
        
        // Use function to generate the read/not read buttons
        readButtons = createBookButtons(i, book);

        td.appendChild(readButtons.yesRead);
        td.appendChild(readButtons.noRead);    
        row.appendChild(td);
        const td_del = document.createElement('td');
        td_del.appendChild(readButtons.delButton);
        row.appendChild(td_del);

        table.appendChild(row);


        
    })





    book_container.appendChild(table);
}


function updateReadStatus(i, bookRead, buttons) {
    // Update the read status's in MyLibrary
    if (bookRead == 'yes') {
        myLibrary[i].has_read = 'yes';
        
    } else {
        myLibrary[i].has_read  = 'no';  
    }
    
    console.table(myLibrary);
    currentViewSetter(currentView);
}


function createBookButtons(i, currentBook) {
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
    if (currentBook.has_read == 'yes') {
        yesRead.classList.add('yesReadButton');
    } else {
        noRead.classList.add('noReadButton');
    }

    // Add delete button
    var delButton = document.createElement("button")
    delButton.id = 'delButton';
    delButton.value = i;
    delButton.innerHTML = 'Delete';
    delButton.addEventListener("click", () => {deletePressed(i)})


    return {yesRead, noRead, delButton};
}



function addBookToPage(bookArray) {
    currentView = 'grid';

    // Select the container displaying book cards
    const book_container = document.querySelector(".main_box");
    book_container.setAttribute("style", "display: flex");

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
        bookName.innerText = currentBook.title;

        // Add author
        var author = document.createElement("span")
        author.id = 'author';
        author.innerText = currentBook.author;

        // Add number pages
        var numberPages = document.createElement("span")
        numberPages.id = 'pages';
        numberPages.innerText = currentBook.pages + ' pages';

        // Add has read
        var hasRead = document.createElement("span")
        hasRead.id = 'hasRead';
        hasRead.innerHTML = 'Book completed?<br>';

        // Use function to generate the read/not read buttons
        BookButtons = createBookButtons(i, currentBook);

        hasRead.appendChild(BookButtons.yesRead);
        hasRead.appendChild(BookButtons.noRead);        


        

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
        newDiv.appendChild(BookButtons.delButton);

        // Append book box to the book container div
        book_container.appendChild(newDiv);
    }

    // Update number of books text in side bar
    numOfBooks(myLibrary);
}


