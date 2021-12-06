require("dotenv").config();
const { response, request } = require("express");
const express = require("express");
const mongoose = require("mongoose");

var bodyParser = require("body-parser");

// initialize databacdcdse
const database = require("./database");

// initialize express
const BookY = express();
BookY.use(bodyParser.urlencoded({extended:true}));
// allowed to use body-parser
BookY.use(bodyParser.json());

// Models
const BookModel = require("./database/books");
const AuthorModel = require("./database/authors");
const PublicationModel = require("./database/publications");
const { findOne } = require("./database/books");

mongoose.connect(
    process.env.MONGO_URL
).then(()=> console.log("Connection Established!!!"));

// -> GET ALL BOOKS
/*
Route                   /books 
Description             To get all books 
Access                  Public
Parameter               NONE
Methods                 GET
*/
BookY.get("/books",async (request,response) => {
    const getAllBooks = await BookModel.find();
    return response.json(getAllBooks);
});

// -> GET A SPECIFIC BOOK
/*
Route                   /isbn/:isbn
Description             to get a specific book
Access                  Public
Parameters              isbn
Methods                 GET
*/

BookY.get("/isbn/:isbn",async (request,response)=>{
    const getSpecificBook = await BookModel.findOne({
        ISBN: request.params.isbn
    });

    if(!getSpecificBook){
        return response.json({
            error:`No Book found for ISBN of ${request.params.isbn}`
        });
    }

    return response.json(getSpecificBook);

});

// -> GET BOOK BASED ON CATEGORY
/*
Route                   /category/:category
Description             to get a list of books   based on category
Access                  Public
Parameters              category
Methods                 GET
*/
BookY.get("/category/:category",async (request,response) =>{
    const getSpecificBook = await BookModel.findOne(
        {category: request.params.category}
    );

    if(!getSpecificBook){
        return response.json({
            error:`No Book found for category of ${request.params.category}`
        });
    }

    return response.json(getSpecificBook);
});

// GET BOOKS BASED ON LANGUAGE
/*
Route                   /language/:language
Description             to get a list of books   based on category
Access                  Public
Parameters              language
Methods                 GET
*/

BookY.get("/language/:language",async (request,response)=>{
    const getSpecificBook = await BookModel.findOne(
        {language: request.params.language}
    );

    if(!getSpecificBook){
        return response.json({
            error:`No book found for langauge ${request.params.language}`
        });
    }

    return response.json(getSpecificBook);

});

// GET BOOKS BASED ON AUTHORS
/*
Route                   /books/:authors
Description             to get a list of books   based on category
Access                  Public
Parameters              authors
Methods                 GET
*/

