const { response, request } = require("express");
const express = require("express");

var bodyParser = require("body-parser");

// initialize database
const database = require("./database");

// initialize express
const BookY = express();
BookY.use(bodyParser.urlencoded({extended:true}));
// allowed to use body-parser
BookY.use(bodyParser.json());

// -> GET ALL BOOKS
/*
Route                   /books 
Description             To get all books 
Access                  Public
Parameter               NONE
Methods                 GET
*/
BookY.get("/books", (request,response) => {
    return response.json({books: database.books});
});

// -> GET A SPECIFIC BOOK
/*
Route                   /isbn/:isbn
Description             to get a specific book
Access                  Public
Parameters              isbn
Methods                 GET
*/

BookY.get("/isbn/:isbn", (request,response)=>{
    const getSpecificBook = database.books.filter(
        (book) => book.ISBN === request.params.isbn
    );

    if(getSpecificBook.length === 0){
        return response.json({
            error:`No Book found for ISBN of ${request.params.isbn}`
        });
    }

    return response.json({books :getSpecificBook});

});

// -> GET BOOK BASED ON CATEGORY
/*
Route                   /category/:category
Description             to get a list of books   based on category
Access                  Public
Parameters              category
Methods                 GET
*/
BookY.get("/category/:category",(request,response) =>{
    const getSpecificBook = database.books.filter((book) => book.category.includes(request.params.category)
    );

    if(getSpecificBook.length === 0){
        return response.json({
            error:`No Book found for category of ${request.params.category}`
        });
    }

    return response.json({book: getSpecificBook});
});

// GET BOOKS BASED ON LANGUAGE
/*
Route                   /language/:language
Description             to get a list of books   based on category
Access                  Public
Parameters              language
Methods                 GET
*/

BookY.get("/language/:language",(request,response)=>{
    const getSpecificBook = database.books.filter(
        (book)=> book.language.includes(request.params.language)
    );

    if(getSpecificBook.length === 0){
        return response.json({
            error:`No book found for langauge ${request.params.language}`
        });
    }

    return response.json({book : getSpecificBook});

});

// GET BOOKS BASED ON AUTHORS
/*
Route                   /books/:authors
Description             to get a list of books   based on category
Access                  Public
Parameters              authors
Methods                 GET
*/

BookY.get("/books/:authors", (request,response)=>{
    const getSpecificBook = database.books.filter(
        (book) => book.author.includes(request.params.authors)
    );

    if(getSpecificBook.length === 0){
        return response.json({
            error:`No book found for author ${request.params.authors}`
        });
    }

    return response.json({book: getSpecificBook});
});



// AUTHORS
// -> GET ALL AUTHORS
/*
Route                   /authors
Description             to get a all authors
Access                  Public
Parameters              NONE
Methods                 GET
*/
BookY.get("/authors", (request,response)=>{
    return response.json({authors: database.authors});
});

// -> GET AUTHORS SPECIFIC AUTHOR
/*
Route                   /authors/:author
Description             to get a all authors
Access                  Public
Parameters              author(name)
Methods                 GET
*/

BookY.get("/authors/:author", (request,response)=>{
    const getSpecificAuthor = database.authors.filter(
        (author) => author.name.includes(request.params.author) 
    );

    if(getSpecificAuthor.length === 0){
        return response.json({
            error: `No author found of name ${request.params.author}`
        });
    }

    return response.json({author: getSpecificAuthor});
});


// -> GET AUTHORS BASED ON A BOOK
/*
Route                   /authors/books/:isbn
Description             to get a all authors
Access                  Public
Parameters              isbn
Methods                 GET
*/

BookY.get("/authors/books/:isbn",(request,response)=>{
    const getSpecificAuthor = database.authors.filter((author) => author.book.includes(request.params.isbn)
    );

    if(getSpecificAuthor.length === 0){
        return response.json({
            error:`No Author found for category of ${request.params.isbn}`
        });
    }

    return response.json({author: getSpecificAuthor});
});



// PUBLICATIONS
// -> GET ALL PUBLICATIONS
/*
Route                   /publications
Description             to get a all publications
Access                  Public
Parameters              NONE
Methods                 GET
*/
BookY.get("/publications",(request,response)=>{
    return response.json({publications: database.publications});
});


// -> GET SPECIFIC PUBLICATION
/*
Route                   /publications/:publication
Description             to get a all publications
Access                  Public
Parameters              publication(name)
Methods                 GET
*/

