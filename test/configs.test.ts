// tslint:disable-next-line no-implicit-dependencies
import { expect } from "chai";

import { useEnvironment } from "./helpers";

describe("Configs - No config", function () {
    useEnvironment("no-config");

    it("Config should have 1 token and defaultMintAmount", function () {
        expect(this.hre.config.fakeERC20Network.tokens.length).to.equal(1);
        expect(this.hre.config.fakeERC20Network.defaultMintAmount).to.equal(
            "1000000000000000000000"
        );
    });
});

describe("Config - Full config", function () {
    useEnvironment("full-config");

    it("Should config should have 3 token and defaultMintAmount", function () {
        expect(this.hre.config.fakeERC20Network.tokens.length).to.equal(3);
        expect(this.hre.config.fakeERC20Network.defaultMintAmount).to.equal(
            "80000000000000000000"
        );
    });
});
