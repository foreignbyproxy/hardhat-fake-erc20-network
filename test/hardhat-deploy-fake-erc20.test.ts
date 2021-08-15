// tslint:disable-next-line no-implicit-dependencies
import { useEnvironment } from "./helpers";

describe("Test Configs", function () {
    describe("Test - No config", function () {
        useEnvironment("no-config");

        it("Should config should have 1 token", function () {
			expect(this.hre.config.fakeERC20Network.tokens.length).toBe(1)
		});

        it("Should config should have defaultMintAmount", function () {
			expect(this.hre.config.fakeERC20Network.defaultMintAmount).toBe("1000000000000000000000")
        });
    });

	describe("Test - Full config", function () {
        useEnvironment("full-config");

        it("Should config should have 3 token", function () {
			expect(this.hre.config.fakeERC20Network.tokens.length).toEqual(3)

        });

        it("Should config should have defaultMintAmount", function () {
			expect(this.hre.config.fakeERC20Network.defaultMintAmount).toBe("80000000000000000000")
        });
    });
});
