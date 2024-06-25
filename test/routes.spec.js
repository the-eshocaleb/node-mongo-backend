// Import necessary modules and libraries
const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
chai.use(sinonChai);
const rewire = require('rewire');
const request = require('supertest');
const Item = require('../models/item.js');
const itemService = require('../service/item.service.js');
const app = require('../app.js');
const sandbox = sinon.createSandbox();
// let app  = rewire('../app');

describe("Testing express app routes", () => {

    afterEach(() => {
      sandbox.restore();
    });

    let sampleItemVal, id;

    beforeEach(() => {
        id = "60b6c0f4d1d4f20015d8b66b";  // Example item ID
        sampleItemVal = {
          _id: id,
          name: "sample item",
          price: 10,
        }; 
        
        updateItemVal = {
          _id: id,
          name: "updated item",
          price: 20,
        };

        sandbox.stub(Item.prototype, 'save').resolves(sampleItemVal);
        sandbox.stub(Item, 'find').resolves([sampleItemVal]);
        sandbox.stub(Item, 'findById').resolves(sampleItemVal);
        sandbox.stub(Item, 'findOneAndUpdate').resolves(updateItemVal);
        sandbox.stub(Item, 'findOneAndDelete').resolves({message: "Item deleted successfully!"});
    });

    describe('test POST /items', () => {
      it("POST / should successfully create a new item", async () => {
        const result = await request(app).post("/items").send(sampleItemVal);
        expect(result.statusCode).to.equal(200);
        expect(result.body).to.have.property("name").to.equal("sample item");  
        expect(result.body).to.have.property("_id").to.equal(id);
        expect(result.body).to.have.property("price").to.equal(10);
      });
    });
    

    describe('test GET /items', () => {
      it("GET / should successfully return all items", async () => {
        const result = await request(app).get("/items");
        expect(result.statusCode).to.equal(200);
        expect(result.body).to.be.an('array');
        expect(result.body[0]).to.have.property("name").to.equal("sample item");
        expect(result.body[0]).to.have.property("price").to.equal(10);
      });
    })
    

    describe('test GET /items/:id', () => {
      it("GET /:id should successfully return item", async () => {
        const result = await request(app).get(`/items/${id}`);
        expect(result.statusCode).to.equal(200);
        expect(result.body).to.have.property("name").to.equal("sample item");
        expect(result.body).to.have.property("price").to.equal(10);
      });
    });
    

    describe('test PUT /items/:id', () => {
      it("PUT /:id should successfully update item", async () => {
        const result = await request(app).put(`/items/${id}`).send(updateItemVal);
        expect(result.statusCode).to.equal(200);
        expect(result.body).to.have.property("name").to.equal("updated item");
        expect(result.body).to.have.property("price").to.equal(20);
      });
    })
    

    describe('test DELETE /items/:id', () => {
      it("DELETE /:id should successfully delete item", async () => {
        const result = await request(app).delete(`/items/${id}`);
        expect(result.statusCode).to.equal(200);
        expect(result.body).to.have.property("message").to.equal("Item deleted successfully!");
      });
    });
    
});

