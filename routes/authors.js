// All Route j.s
//Import express
const express = require('express')
const router = express.Router()
// import the Author model from Model folder- go out 2 steps back
const Author = require('../models/author')

// All authors | - Routes
// create router variable and pass the name of the file "author.ejs" in the view folder
//path >> Views/authors/author.ejs
// Search or find Author
router.get('/', async (req, res) => {
    // new variable
    let SearchOptions = {}
    if (req.query.name != null && req.query.name !=='') {
        SearchOptions.name = new RegExp (req.query.name, 'i')
    }
    try {
        const authors = await Author.find(SearchOptions)
        res.render('authors/index', {
            authors: authors,
            SearchOptions: req.query
        })
    } catch{
        res.redirect('/')  // in case there error, redirect to home page
    }
    
})
// New authors |- Route
// create router variable and pass the name of the file "new.ejs" in the Views folder
//path >> Views/authors/new.ejs
router.get('/new', (req, res) => {
    res.render('authors/new', {author: new Author()

    })
})
// Create authors | - Route
// create router variable using Post (In REST) and pass the name- Create is a new event
router.post('/', async (req, res) => {
    const author = new Author({
        name: req.body.name
    })

    try {
        const newAuthor = await author.save()
        res.redirect('authors')

    } catch (error) {
        res.render('authors/new', {
            author: author,
            errorMessage: 'Error creating author'
        })

    }
})    
//     res.send(req.body.name) // create route is setup to use
// })
// allow  to export the router
module.exports = router