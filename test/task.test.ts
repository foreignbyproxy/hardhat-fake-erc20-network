import sinon from "sinon";
import chai, { expect } from "chai";
import chaiAsPromised from "chai-as-promised";
import { jestSnapshotPlugin } from "mocha-chai-jest-snapshot";
import decache from "decache";
import { resetHardhatContext } from "hardhat/plugins-testing";

chai.use(chaiAsPromised);
chai.use(jestSnapshotPlugin());

import { useEnvironment } from "./helpers";

import { deployTokens } from "../src/tasks";
import * as utils from "../src/utils";
import { ethers, run } from "hardhat";

describe("Task", function () {
    useEnvironment("full-config");

    let getInitialUserDataSPY = sinon.spy(utils, "getInitialUserData");
    let getTaskResultsDisplaySPY = sinon.spy(utils, "getTaskResultsDisplay");
    let ethersSPY = sinon.spy(ethers);

    afterEach(function () {
        sinon.reset();
    });

    after(function () {
        sinon.restore();
    });

	it("Task - Throws if local network not detected and exits", async function () {
        await expect(deployTokens(this.hre)).to.be.rejectedWith(Error);

        // Expect the task to end so the following functions are not called
        expect(ethersSPY.getSigners.called).to.equal(false);
        expect(ethersSPY.getContractFactory.called).to.equal(false);
        expect(getInitialUserDataSPY.called).to.equal(false);
    });

    it("Task - Task completes successfully", async function () {
        const tokenNumber = this.hre.config.fakeERC20Network.tokens.length;

        //Setup stubs and spies
        sinon.stub(console, "log");

        const checkLocalhostNetworkSTUB = sinon
            .stub(utils, "checkLocalhostNetwork")
            .returns(Promise.resolve(true));

        // Run task
		await run(utils.TASK_NAME);

        //Tests
        expect(checkLocalhostNetworkSTUB.called).to.equal(true);
        expect(ethersSPY.getContractFactory.firstCall.args[0]).to.equal(
            "ERC20FakeFactory"
        );
        expect(getInitialUserDataSPY.callCount).to.equal(tokenNumber);
        expect(getTaskResultsDisplaySPY.calledOnce).to.equal(true);
        expect(getTaskResultsDisplaySPY.firstCall.args[0]).toMatchSnapshot();

        checkLocalhostNetworkSTUB.restore();
    });
});
