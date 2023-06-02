const wmf = document.querySelector('#book-list li:nth-child(2) .name');
// console.log(wmf);

let books = document.querySelectorAll("#book-list li .name")

// New methods
books.forEach(book => {
    console.log(book.textContent);
})


// Old methods
/*
    Array.from(books).forEach(function(book){
        console.log(book)
    })

    Array.from(books).forEach(book => {
        console.log(book)
    })
*/

console.log(books);

let h2 = document.querySelector('#book-list h2');

console.log(h2);

// arrow version
h2.addEventListener('click', e => {
    console.log(e.target);
    console.log(e);
})

// normal version
h2.addEventListener('click', function (e){
    console.log(e.target);
    console.log(e);
})

let btns = document.querySelectorAll('#book-list .delete');

// btns.forEach(btn => {
//     btn.addEventListener('click', e => {
        
//         const li = e.target.parentElement;

//         console.log(`The User deleted ${li.innerHTML}`)

//         // deletes the li tag
//         li.parentNode.removeChild(li);
//     });

// });


// more effiecent way than above as it allows you to add more li later
const list = document.querySelector('#book-list ul');

list.addEventListener('click', e => {
    if(e.target.className == 'delete'){
        const li = e.target.parentElement;
        list.removeChild(li);
    }
})


// document.forms looks for all forms on the page but type add-book looks for the id of the form 
// need to use sqaure brackes as you could do document.forms[1] like an array
const addForm = document.forms['add-book'];

addForm.addEventListener('submit', e =>{
    // stops page reloading on clicking forms submit button
    e.preventDefault();
    
    // finds the value of the what the text typed in the form is and stores it in value const
    const value = addForm.querySelector('input[type="text"]').value

    console.log(value);

    // creating elements   
    const li = document.createElement("li");
    const bookName = document.createElement('span');
    const deleteBtn = document.createElement('span');

    // add content 

    //   adds the text saying delete in the deleteBtn
    deleteBtn.textContent = 'delete';
    
    //   adds teh value of what was typed into the form to the text content of the books name
    bookName.textContent = value;


    // add classes more effience than below method as lets you easily add multiple classes properly with having to add spaces or overwritng classes by accident
    bookName.classList.add('name');
    deleteBtn.classList.add('delete');
    // works as well
    // deleteBtn.className = 'delete'
    
    // -----------------------

    // append to document method append child adds the span tags within the li element we do bookname first as the name is listed before the button in the page
    li.appendChild(bookName);
    li.appendChild(deleteBtn);

    //  adds the li to list of elements
    list.appendChild(li);
})

// -------------------------------------------------------

// hide books
const hideBox = document.querySelector('#hide');

hideBox.addEventListener('change', e => {
    if(hideBox.checked){
        list.style.display ="none";
    } else {
        list.style.display ="initial";
    }
})



// ----------------------------------------------
// filter books
const searchBar = document.forms['search-books'].querySelector('input');

searchBar.addEventListener('keyup', e =>{
    // coverts search term value to lower case to make it easy to match
    const term = e.target.value.toLowerCase();
    const books = list.getElementsByTagName('li');
    // have to type Array.from(books) as it html collection which is not an array if i used querySelectorAll instead it would return a nodelist with is an array
    Array.from(books).forEach(book => {
        // selects the book name span tag which is the first child element and then selects its text only they does an if statement that converts title to lower case only and looks for the index position of the name if the indext position is equal to -1 it means the text cannot be found as it would become a negative index
        const title = book.firstElementChild.textContent;
        if(title.toLowerCase().indexOf(term) != -1){
            book.style.display = 'block';
        } else {
            book.style.display = 'none';
        }
    })
})

// -----------------------------------------------

// tabbed content
const tabs = document.querySelector('.tabs');
const panels = document.querySelectorAll('.panel');
const tabItems = document.querySelectorAll('#tabbed-content .tabs li');

tabs.addEventListener('click', e => {
    if (e.target.tagName === 'LI') {
        const clickedLi = e.target;
        
        // Add 'active' class to the clicked li tag
        clickedLi.classList.add('active');
        
        // Remove 'active' class from the other li tags
        tabItems.forEach(li => {
            if (li !== clickedLi) {
                li.classList.remove('active');
            }
        });

        // targets the data-target attribute's value, which is called 'target' in this case in index.html
        const targetPanel = document.querySelector(clickedLi.dataset.target);
        
        // Show the corresponding panel and hide the others
        panels.forEach(panel => {
            if (panel === targetPanel) {
                panel.classList.add('active');
            } else {
                panel.classList.remove('active');
            }
        });
    }
});


// chat gpt version of the code above

// Get the tabs and panels
// const tabs = document.querySelectorAll('#tabbed-content .tabs li');
// const panels = document.querySelectorAll('#tabbed-content .panel');

// // Add click event listeners to each tab
// tabs.forEach(tab => {
//   tab.addEventListener('click', () => {
//     // Check if the clicked tab is already active
//     if (!tab.classList.contains('active')) {
//       // Remove the 'active' class and background color from all tabs
//       tabs.forEach(tab => {
//         tab.classList.remove('active');
//         tab.style.backgroundColor = '';
//       });

//       // Remove the 'active' class from all panels
//       panels.forEach(panel => panel.classList.remove('active'));

//       // Add the 'active' class and set the background color to the clicked tab
//       tab.classList.add('active');
//       tab.style.backgroundColor = 'lightgreen';

//       // Get the target panel and add the 'active' class
//       const target = document.querySelector(tab.dataset.target);
//       target.classList.add('active');
//     }
//   });
// });
const editbooks = document.querySelectorAll("#book-list li .name");

editbooks.forEach(book => {
    book.addEventListener('click', () => {
        const currentName = book.textContent;
        const newName = prompt('Enter a new name for the book:', currentName);
        if (newName && newName !== currentName) {
            book.textContent = newName;
        }
    });
});