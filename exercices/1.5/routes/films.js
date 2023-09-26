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
      return res.sendStatus(400);
  
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

router.post('/', (req, res) => {
    const title = 
        req?.body?.title?.length !==0 ? req.body.title : undefined;

    const link =
        req?.body?.link?.length !== 0 ? req.body.link : undefined;

    const duration = 
        typeof req?.body?.duration !== 'number' || req.body.duration < 0
        ? undefined
        :req.body.duration;

    const budget =
        typeof req?.body?.budget !== "number"|| req.body.budget<0
        ?undefined
        :req.body.budget;
    
    console.log('POST /films');

    if(!title || !link || !duration || !budget) res.sendStatus(400);

    const lastIndexItem = films?.length !== 0 ? films.length-1 : undefined;
    const lastId = lastIndexItem !== undefined ? films[lastIndexItem]?.id : 0;
    const nextId = lastId + 1;

    const existingFilm = films.find(
        (film) => film.title.toLowerCase() === title.toLowerCase()
      );
      if (existingFilm) return res.sendStatus(409);

    const newFilm = {id: nextId, title, duration, budget, link};

    films.push(newFilm);
    
    res.json(newFilm);

});

module.exports = router;