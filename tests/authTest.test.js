process.env.NODE_ENV = 'test';

const User = require("../models/user")

const { expect } = require('chai');
const request = require('supertest');
const faker = require('faker');
const app = require("../index")


const user = {
    name: faker.name.firstName(),
    email: faker.internet.email(),
    password: "password12345"
}

describe("Auth operations", () => {
    beforeEach(done => {
        User.deleteMany({}, err => {
            done();
        })
    })

    // register new user
    describe("POST /api/v1/register", () => {
        it("Should create/register a new user", done => {
            request(app)
            .post("/api/v1/register")
            .send(user)
            .then(res => {
                expect(res.status).to.equal(201);
                expect(res.body).to.be.an("object");
                expect(res.body).to.have.property("token");
                expect(res.headers).to.have.property("set-cookie");
                done();
            }).catch(err => {
                done(err);
            })
        })
    })
})