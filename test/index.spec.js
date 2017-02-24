const Watchable = require("../src/index.js");
const chai = require("chai");
const expect = chai.expect;
const assert = chai.assert;

require('jsdom-global')();

describe("Sanity check", () => {
    it("should be a function", () => {
        expect(Watchable).to.be.a("function");
    });
});

describe("setType", () => {
    it("should return a string when string passed as an argument", () => {
        const W = new Watchable("Test", {
            value: "test",
            type: "string"
        });
        assert.equal("string", W.type());
    });
});
