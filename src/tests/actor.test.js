const request = require('supertest');
const app = require('../app');

let id;

test('GET /actors debe traer todos los actores', async () => {
    const res = await request(app).get('/actors');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('POST /actors debe crear un actor', async () => {
    const actor = {
        firstName: "Will",
        lastName: "Smith",
        nationality: "United States",
        image: "http://foto.jpg",
        birthday: "1968-09-25"
    }
    const res = await request(app).post('/actors').send(actor);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.firstName).toBe(actor.firstName);
    expect(res.body.id).toBeDefined();
});

test('PUT /actors/:id debe actualizar un actor', async () => {
    const actorUp = {
        firstName: "Will actualizado",
    }
    const res = await request(app).put(`/actors/${id}`).send(actorUp);
    expect(res.status).toBe(200);
    expect(res.body.firstName).toBe(actorUp.firstName);
});

test('DELETE /actors/:id debe eliminar un actor', async () => {
    const res = await request(app).delete(`/actors/${id}`);
    expect(res.status).toBe(204);
});    






