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

//Delete films with id in parameters

router.delete('/:id', function (req, res) {
    console.log(`DELETE /films/${req.params.id}`);

    const foundIndex = films.findIndex((film) => film.id == req.params.id);

    if(foundIndex < 0) return res.sendStatus(404);

    const itemsRemovedFromFilms = films.splice(foundIndex, 1);
    const itemRemoved = itemsRemovedFromFilms[0];
    
    return res.json(itemRemoved);
 
});

//Update one property for one or many properties
router.patch('/:id', function(req, res){
    const title = req?.body?.title;
    const link = req?.body?.link;
    const duration = req?.body?.duration;
    const budget = req?.body?.budget;

    if(!req.body ||
        (title != undefined && !title.trim()) ||
        (link != undefined && !link.trim()) ||
        (duration != undefined && (typeof req?.body?.duration !== 'number' || duration <0)) || 
        (budget != undefined && ( typeof req?.body?.duration !== 'number' || duration <0))
        ) return res.sendStatus(400);
    
    const foundIndex = films.findIndex((film) => film.id == req.params.id);

    if(foundIndex < 0) return res.sendStatus(404);

    const updatedFilm = {...films[foundIndex], ...req.body};

    films[foundIndex] = updatedFilm;

    res.json(updatedFilm);
        
});

router.put('/:id', function(req, res) {

    const title = req?.body?.title;
    const link = req?.body?.link;
    const duration = req?.body?.duration;
    const budget = req?.body?.budget;

    if (
        !req.body ||
        !title ||
        !title.trim() ||
        !link ||
        !link.trim() ||
        duration === undefined ||
        typeof req?.body?.duration !== 'number' ||
        duration < 0 ||
        budget === undefined ||
        typeof req?.body?.budget !== 'number' ||
        budget < 0
      )
        return res.sendStatus(400);

    const id = req.params.id;

    const foundIndexOfFilm = films.findIndex((film) => film.id == id);
    //findIndex return boolean like -1 is FALSE number > 0 is TRUE
    if(foundIndexOfFilm < 0){
        const newFilm = {id, title, duration, budget, link};
        films.push(newFilm);
        return res.json(newFilm);
    }

    const updatedFilm = {...films[foundIndexOfFilm], ...req.body};

    films[foundIndexOfFilm] = updatedFilm;

    return res.json(updatedFilm);


});




module.exports = router;