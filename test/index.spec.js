const Watchable = require('../dist/main.bundle.js');
const chai = require('chai');
const expect = chai.expect;

describe('Sanity check', () => {
    it('should be defined', () => {
        expect(Watchable).not.to.be.an('undefined');
    });
});
