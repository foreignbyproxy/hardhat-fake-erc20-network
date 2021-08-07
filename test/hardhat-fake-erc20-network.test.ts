// tslint:disable-next-line no-implicit-dependencies
import { assert } from "chai";
import path from "path";

import { useEnvironment } from "./helpers";

describe("Test Configs", function () {
    describe("Test - No config", function () {
        useEnvironment("no-config");

        it("Should config should have 1 token", function () {
			assert.lengthOf(this.hre.config.fakeERC20Network.tokens, 1);
		});

        it("Should config should have defaultMintAmount", function () {
			assert.equal(this.hre.config.fakeERC20Network.defaultMintAmount, "1000000000000000000000");
        });
    });

	describe("Test - Full config", function () {
        useEnvironment("full-config");

        it("Should config should have 3 token", function () {
			assert.lengthOf(this.hre.config.fakeERC20Network.tokens, 3);
        });

        it("Should config should have defaultMintAmount", function () {
			assert.equal(this.hre.config.fakeERC20Network.defaultMintAmount, "80000000000000000000");
        });
    });
});
