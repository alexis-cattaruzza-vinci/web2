const requestStats = {};

function middleware(req, res, next) {
  const { method, path } = req;
  
  // Créez une clé unique pour chaque combinaison de méthode et de chemin
  const key = `${method} ${path}`;
  
  // Incrémentez le compteur de cette combinaison
  requestStats[key] = (requestStats[key] || 0) + 1;
  
  // Passez la requête au middleware suivant
  next();
}

function printStats() {
  console.log('Request counter:');
  for (const key in requestStats) {
    console.log(`- ${key} : ${requestStats[key]}`);
  }
}

module.exports = { middleware, printStats };