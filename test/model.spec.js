const mongoose = require('mongoose');
const chai = require('chai');
const expect = chai.expect;
const Item = require('../models/item')


describe('Test Item Schema', () => {
    let item;
    let itemModel;

    afterEach(() => {
        item = null;
        itemModel = null;
    });

    it('should create a new item successfully', async() => {
        item = { name: 'item1', price: 100 };
        const itemModel = await new Item(item);
        expect(itemModel._id).to.exist;
        expect(itemModel.name).to.equal('item1');
        expect(itemModel.price).to.equal(100);
    });

    it('should not save if name is not provided', async () => {
        item = { price: 100 };
        const itemModel = await new Item(item);
        itemModel.save((err) => {
            expect(err).to.exist;
            expect(err.errors.name).to.exist;
        })

    });

    it('should not save if price is not provided', async () => {
        item = { name: 'item1' };
        const itemModel = await new Item(item);
        itemModel.save((err) => {
            expect(err).to.exist;
            expect(err.errors.price).to.exist;
        })

    });


});
