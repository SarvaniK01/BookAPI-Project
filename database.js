const books = [
    {
        ISBN:"B01",
        title:"Rich Dad Poor Dad",
        pubDate: "2021-11-25",
        language:"English",
        numPage: 250,
        author:["A01"],
        publications:"P01",
        category:["tech","programming"]
    },
    {
        ISBN:"B02",
        title:"The Monk who sold his ferrari",
        pubDate: "2021-11-27",
        language:"French",
        numPage: 300,
        author:["A02"],
        publications:["P02"],
        category:["motivation","self-help"]
    }
];


const authors = [
    {
        id:"A01",
        name:"Robert Kiyosaki",
        book:["B01"]
    },
    {
        id:"A02",
        name:"Robin Sharma",
        book:["B02"]
    }
];

const publications = [
    {
        id:"P01",
        name:"Warner Business Books",
        book:["B01"]
    },
    {
        id:"P02",
        name:"Harper San Francisco",
        book:["B02"]
    },
    {
        id:"P03",
        name:"Jaico Publishing House",
        book:[]
    }

];


module.exports = {books, authors, publications}

// mongoose -> Validation




















