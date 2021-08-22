// tslint:disable-next-line no-implicit-dependencies
import { expect } from "chai";

import { useEnvironment } from "./helpers";
import { defaultSettings } from "../src/utils";

/*
	Sets up an environment where no configuration is passed to fakeERC20Network. This should
	then set the defaultSettings as the configuration for fakeERC20Network.

	This makes sure that even if the user didnt provide a token or defaultMintAmount at least
	something gets deployed. It would be pointless to deploy nothing
*/
describe("Configs - No config", function () {
    useEnvironment("no-config");

    it("Config should have 1 token and defaultMintAmount", function () {
        expect(this.hre.config.fakeERC20Network).to.eql(defaultSettings);
    });
});

/*
	Sets up an environment where only a defaultMintAmount is set and no tokens configuration are passed. This makes
	sure that the task is deploying at least one token.

	This makes sure that even if the user didnt provide a token at least
	something gets deployed. Again, it would be pointless to deploy nothing
*/
describe("Config - Partial config - No Token", function () {
    useEnvironment("partial-config-no-token");

    it("Config should have 1 token and defaultMintAmount", function () {
        expect(this.hre.config.fakeERC20Network.tokens).to.eql(
            defaultSettings.tokens
        );

        expect(this.hre.config.fakeERC20Network.defaultMintAmount).to.equal(
            "70000000000000000000"
        );
    });
});

/*
	Sets up an environment where no defaultMintAmount is set. This makes sure that the task
	has a defaultMintAmount set whether they put one or not.
*/
describe("Config - Partial config - No defaultMintAmount", function () {
    useEnvironment("partial-config-no-defaultMintAmount");

    it("Config should have 2 tokens and defaultMintAmount", function () {
        expect(this.hre.config.fakeERC20Network.tokens.length).to.equal(2);
        expect(this.hre.config.fakeERC20Network.tokens[0].symbol).to.equal(
            "GOLD"
        );

        expect(this.hre.config.fakeERC20Network.tokens[1].symbol).to.equal(
            "SILVER"
        );

        expect(this.hre.config.fakeERC20Network.defaultMintAmount).to.equal(
            defaultSettings.defaultMintAmount
        );
    });
});

/*
	Makes sure that the HardHatUserConfig is being merged into the HRE correctly
*/
describe("Config - Full config", function () {
    useEnvironment("full-config");

    it("Config should have 3 tokens and defaultMintAmount", function () {
        expect(this.hre.config.fakeERC20Network.tokens.length).to.equal(3);
        expect(this.hre.config.fakeERC20Network.defaultMintAmount).to.equal(
            "80000000000000000000"
        );
    });
});
