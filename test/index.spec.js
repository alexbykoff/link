const chai = require("chai");
const expect = chai.expect;
const assert = chai.assert;
let Watchable = require("../src/index");

require('jsdom-global')();
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
});
