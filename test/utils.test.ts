// tslint:disable-next-line no-implicit-dependencies
import chai, { expect } from "chai";
import fetchMock from "fetch-mock";
import chaiAsPromised from "chai-as-promised";
chai.use(chaiAsPromised);

import { ethers } from "hardhat";

import { useEnvironment } from "./helpers";
import { checkLocalhostNetwork, getInitialUserData } from "../src/utils";

import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

describe("Utils - checkLocalhostNetwork", function () {
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


describe("Utils - getInitialUserData", function () {
	let accounts: SignerWithAddress[];

	this.beforeAll(async () => {
		accounts = await ethers.getSigners();
	})

	it("Returns an array of addresses and initialBalances", function() {
		const initialMint = '1000000';
		const initialUsers = getInitialUserData(accounts, initialMint);

		expect(initialUsers.length).to.equal(accounts.length);

		expect(initialUsers[0].hasOwnProperty('userAddress')).to.equal(true);
		expect(initialUsers[0].userAddress).to.equal(accounts[0].address);

		expect(initialUsers[0].hasOwnProperty('initialBalance')).to.equal(true);
		expect(initialUsers[0].initialBalance).to.equal(initialMint);
	})
});
