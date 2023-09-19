var express = require('express');
var router = express.Router();

const MENU = [
    {
        id: 1,
        title: 'Babylon',
        duration: 189,
        budget: 162,
        link: 'https://www.imdb.com/title/tt10640346/',
    },
    {
        id: 2,
        title: 'Agent Stone',
        duration: 125,
        budget: 131,
        link: 'https://www.imdb.com/title/tt16230232/',
    },
    {
        id : 3 ,
        title: 'The Covenant',
        duration: 123,
        budget: 55,
        link: 'https://www.imdb.com/title/tt4873118/',
    },
];

router.get('/', (req, res, next) => {
    console.log ('GET FILM');
    res.json(MENU);
});



module.exports = router;