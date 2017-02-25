const chai = require("chai");
const expect = chai.expect;
const assert = chai.assert;
let Watchable = require("../src/index");

require("jsdom-global")();
global.Watchable = Watchable;

describe("setType", () => {
    it("should return any when when no type", () => {
        let x = new Watchable("test");
        assert.equal("any", x.type());
    });

    it("should return a string when string passed as an argument", () => {
        let x = new Watchable("test", {value: "test", type: "string"});
        assert.equal("string", x.type());
    });

    it("should return a number when number passed as an argument", () => {
        let x = new Watchable("test", {value: 2, type: "number"});
        assert.equal("number", x.type());
    });

    it("should return a boolean when boolean passed as an argument", () => {
        let x = new Watchable("test", {value: false, type: "boolean"});
        assert.equal("boolean", x.type());
    });
});
