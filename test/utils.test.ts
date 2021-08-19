// tslint:disable-next-line no-implicit-dependencies
import chai, { assert, expect } from "chai";

import fetchMock from "fetch-mock";

import chaiAsPromised from "chai-as-promised";
chai.use(chaiAsPromised);

import { useEnvironment } from "./helpers";
import { checkLocalhostNetwork } from "../src/utils";

describe("Test - checkLocalhostNetwork", function () {
    useEnvironment("no-config");

	this.afterEach(() => {
		fetchMock.reset()
	})

    it("Throws when localhost URL is falsey", async function () {
        let config = { ...this.hre.config };
        config.networks.localhost.url = "";

        await expect(checkLocalhostNetwork(config)).to.be.rejectedWith(Error);
    });

    it("Throws when localhost URL is does not respond", async function () {
        let config = { ...this.hre.config };

        await expect(checkLocalhostNetwork(config)).to.be.rejectedWith(Error);
    });

    it("Throws when response from local server is not status 200", async function () {
        let config = { ...this.hre.config };

    	fetchMock.mock(config.networks.localhost.url, 500);

        await expect(checkLocalhostNetwork(config)).to.be.rejectedWith(Error);
    });

    it("Returns true if response from local server is status 200", async function () {
        let config = { ...this.hre.config };

		fetchMock.mock(config.networks.localhost.url, 200);

        await expect(checkLocalhostNetwork(config)).to.eventually.equal(true);
    });
});