BookY.get("/publications/:publication", (request,response)=>{
    const getSpecificPublication = database.publications.filter(
        (publication) => publication.name.includes(request.params.publication)
    );

    if(getSpecificPublication.length === 0){
        return response.json({
            error:`No publication found for ${request.params.publication}`
        });
    }

    return response.json({publication: getSpecificPublication});
});


// -> GET PUBLICATION BASED ON BOOK
/*
Route                   /publications/books/:isbn
Description             To get publication based on books
Access                  Public
Parameters              isbn
Methods                 GET
*/

BookY.get("/publications/books/:isbn", (request,response)=>{
    const getSpecificPublication = database.publications.filter(
        (publication) => publication.book.includes(request.params.isbn)
    );

    if(getSpecificPublication.length === 0){
        return response.json({
            error:`No publication found for ${request.params.isbn}`
        });
    }

    return response.json({publication: getSpecificPublication});
});


// POST REQUEST
// ADD NEW BOOKS
/*
Route                   /books/new
Description             add new books
Access                  Public
Parameters              NONE
Methods                 POST
*/

BookY.post("/book/new",(request,response)=>{
    const newBook = request.body;
    database.books.push(newBook);
    return response.json({updatedBooks: database.books});
});

// POST REQUEST
// ADD NEW AUTHORS
/*
Route                   /authors/new
Description             add new authors
Access                  Public
Parameters              NONE
Methods                 POST
*/

BookY.post("/author/new",(request,response)=>{
    const newAuthor = request.body;
    database.authors.push(newAuthor);
    return response.json({updatedAuthors: database.authors});
});


// POST REQUEST
// ADD NEW PUBLICATION
/*
Route                   /authors/new
Description             add new authors
Access                  Public
Parameters              NONE
Methods                 POST
*/

BookY.post("/publication/new",(request,response)=>{
    const newPublication = request.body;
    database.publications.push(newPublication);
    return response.json({updatedPublication: database.publications});
});



//UPDATE PUBLICATION AND BOOK
// ADD NEW PUBLICATION
/*
Route                   /publication/update/book
Description             update the pub and the book
Access                  Public
Parameters              isbn
Methods                 Put
*/

BookY.put("/publication/update/book/:isbn", (request,response)=>{
    // UPDATE PUBLICATION DATABASE
    database.publications.forEach((pub)=> {
        if(pub.id === request.body.pubId){
            return pub.book.push(request.params.isbn);
        }
    });


    // UPDATE THE BOOK DATABASE
    database.books.forEach((b) => {
        if(b.ISBN == request.params.isbn){
            b.publications = request.body.pubId;
            return;
        }
    });

    return response.json({
        books: database.books,
        publications: database.publications,
        message: "Successfully updated!"
    });
});


//DELETE A BOOK
// ADD NEW PUBLICATION
/*
Route                   /book/delete
Description             delete a book
Access                  Public
Parameters              isbn
Methods                 delete
*/
BookY.delete("/book/delete/:isbn", (request,response) =>{
    const updateBookDatabase = database.books.filter(
        (book) => book.ISBN !== request.params.isbn
    );

    database.books = updateBookDatabase;

    return response.json({books : database.books});
});



//DELETE AN AUTHOR FROM A BOOK AND A BOOK FROM A AUTHOR
// ADD NEW PUBLICATION
/*
Route                   /book/delete/author
Description             delete an author from a     book and vice versa
Access                  Public
Parameters              isbn, authorId
Methods                 DELETE
*/
BookY.delete("/book/delete/author/:isbn/:authorId", (request,response)=> {

    // Update the book database
    database.books.forEach((b)=>{
        if(b.ISBN === request.params.isbn){
            const newAuthorList = b.author.filter(
                (eachAuthor) => eachAuthor!== parseInt(request.params.authorId)
            )
            b.author = newAuthorList;
            return;
        }
    });

    // UPDATE AUTHOR DATABASE
    database.authors.forEach((a)=>{
        if(a.id === parseInt(request.params.authorId)){
            const newBookList = a.book.filter(
                (book) => book !== request.params.isbn
            );
            a.book = newBookList;
            return;
        }
    });

    return response.json({
        book : database.books,
        author: database.authors,
        message: "Author and book are deleted!"
    })
});



BookY.listen(3000,() => console.log("Server is up and running"));


