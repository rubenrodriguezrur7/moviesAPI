const request = require('supertest');
const app = require('../app');
const Genre = require('../models/Genre');
const Actor = require('../models/Actor');
const Director = require('../models/Director');
require('../models');

let id;

test('GET /movies debe traer todas las peliculas', async () => {
    const res = await request(app).get('/movies');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('POST /movies debe crear una pelicula', async () => {
    const movie = {
        name: "El presidente",
        image: "http://foto.jpg",
        synopsis: "En la decada de los 40 se formó una gran nación",
        releaseYear: 2000,
    }
    const res = await request(app).post('/movies').send(movie);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.name).toBe(movie.name);
    expect(res.body.id).toBeDefined();
});

test('PUT /movies/:id debe actualizar una pelicula', async () => {
    const movieUp = {
        name: "El presidente actualizado",
    }
    const res = await request(app).put(`/movies/${id}`).send(movieUp);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(movieUp.name);
});

test('POST /movies/:id/genres debe insertar generos de una pelicula', async () => {
    const genre = await Genre.create({
        name: "Comedy",
    });
    const res = await request(app).post(`/movies/${id}/genres`).send([genre.id]);
    await genre.destroy();
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
});

test('POST /movies/:id/actors debe insertar los actores de una pelicula', async () => {
    const actor = await Actor.create({
        firstName: "Bruce",
        lastName: "Willys",
        nationality: "United States",
        image: "http://foto.jpg",
        birthday: "1962-07-26",
    });
    const res = await request(app).post(`/movies/${id}/actors`).send([actor.id]);
    await actor.destroy();
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
});

test('POST /movies/:id/directors debe insertar los directores de una pelicula', async () => {
    const director = await Director.create({
        firstName: "Steven",
        lastName: "Spielberg",
        nationality: "United States",
        image: "http://foto.jpg",
        birthday: "1961-07-26",
    });
    const res = await request(app).post(`/movies/${id}/directors`).send([director.id]);
    await director.destroy();
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
});

test('DELETE /movies/:id debe eliminar una pelicula', async () => {
    const res = await request(app).delete(`/movies/${id}`);
    expect(res.status).toBe(204);
});    






