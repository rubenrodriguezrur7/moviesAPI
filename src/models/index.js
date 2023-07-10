const Movie = require('./Movie');
const Genre = require('./Genre');
const Actor = require('./Actor');
const Director = require('./Director');

Movie.belongsToMany(Genre, { through: 'MovieGenre' });
Genre.belongsToMany(Movie, { through: 'MovieGenre' });

Movie.belongsToMany(Actor, { through: 'MovieActor' });
Actor.belongsToMany(Movie, { through: 'MovieActor' });

Movie.belongsToMany(Director, { through: 'MovieDirector' });
Director.belongsToMany(Movie, { through: 'MovieDirector' });