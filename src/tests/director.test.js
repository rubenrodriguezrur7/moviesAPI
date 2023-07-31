const request = require('supertest');
const app = require('../app');

let id;

test('GET /directors debe traer todos los directores', async () => {
    const res = await request(app).get('/directors');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('POST /directors debe crear un director', async () => {
    const director = {
        firstName: "Benito",
        lastName: "Juarez",
        nationality: "Mexico",
        image: "http://foto.jpg",
        birthday: "1960-09-25"
    }
    const res = await request(app).post('/directors').send(director);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.firstName).toBe(director.firstName);
    expect(res.body.id).toBeDefined();
});

test('PUT /directors/:id debe actualizar un director', async () => {
    const directorUp = {
        firstName: "Benito actualizado",
    }
    const res = await request(app).put(`/directors/${id}`).send(directorUp);
    expect(res.status).toBe(200);
    expect(res.body.firstName).toBe(directorUp.firstName);
});

test('DELETE /directors/:id debe eliminar un director', async () => {
    const res = await request(app).delete(`/directors/${id}`);
    expect(res.status).toBe(204);
});    






