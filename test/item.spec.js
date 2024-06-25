const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
chai.use(sinonChai);
const itemService = require('../service/item.service.js');
const Item = require('../models/item.js');

describe('Test Item Service', () => {

    let sandbox;

    beforeEach(() => {
        const req = {
            body: {
                name: "testItem",
                price: 10
            }
        };
        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        sandbox.restore();
    });

    // test create item
    describe('create item', () => {

        it('should create item', async () => {
            const req = {
                body: {
                    name: "testItem",
                    price: 10
                }
            };

            const res = {
                status: sandbox.stub().returnsThis(),
                json: sandbox.stub()
            }

            // const savedItem = {...req.body, _id: new mongoose.Types.ObjectId()};
            const saveStub = sandbox.stub(Item.prototype, 'save').resolves(req.body);

            await itemService.createItem(req, res);

            expect(saveStub).to.have.been.calledOnce;
            expect(res.status).to.have.been.calledWith(200);
            // expect(res.json).to.have.been.calledWith(req.body)
        });

        it('should return error when creating item', async () => {

            const req = {
                body: {
                    name: "testItem",
                    price: 10
                }
            }

            const res = {
                status: sandbox.stub().returnsThis(),
                json: sandbox.stub()
            }

            sandbox.stub(Item.prototype, 'save').rejects(new Error("Error creating item!"));

            await itemService.createItem(req, res);

            expect(res.status).to.have.been.calledWith(500);
            expect(res.json).to.have.been.calledWith({error: "Error creating item!"});
        });

    });


    // test get items
    describe('get items', () => {
        it('should get all items', async () => {
            const items = [
                { name: 'Item 1', price: 10 },
                { name: 'Item 2', price: 20 }
            ];
            const req = {}
            const res = {
                status: sandbox.stub().returnsThis(),
                json: sandbox.stub()
            }

            sandbox.stub(Item, 'find').resolves(items);

            await itemService.getItems(req, res);

            expect(Item.find).to.have.been.calledOnce;
            expect(res.status).to.have.been.calledWith(200);
            expect(res.json).to.have.been.calledWith(items);
        });

        it('should return error when getting all items', async () => {
            const req = {}
            const res = {
                status: sandbox.stub().returnsThis(),
                json: sandbox.stub()
            }
            sandbox.stub(Item, 'find').rejects(new Error("Error getting all items!"));

            await itemService.getItems(req, res);

            expect(res.status).to.have.been.calledWith(500);
            expect(res.json).to.have.been.calledWith({error: "Error getting all items!"});


        });

    });


    // test get item
    describe('get item', () => {
        it('should get single item', async () => {

            const item = {
                name: 'test item',
                price: 10
            };
            
            const req = {
                params : {
                    id: 1
                }
            }

            const res = {
                status: sandbox.stub().returnsThis(),
                json: sandbox.stub()
            }

            sandbox.stub(Item, 'findOne').resolves(item);
            await itemService.getItem(req, res);

            expect(Item.findOne).to.have.been.calledWith({ _id: req.params.id });
            expect(res.status).to.have.been.calledWith(200);
            expect(res.json).to.have.been.calledWith(item);

        });

        it('should return error when getting single item', async () => {
            const item = {
                name: 'test item',
                price: 10
            };
            
            const req = {
                params : {
                    id: 1
                }
            }

            const res = {
                status: sandbox.stub().returnsThis(),
                json: sandbox.stub()
            }

            sandbox.stub(Item, 'findOne').rejects(new Error("Error getting item!"));
            await itemService.getItem(req, res);

            expect(Item.findOne).to.have.been.calledOnce;
            expect(Item.findOne).to.have.been.calledWith({_id: req.params.id});
            expect(res.status).to.have.been.calledWith(500);
            expect(res.json).to.have.been.calledWith({error: "Error getting item!"});
            
        });
    });

    // test update item
    describe('update item', () => {
        it('should update item', async () => {
            const updatedItem = { name: 'Updated Item', price: 20 };
            const req = { params: { id: '1' }, body: updatedItem };
            const res = {
                status: sinon.stub().returnsThis(),
                json: sinon.stub()
            };
            sandbox.stub(Item, 'findById').resolves({ _id: '1' });
            sandbox.stub(Item, 'findOneAndUpdate').resolves(updatedItem);

            await itemService.updateItem(req, res);

            expect(Item.findById).to.have.been.calledWith('1');
            expect(Item.findOneAndUpdate).to.have.been.calledWith({ _id: '1' }, { $set: updatedItem }, { new: true });
            expect(res.status).to.have.been.calledWith(200);
            expect(res.json).to.have.been.calledWith(updatedItem);
        });

        it('should return error when updating item', async () => {
            const req = { params: { id: '1' }, body: { name: 'Updated Item', price: 20 } };
            const res = {
                status: sinon.stub().returnsThis(),
                json: sinon.stub()
            };
            sandbox.stub(Item, 'findById').rejects(new Error('Error updating item!'));

            await itemService.updateItem(req, res);

            expect(res.status).to.have.been.calledWith(400);
            expect(res.json).to.have.been.calledWith({ error: 'Item not found!' });
        });

    });

    // test delete item
    describe('delete item', () => {
        it('should delete item', async () => {
            const req = { params: { id: '1' } };
            const res = {
                status: sinon.stub().returnsThis(),
                json: sinon.stub()
            };
            sandbox.stub(Item, 'findById').resolves({ _id: '1' });
            sandbox.stub(Item, 'findOneAndDelete').resolves({ _id: '1' });

            await itemService.deleteItem(req, res);

            expect(Item.findById).to.have.been.calledWith('1');
            expect(Item.findOneAndDelete).to.have.been.calledWith({ _id: '1' });
            expect(res.status).to.have.been.calledWith(200);
            expect(res.json).to.have.been.calledWith({ message: 'Item deleted successfully!' });
        });

        it('should return error when deleting item', async () => {
            const req = { params: { id: '1' } };
            const res = {
                status: sinon.stub().returnsThis(),
                json: sinon.stub()
            };
            sandbox.stub(Item, 'findById').rejects(new Error('Error deleting item!'));

            await itemService.deleteItem(req, res);

            expect(res.status).to.have.been.calledWith(400);
            expect(res.json).to.have.been.calledWith({ error: 'Item not found!' });
        });
    });


})