BookY.get("/books/:authors", async (request,response)=>{
    const getSpecificBook = await BookModel.findOne(
        {authors: request.params.authors}
    );

    if(!getSpecificBook){
        return response.json({
            error:`No book found for author ${request.params.authors}`
        });
    }

    return response.json(getSpecificBook);
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
BookY.get("/authors",async (request,response)=>{
    const getAllAuthors = AuthorModel.find();
    return response.json(getAllAuthors);
});

// -> GET AUTHORS SPECIFIC AUTHOR
/*
Route                   /authors/:author
Description             to get a all authors
Access                  Public
Parameters              author(name)
Methods                 GET
*/

BookY.get("/authors/:author",async (request,response)=>{
    const getSpecificAuthor = await AuthorModel.findOne(
        {name: request.params.author}
    );

    if(!getSpecificAuthor){
        return response.json({
            error: `No author found of name ${request.params.author}`
        });
    }

    return response.json(getSpecificAuthor);
});


// -> GET AUTHORS BASED ON A BOOK
/*
Route                   /authors/books/:isbn
Description             to get a all authors
Access                  Public
Parameters              isbn
Methods                 GET
*/

BookY.get("/authors/books/:isbn",async (request,response)=>{
    const getSpecificAuthor = await AuthorModel.findOne(
        {ISBN: request.params.isbn}
    );

    if(!getSpecificAuthor){
        return response.json({
            error:`No Author found for category of ${request.params.isbn}`
        });
    }

    return response.json(getSpecificAuthor);
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
BookY.get("/publications", async (request,response)=>{
    const getAllPublications = PublicationModel.find();
    return response.json(getAllPublications);
});


// -> GET SPECIFIC PUBLICATION
/*
Route                   /publications/:publication
Description             to get a all publications
Access                  Public
Parameters              publication(name)
Methods                 GET
*/

BookY.get("/publications/:publication", async (request,response)=>{
    const getSpecificPublication = await PublicationModel.findOne( 
        {name:request.params.publication}
    );

    if(!getSpecificPublication){
        return response.json({
            error:`No publication found for ${request.params.publication}`
        });
    }

    return response.json(getSpecificPublication);
});


// -> GET PUBLICATION BASED ON BOOK
/*
Route                   /publications/books/:isbn
Description             To get publication based on books
Access                  Public
Parameters              isbn
Methods                 GET
*/

BookY.get("/publications/books/:isbn",async (request,response)=>{
    const getSpecificPublication = await PublicationModel.findOne( 
        {ISBN: request.params.isbn}
    );

    if(!getSpecificPublication){
        return response.json({
            error:`No publication found for ${request.params.isbn}`
        });
    }

    return response.json(getSpecificPublication);
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

BookY.post("/book/new",async(request,response)=>{
    const { newBook } = request.body;
    const addNewBook = BookModel.create(newBook);
    return response.json({books: addNewBook, message:"Your Book has been added"});
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

BookY.post("/author/new",async (request,response)=>{
    const { newAuthor } = request.body;
    const addNewAuthor = AuthorModel.create(newAuthor);
    return response.json({authors: addNewAuthor, message: "New Author was added"});
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

BookY.post("/publication/new",async (request,response)=>{
    const { newPublication } = request.body;
    const addNewPublication = PublicationModel.create(newPublication);
    return response.json({publications: addNewPublication, message:"New Publication has been added"});
});

// UPDATE ABOOK TITLE
/*
Route                   /book/update/:isbn
Description             update the title of the book
Access                  Public
Parameters              isbn
Methods                 Put
*/
BookY.put("/book/update/:isbn", async (request, response)=>{
    const updatedBook  = await BookModel.findOneAndUpdate(
        {
            ISBN : request.params.isbn
        },
        {
            title : request.body.bookTitle
        },
        {
            new: true
        }
    )
    return response.json({books : updatedBook});
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
BookY.delete("/book/delete/:isbn", async (request,response) =>{
    const updateBookDatabase = await BookModel.findOneAndDelete(
        {
            ISBN: request.params.isbn
        }
    );

    return response.json({books : updateBookDatabase});
});



//DELETE AN AUTHOR FROM A BOOK AND A BOOK FROM A AUTHOR
// ADD NEW PUBLICATION
/*
Route                   /book/delete/author
Description             delete an author from a book and vice versa
Access                  Public
Parameters              isbn, authorId
Methods                 DELETE
*/
BookY.delete("/book/delete/author/:isbn/:authorId", async (request,response)=> {

    // Update the book database
    const updatedBook =  await BookModel.findOneAndUpdate(
        {
            ISBN : request.params.isbn
        },
        {
            $pull :{
                authors : parseInt(request.params.authorId)
            }
        },
        {
            new: true
        }
    )

    // Update the author Database
    const updatedAuthor = await AuthorModel.findOneAndUpdate(
        {
            authorId : parseInt(request.params.authorId)
        },
        {
            $pull :{
                books : request.params.isbn
            }
        },
        {
            new:true
        }
    )

    return response.json({
        book : updatedBook,
        author: updatedAuthor,
        message: "Author and book are deleted!"
    })
});



BookY.listen(3000,() => console.log("Server is up and running"));


