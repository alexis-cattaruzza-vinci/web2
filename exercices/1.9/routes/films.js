const express = require('express');
const {
    readAllFilms,
    readOneFilms,
    createOneFilm,
    deleteOneFilm,
    updatePartiallyOneFilm,
    updateFullyOneFilm,
} = require('../models/films');

const router = express.Router();



// Read all the films, filtered by minimum-duration if the query param exists
router.get('/', (req, res) => {
  const allFilmsPOtentiallyFiltered = readAllFilms(req?.query?.['minimum-duration']);

  return res.json(allFilmsPOtentiallyFiltered);
});

// Read a film from its id in the menu

router.get('/:id', (req, res) => {

const foundFilm = readOneFilms(req?.params?.id);

if(!foundFilm) return res.sendStatus(404);

return res.json(foundFilm);
});

// CREATE film

router.post('/', (req, res) => {
  const title = req?.body?.title?.length !== 0 ? req.body.title : undefined;

  const link = req?.body?.link?.length !== 0 ? req.body.link : undefined;

  const duration =
    typeof req?.body?.duration !== 'number' || req.body.duration < 0
      ? undefined
      : req.body.duration;

  const budget =
    typeof req?.body?.budget !== 'number' || req.body.budget < 0 ? undefined : req.body.budget;


  if (!title || !link || !duration || !budget) res.sendStatus(400);

  const createdFilm = createOneFilm(title,duration, budget, link );

  return res.json(createdFilm);
});

// Delete films with id in parameters

router.delete('/:id', (req, res) => {
  
const deletedFilm = deleteOneFilm(req?.params?.id);

if(!deletedFilm) return res.sendStatus(404);

  return res.json(deletedFilm);
});

// Update one property for one or many properties

router.patch('/:id', (req, res) => {
  const title = req?.body?.title;
  const link = req?.body?.link;
  const duration = req?.body?.duration;
  const budget = req?.body?.budget;

  if (
    !req.body ||
    (title !== undefined && !title.trim()) ||
    (link !== undefined && !link.trim()) ||
    (duration !== undefined && (typeof req?.body?.duration !== 'number' || duration < 0)) ||
    (budget !== undefined && (typeof req?.body?.duration !== 'number' || duration < 0))
  )
    return res.sendStatus(400);

  const updatedFilm = updatePartiallyOneFilm(req?.params?.id);

  if(!updatedFilm) return res.sendStatus(404)

  return res.json(updatedFilm);
});

router.put('/:id', (req, res) => {
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

  const updatedFilm = updateFullyOneFilm(req?.params?.id,req?.body);

  return res.json(updatedFilm);
});

module.exports = router;
