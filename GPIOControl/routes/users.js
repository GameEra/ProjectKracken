var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res) {
    res.send('<h1>Surya is an Awesome person with great ideas, however he is lazy<h1>');
});

module.exports = router;