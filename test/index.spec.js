const Watchable = require("../src/index.js");
const chai = require("chai");
const expect = chai.expect;

describe("Sanity check", () => {
    it("should be a function", () => {
        expect(Watchable).to.be.a("function");
    });
});
