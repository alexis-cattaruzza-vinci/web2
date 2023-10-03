const path = require('node:path');
const { serialize, parse } = require('../utils/json');

const jsonDbPath = path.join(__dirname, '/../data/films.json');


function readAllFilms(minimumFilmDuration){
    const films = parse(jsonDbPath);
    
    if(minimumFilmDuration === undefined) return films;
    
    const minimumFilmDurationAsNumber = Number(minimumFilmDuration);
    if(Number.isNaN(minimumFilmDurationAsNumber) || minimumFilmDurationAsNumber < 0 ) return undefined;
    

  const filmsReachingMinimumDuration = films.filter((film) => film.duration >= minimumFilmDuration);
  return filmsReachingMinimumDuration;
}

function readOneFilms(id) {
    const idNumber = parseInt(id, 10);
    const films = parse(jsonDbPath);
    const indexOfFilmFound = films.findIndex((film) => film.id === idNumber);
    if (indexOfFilmFound < 0) return undefined;
  
    return films[indexOfFilmFound];
}

function createOneFilm(title, duration, budget, link) {
    const films = parse(jsonDbPath);
  
    const createdFilm = {
      id: getNextId(),
      title,
      duration,
      budget,
      link,
    };
  
    films.push(createdFilm);
  
    serialize(jsonDbPath, films);
  
    return createdFilm;
}

function getNextId() {
    const films = parse(jsonDbPath);
    const lastItemIndex = films?.length !== 0 ? films.length - 1 : undefined;
    if (lastItemIndex === undefined) return 1;
    const lastId = films[lastItemIndex]?.id;
    const nextId = lastId + 1;
    return nextId;
}

function deleteOneFilm(id) {
    const idNumber = parseInt(id, 10);
    const films = parse(jsonDbPath);
    const foundIndex = films.findIndex((film) => film.id === idNumber);
    if (foundIndex < 0) return undefined;
    const deletedFilms =films.splice(foundIndex, 1);
    const deletedFilm = deletedFilms[0];
    serialize(jsonDbPath, films);
  
    return deletedFilm;
  }


function updatePartiallyOneFilm(id, propertiesToUpdate)  {
    const idAsNumber = Number(id);
    const films = parse(jsonDbPath);
    // findIndex return boolean like -1 is FALSE number > 0 is TRUE
    const foundIndex = films.findIndex((film) => film.id === idAsNumber);
    if (foundIndex < 0) return undefined;
  
    const updatedFilm = { ...films[foundIndex], ...propertiesToUpdate };
  
    films[foundIndex] = updatedFilm;
  
    serialize(jsonDbPath, films);
  
    return updatedFilm;
}

function updateFullyOneFilm(id, filmProps)  {
    const idAsNumber= Number(id);
    const films = parse(jsonDbPath);
    // findIndex return boolean like -1 is FALSE number > 0 is TRUE
    const foundIndex = films.findIndex((film) => film.id === idAsNumber);
    if (foundIndex < 0) return undefined;

    if (foundIndex < 0) {
        const newFilm = { id: idAsNumber, ...filmProps };
        films.push(newFilm);
        return newFilm;
      }

      const filmPriorToChange = films[foundIndex];
  
    const updatedFilm = { ...filmPriorToChange, ...filmProps};

    films[foundIndex] = updatedFilm;
  
    serialize(jsonDbPath, films);
  
    return updatedFilm;
}


module.exports = {
    readAllFilms,
    readOneFilms,
    createOneFilm,
    deleteOneFilm,
    updatePartiallyOneFilm,
    updateFullyOneFilm,
};