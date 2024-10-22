// Import express
const express = require('express')
const router = express.Router()

// create router variable and pass the name of the view (middle.ejs)
router.get('/', (req, res) => {
    res.render('middle')
})

// allow  to export the router
module.exports = router