var express = require('express');
var router = express.Router();

const films = [
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

// Read all the films, filtered by minimum-duration if the query param exists
router.get('/', (req, res) => {
    const minimumFilmDuration = req?.query
      ? Number(req.query['minimum-duration'])
      : undefined;
    if (typeof minimumFilmDuration !== 'number' || minimumFilmDuration <= 0)
      return res.json('Wrong minimum duration'); // bad practise (will be improved in exercise 1.5)
  
    if (!minimumFilmDuration) return res.json(films);
  
    const filmsReachingMinimumDuration = films.filter(
      (film) => film.duration >= minimumFilmDuration
    );
    return res.json(filmsReachingMinimumDuration);
  });



//READ the film identified by id in params

router.get('/:id', (req, res) =>{
    console.log(`GET/films/${req.params.id}`);

    const indexFilmFound = films.findIndex((film) => film.id == req.params.id);

    if(indexFilmFound < 0) return res.sendStatus(404);

    res.json(films[indexFilmFound]);
});

module.exports = router;